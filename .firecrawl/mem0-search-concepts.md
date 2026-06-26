> ## Documentation Index
>
> Fetch the complete documentation index at: [/llms.txt](https://docs.mem0.ai/llms.txt)
>
> Use this file to discover all available pages before exploring further.

[Skip to main content](https://docs.mem0.ai/core-concepts/memory-operations/search#content-area)

[Mem0 home page![light logo](https://mintcdn.com/mem0/jmnLaiutcXgYmrAY/logo/light.svg?fit=max&auto=format&n=jmnLaiutcXgYmrAY&q=85&s=262e6e63930c20446217323d7f850a7a)![dark logo](https://mintcdn.com/mem0/jmnLaiutcXgYmrAY/logo/dark.svg?fit=max&auto=format&n=jmnLaiutcXgYmrAY&q=85&s=90ded1dd02ad45ca33577cc49af4e022)](https://mem0.ai/)

Search...

Ctrl KAsk Assistant

- [Your Dashboard](https://app.mem0.ai/?utm_source=oss&utm_medium=docs-nav)
- [Your Dashboard](https://app.mem0.ai/?utm_source=oss&utm_medium=docs-nav)

Search...

Navigation

Core Concepts

Search Memory

[Welcome](https://docs.mem0.ai/introduction) [Mem0 Platform](https://docs.mem0.ai/platform/overview) [OpenClaw](https://docs.mem0.ai/integrations/openclaw) [Open Source](https://docs.mem0.ai/open-source/overview) [Cookbooks](https://docs.mem0.ai/cookbooks/overview) [Integrations](https://docs.mem0.ai/integrations) [Agent Plugins](https://docs.mem0.ai/integrations/claude-code) [API Reference](https://docs.mem0.ai/api-reference) [Release Notes](https://docs.mem0.ai/changelog/highlights)

- [Documentation](https://docs.mem0.ai/introduction)

### Getting Started

- [Overview](https://docs.mem0.ai/platform/overview)
- [Sign up as an agent](https://docs.mem0.ai/platform/agent-signup)
- [Vibecoding](https://docs.mem0.ai/vibecoding)
- [Mem0 MCP](https://docs.mem0.ai/platform/mem0-mcp)
- [CLI](https://docs.mem0.ai/platform/cli)
- [Platform vs Open Source](https://docs.mem0.ai/platform/platform-vs-oss)
- [Quickstart](https://docs.mem0.ai/platform/quickstart)

### Core Concepts

- [Memory Types](https://docs.mem0.ai/core-concepts/memory-types)
- [Add Memory](https://docs.mem0.ai/core-concepts/memory-operations/add)
- [Search Memory](https://docs.mem0.ai/core-concepts/memory-operations/search)
- [Update Memory](https://docs.mem0.ai/core-concepts/memory-operations/update)
- [Delete Memory](https://docs.mem0.ai/core-concepts/memory-operations/delete)
- [Memory Evaluation](https://docs.mem0.ai/core-concepts/memory-evaluation)

### Platform Features

- [Overview](https://docs.mem0.ai/platform/features/platform-overview)
- Essential Features

- Advanced Features

- Data Management

- Integration Features


### Support & Troubleshooting

- [FAQs](https://docs.mem0.ai/platform/faqs)

### Migration Guide

- [Platform: Migrating to the New Memory Algorithm](https://docs.mem0.ai/migration/platform-v2-to-v3)
- [Migrate from Open Source to Platform](https://docs.mem0.ai/migration/oss-to-platform)
- [API Reference Changes](https://docs.mem0.ai/migration/api-changes)

### Contribute

- [Contribution Hub](https://docs.mem0.ai/platform/contribute)

## On this page

- [How Mem0 Searches Memory](https://docs.mem0.ai/core-concepts/memory-operations/search#how-mem0-searches-memory)
- [Key terms](https://docs.mem0.ai/core-concepts/memory-operations/search#key-terms)
- [Architecture](https://docs.mem0.ai/core-concepts/memory-operations/search#architecture)
- [How does it work?](https://docs.mem0.ai/core-concepts/memory-operations/search#how-does-it-work)
- [When should you use it?](https://docs.mem0.ai/core-concepts/memory-operations/search#when-should-you-use-it)
- [Platform vs OSS usage](https://docs.mem0.ai/core-concepts/memory-operations/search#platform-vs-oss-usage)
- [Search with Mem0 Platform](https://docs.mem0.ai/core-concepts/memory-operations/search#search-with-mem0-platform)
- [Search with Mem0 Open Source](https://docs.mem0.ai/core-concepts/memory-operations/search#search-with-mem0-open-source)
  - [Explain OSS search scores](https://docs.mem0.ai/core-concepts/memory-operations/search#explain-oss-search-scores)
- [Filter patterns](https://docs.mem0.ai/core-concepts/memory-operations/search#filter-patterns)
- [Tips for better search](https://docs.mem0.ai/core-concepts/memory-operations/search#tips-for-better-search)
  - [More Details](https://docs.mem0.ai/core-concepts/memory-operations/search#more-details)
- [Put it into practice](https://docs.mem0.ai/core-concepts/memory-operations/search#put-it-into-practice)
- [See it live](https://docs.mem0.ai/core-concepts/memory-operations/search#see-it-live)

Core Concepts

# Search Memory

Copy page

Retrieve relevant memories from Mem0 using powerful semantic and filtered search capabilities.

Copy page

# [​](https://docs.mem0.ai/core-concepts/memory-operations/search\#how-mem0-searches-memory)  How Mem0 Searches Memory

Mem0’s search operation lets agents ask natural-language questions and get back the memories that matter most. Like a smart librarian, it finds exactly what you need from everything you’ve stored.

**Why it matters**

- Retrieves the right facts without rebuilding prompts from scratch.
- Supports both managed Platform and OSS so you can test locally and deploy at scale.
- Keeps results relevant with filters, rerankers, and thresholds.

## [​](https://docs.mem0.ai/core-concepts/memory-operations/search\#key-terms)  Key terms

- **Query** – Natural-language question or statement you pass to `search`.
- **Filters** – JSON logic (AND/OR, comparison operators) that narrows results by user, categories, dates, etc.
- **top\_k / threshold** – Controls how many memories return and the minimum similarity score.
- **Rerank** – Optional second pass that boosts precision when a reranker is configured.

## [​](https://docs.mem0.ai/core-concepts/memory-operations/search\#architecture)  Architecture

1

[Navigate to header](https://docs.mem0.ai/core-concepts/memory-operations/search#)

Query processing

Mem0 cleans and enriches your natural-language query so the downstream embedding search is accurate.

2

[Navigate to header](https://docs.mem0.ai/core-concepts/memory-operations/search#)

Vector search

Embeddings locate the closest memories using cosine similarity across your scoped dataset.

3

[Navigate to header](https://docs.mem0.ai/core-concepts/memory-operations/search#)

Filtering & reranking

Logical filters narrow candidates; rerankers or thresholds fine-tune ordering.

4

[Navigate to header](https://docs.mem0.ai/core-concepts/memory-operations/search#)

Results delivery

Formatted memories (with metadata and timestamps) return to your agent or calling service.

This pipeline runs the same way for the hosted Platform API and the OSS SDK.

## [​](https://docs.mem0.ai/core-concepts/memory-operations/search\#how-does-it-work)  How does it work?

Search converts your natural language question into a vector embedding, then finds memories with similar embeddings in your database. The results are ranked by similarity score and can be further refined with filters or reranking.

```
# Minimal example that shows the concept in action
# Platform API
client.search("What are Alice's hobbies?", filters={"user_id": "alice"})

# OSS
m.search("What are Alice's hobbies?", filters={"user_id": "alice"})
```

Always provide at least a `user_id` filter to scope searches to the right user’s memories. This prevents cross-contamination between users.

## [​](https://docs.mem0.ai/core-concepts/memory-operations/search\#when-should-you-use-it)  When should you use it?

- **Context retrieval** \- When your agent needs past context to generate better responses
- **Personalization** \- To recall user preferences, history, or past interactions
- **Fact checking** \- To verify information against stored memories before responding
- **Decision support** \- When agents need relevant background information to make decisions

## [​](https://docs.mem0.ai/core-concepts/memory-operations/search\#platform-vs-oss-usage)  Platform vs OSS usage

| Capability | Mem0 Platform | Mem0 OSS |
| --- | --- | --- |
| **Entity IDs on search / get\_all** | Inside `filters={"user_id": "alice"}` | Inside `filters={"user_id": "alice"}` (aligned with Platform in v3 — top-level kwargs raise `ValueError`) |
| **Filter syntax** | Logical operators (`AND`, `OR`, comparisons) with field-level access | Basic field filters, extend via Python hooks |
| **Reranking** | Toggle `rerank=True` with managed reranker catalog | Requires configuring local or third-party rerankers |
| **Thresholds** | Request-level configuration (`threshold`, `top_k`) | Controlled via SDK parameters |
| **Response metadata** | Includes confidence scores, timestamps, dashboard visibility | Determined by your storage backend |

## [​](https://docs.mem0.ai/core-concepts/memory-operations/search\#search-with-mem0-platform)  Search with Mem0 Platform

Python

JavaScript

```
from mem0 import MemoryClient

client = MemoryClient(api_key="your-api-key")

query = "What do you know about me?"
filters = {
   "OR": [\
      {"user_id": "alice"},\
      {"agent_id": {"in": ["travel-assistant", "customer-support"]}}\
   ]
}

results = client.search(query, filters=filters)
```

## [​](https://docs.mem0.ai/core-concepts/memory-operations/search\#search-with-mem0-open-source)  Search with Mem0 Open Source

Python

JavaScript

```
from mem0 import Memory

m = Memory()

# Simple search — entity IDs go in `filters`
related_memories = m.search("Should I drink coffee or tea?", filters={"user_id": "alice"})

# Search with additional metadata filters (combine entity + metadata in the same dict)
memories = m.search(
    "food preferences",
    filters={"user_id": "alice", "categories": {"contains": "diet"}},
)
```

Expect an array of memory documents. Platform responses include vectors, metadata, and timestamps; OSS returns your stored schema.

On Mem0 Platform v3, time-aware queries use Temporal Reasoning internally while preserving the normal search response shape. See [Temporal Reasoning](https://docs.mem0.ai/platform/features/temporal-reasoning).

### [​](https://docs.mem0.ai/core-concepts/memory-operations/search\#explain-oss-search-scores)  Explain OSS search scores

OSS search combines semantic similarity with optional keyword and entity signals. Pass `explain=True` when tuning retrieval quality or debugging why a memory ranked where it did:

Python

JavaScript

```
results = m.search(
    "food preferences",
    filters={"user_id": "alice"},
    explain=True,
)

print(results["results"][0]["score_details"])
```

Each result includes `score_details` with the semantic score, normalized BM25 score, entity boost, raw combined score, maximum possible score, final score, and threshold used for filtering. The field is omitted unless `explain` is enabled, so existing response shapes stay unchanged.

## [​](https://docs.mem0.ai/core-concepts/memory-operations/search\#filter-patterns)  Filter patterns

Filters help narrow down search results. Common use cases:**Filter by Session Context:**_Platform API:_

```
# Get memories from a specific agent session
client.search("query", filters={
    "AND": [\
        {"user_id": "alice"},\
        {"agent_id": "chatbot"},\
        {"run_id": "session-123"}\
    ]
})
```

_OSS:_

```
# Get memories from a specific agent session — entity IDs combined in filters
m.search("query", filters={
    "user_id": "alice",
    "agent_id": "chatbot",
    "run_id": "session-123",
})
```

**Filter by Date Range:**

```
# Platform only - date filtering
client.search("recent memories", filters={
    "AND": [\
        {"user_id": "alice"},\
        {"created_at": {"gte": "2024-07-01"}}\
    ]
})
```

**Filter by Categories:**

```
# Platform only - category filtering
client.search("preferences", filters={
    "AND": [\
        {"user_id": "alice"},\
        {"categories": {"contains": "food"}}\
    ]
})
```

## [​](https://docs.mem0.ai/core-concepts/memory-operations/search\#tips-for-better-search)  Tips for better search

- **Use natural language**: Mem0 understands intent, so describe what you’re looking for naturally
- **Scope with user ID**: Always provide `user_id` to scope search to relevant memories

  - **Platform API**: Use `filters={"user_id": "alice"}`
  - **OSS**: Use `user_id="alice"` as parameter
- **Combine filters**: Use AND/OR logic to create precise queries (Platform)
- **Consider wildcard filters**: Use wildcard filters (e.g., `run_id: "*"`) for broader matches
- **Tune parameters**: Adjust `top_k` for result count, `threshold` for relevance cutoff
- **Enable reranking**: Use `rerank=True` (default) when you have a reranker configured

**MCP Alternative**: With [Mem0 MCP](https://docs.mem0.ai/platform/mem0-mcp), AI agents can search their own memories proactively when needed.

### [​](https://docs.mem0.ai/core-concepts/memory-operations/search\#more-details)  More Details

For the full list of filter logic, comparison operators, and optional search parameters, see the
[Search Memory API Reference](https://docs.mem0.ai/api-reference/memory/search-memories).

## [​](https://docs.mem0.ai/core-concepts/memory-operations/search\#put-it-into-practice)  Put it into practice

- Revisit the [Add Memory](https://docs.mem0.ai/core-concepts/memory-operations/add) guide to ensure you capture the context you expect to retrieve.
- Configure rerankers and filters in [Advanced Retrieval](https://docs.mem0.ai/platform/features/advanced-retrieval) for higher precision.

## [​](https://docs.mem0.ai/core-concepts/memory-operations/search\#see-it-live)  See it live

- [Support Inbox with Mem0](https://docs.mem0.ai/cookbooks/operations/support-inbox) demonstrates scoped search with rerankers.
- [Tavily Search with Mem0](https://docs.mem0.ai/cookbooks/integrations/tavily-search) shows hybrid search in action.

[**Search Memory API**](https://docs.mem0.ai/api-reference/memory/search-memories)

[**Support Inbox Cookbook**](https://docs.mem0.ai/cookbooks/operations/support-inbox)

Was this page helpful?

YesNo

[Suggest edits](https://github.com/mem0ai/mem0/edit/main/docs/core-concepts/memory-operations/search.mdx) [Raise issue](https://github.com/mem0ai/mem0/issues/new?title=Issue%20on%20docs&body=Path:%20/core-concepts/memory-operations/search)

[Add Memory\\
\\
Previous](https://docs.mem0.ai/core-concepts/memory-operations/add) [Update Memory\\
\\
Next](https://docs.mem0.ai/core-concepts/memory-operations/update)

Ctrl+I

[discord](https://mem0.dev/DiD) [x](https://x.com/mem0ai) [github](https://github.com/mem0ai) [linkedin](https://www.linkedin.com/company/mem0)

[Powered byThis documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=mem0)

Assistant

Responses are generated using AI and may contain mistakes.

Suggestions

How does reranking work?How do I search memories?What are filters in search?

[Contact support](mailto:support@mem0.ai)