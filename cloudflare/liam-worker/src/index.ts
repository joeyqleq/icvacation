import { Agent, routeAgentRequest } from "agents";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

type LiamMode = "primary" | "deep";

type LiamMemory = {
  turnCount: number;
  lastSeen: string | null;
  destinations: string[];
  interests: string[];
};

type PostConversationEvent = {
  id?: string;
  created_at?: string;
  event_type?: string;
  user_id?: string | null;
  destination?: string | null;
  travel_style?: string | null;
  party_size?: number | null;
  nights?: number | null;
  budget_usd?: number | null;
  outcome?: string;
  inference_path?: string;
  model_mode?: string;
};

interface Env {
  AI: Ai;
  VECTORIZE: Vectorize;
  LiamAgent: DurableObjectNamespace<LiamAgent>;
  liam_data: D1Database;
  liam_corpus: R2Bucket;
  liam_post_conversation: Queue<PostConversationEvent>;
  AI_GATEWAY_ID: string;
  SERVICE_TOKEN?: string;
}


const MODELS: Record<LiamMode, string[]> = {
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

const DESTINATIONS = [
  "maldives", "bali", "paris", "tokyo", "rome", "greece", "tuscany",
  "santorini", "dubai", "new york", "london", "thailand", "vietnam",
  "costa rica", "peru", "patagonia", "iceland", "norway", "seychelles",
  "caribbean", "amalfi", "barcelona", "portugal", "morocco", "kenya",
  "tanzania", "egypt", "india", "japan", "australia", "new zealand",
  "fiji", "hawaii", "mexico", "colombia", "belize", "croatia", "turkey",
  "jordan",
];

const INTEREST_PATTERNS: Record<string, RegExp> = {
  diving: /\b(diving|scuba|snorkel)\b/i,
  wine: /\b(wine|vineyard|winery|sommelier)\b/i,
  food: /\b(food|cuisine|gastronomy|restaurant|chef|culinary)\b/i,
  architecture: /\b(architecture|cathedral|temple|mosque)\b/i,
  wildlife: /\b(wildlife|safari|animals|birding|whale)\b/i,
  golf: /\bgolf\b/i,
  spa: /\b(spa|wellness|yoga|meditation|retreat)\b/i,
  photography: /\b(photo|photography|landscape|shoot)\b/i,
};

function unique(values: string[], max: number) {
  return [...new Set(values)].slice(0, max);
}

function extractMemory(messages: ChatMessage[]) {
  const text = messages
    .filter((message) => message.role === "user")
    .map((message) => message.content)
    .join(" ")
    .toLowerCase();

  const destinations = DESTINATIONS
    .filter((destination) => text.includes(destination))
    .map((destination) => destination.replace(/\b\w/g, (c) => c.toUpperCase()));

  const interests = Object.entries(INTEREST_PATTERNS)
    .filter(([, pattern]) => pattern.test(text))
    .map(([interest]) => interest);

  return { destinations, interests };
}

function memoryBlock(memory: LiamMemory) {
  const lines: string[] = [];
  if (memory.destinations.length) {
    lines.push(`Previously discussed destinations: ${memory.destinations.join(", ")}`);
  }
  if (memory.interests.length) {
    lines.push(`Known interests: ${memory.interests.join(", ")}`);
  }
  if (!lines.length) return "";
  return `## DURABLE CLIENT MEMORY\n${lines.join("\n")}\nUse this subtly; do not recite it back unless relevant.`;
}

export class LiamAgent extends Agent<Env, LiamMemory> {
  initialState: LiamMemory = {
    turnCount: 0,
    lastSeen: null,
    destinations: [],
    interests: [],
  };

  onStart() {
    this.sql`
      CREATE TABLE IF NOT EXISTS turns (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TEXT NOT NULL,
        role TEXT NOT NULL,
        content TEXT NOT NULL
      )
    `;
  }

  private authorized(request: Request) {
    if (!this.env.SERVICE_TOKEN) return false;
    return request.headers.get("authorization") === `Bearer ${this.env.SERVICE_TOKEN}`;
  }

  private async retrieve(query: string, topK: number) {
    try {
      const embedded = await this.env.AI.run("@cf/baai/bge-base-en-v1.5", {
        text: [query.slice(0, 512)],
      }) as { data?: number[][] };

      const vector = embedded.data?.[0];
      if (!vector) return "";

      const result = await this.env.VECTORIZE.query(vector, {
        topK,
        returnMetadata: "all",
      });

      const chunks = result.matches
        .map((match) => {
          const metadata = (match.metadata ?? {}) as Record<string, unknown>;
          const parts: string[] = [];
          if (metadata.title) parts.push(`**${String(metadata.title)}**`);
          if (metadata.source) parts.push(`Source: ${String(metadata.source)}`);
          if (metadata.text) parts.push(String(metadata.text));
          return parts.join("\n");
        })
        .filter(Boolean);

      return chunks.length
        ? `## Retrieved Travel Knowledge\n\n${chunks.join("\n\n---\n\n")}`
        : "";
    } catch {
      return "";
    }
  }

  private persistTurns(messages: ChatMessage[]) {
    const now = new Date().toISOString();
    for (const message of messages.slice(-4)) {
      this.sql`
        INSERT INTO turns (created_at, role, content)
        VALUES (${now}, ${message.role}, ${message.content.slice(0, 8000)})
      `;
    }

    // Keep the local transcript bounded. Durable memory lives in state; the
    // table is for recent conversational continuity and diagnostics.
    this.sql`
      DELETE FROM turns
      WHERE id NOT IN (SELECT id FROM turns ORDER BY id DESC LIMIT 80)
    `;
  }

  async onRequest(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.endsWith("/health")) {
      return Response.json({ ok: true, service: "liam-agent" });
    }

    if (!this.authorized(request)) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (request.method === "GET" && url.pathname.endsWith("/memory")) {
      return Response.json({ memory: this.state });
    }

    if (request.method !== "POST" || !url.pathname.endsWith("/chat")) {
      return new Response("Not found", { status: 404 });
    }

    const payload = await request.json() as {
      messages?: ChatMessage[];
      systemContent?: string;
      mode?: LiamMode;
    };

    const messages = Array.isArray(payload.messages) ? payload.messages : [];
    if (!messages.length || !payload.systemContent) {
      return Response.json({ error: "messages and systemContent are required" }, { status: 400 });
    }

    const mode: LiamMode = payload.mode === "deep" ? "deep" : "primary";
    const lastUser = [...messages].reverse().find((message) => message.role === "user");
    const query = lastUser?.content ?? "";

    const learned = extractMemory(messages);
    this.setState({
      turnCount: this.state.turnCount + 1,
      lastSeen: new Date().toISOString(),
      destinations: unique([...this.state.destinations, ...learned.destinations], 16),
      interests: unique([...this.state.interests, ...learned.interests], 16),
    });
    this.persistTurns(messages);

    const ragContext = query ? await this.retrieve(query, mode === "deep" ? 9 : 6) : "";
    const durableMemory = memoryBlock(this.state);
    const systemContent = [payload.systemContent, durableMemory, ragContext]
      .filter(Boolean)
      .join("\n\n");

    const models = MODELS[mode];
    for (const model of models) {
      try {
        const result = await this.env.AI.run(
          model,
          {
            messages: [{ role: "system", content: systemContent }, ...messages],
            stream: true,
            max_tokens: mode === "deep" ? 1200 : 800,
            temperature: mode === "deep" ? 0.6 : 0.75,
          },
          {
            gateway: {
              id: this.env.AI_GATEWAY_ID || "default",
              skipCache: true,
              collectLog: true,
            },
          }
        );

        return new Response(result as ReadableStream, {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
          },
        });
      } catch {
        continue;
      }
    }

    return Response.json({ error: "No Workers AI model available" }, { status: 503 });
  }
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    if (url.pathname === "/health") {
      return Response.json({ ok: true, service: "icvacation-liam" });
    }

    return (
      (await routeAgentRequest(request, env, { cors: true })) ??
      new Response("Not found", { status: 404 })
    );
  },

  async queue(batch: MessageBatch<PostConversationEvent>, env: Env): Promise<void> {
    // Post-conversation evaluation: persist conversation outcomes to D1 for
    // analytics and future learning. System prompt is NEVER mutated automatically.
    for (const msg of batch.messages) {
      try {
        const event = msg.body;
        await env.liam_data
          .prepare(
            `INSERT OR IGNORE INTO liam_conversation_events
             (id, created_at, event_type, user_id, destination, travel_style,
              party_size, nights, budget_usd, outcome, inference_path, model_mode)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
          )
          .bind(
            event.id ?? crypto.randomUUID(),
            event.created_at ?? new Date().toISOString(),
            event.event_type ?? "conversation",
            event.user_id ?? null,
            event.destination ?? null,
            event.travel_style ?? null,
            event.party_size ?? null,
            event.nights ?? null,
            event.budget_usd ?? null,
            event.outcome ?? "completed",
            event.inference_path ?? "unknown",
            event.model_mode ?? "primary"
          )
          .run();
        msg.ack();
      } catch (err) {
        // Retry transient failures; permanent failures are logged.
        console.error("queue consumer error:", err instanceof Error ? err.message : err);
        msg.retry();
      }
    }
  },
} satisfies ExportedHandler<Env>;

