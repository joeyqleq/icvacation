> ## Documentation Index
>
> Fetch the complete documentation index at: [/llms.txt](https://docs.mem0.ai/llms.txt)
>
> Use this file to discover all available pages before exploring further.

[Skip to main content](https://docs.mem0.ai/api-reference/memory/get-memories#content-area)

[Mem0 home page![light logo](https://mintcdn.com/mem0/jmnLaiutcXgYmrAY/logo/light.svg?fit=max&auto=format&n=jmnLaiutcXgYmrAY&q=85&s=262e6e63930c20446217323d7f850a7a)![dark logo](https://mintcdn.com/mem0/jmnLaiutcXgYmrAY/logo/dark.svg?fit=max&auto=format&n=jmnLaiutcXgYmrAY&q=85&s=90ded1dd02ad45ca33577cc49af4e022)](https://mem0.ai/)

Search...

Ctrl KAsk Assistant

- [Your Dashboard](https://app.mem0.ai/?utm_source=oss&utm_medium=docs-nav)
- [Your Dashboard](https://app.mem0.ai/?utm_source=oss&utm_medium=docs-nav)

Search...

Navigation

Core Memory Operations

Get Memories

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
curl -X POST 'https://api.mem0.ai/v3/memories/?page=1&page_size=50' \
  -H "Authorization: Token <api-key>" \
  -H "Content-Type: application/json" \
  -d '{"filters": {"user_id": "alice"}}'
```

200

```
{
  "count": 123,
  "next": "https://api.mem0.ai/v3/memories/?page=2&page_size=100",
  "previous": null,
  "results": [\
    {\
      "id": "mem-uuid",\
      "memory": "User moved to San Francisco from New York in January 2026",\
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

# Get Memories

Copy page

Retrieve memories with paginated results and advanced filtering using logical operators like AND, OR, NOT, and comparison queries.

Copy page

POST

/

v3

/

memories

/

Try it

cURL

cURL

```
curl -X POST 'https://api.mem0.ai/v3/memories/?page=1&page_size=50' \
  -H "Authorization: Token <api-key>" \
  -H "Content-Type: application/json" \
  -d '{"filters": {"user_id": "alice"}}'
```

200

```
{
  "count": 123,
  "next": "https://api.mem0.ai/v3/memories/?page=2&page_size=100",
  "previous": null,
  "results": [\
    {\
      "id": "mem-uuid",\
      "memory": "User moved to San Francisco from New York in January 2026",\
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

List memories scoped by filters with paginated results. Entity IDs (`user_id`, `agent_id`, `app_id`, `run_id`) **must** be passed inside the `filters` object — top-level entity IDs are rejected with 400.The `filters` object supports complex logical operations (AND, OR, NOT) and comparison operators:

- `in`: Matches any of the values specified
- `gte`: Greater than or equal to
- `lte`: Less than or equal to
- `gt`: Greater than
- `lt`: Less than
- `ne`: Not equal to
- `icontains`: Case-insensitive containment check
- `*`: Wildcard character that matches everything

Pass `page` and `page_size` as query parameters to paginate through results.

Code

Output

```
memories = client.get_all(
    filters={
        "AND": [\
            {\
                "user_id": "alex"\
            },\
            {\
                "created_at": {"gte": "2024-07-01", "lte": "2024-07-31"}\
            }\
        ]
    },
    page=1,
    page_size=50
)
```

The response is a paginated envelope with `count`, `next`, `previous`, and `results`. Use `page` and `page_size` query params to step through results.

#### Query Parameters

[​](https://docs.mem0.ai/api-reference/memory/get-memories#parameter-page)

page

integer

default:1

1-indexed page number.

Required range: `x >= 1`

[​](https://docs.mem0.ai/api-reference/memory/get-memories#parameter-page-size)

page\_size

integer

default:100

Results per page.

Required range: `1 <= x <= 200`

#### Body

application/json

[​](https://docs.mem0.ai/api-reference/memory/get-memories#body-filters)

filters

object

required

Entity and metadata filters. Must include at least one entity ID (`user_id`, `agent_id`, `app_id`, or `run_id`).

#### Response

200

application/json

Paginated envelope of memories.

[​](https://docs.mem0.ai/api-reference/memory/get-memories#response-count)

count

integer

required

Total number of memories matching the filters.

[​](https://docs.mem0.ai/api-reference/memory/get-memories#response-next-one-of-0)

next

string<uri> \| null

required

URL for the next page, or `null` if this is the last page.

[​](https://docs.mem0.ai/api-reference/memory/get-memories#response-previous-one-of-0)

previous

string<uri> \| null

required

URL for the previous page, or `null` if this is the first page.

[​](https://docs.mem0.ai/api-reference/memory/get-memories#response-results)

results

object\[\]

required

Showchild attributes

Was this page helpful?

YesNo

[Suggest edits](https://github.com/mem0ai/mem0/edit/main/docs/api-reference/memory/get-memories.mdx) [Raise issue](https://github.com/mem0ai/mem0/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/memory/get-memories)

[Add Memories\\
\\
Previous](https://docs.mem0.ai/api-reference/memory/add-memories) [Search Memories\\
\\
Next](https://docs.mem0.ai/api-reference/memory/search-memories)

Ctrl+I

[discord](https://mem0.dev/DiD) [x](https://x.com/mem0ai) [github](https://github.com/mem0ai) [linkedin](https://www.linkedin.com/company/mem0)

[Powered byThis documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=mem0)

Assistant

Responses are generated using AI and may contain mistakes.

Suggestions

How do I paginate results?What comparison operators work?How do I filter memories?

[Contact support](mailto:support@mem0.ai)