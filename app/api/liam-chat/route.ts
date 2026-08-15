import { NextRequest } from "next/server";
import { LIAM_SYSTEM_PROMPT } from "@/lib/liam-system-prompt";
import { retrieveRAGContext } from "@/lib/azure-search-rag";
import { getProfile, buildProfileBlock, getAggregateInsights } from "@/lib/user-profile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface SessionContext {
  userName?: string | null;
  userId?: string | null;
}

type LiamModelMode = "primary" | "deep";

const CF_ACCOUNTS = [
  { id: process.env.CF_ACCT_5_ID!, token: process.env.CF_ACCT_5_TOKEN! },
  { id: process.env.CF_ACCT_6_ID!, token: process.env.CF_ACCT_6_TOKEN! },
  { id: process.env.CF_ACCT_7_ID!, token: process.env.CF_ACCT_7_TOKEN! },
  { id: process.env.CF_ACCT_8_ID!, token: process.env.CF_ACCT_8_TOKEN! },
].filter((account) => account.id && account.token);

const CF_MODELS: Record<LiamModelMode, string[]> = {
  primary: [
    "@cf/qwen/qwen3-30b-a3b-fp8",
    "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
    "@cf/zai-org/glm-5.2",
  ],
  deep: [
    "@cf/zai-org/glm-5.2",
    "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
    "@cf/qwen/qwen3-30b-a3b-fp8",
  ],
};

const CF_AI_GATEWAY_ID = process.env.CF_AI_GATEWAY_ID;

function workersAiUrl(accountId: string, model: string) {
  const base = `https://api.cloudflare.com/client/v4/accounts/${accountId}`;
  if (CF_AI_GATEWAY_ID) {
    return `${base}/ai-gateway/gateways/${encodeURIComponent(CF_AI_GATEWAY_ID)}/workers-ai/${model}`;
  }
  return `${base}/ai/run/${model}`;
}

async function callCFStream(
  messages: ChatMessage[],
  systemContent: string,
  mode: LiamModelMode
): Promise<ReadableStream<Uint8Array> | null> {
  if (CF_ACCOUNTS.length === 0) return null;

  const startIdx = Math.floor(Date.now() / 60000) % CF_ACCOUNTS.length;
  const models = CF_MODELS[mode] ?? CF_MODELS.primary;

  for (const model of models) {
    for (let i = 0; i < CF_ACCOUNTS.length; i++) {
      const acct = CF_ACCOUNTS[(startIdx + i) % CF_ACCOUNTS.length];
      const url = workersAiUrl(acct.id, model);

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${acct.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [{ role: "system", content: systemContent }, ...messages],
            stream: true,
            max_tokens: mode === "deep" ? 1200 : 800,
            temperature: mode === "deep" ? 0.6 : 0.75,
          }),
        });

        if (res.status === 429 || res.status >= 500) continue;
        if (!res.ok) continue;
        return res.body;
      } catch {
        continue;
      }
    }
  }

  return null;
}

const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

const DEST_BLOCK_RE = /```destination\s*(\{[\s\S]*?\})\s*```/g;
const EMAIL_BLOCK_RE = /```email_capture\s*(\{[\s\S]*?\})\s*```/g;

async function tavilySearch(query: string): Promise<{ context: string; status: string }> {
  if (!TAVILY_API_KEY) return { context: "", status: "no_key" };
  try {
    const res = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: TAVILY_API_KEY,
        query: `travel ${query}`,
        search_depth: "basic",
        max_results: 3,
        include_answer: true,
      }),
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return { context: "", status: `http_${res.status}` };
    const data = await res.json();
    const results: { title: string; content: string; url: string }[] = data.results ?? [];
    if (results.length === 0) return { context: "", status: "empty" };
    const formatted = results
      .map((r) => `**${r.title}**\n${r.content.slice(0, 400)}`)
      .join("\n\n---\n\n");
    return { context: `## Live Web Context (Tavily)\n\n${formatted}`, status: "ok" };
  } catch (e: unknown) {
    return { context: "", status: `error_${(e as Error)?.message?.slice(0, 30) ?? "unknown"}` };
  }
}

export async function POST(req: NextRequest) {
  const { messages, model = "primary", sessionContext } = await req.json() as {
    messages: ChatMessage[];
    model?: LiamModelMode;
    sessionContext?: SessionContext;
  };

  const mode: LiamModelMode = model === "deep" ? "deep" : "primary";
  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
  const userQuery = lastUserMessage?.content ?? "";

  // Run RAG, Tavily, profile fetch, and aggregate insights in parallel.
  const [ragContext, tavilyResult, userProfile, aggregateInsights] = await Promise.all([
    lastUserMessage ? retrieveRAGContext(userQuery, mode === "deep" ? 9 : 6) : Promise.resolve(""),
    lastUserMessage ? tavilySearch(userQuery) : Promise.resolve({ context: "", status: "skipped" }),
    sessionContext?.userId ? getProfile(sessionContext.userId) : Promise.resolve(null),
    getAggregateInsights(),
  ]);
  const webContext = tavilyResult.context;
  const tavilyStatus = tavilyResult.status;

  // Build system prompt with profile + session context + knowledge.
  let systemContent = LIAM_SYSTEM_PROMPT;

  if (userProfile) {
    const profileBlock = buildProfileBlock(userProfile);
    if (profileBlock) systemContent += `\n\n${profileBlock}`;
  } else if (aggregateInsights && aggregateInsights.totalConversations >= 5) {
    const topDests = aggregateInsights.topDestinations.slice(0, 3).map((d) => d.name);
    const topStyles = aggregateInsights.topTravelStyles.slice(0, 3).map((s) => s.style);
    if (topDests.length > 0 || topStyles.length > 0) {
      const destLine = topDests.length > 0 ? `most interested in: ${topDests.join(", ")}` : "";
      const styleLine = topStyles.length > 0 ? `Popular travel styles: ${topStyles.join(", ")}` : "";
      systemContent += `\n\n## CURRENT VISITOR CONTEXT\nBased on recent conversations, visitors to IC Vacation are ${destLine}. ${styleLine}. Use this as soft context — don't reference it directly, just let it subtly inform your suggestions when the visitor hasn't expressed strong preferences yet.`;
    }
  }

  const resolvedName = sessionContext?.userName ?? userProfile?.name ?? null;
  if (resolvedName) {
    systemContent += `\n\n## SESSION CONTEXT\nThe client's name is ${resolvedName}. Use their name naturally — warmly, not excessively.`;
  }

  if (ragContext) systemContent += `\n\n${ragContext}`;
  if (webContext) systemContent += `\n\n${webContext}`;

  const upstream = await callCFStream(messages, systemContent, mode);
  if (!upstream) {
    return new Response(
      `data: ${JSON.stringify({ error: "All CF inference routes unavailable" })}\n\ndata: [DONE]\n\n`,
      { headers: { "Content-Type": "text/event-stream" } }
    );
  }

  const encoder = new TextEncoder();
  let fullText = "";

  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              fullText += delta;
              const visibleDelta = delta
                .replace(/```destination[\s\S]*?```/g, "")
                .replace(/```email_capture[\s\S]*?```/g, "");
              if (visibleDelta) {
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ text: visibleDelta })}\n\n`)
                );
              }
            }
          } catch {}
        }
      }

      const destMatches = [...fullText.matchAll(DEST_BLOCK_RE)];
      if (destMatches.length > 0) {
        const lastMatch = destMatches[destMatches.length - 1];
        try {
          const dest = JSON.parse(lastMatch[1]);
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ destination: dest })}\n\n`)
          );
        } catch {}
      }

      const emailMatches = [...fullText.matchAll(EMAIL_BLOCK_RE)];
      if (emailMatches.length > 0) {
        const lastMatch = emailMatches[emailMatches.length - 1];
        try {
          const emailData = JSON.parse(lastMatch[1]);
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ email_capture: emailData })}\n\n`)
          );
        } catch {}
      }

      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({
            debug: {
              rag_docs: ragContext ? ragContext.split("---").length : 0,
              tavily: tavilyStatus,
              session_user: resolvedName ?? null,
              profile_loaded: !!userProfile,
              returning_client: (userProfile?.conversationCount ?? 0) > 0,
              aggregate_loaded: !!aggregateInsights,
              model_mode: mode,
              ai_gateway: !!CF_AI_GATEWAY_ID,
            },
          })}\n\n`
        )
      );

      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
