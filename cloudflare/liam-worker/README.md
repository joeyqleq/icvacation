# Liam Cloudflare backend

This directory is the Cloudflare-native backend for Liam AI. It is intentionally additive: the existing Vercel `/api/liam-chat` route keeps working until the Worker is deployed and its bridge environment variables are configured.

## Implemented

- Cloudflare Agents SDK / Durable Object per user
- SQLite-backed durable memory and recent-turn storage
- Native Workers AI binding (no AI API credential in Worker code)
- Native `liam-kb` Vectorize binding
- AI Gateway on the `default` gateway with logging enabled and prompt caching disabled for personalized chat
- Cloudflare Worker observability
- Vercel-side fallback to the existing multi-account Workers AI route
- D1 schema for central profiles, leads, events, and aggregate analytics

## Security

The Worker requires a `SERVICE_TOKEN` secret for Agent chat and memory endpoints. Never put it in `wrangler.jsonc` or Git.

```bash
cd cloudflare/liam-worker
npm install
npx wrangler secret put SERVICE_TOKEN
```

The repository's old Vectorize ingestion script previously contained a Cloudflare credential in source. The current script reads credentials from environment variables instead. The exposed credential must still be rotated because Git history is immutable unless explicitly rewritten.

Prefer a scoped `CF_CENTRAL_API_TOKEN`. `CF_CENTRAL_KEY` remains supported only as a temporary compatibility fallback for the existing Vercel RAG path.

## Deploy the Agent core

The current `wrangler.jsonc` only references resources that already exist or can be provisioned with the Worker itself:

- Workers AI binding: `AI`
- Vectorize: `liam-kb`
- Durable Object: `LiamAgent`
- AI Gateway: `default`

```bash
cd cloudflare/liam-worker
npm install
npm run typecheck
npm run deploy
```

After deployment, configure Vercel with:

```text
LIAM_CF_WORKER_URL=https://<worker-hostname>
LIAM_CF_WORKER_TOKEN=<same value as Worker SERVICE_TOKEN>
```

Until both variables exist, `/api/liam-chat` automatically stays on the existing direct Workers AI path. If the Agent endpoint returns an error, the route also falls back to direct Workers AI.

## D1 phase

Create a central database and apply `schema.sql`. Durable Object SQLite remains the hot-path user/session memory; D1 is for cross-user reporting and business data.

Suggested resource name: `liam-data`.

Once provisioned, add a D1 binding named `DB` to `wrangler.jsonc` and use it for:

- lead persistence
- aggregate insights
- queryable customer profiles
- analytics/events

## R2 phase

Suggested bucket: `liam-corpus`.

R2 should become the canonical source corpus while Vectorize remains the retrieval index. Store normalized/chunkable source documents in R2 and rebuild or refresh `liam-kb` from that canonical corpus rather than from one developer machine's JSON paths.

Add an R2 binding named `CORPUS` after the bucket exists.

## Queue / Workflow phase

Suggested queue: `liam-post-conversation`.

Use a Queue after each completed conversation for non-interactive work:

- durable profile extraction
- D1 aggregate updates
- lead processing
- transcript/email jobs
- analytics fan-out

Use a Workflow for corpus refresh and ingestion jobs that need retries/checkpoints:

1. fetch/crawl trusted travel source
2. normalize and store source in R2
3. chunk
4. embed with Workers AI
5. upsert Vectorize
6. record ingestion metadata

These bindings should only be added after the actual resources exist so a normal Worker deploy never references fake database IDs or bucket names.

## AI Gateway

The Agent uses the Workers AI binding with gateway id `default`. Personalized chat requests explicitly skip prompt caching, while Gateway logging stays enabled. Public/non-personalized destination or FAQ endpoints can later opt into a cache TTL independently.

The Vercel fallback can also use AI Gateway by setting:

```text
CF_AI_GATEWAY_ID=default
```

This uses Cloudflare's current `/ai/v1/chat/completions` REST endpoint plus the `cf-aig-gateway-id` header.

## Current migration boundary

```text
Browser
  -> Vercel Next.js /api/liam-chat
       -> Cloudflare LiamAgent (when configured)
            -> Durable Object SQLite memory
            -> Workers AI + AI Gateway
            -> Vectorize liam-kb
       -> direct Workers AI fallback
       -> Upstash profile/lead system (temporary)
       -> Tavily live web context
```

The next cutover should move Upstash aggregate/lead writes into D1 + Queue after those Cloudflare resources are provisioned. Tavily can remain as a broad live-web source; curated recurring sources should move to a Cloudflare crawl/R2/Vectorize refresh pipeline.
