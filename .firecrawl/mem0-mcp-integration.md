> ## Documentation Index
>
> Fetch the complete documentation index at: [/llms.txt](https://docs.mem0.ai/llms.txt)
>
> Use this file to discover all available pages before exploring further.

[Skip to main content](https://docs.mem0.ai/platform/features/mcp-integration#content-area)

[Mem0 home page![light logo](https://mintcdn.com/mem0/jmnLaiutcXgYmrAY/logo/light.svg?fit=max&auto=format&n=jmnLaiutcXgYmrAY&q=85&s=262e6e63930c20446217323d7f850a7a)![dark logo](https://mintcdn.com/mem0/jmnLaiutcXgYmrAY/logo/dark.svg?fit=max&auto=format&n=jmnLaiutcXgYmrAY&q=85&s=90ded1dd02ad45ca33577cc49af4e022)](https://mem0.ai/)

Search...

Ctrl KAsk Assistant

- [Your Dashboard](https://app.mem0.ai/?utm_source=oss&utm_medium=docs-nav)
- [Your Dashboard](https://app.mem0.ai/?utm_source=oss&utm_medium=docs-nav)

Search...

Navigation

Integration Features

MCP Integration

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



  - [Webhooks](https://docs.mem0.ai/platform/features/webhooks)
  - [Feedback Mechanism](https://docs.mem0.ai/platform/features/feedback-mechanism)
  - [Group Chat](https://docs.mem0.ai/platform/features/group-chat)
  - [MCP Integration](https://docs.mem0.ai/platform/features/mcp-integration)

### Support & Troubleshooting

- [FAQs](https://docs.mem0.ai/platform/faqs)

### Migration Guide

- [Platform: Migrating to the New Memory Algorithm](https://docs.mem0.ai/migration/platform-v2-to-v3)
- [Migrate from Open Source to Platform](https://docs.mem0.ai/migration/oss-to-platform)
- [API Reference Changes](https://docs.mem0.ai/migration/api-changes)

### Contribute

- [Contribution Hub](https://docs.mem0.ai/platform/contribute)

## On this page

- [Why use MCP](https://docs.mem0.ai/platform/features/mcp-integration#why-use-mcp)
- [Setup](https://docs.mem0.ai/platform/features/mcp-integration#setup)
- [Available tools](https://docs.mem0.ai/platform/features/mcp-integration#available-tools)
- [How it works](https://docs.mem0.ai/platform/features/mcp-integration#how-it-works)
- [Example interactions](https://docs.mem0.ai/platform/features/mcp-integration#example-interactions)
- [Try these prompts](https://docs.mem0.ai/platform/features/mcp-integration#try-these-prompts)
- [What you can do](https://docs.mem0.ai/platform/features/mcp-integration#what-you-can-do)
- [Performance tips](https://docs.mem0.ai/platform/features/mcp-integration#performance-tips)
- [Best practices](https://docs.mem0.ai/platform/features/mcp-integration#best-practices)

Integration Features

# MCP Integration

Copy page

Connect any AI client to Mem0 using Model Context Protocol for universal memory access

Copy page

> Model Context Protocol (MCP) provides a standardized way for AI agents to manage their own memory through Mem0, without manual API calls.

## [​](https://docs.mem0.ai/platform/features/mcp-integration\#why-use-mcp)  Why use MCP

When building AI applications, memory management often requires manual integration. MCP eliminates this complexity by:

- **Universal compatibility**: Works with any MCP-compatible client (Claude, Claude Code, Cursor, Windsurf, VS Code, OpenCode)
- **Agent autonomy**: AI agents decide when to save, search, or update memories
- **Zero infrastructure**: No servers to maintain - Mem0’s cloud MCP handles everything
- **Standardized protocol**: One integration works across all your AI tools

## [​](https://docs.mem0.ai/platform/features/mcp-integration\#setup)  Setup

Add Mem0 MCP to all supported clients with a single command:

```
npx mcp-add \
  --name mem0-mcp \
  --type http \
  --url "https://mcp.mem0.ai/mcp" \
  --clients "claude,claude code,cursor,windsurf,vscode,opencode"
```

Or configure a specific client:

```
npx mcp-add \
  --name mem0-mcp \
  --type http \
  --url "https://mcp.mem0.ai/mcp" \
  --clients "cursor"
```

For manual configuration, add this to your MCP client config:

```
{
  "mcpServers": {
    "mem0-mcp": {
      "type": "http",
      "url": "https://mcp.mem0.ai/mcp"
    }
  }
}
```

For detailed per-client instructions, see the [Mem0 MCP Quickstart](https://docs.mem0.ai/platform/mem0-mcp).

## [​](https://docs.mem0.ai/platform/features/mcp-integration\#available-tools)  Available tools

The MCP server exposes 11 memory tools to your AI client:

| Tool | Purpose |
| --- | --- |
| `add_memory` | Store conversations or facts |
| `search_memories` | Find relevant memories with filters |
| `get_memories` | List memories with pagination |
| `update_memory` | Modify existing memory content |
| `delete_memory` | Remove specific memories |
| `delete_all_memories` | Bulk delete memories |
| `delete_entities` | Remove user/agent/app entities |
| `get_memory` | Retrieve single memory by ID |
| `list_entities` | View stored entities |
| `list_events` | List memory operation events with filters and pagination |
| `get_event_status` | Check the status of an async memory operation by `event_id` |

## [​](https://docs.mem0.ai/platform/features/mcp-integration\#how-it-works)  How it works

1. **Configure the MCP server** \- Add Mem0 MCP to your AI client using the setup command above
2. **Agent connects** \- Your AI client connects to Mem0’s cloud MCP server over HTTP
3. **Autonomous memory** \- The agent decides when to store/retrieve memories as part of its reasoning
4. **No manual API calls** \- The agent manages memory automatically through MCP tools

## [​](https://docs.mem0.ai/platform/features/mcp-integration\#example-interactions)  Example interactions

Once connected, your AI agent can:

```
User: Remember that I'm allergic to peanuts
Agent: [calls add_memory] Got it! I've saved your peanut allergy.

User: What dietary restrictions do I know about?
Agent: [calls search_memories] You have a peanut allergy.
```

The agent automatically decides when to use memory tools based on context.

## [​](https://docs.mem0.ai/platform/features/mcp-integration\#try-these-prompts)  Try these prompts

```
# Multi-task operations
"Generate 5 user personas for our e-commerce app with different demographics, store them all, then search for existing personas"

# Natural context retrieval
"Anything about my work preferences I should remember?"

# Complex information updates
"Update my current project: the mobile app is now 80% complete, we've fixed the login issues, and the launch date is March 15"

# Time-based queries
"What meetings did I have last week about Project Phoenix?"

# Memory cleanup
"Delete all test data and temporary memories from our development phase"

# Personal preferences
"I drink oat milk cappuccino with one sugar every morning, and I prefer standing desks"

# Health and wellness tracking
"I'm allergic to peanuts and shellfish, and I go for 5km runs on weekday mornings"
```

These examples demonstrate how MCP enables natural language memory operations - the AI agent automatically determines when to add, search, update, or delete memories based on context.

## [​](https://docs.mem0.ai/platform/features/mcp-integration\#what-you-can-do)  What you can do

The Mem0 MCP server enables powerful memory capabilities for your AI applications:

- **Health tracking**: “I’m allergic to peanuts and shellfish” - Add new health information
- **Research data**: “Store these trial parameters: 200 participants, double-blind, placebo-controlled” - Save structured data
- **Preference queries**: “What do you know about my dietary preferences?” - Search and retrieve relevant memories
- **Project updates**: “Update my project status: the mobile app is now 80% complete” - Modify existing memory
- **Data cleanup**: “Delete all memories from 2023” - Bulk remove outdated information
- **Topic overview**: “Show me everything about Project Phoenix” - List all memories for a subject

## [​](https://docs.mem0.ai/platform/features/mcp-integration\#performance-tips)  Performance tips

- Use specific filters when searching large memory sets
- Batch operations when adding multiple memories
- Monitor memory usage in the Mem0 dashboard

## [​](https://docs.mem0.ai/platform/features/mcp-integration\#best-practices)  Best practices

- **Use the cloud MCP**: The hosted MCP server at `https://mcp.mem0.ai/mcp` handles infrastructure for you
- **Use wildcards**: `user_id: "*"` to search across all users
- **Monitor usage**: Track memory operations in the dashboard
- **Document patterns**: Share successful prompt patterns with your team

[**Memory Filters**](https://docs.mem0.ai/platform/features/v2-memory-filters)

[**Gemini 3 with MCP**](https://docs.mem0.ai/cookbooks/frameworks/gemini-3-with-mem0-mcp)

Was this page helpful?

YesNo

[Suggest edits](https://github.com/mem0ai/mem0/edit/main/docs/platform/features/mcp-integration.mdx) [Raise issue](https://github.com/mem0ai/mem0/issues/new?title=Issue%20on%20docs&body=Path:%20/platform/features/mcp-integration)

[Group Chat\\
\\
Previous](https://docs.mem0.ai/platform/features/group-chat) [FAQs\\
\\
Next](https://docs.mem0.ai/platform/faqs)

Ctrl+I

[discord](https://mem0.dev/DiD) [x](https://x.com/mem0ai) [github](https://github.com/mem0ai) [linkedin](https://www.linkedin.com/company/mem0)

[Powered byThis documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=mem0)

Assistant

Responses are generated using AI and may contain mistakes.

Suggestions

What memory tools are available?What MCP clients are supported?How do I set up Mem0 MCP?

[Contact support](mailto:support@mem0.ai)