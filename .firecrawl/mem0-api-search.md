> ## Documentation Index
>
> Fetch the complete documentation index at: [/llms.txt](https://docs.mem0.ai/llms.txt)
>
> Use this file to discover all available pages before exploring further.

[Skip to main content](https://docs.mem0.ai/api-reference/memory/search-memories#content-area)

[Mem0 home page![light logo](https://mintcdn.com/mem0/jmnLaiutcXgYmrAY/logo/light.svg?fit=max&auto=format&n=jmnLaiutcXgYmrAY&q=85&s=262e6e63930c20446217323d7f850a7a)![dark logo](https://mintcdn.com/mem0/jmnLaiutcXgYmrAY/logo/dark.svg?fit=max&auto=format&n=jmnLaiutcXgYmrAY&q=85&s=90ded1dd02ad45ca33577cc49af4e022)](https://mem0.ai/)

Search...

Ctrl KAsk Assistant

- [Your Dashboard](https://app.mem0.ai/?utm_source=oss&utm_medium=docs-nav)
- [Your Dashboard](https://app.mem0.ai/?utm_source=oss&utm_medium=docs-nav)

Search...

Navigation

Core Memory Operations

Search Memories

[Welcome](https://docs.mem0.ai/introduction) [Mem0 Platform](https://docs.mem0.ai/platform/overview) [OpenClaw](https://docs.mem0.ai/integrations/openclaw) [Open Source](https://docs.mem0.ai/open-source/overview) [Cookbooks](https://docs.mem0.ai/cookbooks/overview) [Integrations](https://docs.mem0.ai/integrations) [Agent Plugins](https://docs.mem0.ai/integrations/claude-code) [API Reference](https://docs.mem0.ai/api-reference) [Release Notes](https://docs.mem0.ai/changelog/highlights)

- [Documentation](https://docs.mem0.ai/introduction)

### Getting Started

- [Overview](https://docs.mem0.ai/api-reference)
- [Organizations & Projects](https://docs.mem0.ai/api-reference/organizations-projects)

### Core Memory Operations

- [POST\\
\\
Add Memories](https://docs.mem0.ai/api-reference/memory/add-memories)
- [POST\\
\\
Get Memories](https://docs.mem0.ai/api-reference/memory/get-memories)
- [POST\\
\\
Search Memories](https://docs.mem0.ai/api-reference/memory/search-memories)
- [PUT\\
\\
Update Memory](https://docs.mem0.ai/api-reference/memory/update-memory)
- [DEL\\
\\
Delete Memory](https://docs.mem0.ai/api-reference/memory/delete-memory)

### Memory APIs

- [POST\\
\\
Create Memory Export](https://docs.mem0.ai/api-reference/memory/create-memory-export)
- [POST\\
\\
Feedback](https://docs.mem0.ai/api-reference/memory/feedback)
- [GET\\
\\
Get Memory](https://docs.mem0.ai/api-reference/memory/get-memory)
- [GET\\
\\
Memory History](https://docs.mem0.ai/api-reference/memory/history-memory)
- [POST\\
\\
Get Memory Export](https://docs.mem0.ai/api-reference/memory/get-memory-export)
- [PUT\\
\\
Batch Update Memories](https://docs.mem0.ai/api-reference/memory/batch-update)
- [DEL\\
\\
Batch Delete Memories](https://docs.mem0.ai/api-reference/memory/batch-delete)
- [DEL\\
\\
Delete Memories](https://docs.mem0.ai/api-reference/memory/delete-memories)

### Events APIs

- [GET\\
\\
Get Events](https://docs.mem0.ai/api-reference/events/get-events)
- [GET\\
\\
Get Event](https://docs.mem0.ai/api-reference/events/get-event)

### Entities APIs

- [GET\\
\\
Get Users](https://docs.mem0.ai/api-reference/entities/get-users)
- [DEL\\
\\
Delete User](https://docs.mem0.ai/api-reference/entities/delete-user)

### Organizations APIs

- [POST\\
\\
Create Organization](https://docs.mem0.ai/api-reference/organization/create-org)
- [GET\\
\\
Get Organizations](https://docs.mem0.ai/api-reference/organization/get-orgs)
- [GET\\
\\
Get Organization](https://docs.mem0.ai/api-reference/organization/get-org)
- [GET\\
\\
Get Members](https://docs.mem0.ai/api-reference/organization/get-org-members)
- [POST\\
\\
Add Member](https://docs.mem0.ai/api-reference/organization/add-org-member)
- [DEL\\
\\
Delete Organization](https://docs.mem0.ai/api-reference/organization/delete-org)

### Project APIs

- [POST\\
\\
Create Project](https://docs.mem0.ai/api-reference/project/create-project)
- [GET\\
\\
Get Projects](https://docs.mem0.ai/api-reference/project/get-projects)
- [GET\\
\\
Get Project](https://docs.mem0.ai/api-reference/project/get-project)
- [GET\\
\\
Get Members](https://docs.mem0.ai/api-reference/project/get-project-members)
- [POST\\
\\
Add Member](https://docs.mem0.ai/api-reference/project/add-project-member)
- [DEL\\
\\
Delete Project](https://docs.mem0.ai/api-reference/project/delete-project)

### Webhook APIs

- [POST\\
\\
Create Webhook](https://docs.mem0.ai/api-reference/webhook/create-webhook)
- [GET\\
\\
Get Webhook](https://docs.mem0.ai/api-reference/webhook/get-webhook)
- [PUT\\
\\
Update Webhook](https://docs.mem0.ai/api-reference/webhook/update-webhook)
- [DEL\\
\\
Delete Webhook](https://docs.mem0.ai/api-reference/webhook/delete-webhook)

cURL

cURL

```
curl -X POST https://api.mem0.ai/v3/memories/search/ \
  -H "Authorization: Token <api-key>" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "where does the user live?",
    "filters": {"user_id": "alice"},
    "top_k": 10
  }'
```

200

```
{
  "results": [\
    {\
      "id": "mem-uuid",\
      "memory": "User moved to San Francisco from New York in January 2026",\
      "score": 0.82,\
      "metadata": {},\
      "categories": [\
        "location"\
      ],\
      "created_at": "2026-01-15T10:30:00Z",\
      "updated_at": "2026-01-15T10:30:00Z"\
    }\
  ]
}
```

Core Memory Operations

# Search Memories

Copy page

Search memories with hybrid retrieval (semantic + BM25 + entity matching) and advanced filtering using logical and comparison operators.

Copy page

POST

/

v3

/

memories

/

search

/

Try it

cURL

cURL

```
curl -X POST https://api.mem0.ai/v3/memories/search/ \
  -H "Authorization: Token <api-key>" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "where does the user live?",
    "filters": {"user_id": "alice"},
    "top_k": 10
  }'
```

200

```
{
  "results": [\
    {\
      "id": "mem-uuid",\
      "memory": "User moved to San Francisco from New York in January 2026",\
      "score": 0.82,\
      "metadata": {},\
      "categories": [\
        "location"\
      ],\
      "created_at": "2026-01-15T10:30:00Z",\
      "updated_at": "2026-01-15T10:30:00Z"\
    }\
  ]
}
```

Relevance-ranked hybrid search across stored memories. V3 uses multi-signal retrieval — semantic, BM25 keyword, and entity matching scored in parallel and fused. The returned `score` is a combined `[0, 1]` value.Entity IDs (`user_id`, `agent_id`, `app_id`, `run_id`) **must** be passed inside the `filters` object — top-level entity IDs are rejected with 400. At least one entity ID is required.The `filters` object supports complex logical operations (AND, OR, NOT) and comparison operators:

- `in`: Matches any of the values specified
- `gte`: Greater than or equal to
- `lte`: Less than or equal to
- `gt`: Greater than
- `lt`: Less than
- `ne`: Not equal to
- `icontains`: Case-insensitive containment check
- `*`: Wildcard character that matches everything

### [​](https://docs.mem0.ai/api-reference/memory/search-memories\#search-parameter-defaults)  Search parameter defaults

| Parameter | V1/V2 | V3 |
| --- | --- | --- |
| `top_k` | Supported (default 10) | Supported (1-1000, default 10) |
| `threshold` | No default | Default `0.1` (pass `0.0` to disable) |
| `rerank` | Default `true` | Default `false` (pass `true` to enable) |

Platform API Example

Output

```
related_memories = client.search(
    query="What are Alice's hobbies?",
    filters={
        "OR": [\
            {\
              "user_id": "alice"\
            },\
            {\
              "agent_id": {"in": ["travel-agent", "sports-agent"]}\
            }\
        ]
    },
)
```

Wildcard Example

```
# Using wildcard to match all run_ids for a specific user
all_memories = client.search(
    query="What are Alice's hobbies?",
    filters={
        "AND": [\
            {\
                "user_id": "alice"\
            },\
            {\
                "run_id": "*"\
            }\
        ]
    },
)
```

Categories Filter Examples

```
# Example 1: Using 'contains' for partial matching
finance_memories = client.search(
    query="What are my financial goals?",
    filters={
        "AND": [\
            { "user_id": "alice" },\
            {\
                "categories": {\
                    "contains": "finance"\
                }\
            }\
        ]
    },
)

# Example 2: Using 'in' for exact matching
personal_memories = client.search(
    query="What personal information do you have?",
    filters={
        "AND": [\
            { "user_id": "alice" },\
            {\
                "categories": {\
                    "in": ["personal_information"]\
                }\
            }\
        ]
    },
)
```

#### Body

application/json

[​](https://docs.mem0.ai/api-reference/memory/search-memories#body-query)

query

string

required

Natural-language search query.

Minimum string length: `1`

[​](https://docs.mem0.ai/api-reference/memory/search-memories#body-filters)

filters

object

required

Entity and metadata filters. Must include at least one entity ID (`user_id`, `agent_id`, `app_id`, or `run_id`). Supports `AND`, `OR`, `NOT`, and comparison operators (`in`, `gte`, `lte`, `gt`, `lt`, `contains`, `icontains`, `ne`).

[​](https://docs.mem0.ai/api-reference/memory/search-memories#body-top-k)

top\_k

integer

default:10

Number of results to return.

Required range: `1 <= x <= 1000`

[​](https://docs.mem0.ai/api-reference/memory/search-memories#body-threshold)

threshold

number

default:0.1

Minimum semantic relevance score. Pass `0.0` to disable filtering.

Required range: `0 <= x <= 1`

[​](https://docs.mem0.ai/api-reference/memory/search-memories#body-rerank)

rerank

boolean

default:false

Apply the managed reranker for better ordering (adds latency).

[​](https://docs.mem0.ai/api-reference/memory/search-memories#body-reference-date-one-of-0)

reference\_date

integernumberstringintegernumberstring

Optional query anchor time for relative temporal interpretation. Accepts Unix epoch, YYYY-MM-DD, or ISO datetime.

#### Response

200

application/json

Ranked search results.

[​](https://docs.mem0.ai/api-reference/memory/search-memories#response-results)

results

object\[\]

required

Showchild attributes

Was this page helpful?

YesNo

[Suggest edits](https://github.com/mem0ai/mem0/edit/main/docs/api-reference/memory/search-memories.mdx) [Raise issue](https://github.com/mem0ai/mem0/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/memory/search-memories)

[Get Memories\\
\\
Previous](https://docs.mem0.ai/api-reference/memory/get-memories) [Update Memory\\
\\
Next](https://docs.mem0.ai/api-reference/memory/update-memory)

Ctrl+I

[discord](https://mem0.dev/DiD) [x](https://x.com/mem0ai) [github](https://github.com/mem0ai) [linkedin](https://www.linkedin.com/company/mem0)

[Powered byThis documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=mem0)

Assistant

Responses are generated using AI and may contain mistakes.

Suggestions

How do I use entity IDs?What filters are supported?How does hybrid search work?

[Contact support](mailto:support@mem0.ai)

![](https://downloads.intercomcdn.com/i/o/jjv2r0tt/659404/9e903493dd0a115e31b620e84189/9a987d2bf694d15c37d85f66f2be4813.png)