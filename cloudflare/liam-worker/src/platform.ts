export type PostConversationEvent = {
  userId: string;
  occurredAt: string;
  memory: {
    turnCount: number;
    lastSeen: string | null;
    destinations: string[];
    interests: string[];
  };
};

export type CorpusDocument = {
  id: string;
  title?: string;
  source?: string;
  category?: string;
  destinations?: string[];
  text: string;
};

export async function persistConversationEvent(
  db: D1Database,
  event: PostConversationEvent
) {
  await db.batch([
    db.prepare(
      `INSERT INTO liam_events (user_id, event_type, payload_json, created_at)
       VALUES (?, 'conversation_turn', ?, ?)`
    ).bind(event.userId, JSON.stringify(event), event.occurredAt),
    db.prepare(
      `INSERT INTO liam_profiles
         (user_id, destinations_json, interests_json, conversation_count, last_seen, updated_at)
       VALUES (?, ?, ?, 1, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(user_id) DO UPDATE SET
         destinations_json = excluded.destinations_json,
         interests_json = excluded.interests_json,
         conversation_count = liam_profiles.conversation_count + 1,
         last_seen = excluded.last_seen,
         updated_at = CURRENT_TIMESTAMP`
    ).bind(
      event.userId,
      JSON.stringify(event.memory.destinations),
      JSON.stringify(event.memory.interests),
      event.occurredAt
    ),
  ]);
}

export async function ingestCorpusDocuments(
  env: { AI: Ai; VECTORIZE: Vectorize; CORPUS: R2Bucket },
  documents: CorpusDocument[]
) {
  const accepted = documents
    .filter((doc) => doc?.id && doc?.text)
    .slice(0, 50);

  if (!accepted.length) return { stored: 0, vectors: 0 };

  const vectors: VectorizeVector[] = [];

  for (const doc of accepted) {
    const normalized = {
      ...doc,
      text: doc.text.slice(0, 12000),
      updatedAt: new Date().toISOString(),
    };

    await env.CORPUS.put(
      `documents/${encodeURIComponent(doc.id)}.json`,
      JSON.stringify(normalized),
      { httpMetadata: { contentType: "application/json" } }
    );

    const embedding = await env.AI.run("@cf/baai/bge-base-en-v1.5", {
      text: [doc.text.slice(0, 8000)],
    }) as { data?: number[][] };

    const values = embedding.data?.[0];
    if (!values) continue;

    vectors.push({
      id: doc.id,
      values,
      metadata: {
        title: doc.title ?? "",
        source: doc.source ?? "r2:liam-corpus",
        category: doc.category ?? "",
        destinations: (doc.destinations ?? []).join(","),
        text: doc.text.slice(0, 8000),
        r2_key: `documents/${encodeURIComponent(doc.id)}.json`,
      },
    });
  }

  if (vectors.length) {
    await env.VECTORIZE.upsert(vectors);
  }

  return { stored: accepted.length, vectors: vectors.length };
}
