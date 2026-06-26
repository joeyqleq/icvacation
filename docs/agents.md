# Global Agent Workflow

This file is a portable instruction set for any AI agent or IDE. Copy it into a repo root `AGENTS.md` or any equivalent instruction file when you want the same behavior everywhere.
Treat Mem0 as the memory ledger: a durable record of project state, decisions, and learned rules.

## Purpose

Use Mem0 as the cross-platform knowledge base for all durable project context.

- New session: load memory context first.
- Resumed session: load memory context first, then reconcile what changed since the prior run.
- Any project: treat repo docs and code as the local source of truth, and treat Mem0 as the long-lived context layer.
- Future projects should fit this same flow without needing a rewrite.

## Startup Rule

At the start of every new chat session or resumed session:

1. Identify the active project or repo.
2. Query Mem0 for the project-scoped memories first.
3. Read the repo’s instruction files next, if present.
4. Compare memory context, repo docs, and code to infer the current springboard point.
5. If Mem0 is responsive, tell the user immediately and briefly.
6. If Mem0 is not working, tell the user immediately and continue with repo docs and code only.

Do not skip the memory check because the task seems small.

## Memory Scope and Naming

Use the same Mem0-style metadata pattern already present in the workspace.

Rules:

- Preserve existing memory records.
- Do not rename old memories just to make them look cleaner.
- Add new memories using the project’s existing metadata pattern.
- Prefer project-scoped memories over global memories when both exist.

## What To Read First

For an active project, read in this order:

1. Project-scoped Mem0 memories.
2. Repo instruction files such as `AGENTS.md`, `README.md`, `docs/*.md`, or equivalent.
3. Recent changes in code or git history.
4. Any project-specific runbook or memory cluster.

If docs and code disagree, assume the code or latest committed state is more authoritative, then confirm with memory context before changing anything.

## Sync Cadence

Keep Mem0 in sync continuously, not just once.

- Session start: read relevant memories.
- After each major decision: write or update a memory.
- After each checkpoint: write a checkpoint memory.
- Before context-switching, rate-limit switching, or handing off: write a concise state summary.
- On resume: re-read the memories that match the active project and session.
- If Mem0 stops responding, note it immediately and continue without assuming prior memory writes succeeded.

Use short, durable memories. Prefer updating an existing memory over creating duplicates.

## Checkpoint Rule

For long workflows:

- Create checkpoints early.
- Create another checkpoint at every meaningful milestone.
- Include what is done, what is verified, what remains, and the next safe action.
- If a workflow may exceed one session or one account, make the checkpoint restartable.
- A checkpoint should be enough for a new agent or new session to continue without reading the whole chat.

## Token Discipline

Optimize for low token use.

- Load the smallest relevant memory slice first.
- Expand only if the context is ambiguous or contradictory.
- Summarize memories instead of dumping them.
- Do not repeat the same history across chat, repo files, and memory updates.
- Store long-lived context in Mem0, not in the conversation.
- Keep the wording compact so the agent spends tokens on work, not narration.

## Work Loop

For any project task:

1. Check project memories.
2. Check repo docs.
3. Inspect the current code or data state.
4. Infer the project intent from the combination of the three.
5. Make the smallest correct change.
6. Write the result back to Mem0 as a ledger entry.
7. Add a checkpoint if the task is not finished.
8. If Mem0 is down, continue the task and record the outage in the session summary.

## Project-Specific Overrides

Some projects have special update rules. Those rules override this global workflow when they exist in project memories or project docs.

Example:

- Trump Files may have its own entry-update protocol, dedupe rules, or rescore workflow.
- In that case, follow the Trump Files-specific memory instructions before applying this global rule.

## When Mem0 Is Unavailable

If Mem0 is down or not reachable:

- Say so immediately.
- Continue with repo docs and code if possible.
- Do not invent memory context.
- Retry Mem0 when it becomes available again.
- Treat the outage itself as a useful operational fact for the next checkpoint or handoff.

## Output Rule

When you start a session and Mem0 responds, say that it responded.

When you resume a session, say that you re-synced with memory before making changes.

When Mem0 is not working, say that explicitly before doing anything else.

Do not expose raw memory dumps unless the user asks for them.

## Minimum Standard

Every session should leave behind:

- at least one memory update if anything meaningful changed,
- at least one checkpoint for any non-trivial workflow,
- a concise handoff state that another agent can continue from.

## Future Projects

This workflow should work for new repositories without edits to the structure.

- Replace project-specific names with the new repo’s actual metadata.
- Keep the same startup, sync, checkpoint, and outage rules.
- Let project memories define special handling when needed.
- Keep the file generic enough to be copied unchanged into future projects.
