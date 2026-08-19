import { NextRequest } from "next/server";
import { LIAM_SYSTEM_PROMPT } from "@/lib/liam-system-prompt";
import { LIAM_PRODUCTION_RULES } from "@/lib/liam-production-rules";
import { extractConsultation, consultationContext } from "@/lib/liam-consultation";
import { buildLiveToolContext } from "@/lib/liam-live-tools";
import { retrieveRAGContext } from "@/lib/azure-search-rag";
import { getProfile, buildProfileBlock, getAggregateInsights } from "@/lib/user-profile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };
type LiamModelMode = "primary" | "deep";
type SessionContext = { userName?: string | null; userId?: string | null };

const CF_ACCOUNTS = [
  { id: process.env.CF_ACCT_5_ID!, token: process.env.CF_ACCT_5_TOKEN! },
  { id: process.env.CF_ACCT_6_ID!, token: process.env.CF_ACCT_6_TOKEN! },
  { id: process.env.CF_ACCT_7_ID!, token: process.env.CF_ACCT_7_TOKEN! },
  { id: process.env.CF_ACCT_8_ID!, token: process.env.CF_ACCT_8_TOKEN! },
].filter((a) => a.id && a.token);

const CF_MODELS: Record<LiamModelMode, string[]> = {
  primary: ["@cf/qwen/qwen3-30b-a3b-fp8", "@cf/meta/llama-3.3-70b-instruct-fp8-fast", "@cf/zai-org/glm-5.2"],
  deep: ["@cf/zai-org/glm-5.2", "@cf/meta/llama-3.3-70b-instruct-fp8-fast", "@cf/qwen/qwen3-30b-a3b-fp8"],
};

const LIAM_CF_WORKER_URL = process.env.LIAM_CF_WORKER_URL?.replace(/\/$/, "");
const LIAM_CF_WORKER_TOKEN = process.env.LIAM_CF_WORKER_TOKEN;
const CF_AI_GATEWAY_ID = process.env.CF_AI_GATEWAY_ID;
const DEST_BLOCK_RE = /```destination\s*(\{[\s\S]*?\})\s*```/g;
const EMAIL_BLOCK_RE = /```email_capture\s*(\{[\s\S]*?\})\s*```/g;

async function callLiamAgentStream(messages: ChatMessage[], systemContent: string, mode: LiamModelMode, userId?: string | null) {
  if (!LIAM_CF_WORKER_URL || !LIAM_CF_WORKER_TOKEN || !userId) return null;
  try {
    const res = await fetch(`${LIAM_CF_WORKER_URL}/agents/liam-agent/${encodeURIComponent(userId)}/chat`, {
      method: "POST",
      headers: { Authorization: `Bearer ${LIAM_CF_WORKER_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({ messages, systemContent, mode }),
      signal: AbortSignal.timeout(15000),
    });
    return res.ok ? res.body : null;
  } catch { return null; }
}

async function callCFStream(messages: ChatMessage[], systemContent: string, mode: LiamModelMode) {
  if (!CF_ACCOUNTS.length) return null;
  const start = Math.floor(Date.now() / 60000) % CF_ACCOUNTS.length;
  for (const model of CF_MODELS[mode]) {
    for (let i = 0; i < CF_ACCOUNTS.length; i++) {
      const acct = CF_ACCOUNTS[(start + i) % CF_ACCOUNTS.length];
      const gateway = !!CF_AI_GATEWAY_ID;
      const url = gateway
        ? `https://api.cloudflare.com/client/v4/accounts/${acct.id}/ai/v1/chat/completions`
        : `https://api.cloudflare.com/client/v4/accounts/${acct.id}/ai/run/${model}`;
      const headers: Record<string,string> = { Authorization: `Bearer ${acct.token}`, "Content-Type": "application/json" };
      if (gateway) headers["cf-aig-gateway-id"] = CF_AI_GATEWAY_ID!;
      const body = gateway
        ? { model, messages: [{ role: "system", content: systemContent }, ...messages], stream: true, max_tokens: mode === "deep" ? 1400 : 900, temperature: mode === "deep" ? 0.55 : 0.7 }
        : { messages: [{ role: "system", content: systemContent }, ...messages], stream: true, max_tokens: mode === "deep" ? 1400 : 900, temperature: mode === "deep" ? 0.55 : 0.7 };
      try {
        const res = await fetch(url, { method: "POST", headers, body: JSON.stringify(body), signal: AbortSignal.timeout(30000) });
        if (res.status === 429 || res.status >= 500 || !res.ok) continue;
        return res.body;
      } catch { continue; }
    }
  }
  return null;
}

export async function POST(req: NextRequest) {
  const { messages, model = "primary", sessionContext } = await req.json() as { messages: ChatMessage[]; model?: LiamModelMode; sessionContext?: SessionContext };
  if (!Array.isArray(messages) || !messages.length) return new Response("Bad request", { status: 400 });

  const mode: LiamModelMode = model === "deep" ? "deep" : "primary";
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const query = lastUser?.content ?? "";
  const consultation = extractConsultation(messages);

  const [ragContext, liveTools, userProfile, aggregateInsights] = await Promise.all([
    query ? retrieveRAGContext(query, mode === "deep" ? 9 : 6) : Promise.resolve(""),
    query ? buildLiveToolContext(query, consultation) : Promise.resolve({ context: "", status: {} }),
    sessionContext?.userId ? getProfile(sessionContext.userId) : Promise.resolve(null),
    getAggregateInsights(),
  ]);

  let systemContent = `${LIAM_SYSTEM_PROMPT}\n\n${LIAM_PRODUCTION_RULES}\n\n${consultationContext(consultation)}`;
  if (userProfile) {
    const block = buildProfileBlock(userProfile);
    if (block) systemContent += `\n\n${block}`;
  } else if (aggregateInsights && aggregateInsights.totalConversations >= 5) {
    const topDests = aggregateInsights.topDestinations.slice(0, 3).map((d) => d.name);
    const topStyles = aggregateInsights.topTravelStyles.slice(0, 3).map((s) => s.style);
    if (topDests.length || topStyles.length) systemContent += `\n\n## ANONYMOUS SERVICE PATTERNS\nRecent visitors have shown interest in ${topDests.join(", ") || "varied destinations"}; common styles include ${topStyles.join(", ") || "varied styles"}. Use only as a weak prior when this traveler has expressed no preference. Never stereotype the traveler from aggregate data.`;
  }
  const resolvedName = sessionContext?.userName ?? userProfile?.name ?? consultation.travelerName ?? null;
  if (resolvedName) systemContent += `\n\n## SESSION NAME\nThe traveler has given the name ${resolvedName}. Use it sparingly and naturally.`;
  if (liveTools.context) systemContent += `\n\n${liveTools.context}`;

  let usedAgent = false;
  let upstream = await callLiamAgentStream(messages, systemContent, mode, sessionContext?.userId);
  if (upstream) usedAgent = true;
  else {
    if (ragContext) systemContent += `\n\n${ragContext}`;
    upstream = await callCFStream(messages, systemContent, mode);
  }

  if (!upstream) return new Response(`data: ${JSON.stringify({ error: "Liam is temporarily unavailable" })}\n\ndata: [DONE]\n\n`, { headers: { "Content-Type": "text/event-stream" } });

  const encoder = new TextEncoder();
  let fullText = "";
  let buffer = "";
  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream!.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (!data || data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data);
            const candidate = parsed.choices?.[0]?.delta?.content ?? parsed.response;
            const delta = typeof candidate === "string" ? candidate : "";
            if (!delta) continue;
            fullText += delta;
            const visible = delta.replace(/```destination[\s\S]*?```/g, "").replace(/```email_capture[\s\S]*?```/g, "");
            if (visible) controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: visible })}\n\n`));
          } catch {}
        }
      }

      const destMatches = [...fullText.matchAll(DEST_BLOCK_RE)];
      if (destMatches.length) try { controller.enqueue(encoder.encode(`data: ${JSON.stringify({ destination: JSON.parse(destMatches.at(-1)![1]) })}\n\n`)); } catch {}
      const emailMatches = [...fullText.matchAll(EMAIL_BLOCK_RE)];
      if (emailMatches.length) try { controller.enqueue(encoder.encode(`data: ${JSON.stringify({ email_capture: JSON.parse(emailMatches.at(-1)![1]) })}\n\n`)); } catch {}

      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ debug: {
        inference_path: usedAgent ? "cloudflare-agent" : "direct-workers-ai",
        ai_gateway: usedAgent || !!CF_AI_GATEWAY_ID,
        rag: usedAgent ? "agent-native" : !!ragContext,
        live_tools: liveTools.status,
        consultation_confidence: consultation.confidence,
        profile_loaded: !!userProfile,
        returning_client: (userProfile?.conversationCount ?? 0) > 0,
        model_mode: mode,
      } })}\n\n`));
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(stream, { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" } });
}
