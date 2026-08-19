# Liam AI Production Status

**Project:** IC Vacation / Liam AI  
**Status:** Production rollout complete  
**Recorded:** 2026-08-20

## Production state

- **Main merge commit:** `5431c8f7c7e12da1537781c8bb2a31604418ea11`
- **PR #2:** merged into `main`
- **Cloudflare Worker:** `https://icvacation-liam.joeyq.workers.dev`
- **Worker version reported at rollout completion:** `eff6fe6c-ddbd-46f6-8be1-de4c46984b00`
- **Production site:** `https://www.icvacation.com` / `https://icvacation.com`
- **Vercel production deployment:** READY for merge commit `5431c8f7c7e12da1537781c8bb2a31604418ea11`

## Verified Liam architecture

- Production requests use the **Cloudflare Agent** path (`inference_path: "cloudflare-agent"`).
- RAG is running through the Agent-native path (`rag: "agent-native"`).
- AI Gateway is active for the Agent path.
- Durable Object / Liam Agent memory persists appropriate traveler context across turns.
- Existing Vectorize knowledge base remains `liam-kb`.
- D1 database: `liam-data`.
- R2 bucket: `liam-corpus`.
- Queue: `liam-post-conversation`.
- Workers AI is bound to the Liam Worker.

## Live travel capabilities

Production verification covered:

- fresh web research
- currency exchange
- weather
- hotel metadata
- flight route resolution

Mock/demo results must never be presented as live data.

## Email handoff

The Liam email flow is structured so that:

- the traveler receives the proposed package only;
- the IC Vacation advisor receives a concise traveler/package brief;
- raw conversation transcripts are not sent by default.

## Build and deployment checks

At rollout completion:

- TypeScript `tsc --noEmit` passed;
- Next.js production build passed;
- static, SSG, and dynamic routes built with zero reported errors;
- Cloudflare Worker deployment succeeded;
- Vercel production deployment reached READY;
- no production-critical unresolved issue was reported.

## Important operational notes

- Keep `LIAM_CF_WORKER_URL` and `LIAM_CF_WORKER_TOKEN` configured in Vercel.
- The Worker-side matching credential is stored as `SERVICE_TOKEN`; never commit or print its value.
- Upstash remains in place where still used during the Cloudflare memory migration; do not remove it without verifying parity and data migration.
- Liam should remain one customer-facing identity even if internal tools, queues, or specialist processes are added later.
- Cross-user learning should follow evidence -> learning event -> candidate improvement -> approved playbook rule. Do not allow autonomous global system-prompt mutation from individual feedback.

## Definition of current state

The Liam redesign is merged, deployed, and production-active. Future work should be treated as normal maintenance or feature development rather than unfinished migration work unless a production regression is discovered.
