import { NextRequest } from "next/server";
import { LIAM_SYSTEM_PROMPT, LIAM_CONTEXT_INJECTOR } from "@/lib/liam-system-prompt";
import { LIAM_KNOWLEDGE_BASE } from "@/lib/liam-knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT!;
const API_KEY = process.env.AZURE_OPENAI_API_KEY!;
const API_VERSION = process.env.AZURE_OPENAI_API_VERSION ?? "2024-12-01-preview";
const DEPLOYMENT_PRIMARY = process.env.AZURE_OPENAI_DEPLOYMENT_PRIMARY ?? "liam-primary";
const DEPLOYMENT_DEEP = process.env.AZURE_OPENAI_DEPLOYMENT_DEEP ?? "liam-deep";

const SYSTEM_MESSAGE: ChatMessage = {
  role: "system",
  content: LIAM_SYSTEM_PROMPT + LIAM_CONTEXT_INJECTOR(LIAM_KNOWLEDGE_BASE),
};

const DEST_BLOCK_RE = /```destination\s*(\{[\s\S]*?\})\s*```/g;

export async function POST(req: NextRequest) {
  const { messages, model = "primary" } = await req.json() as {
    messages: ChatMessage[];
    model?: "primary" | "deep";
  };

  const deployment = model === "deep" ? DEPLOYMENT_DEEP : DEPLOYMENT_PRIMARY;
  const url = `${ENDPOINT}/openai/deployments/${deployment}/chat/completions?api-version=${API_VERSION}`;

  const upstream = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": API_KEY,
    },
    body: JSON.stringify({
      messages: [SYSTEM_MESSAGE, ...messages],
      stream: true,
      max_completion_tokens: 600,
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
              // Hide the destination JSON block from visible text
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

      // After full stream, extract destination
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
