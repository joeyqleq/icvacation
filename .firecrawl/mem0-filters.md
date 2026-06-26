> ## Documentation Index
>
> Fetch the complete documentation index at: [/llms.txt](https://docs.mem0.ai/llms.txt)
>
> Use this file to discover all available pages before exploring further.

[Skip to main content](https://docs.mem0.ai/platform/features/v2-memory-filters#content-area)

[Mem0 home page![light logo](https://mintcdn.com/mem0/jmnLaiutcXgYmrAY/logo/light.svg?fit=max&auto=format&n=jmnLaiutcXgYmrAY&q=85&s=262e6e63930c20446217323d7f850a7a)![dark logo](https://mintcdn.com/mem0/jmnLaiutcXgYmrAY/logo/dark.svg?fit=max&auto=format&n=jmnLaiutcXgYmrAY&q=85&s=90ded1dd02ad45ca33577cc49af4e022)](https://mem0.ai/)

Search...

Ctrl KAsk Assistant

- [Your Dashboard](https://app.mem0.ai/?utm_source=oss&utm_medium=docs-nav)
- [Your Dashboard](https://app.mem0.ai/?utm_source=oss&utm_medium=docs-nav)

Search...

Navigation

Essential Features

Memory Filters

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

- [When to use filters](https://docs.mem0.ai/platform/features/v2-memory-filters#when-to-use-filters)
- [Filter structure](https://docs.mem0.ai/platform/features/v2-memory-filters#filter-structure)
- [Available fields and operators](https://docs.mem0.ai/platform/features/v2-memory-filters#available-fields-and-operators)
  - [Entity fields](https://docs.mem0.ai/platform/features/v2-memory-filters#entity-fields)
  - [Time fields](https://docs.mem0.ai/platform/features/v2-memory-filters#time-fields)
  - [Content fields](https://docs.mem0.ai/platform/features/v2-memory-filters#content-fields)
  - [Special fields](https://docs.mem0.ai/platform/features/v2-memory-filters#special-fields)
- [Common filter patterns](https://docs.mem0.ai/platform/features/v2-memory-filters#common-filter-patterns)
  - [Content search](https://docs.mem0.ai/platform/features/v2-memory-filters#content-search)
  - [Time-based filtering](https://docs.mem0.ai/platform/features/v2-memory-filters#time-based-filtering)
  - [Multiple criteria](https://docs.mem0.ai/platform/features/v2-memory-filters#multiple-criteria)
- [Advanced examples](https://docs.mem0.ai/platform/features/v2-memory-filters#advanced-examples)
- [Best practices](https://docs.mem0.ai/platform/features/v2-memory-filters#best-practices)
- [Troubleshooting](https://docs.mem0.ai/platform/features/v2-memory-filters#troubleshooting)
- [FAQ](https://docs.mem0.ai/platform/features/v2-memory-filters#faq)
- [Known limitations](https://docs.mem0.ai/platform/features/v2-memory-filters#known-limitations)

Essential Features

# Memory Filters

Copy page

Query and retrieve memories with powerful filtering capabilities. Filter by users, agents, content, time ranges, and more.

Copy page

> Memory filters provide a flexible way to query and retrieve specific memories from your memory store. You can filter by users, agents, content categories, time ranges, and combine multiple conditions using logical operators.

## [​](https://docs.mem0.ai/platform/features/v2-memory-filters\#when-to-use-filters)  When to use filters

When working with large-scale memory stores, you need precise control over which memories to retrieve. Filters help you:

- **Isolate user data**: Retrieve memories for specific users while maintaining privacy
- **Debug and audit**: Export specific memory subsets for analysis
- **Target content**: Find memories with specific categories or metadata
- **Time-based queries**: Retrieve memories within specific date ranges
- **Performance optimization**: Reduce query complexity by pre-filtering

## [​](https://docs.mem0.ai/platform/features/v2-memory-filters\#filter-structure)  Filter structure

Filters use a nested JSON structure with logical operators at the root:

```
# Basic structure
{
    "AND": [  # or "OR", "NOT"\
        { "field": "value" },\
        { "field": { "operator": "value" } }\
    ]
}
```

## [​](https://docs.mem0.ai/platform/features/v2-memory-filters\#available-fields-and-operators)  Available fields and operators

### [​](https://docs.mem0.ai/platform/features/v2-memory-filters\#entity-fields)  Entity fields

| Field | Operators | Example |
| --- | --- | --- |
| `user_id` | `eq`, `ne`, `in`, `*` | `{"user_id": "user_123"}` |
| `agent_id` | `eq`, `ne`, `in`, `*` | `{"agent_id": "*"}` |
| `app_id` | `eq`, `ne`, `in`, `*` | `{"app_id": {"in": ["app1", "app2"]}}` |
| `run_id` | `eq`, `ne`, `in`, `*` | `{"run_id": "*"}` |

### [​](https://docs.mem0.ai/platform/features/v2-memory-filters\#time-fields)  Time fields

| Field | Operators | Example |
| --- | --- | --- |
| `created_at` | `gt`, `gte`, `lt`, `lte`, `eq`, `ne` | `{"created_at": {"gte": "2024-01-01"}}` |
| `updated_at` | `gt`, `gte`, `lt`, `lte`, `eq`, `ne` | `{"updated_at": {"lt": "2024-12-31"}}` |
| `timestamp` | `gt`, `gte`, `lt`, `lte`, `eq`, `ne` | `{"timestamp": {"gt": "2024-01-01"}}` |

### [​](https://docs.mem0.ai/platform/features/v2-memory-filters\#content-fields)  Content fields

| Field | Operators | Example |
| --- | --- | --- |
| `categories` | `eq`, `ne`, `in`, `contains` | `{"categories": {"in": ["finance"]}}` |
| `metadata` | `eq`, `ne`, `contains` | `{"metadata": {"key": "value"}}` |
| `keywords` | `contains`, `icontains` | `{"keywords": {"icontains": "invoice"}}` |

### [​](https://docs.mem0.ai/platform/features/v2-memory-filters\#special-fields)  Special fields

| Field | Operators | Example |
| --- | --- | --- |
| `memory_ids` | `in` | `{"memory_ids": ["id1", "id2"]}` |

The `*` wildcard matches any non-null value. Records with null values for that field are excluded.

Use operator keywords exactly as shown (`eq`, `ne`, `gte`, etc.). SQL-style symbols such as `>=` or `!=` are rejected by the Platform API.

## [​](https://docs.mem0.ai/platform/features/v2-memory-filters\#common-filter-patterns)  Common filter patterns

Use these ready-made filters to target typical retrieval scenarios without rebuilding logic from scratch.

Single user

```
# Narrow to one user's memories
filters = {"AND": [{"user_id": "user_123"}]}
memories = client.get_all(filters=filters)
```

All users

```
# Wildcard skips null user_id entries
filters = {"AND": [{"user_id": "*"}]}
memories = client.get_all(filters=filters)
```

User across all runs

```
# Pair a user filter with a run wildcard
filters = {
    "AND": [\
        {"user_id": "user_123"},\
        {"run_id": "*"}\
    ]
}
memories = client.get_all(filters=filters)
```

Metadata filters only support bare values/`eq`, `contains`, and `ne`. Operators such as `in`, `gt`, or `lt` trigger a `FilterValidationError`. For multi-value checks, wrap multiple equality clauses in `OR`.

```
# Multi-value metadata workaround
filters = {
    "OR": [\
        {"metadata": {"type": "semantic"}},\
        {"metadata": {"type": "episodic"}}\
    ]
}
```

### [​](https://docs.mem0.ai/platform/features/v2-memory-filters\#content-search)  Content search

Find memories containing specific text, categories, or metadata values.

Text search

```
# Case-insensitive match
filters = {
    "AND": [\
        {"user_id": "user_123"},\
        {"keywords": {"icontains": "pizza"}}\
    ]
}

# Case-sensitive match
filters = {
    "AND": [\
        {"user_id": "user_123"},\
        {"keywords": {"contains": "Invoice_2024"}}\
    ]
}
```

Categories

```
# Match against category list
filters = {
    "AND": [\
        {"user_id": "user_123"},\
        {"categories": {"in": ["finance", "health"]}}\
    ]
}

# Partial category match
filters = {
    "AND": [\
        {"user_id": "user_123"},\
        {"categories": {"contains": "finance"}}\
    ]
}
```

Metadata

```
# Pin to a metadata attribute
filters = {
    "AND": [\
        {"user_id": "user_123"},\
        {"metadata": {"source": "email"}}\
    ]
}
```

### [​](https://docs.mem0.ai/platform/features/v2-memory-filters\#time-based-filtering)  Time-based filtering

Retrieve memories within specific date ranges using time operators.

Date range

```
# Created in January 2024
filters = {
    "AND": [\
        {"user_id": "user_123"},\
        {"created_at": {"gte": "2024-01-01T00:00:00Z"}},\
        {"created_at": {"lt": "2024-02-01T00:00:00Z"}}\
    ]
}

# Updated recently
filters = {
    "AND": [\
        {"user_id": "user_123"},\
        {"updated_at": {"gte": "2024-12-01T00:00:00Z"}}\
    ]
}
```

### [​](https://docs.mem0.ai/platform/features/v2-memory-filters\#multiple-criteria)  Multiple criteria

Combine various filters for complex queries across different dimensions.

Multiple users

```
# Expand scope to a short user list
filters = {
    "AND": [\
        {"user_id": {"in": ["user_1", "user_2", "user_3"]}}\
    ]
}
```

OR logic

```
# Return matches on either condition
filters = {
    "OR": [\
        {"user_id": "user_123"},\
        {"run_id": "run_456"}\
    ]
}
```

Exclude categories

```
# Wrap negative logic with NOT
filters = {
    "AND": [\
        {"user_id": "user_123"},\
        {"NOT": {\
            "categories": {"in": ["spam", "test"]}\
        }}\
    ]
}
```

Specific memory IDs

```
# Fetch a fixed set of memory IDs
filters = {
    "AND": [\
        {"user_id": "user_123"},\
        {"memory_ids": ["mem_1", "mem_2", "mem_3"]}\
    ]
}
```

All entities populated (single entity scope)

```
# Require user_id plus non-null run/app IDs
# (Memories are stored separately per entity, so scope one dimension at a time.)
filters = {
    "AND": [\
        {"user_id": "user_123"},\
        {"run_id": "*"},\
        {"app_id": "*"}\
    ]
}
```

## [​](https://docs.mem0.ai/platform/features/v2-memory-filters\#advanced-examples)  Advanced examples

Level up foundational patterns with compound filters that coordinate entity scope, tighten time windows, and weave in exclusion rules for high-precision retrievals.

Multi-dimensional filtering

```
# Invoice memories in Q1 2024
filters = {
    "AND": [\
        {"user_id": "user_123"},\
        {"keywords": {"icontains": "invoice"}},\
        {"categories": {"in": ["finance"]}},\
        {"created_at": {"gte": "2024-01-01T00:00:00Z"}},\
        {"created_at": {"lt": "2024-04-01T00:00:00Z"}}\
    ]
}
```

Entity-specific retrieval

```
# Query agent scope on its own
filters = {
    "AND": [\
        {"agent_id": "finance_bot"}\
    ]
}

# Or broaden within that scope using wildcards
filters = {
    "AND": [\
        {"agent_id": "finance_bot"},\
        {"run_id": "*"}\
    ]
}
```

Nested NOT/OR logic

```
# User memories from 2024, excluding spam and test
filters = {
    "AND": [\
        {"user_id": "user_123"},\
        {"created_at": {"gte": "2024-01-01T00:00:00Z"}},\
        {"NOT": {\
            "OR": [\
                {"categories": {"in": ["spam"]}},\
                {"categories": {"in": ["test"]}}\
            ]\
        }}\
    ]
}
```

## [​](https://docs.mem0.ai/platform/features/v2-memory-filters\#best-practices)  Best practices

The root must be `AND`, `OR`, or `NOT` with an array of conditions.

Use `"*"` to match any non-null value for a field.

Memories are stored per-entity (user, agent, app, run). Combining `user_id` **and**`agent_id` in the same `AND` clause returns no results because no record contains both values at once. Query one entity scope at a time or use `OR` logic for parallel lookups.

## [​](https://docs.mem0.ai/platform/features/v2-memory-filters\#troubleshooting)  Troubleshooting

Missing results with agent\_id

**Problem**: Filtered by `user_id` but don’t see agent memories.**Solution**: User and agent memories are stored as separate records. Use OR to query both scopes:

```
{"OR": [{"user_id": "user_123"}, {"agent_id": "agent_name"}]}
```

ne operator returns too much

**Problem**: `ne` comparison pulls in records with null values.**Solution**: Pair `ne` with a wildcard guard:

```
{"AND": [{"agent_id": "*"}, {"agent_id": {"ne": "old_agent"}}]}
```

Case-insensitive search

**Solution**: Swap to `icontains` to normalize casing.

Date range between two dates

**Solution**: Use `gte` for the start and `lt` for the end boundary:

```
{"AND": [\
    {"created_at": {"gte": "2024-01-01"}},\
    {"created_at": {"lt": "2024-02-01"}}\
]}
```

Metadata filter not working

**Solution**: Match top-level metadata keys exactly:

```
{"metadata": {"source": "email"}}
```

## [​](https://docs.mem0.ai/platform/features/v2-memory-filters\#faq)  FAQ

Do I need AND/OR/NOT?

Yes. The root must be a logical operator with an array.

What does \* match?

Any non-null value. Nulls are excluded.

Why use wildcards?

Unspecified fields default to NULL. Use `"*"` to include non-null values.

Is = required?

No. Equality is the default: `{"user_id": "u1"}` works.

Can I filter nested metadata?

Only top-level keys are supported.

How to search text?

Use `keywords` with `contains` (case-sensitive) or `icontains` (case-insensitive).

Can I nest AND/OR?

```
{
    "AND": [\
        {"user_id": "user_123"},\
        {"OR": [\
            {"categories": "finance"},\
            {"categories": "health"}\
        ]}\
    ]
}
```

## [​](https://docs.mem0.ai/platform/features/v2-memory-filters\#known-limitations)  Known limitations

- Entity filters operate on a single scope per record. Use separate queries or `OR` logic to compare users vs agents.
- Metadata supports only bare/`eq`, `contains`, and `ne` comparisons.
- Wildcards (`"*"` ) match only records where the field is already non-null.

Was this page helpful?

YesNo

[Suggest edits](https://github.com/mem0ai/mem0/edit/main/docs/platform/features/v2-memory-filters.mdx) [Raise issue](https://github.com/mem0ai/mem0/issues/new?title=Issue%20on%20docs&body=Path:%20/platform/features/v2-memory-filters)

[Overview\\
\\
Previous](https://docs.mem0.ai/platform/features/platform-overview) [Entity-Scoped Memory\\
\\
Next](https://docs.mem0.ai/platform/features/entity-scoped-memory)

Ctrl+I

[discord](https://mem0.dev/DiD) [x](https://x.com/mem0ai) [github](https://github.com/mem0ai) [linkedin](https://www.linkedin.com/company/mem0)

[Powered byThis documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=mem0)

Assistant

Responses are generated using AI and may contain mistakes.

Suggestions

How do I combine multiple filters?What operators work with dates?How do I filter by user ID?

[Contact support](mailto:support@mem0.ai)