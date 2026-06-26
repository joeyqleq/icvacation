> ## Documentation Index
>
> Fetch the complete documentation index at: [/llms.txt](https://docs.mem0.ai/llms.txt)
>
> Use this file to discover all available pages before exploring further.

[Skip to main content](https://docs.mem0.ai/api-reference/memory/add-memories#content-area)

[Mem0 home page![light logo](https://mintcdn.com/mem0/jmnLaiutcXgYmrAY/logo/light.svg?fit=max&auto=format&n=jmnLaiutcXgYmrAY&q=85&s=262e6e63930c20446217323d7f850a7a)![dark logo](https://mintcdn.com/mem0/jmnLaiutcXgYmrAY/logo/dark.svg?fit=max&auto=format&n=jmnLaiutcXgYmrAY&q=85&s=90ded1dd02ad45ca33577cc49af4e022)](https://mem0.ai/)

Search...

Ctrl KAsk Assistant

- [Your Dashboard](https://app.mem0.ai/?utm_source=oss&utm_medium=docs-nav)
- [Your Dashboard](https://app.mem0.ai/?utm_source=oss&utm_medium=docs-nav)

Search...

Navigation

Core Memory Operations

Add Memories

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
curl -X POST https://api.mem0.ai/v3/memories/add/ \
  -H "Authorization: Token <api-key>" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [\
      {"role": "user", "content": "I just moved to San Francisco from New York."},\
      {"role": "assistant", "content": "Got it — I\u0027ll update your location."}\
    ],
    "user_id": "alice"
  }'
```

200

```
{
  "message": "Memory processing has been queued for background execution",
  "status": "PENDING",
  "event_id": "2c4d1f44-4f7b-4b2f-9f6e-7b5b4f5a1234"
}
```

Core Memory Operations

# Add Memories

Copy page

Add facts, messages, or metadata to a user memory store with async processing and event tracking via the V3 additive pipeline.

Copy page

POST

/

v3

/

memories

/

add

/

Try it

cURL

cURL

```
curl -X POST https://api.mem0.ai/v3/memories/add/ \
  -H "Authorization: Token <api-key>" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [\
      {"role": "user", "content": "I just moved to San Francisco from New York."},\
      {"role": "assistant", "content": "Got it — I\u0027ll update your location."}\
    ],
    "user_id": "alice"
  }'
```

200

```
{
  "message": "Memory processing has been queued for background execution",
  "status": "PENDING",
  "event_id": "2c4d1f44-4f7b-4b2f-9f6e-7b5b4f5a1234"
}
```

Extract and store memories from a conversation using the V3 additive pipeline. The endpoint uses single-pass ADD-only extraction — one LLM call, no UPDATE/DELETE. Memories accumulate over time; nothing is overwritten.

## [​](https://docs.mem0.ai/api-reference/memory/add-memories\#endpoint)  Endpoint

- **Method**: `POST`
- **URL**: `/v3/memories/add/`
- **Content-Type**: `application/json`

Processing is asynchronous. The response returns an `event_id` you can poll via `GET /v1/event/{event_id}/`.

## [​](https://docs.mem0.ai/api-reference/memory/add-memories\#required-headers)  Required headers

| Header | Required | Description |
| --- | --- | --- |
| `Authorization: Token <MEM0_API_KEY>` | Yes | API key scoped to your workspace. |
| `Accept: application/json` | Yes | Ensures a JSON response. |

## [​](https://docs.mem0.ai/api-reference/memory/add-memories\#request-body)  Request body

Provide conversation messages for Mem0 to extract memories from. At least one entity ID (`user_id`, `agent_id`, `app_id`, or `run_id`) is required so the memory is scoped to a session. Entity IDs are accepted at the top level.

Basic request

```
{
  "user_id": "alice",
  "messages": [\
    { "role": "user", "content": "I moved to Austin last month." }\
  ],
  "metadata": {
    "source": "onboarding_form"
  }
}
```

### [​](https://docs.mem0.ai/api-reference/memory/add-memories\#common-fields)  Common fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `messages` | array | Yes | Conversation turns for Mem0 to extract memories from. Each object should include `role` and `content`. |
| `user_id` | string | No\* | Associates the memory with a user. |
| `agent_id` | string | No\* | Associates the memory with an agent. |
| `run_id` | string | No\* | Associates the memory with a run. |
| `app_id` | string | No\* | Associates the memory with an app. |
| `metadata` | object | Optional | Custom key/value metadata (e.g., `{"topic": "preferences"}`). |
| `infer` | boolean (default `true`) | Optional | Set to `false` to skip inference and store the provided text as-is. |

> \\* At least one entity ID (`user_id`, `agent_id`, `app_id`, or `run_id`) is required.

Need more details? See [all request parameters](https://docs.mem0.ai/api-reference/memory/add-memories#body-messages) below for complete field descriptions, types, and constraints.

## [​](https://docs.mem0.ai/api-reference/memory/add-memories\#response)  Response

The request is queued for background processing. The response contains an `event_id` for tracking status.

200 response

400 response

```
{
  "message": "Memory processing has been queued for background execution",
  "status": "PENDING",
  "event_id": "evt-uuid"
}
```

Poll the event status via `GET /v1/event/{event_id}/`. Status will be `SUCCEEDED` or `FAILED` once processing completes.

#### Body

application/json

[​](https://docs.mem0.ai/api-reference/memory/add-memories#body-messages)

messages

object\[\]

required

Conversation messages to extract memories from.

Showchild attributes

[​](https://docs.mem0.ai/api-reference/memory/add-memories#body-user-id)

user\_id

string

Scope memories to this user.

[​](https://docs.mem0.ai/api-reference/memory/add-memories#body-agent-id)

agent\_id

string

Scope memories to this agent.

[​](https://docs.mem0.ai/api-reference/memory/add-memories#body-run-id)

run\_id

string

Scope memories to this session / run.

[​](https://docs.mem0.ai/api-reference/memory/add-memories#body-metadata)

metadata

object

User-supplied metadata to attach to each extracted memory.

[​](https://docs.mem0.ai/api-reference/memory/add-memories#body-custom-instructions)

custom\_instructions

string

Project-level instructions that guide extraction for this call.

[​](https://docs.mem0.ai/api-reference/memory/add-memories#body-infer)

infer

boolean

default:true

When `false`, stores each message verbatim without running the extraction LLM.

#### Response

200

application/json

Memory addition queued; returns an event identifier clients can poll via `GET /v1/event/{event_id}/`.

[​](https://docs.mem0.ai/api-reference/memory/add-memories#response-message)

message

string

[​](https://docs.mem0.ai/api-reference/memory/add-memories#response-status)

status

enum<string>

Available options:

`PENDING`,

`SUCCEEDED`,

`FAILED`

[​](https://docs.mem0.ai/api-reference/memory/add-memories#response-event-id)

event\_id

string<uuid>

Was this page helpful?

YesNo

[Suggest edits](https://github.com/mem0ai/mem0/edit/main/docs/api-reference/memory/add-memories.mdx) [Raise issue](https://github.com/mem0ai/mem0/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/memory/add-memories)

[Organizations & Projects\\
\\
Previous](https://docs.mem0.ai/api-reference/organizations-projects) [Get Memories\\
\\
Next](https://docs.mem0.ai/api-reference/memory/get-memories)

Ctrl+I

[discord](https://mem0.dev/DiD) [x](https://x.com/mem0ai) [github](https://github.com/mem0ai) [linkedin](https://www.linkedin.com/company/mem0)

[Powered byThis documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=mem0)

Assistant

Responses are generated using AI and may contain mistakes.

Suggestions

How do I track async processing?What headers are required?How do I add memories to a user?

[Contact support](mailto:support@mem0.ai)

![](https://downloads.intercomcdn.com/i/o/jjv2r0tt/659404/9e903493dd0a115e31b620e84189/9a987d2bf694d15c37d85f66f2be4813.png)