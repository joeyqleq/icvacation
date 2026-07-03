import { NextRequest } from "next/server";
import { LIAM_SYSTEM_PROMPT } from "@/lib/liam-system-prompt";
import { retrieveRAGContext } from "@/lib/azure-search-rag";
import { getProfile, buildProfileBlock } from "@/lib/user-profile";

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

const ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT!;
const API_KEY = process.env.AZURE_OPENAI_API_KEY!;
const API_VERSION = process.env.AZURE_OPENAI_API_VERSION ?? "2024-12-01-preview";
const DEPLOYMENT_PRIMARY = process.env.AZURE_OPENAI_DEPLOYMENT_PRIMARY ?? "liam-primary";
const DEPLOYMENT_DEEP = process.env.AZURE_OPENAI_DEPLOYMENT_DEEP ?? "liam-deep";
const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

const DEST_BLOCK_RE = /```destination\s*(\{[\s\S]*?\})\s*```/g;

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
    model?: "primary" | "deep";
    sessionContext?: SessionContext;
  };

  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
  const userQuery = lastUserMessage?.content ?? "";

  // Run RAG, Tavily, and profile fetch in parallel
  const [ragContext, tavilyResult, userProfile] = await Promise.all([
    lastUserMessage ? retrieveRAGContext(userQuery, 6) : Promise.resolve(""),
    lastUserMessage ? tavilySearch(userQuery) : Promise.resolve({ context: "", status: "skipped" }),
    sessionContext?.userId ? getProfile(sessionContext.userId) : Promise.resolve(null),
  ]);
  const webContext = tavilyResult.context;
  const tavilyStatus = tavilyResult.status;

  // Build system prompt with profile + session context + knowledge
  let systemContent = LIAM_SYSTEM_PROMPT;

  // Inject persistent user profile (cross-session memory)
  if (userProfile) {
    const profileBlock = buildProfileBlock(userProfile);
    if (profileBlock) systemContent += `\n\n${profileBlock}`;
  }

  // Override name from session if we have it (session wins over profile for current name)
  const resolvedName = sessionContext?.userName ?? userProfile?.name ?? null;
  if (resolvedName) {
    systemContent += `\n\n## SESSION CONTEXT\nThe client's name is ${resolvedName}. Use their name naturally — warmly, not excessively.`;
  }

  if (ragContext) systemContent += `\n\n${ragContext}`;
  if (webContext) systemContent += `\n\n${webContext}`;

  const systemMessage: ChatMessage = { role: "system", content: systemContent };

  const deployment = model === "deep" ? DEPLOYMENT_DEEP : DEPLOYMENT_PRIMARY;
  const url = `${ENDPOINT}/openai/deployments/${deployment}/chat/completions?api-version=${API_VERSION}`;

  const upstream = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": API_KEY,
    },
    body: JSON.stringify({
      messages: [systemMessage, ...messages],
      stream: true,
      max_completion_tokens: 800,
      temperature: 0.75,
    }),
  });

  if (!upstream.ok) {
    const err = await upstream.text();
    return new Response(`data: ${JSON.stringify({ error: err.slice(0, 200) })}\n\ndata: [DONE]\n\n`, {
      headers: { "Content-Type": "text/event-stream" },
    });
  }

  const encoder = new TextEncoder();
  let fullText = "";

  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream.body!.getReader();
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
              const visibleDelta = delta.replace(/```destination[\s\S]*?```/g, "");
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

      // Emit brain layer debug info (only in non-production or always — harmless metadata)
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({
            debug: {
              rag_docs: ragContext ? ragContext.split("---").length : 0,
              tavily: tavilyStatus,
              session_user: resolvedName ?? null,
              profile_loaded: !!userProfile,
              returning_client: (userProfile?.conversationCount ?? 0) > 0,
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
