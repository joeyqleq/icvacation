> ## Documentation Index
>
> Fetch the complete documentation index at: [/llms.txt](https://docs.mem0.ai/llms.txt)
>
> Use this file to discover all available pages before exploring further.

[Skip to main content](https://docs.mem0.ai/platform/features/entity-scoped-memory#content-area)

[Mem0 home page![light logo](https://mintcdn.com/mem0/jmnLaiutcXgYmrAY/logo/light.svg?fit=max&auto=format&n=jmnLaiutcXgYmrAY&q=85&s=262e6e63930c20446217323d7f850a7a)![dark logo](https://mintcdn.com/mem0/jmnLaiutcXgYmrAY/logo/dark.svg?fit=max&auto=format&n=jmnLaiutcXgYmrAY&q=85&s=90ded1dd02ad45ca33577cc49af4e022)](https://mem0.ai/)

Search...

Ctrl KAsk Assistant

- [Your Dashboard](https://app.mem0.ai/?utm_source=oss&utm_medium=docs-nav)
- [Your Dashboard](https://app.mem0.ai/?utm_source=oss&utm_medium=docs-nav)

Search...

Navigation

Essential Features

Entity-Scoped Memory

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



  - [Memory Filters](https://docs.mem0.ai/platform/features/v2-memory-filters)
  - [Entity-Scoped Memory](https://docs.mem0.ai/platform/features/entity-scoped-memory)
  - [Graph Memory](https://docs.mem0.ai/platform/features/graph-memory)
  - [Async Client](https://docs.mem0.ai/platform/features/async-client)
  - [Multimodal Support](https://docs.mem0.ai/platform/features/multimodal-support)
  - [Custom Categories](https://docs.mem0.ai/platform/features/custom-categories)
  - [Temporal Reasoning](https://docs.mem0.ai/platform/features/temporal-reasoning)
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

- [Configure access](https://docs.mem0.ai/platform/features/entity-scoped-memory#configure-access)
- [Feature anatomy](https://docs.mem0.ai/platform/features/entity-scoped-memory#feature-anatomy)
- [Choose the right identifier](https://docs.mem0.ai/platform/features/entity-scoped-memory#choose-the-right-identifier)
- [Configure it](https://docs.mem0.ai/platform/features/entity-scoped-memory#configure-it)
- [See it in action](https://docs.mem0.ai/platform/features/entity-scoped-memory#see-it-in-action)
- [Verify the feature is working](https://docs.mem0.ai/platform/features/entity-scoped-memory#verify-the-feature-is-working)
- [Best practices](https://docs.mem0.ai/platform/features/entity-scoped-memory#best-practices)

Essential Features

# Entity-Scoped Memory

Copy page

Scope conversations by user, agent, app, and session so memories land exactly where they belong.

Copy page

Mem0’s Platform API lets you separate memories for different users, agents, and apps. By tagging each write and query with the right identifiers, you can prevent data from mixing between them, maintain clear audit trails, and control data retention.

**Entity IDs vs. graph entities.** This page covers the `user_id` / `agent_id` / `app_id` / `run_id` identifiers used to _scope_ memories. These are different from the **graph entities** (the people, places, and concepts surfaced in [Graph Memory](https://docs.mem0.ai/platform/features/graph-memory)).

Want the long-form tutorial? The [Partition Memories by Entity](https://docs.mem0.ai/cookbooks/essentials/entity-partitioning-playbook) cookbook walks through multi-agent storage, debugging, and cleanup step by step.

**You’ll use this when…**

- You run assistants for multiple customers who each need private memory spaces
- Different agents (like a planner and a critic) need separate context for the same user
- Sessions should expire on their own schedule, making debugging and data removal more precise

## [​](https://docs.mem0.ai/platform/features/entity-scoped-memory\#configure-access)  Configure access

```
from mem0 import MemoryClient

client = MemoryClient(api_key="m0-...")
```

Call `client.project.get()` to verify your connection. It should return your project details including `org_id` and `project_id`. If you get a 401 error, generate a new API key in the Mem0 dashboard.

## [​](https://docs.mem0.ai/platform/features/entity-scoped-memory\#feature-anatomy)  Feature anatomy

| Dimension | Field | When to use it | Example value |
| --- | --- | --- | --- |
| User | `user_id` | Persistent persona or account | `"customer_6412"` |
| Agent | `agent_id` | Distinct agent persona or tool | `"meal_planner"` |
| Application | `app_id` | White-label app or product surface | `"ios_retail_demo"` |
| Session | `run_id` | Short-lived flow, ticket, or conversation thread | `"ticket-9241"` |

- **Writes** (`client.add`) accept any combination of these fields. Absent fields default to `null`.
- **Reads** (`client.search`, `client.get_all`, exports, deletes) accept the same identifiers inside the `filters` JSON object.
- **Implicit null scoping**: Passing only `{"user_id": "alice"}` automatically restricts results to records where `agent_id`, `app_id`, and `run_id` are `null`. Add wildcards (`"*"`), explicit lists, or additional filters when you need broader joins.

**Common Pitfall**: If you create a memory with `user_id="alice"` but the other fields default to `null`, then search with `{"AND": [{"user_id": "alice"}, {"agent_id": "bot"}]}` will return nothing because you’re looking for a memory where `agent_id="bot"`, not `null`.

## [​](https://docs.mem0.ai/platform/features/entity-scoped-memory\#choose-the-right-identifier)  Choose the right identifier

| Identifier | Purpose | Example Use Cases |
| --- | --- | --- |
| `user_id` | Store preferences, profile details, and historical actions that follow a person everywhere | Dietary restrictions, seat preferences, meeting habits |
| `agent_id` | Keep an agent’s personality, operating modes, or brand voice in one place | Travel agent vs concierge vs customer support personas |
| `app_id` | Tag every write from a partner app or deployment for tenant separation | White-label deployments, partner integrations |
| `run_id` | Isolate temporary flows that should reset or expire independently | Support tickets, chat sessions, experiments |

For more detailed examples, see the Partition Memories by Entity cookbook.

## [​](https://docs.mem0.ai/platform/features/entity-scoped-memory\#configure-it)  Configure it

The example below adds memories with entity tags:

```
messages = [\
    {"role": "user", "content": "I teach ninth-grade algebra."},\
    {"role": "assistant", "content": "I'll tailor study plans to algebra topics."}\
]

client.add(
    messages,
    user_id="teacher_872",
    agent_id="study_planner",
    app_id="district_dashboard",
    run_id="prep-period-2025-09-02"
)
```

The response will include one or more memory IDs. Check the dashboard → Memories to confirm the entry appears under the correct user, agent, app, and run.

Platform writes that include both `user_id` and `agent_id` (or other combinations) are persisted as separate records per entity so we can enforce privacy boundaries. Each record carries exactly one primary entity, which is why `{"AND": [{"user_id": ...}, {"agent_id": ...}]}` never returns results. Plan searches per entity scope or combine scopes with `OR`.

The HTTP equivalent uses `POST /v1/memories/` with the same identifiers in the JSON body. See the Add Memories API reference for REST details.

## [​](https://docs.mem0.ai/platform/features/entity-scoped-memory\#see-it-in-action)  See it in action

**1\. Store scoped memories**

```
traveler_messages = [\
    {"role": "user", "content": "I prefer boutique hotels and avoid shellfish."},\
    {"role": "assistant", "content": "Logged your travel preferences for future itineraries."}\
]

client.add(
    traveler_messages,
    user_id="customer_6412",
    agent_id="travel_planner",
    app_id="concierge_portal",
    run_id="itinerary-2025-apr",
    metadata={"category": "preferences"}
)
```

**2\. Retrieve by user scope**

```
user_scope = {
    "AND": [\
        {"user_id": "customer_6412"},\
        {"app_id": "concierge_portal"},\
        {"run_id": "itinerary-2025-apr"}\
    ]
}

user_results = client.search("Any dietary flags?", filters=user_scope)
print(user_results)
```

**3\. Retrieve by agent scope**

```
agent_scope = {
    "AND": [\
        {"agent_id": "travel_planner"},\
        {"app_id": "concierge_portal"}\
    ]
}

agent_results = client.search("Any dietary flags?", filters=agent_scope)
print(agent_results)
```

Writes can include multiple identifiers, but searches resolve one entity space at a time. Query user scope _or_ agent scope in a given call—combining both returns an empty list today.

Want to experiment with AND/OR logic, nested operators, or wildcards? The [Memory Filters v2 guide](https://docs.mem0.ai/platform/features/v2-memory-filters) walks through every filter pattern with working examples.

**4\. Audit everything for an app**

```
app_scope = {
    "AND": [\
        {"app_id": "concierge_portal"}\
    ],
    "OR": [\
        {"user_id": "*"},\
        {"agent_id": "*"}\
    ]
}

page = client.get_all(filters=app_scope, page=1, page_size=20)
```

Wildcards (`"*"`) include only non-null values. Use them when you want “any agent” or “any user” without limiting results to null-only records.

**5\. Clean up a session**

```
client.delete_all(
    user_id="customer_6412",
    run_id="itinerary-2025-apr"
)
```

A successful delete returns `{"message": "Memories deleted successfully!"}`. Run the previous `get_all` call again to confirm the session memories were removed.

## [​](https://docs.mem0.ai/platform/features/entity-scoped-memory\#verify-the-feature-is-working)  Verify the feature is working

- Run `client.search` with your filters and confirm only expected memories appear. Mismatched identifiers usually mean a typo in your scoping.
- Check the Mem0 dashboard filter pills. User, agent, app, and run should all show populated values for your memory entry.
- Call `client.delete_all` with a unique `run_id` and confirm other sessions remain intact (the count in `get_all` should only drop for that run).

## [​](https://docs.mem0.ai/platform/features/entity-scoped-memory\#best-practices)  Best practices

- Use consistent identifier formats (like `team-alpha` or `app-ios-retail`) so you can query or delete entire groups later
- When debugging, print your filters before each call to verify wildcards (`"*"`), lists, and run IDs are spelled correctly
- Combine entity filters with metadata filters (categories, created\_at) for precise exports or audits
- Use `run_id` for temporary sessions like support tickets or experiments, then schedule cleanup jobs to delete them

For a complete walkthrough, see the Partition Memories by Entity cookbook.

[**Master Memory Filters**](https://docs.mem0.ai/platform/features/v2-memory-filters)

[**Partition Memories in Practice**](https://docs.mem0.ai/cookbooks/essentials/entity-partitioning-playbook)

Was this page helpful?

YesNo

[Suggest edits](https://github.com/mem0ai/mem0/edit/main/docs/platform/features/entity-scoped-memory.mdx) [Raise issue](https://github.com/mem0ai/mem0/issues/new?title=Issue%20on%20docs&body=Path:%20/platform/features/entity-scoped-memory)

[Memory Filters\\
\\
Previous](https://docs.mem0.ai/platform/features/v2-memory-filters) [Graph Memory\\
\\
Next](https://docs.mem0.ai/platform/features/graph-memory)

Ctrl+I

[discord](https://mem0.dev/DiD) [x](https://x.com/mem0ai) [github](https://github.com/mem0ai) [linkedin](https://www.linkedin.com/company/mem0)

[Powered byThis documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=mem0)

Assistant

Responses are generated using AI and may contain mistakes.

Suggestions

How do I scope memories by user?When should I use run\_id for sessions?

[Contact support](mailto:support@mem0.ai)