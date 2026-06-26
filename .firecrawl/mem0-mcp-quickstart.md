> ## Documentation Index
>
> Fetch the complete documentation index at: [/llms.txt](https://docs.mem0.ai/llms.txt)
>
> Use this file to discover all available pages before exploring further.

[Skip to main content](https://docs.mem0.ai/platform/mem0-mcp#content-area)

[Mem0 home page![light logo](https://mintcdn.com/mem0/jmnLaiutcXgYmrAY/logo/light.svg?fit=max&auto=format&n=jmnLaiutcXgYmrAY&q=85&s=262e6e63930c20446217323d7f850a7a)![dark logo](https://mintcdn.com/mem0/jmnLaiutcXgYmrAY/logo/dark.svg?fit=max&auto=format&n=jmnLaiutcXgYmrAY&q=85&s=90ded1dd02ad45ca33577cc49af4e022)](https://mem0.ai/)

Search...

Ctrl KAsk Assistant

- [Your Dashboard](https://app.mem0.ai/?utm_source=oss&utm_medium=docs-nav)
- [Your Dashboard](https://app.mem0.ai/?utm_source=oss&utm_medium=docs-nav)

Search...

Navigation

Getting Started

Mem0 MCP

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

- [What is Mem0 MCP?](https://docs.mem0.ai/platform/mem0-mcp#what-is-mem0-mcp)
- [Quick Setup](https://docs.mem0.ai/platform/mem0-mcp#quick-setup)
- [Available Tools](https://docs.mem0.ai/platform/mem0-mcp#available-tools)
- [Client-Specific Setup](https://docs.mem0.ai/platform/mem0-mcp#client-specific-setup)
- [Verify Your Setup](https://docs.mem0.ai/platform/mem0-mcp#verify-your-setup)
- [Quick Recovery](https://docs.mem0.ai/platform/mem0-mcp#quick-recovery)
- [Next Steps](https://docs.mem0.ai/platform/mem0-mcp#next-steps)
- [Additional Resources](https://docs.mem0.ai/platform/mem0-mcp#additional-resources)

Getting Started

# Mem0 MCP

Copy page

Connect any AI client to Mem0 using Model Context Protocol in minutes

Copy page

**Prerequisites**

- Mem0 Platform account ( [Sign up here](https://app.mem0.ai/?utm_source=oss&utm_medium=platform-mem0-mcp))
- API key ( [Get one from dashboard](https://app.mem0.ai/settings/api-keys?utm_source=oss&utm_medium=platform-mem0-mcp))
- Node.js 14+ (for npx)
- An MCP-compatible client (Claude, Claude Code, Codex, Cursor, Windsurf, VS Code, OpenCode)

## [​](https://docs.mem0.ai/platform/mem0-mcp\#what-is-mem0-mcp)  What is Mem0 MCP?

Mem0 MCP Server exposes Mem0’s memory capabilities as MCP tools, letting AI agents decide when to save, search, or update information. The cloud-hosted MCP server requires no local installation — just connect and start using memory.

## [​](https://docs.mem0.ai/platform/mem0-mcp\#quick-setup)  Quick Setup

Add Mem0 MCP to your preferred clients with a single command:

```
npx mcp-add \
  --name mem0-mcp \
  --type http \
  --url "https://mcp.mem0.ai/mcp" \
  --clients "claude,claude code,cursor,windsurf,vscode,opencode"
```

This automatically configures Mem0 MCP for all supported clients at once.

## [​](https://docs.mem0.ai/platform/mem0-mcp\#available-tools)  Available Tools

The MCP server exposes these memory tools to your AI client:

| Tool | Description |
| --- | --- |
| `add_memory` | Save text or conversation history for a user/agent |
| `search_memories` | Semantic search across existing memories with filters |
| `get_memories` | List memories with structured filters and pagination |
| `get_memory` | Retrieve one memory by its `memory_id` |
| `update_memory` | Overwrite a memory’s text after confirming the ID |
| `delete_memory` | Delete a single memory by `memory_id` |
| `delete_all_memories` | Bulk delete all memories in scope |
| `delete_entities` | Delete a user/agent/app/run entity and its memories |
| `list_entities` | Enumerate users/agents/apps/runs stored in Mem0 |
| `list_events` | List memory operation events with filters and pagination |
| `get_event_status` | Check the status of an async memory operation by `event_id` |

* * *

## [​](https://docs.mem0.ai/platform/mem0-mcp\#client-specific-setup)  Client-Specific Setup

You can also configure individual clients:

Claude Desktop

```
npx mcp-add \
  --name mem0-mcp \
  --type http \
  --url "https://mcp.mem0.ai/mcp" \
  --clients "claude"
```

Or manually add to your Claude Desktop configuration (`claude_desktop_config.json`):

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

Claude Code

```
npx mcp-add \
  --name mem0-mcp \
  --type http \
  --url "https://mcp.mem0.ai/mcp" \
  --clients "claude code"
```

Codex

**Direct MCP (fastest, MCP only).** Codex reads MCP servers from `~/.codex/config.toml` as TOML (not JSON). Add:

```
[mcp_servers.mem0]
url = "https://mcp.mem0.ai/mcp"
bearer_token_env_var = "MEM0_API_KEY"
```

Export `MEM0_API_KEY` in the shell you launch Codex from, then restart Codex. `codex mcp add` only supports stdio servers, so HTTP servers must be added via `config.toml` directly — or via the **Plugins → Connect to a custom MCP → Streamable HTTP** UI in the Codex app.

Codex uses the server name `mem0` (not `mem0-mcp` like the other clients on this page) so it matches the name the bundled plugin registers if you ever sideload it later.

**Sideloaded plugin (full experience).** If you want the memory protocol skill, Mem0 SDK skill, and opt-in lifecycle hooks alongside the MCP server, sideload the plugin from a clone of `mem0ai/mem0`. The repo ships a marketplace manifest at `.agents/plugins/marketplace.json`, so you can register it with one CLI call:

```
git clone https://github.com/mem0ai/mem0.git ~/codex-plugins/mem0-source
codex plugin marketplace add ~/codex-plugins/mem0-source
```

Then run `codex` and `/plugins`, browse the **Mem0 Plugins** marketplace, and install **Mem0**. Don’t combine this with the Direct MCP setup above — the sideloaded plugin auto-registers `mem0` via `.codex-mcp.json`, so a manual `[mcp_servers.mem0]` block would create a duplicate.See the [Codex integration guide](https://docs.mem0.ai/integrations/codex) for full details, lifecycle-hook setup, and management commands (`codex plugin marketplace upgrade` / `remove`).

Cursor

```
npx mcp-add \
  --name mem0-mcp \
  --type http \
  --url "https://mcp.mem0.ai/mcp" \
  --clients "cursor"
```

Or go to Cursor → Settings → MCP and add:

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

Windsurf

```
npx mcp-add \
  --name mem0-mcp \
  --type http \
  --url "https://mcp.mem0.ai/mcp" \
  --clients "windsurf"
```

VS Code

```
npx mcp-add \
  --name mem0-mcp \
  --type http \
  --url "https://mcp.mem0.ai/mcp" \
  --clients "vscode"
```

OpenCode

```
npx mcp-add \
  --name mem0-mcp \
  --type http \
  --url "https://mcp.mem0.ai/mcp" \
  --clients "opencode"
```

* * *

## [​](https://docs.mem0.ai/platform/mem0-mcp\#verify-your-setup)  Verify Your Setup

Once configured, your AI client can:

- Automatically save information with `add_memory`
- Search memories with `search_memories`
- Update memories with `update_memory`
- Delete memories with `delete_memory`

**Sample Interactions:**

```
User: Remember that I love tiramisu
Agent: Got it! I've saved that you love tiramisu.

User: What do you know about my food preferences?
Agent: Based on your memories, you love tiramisu.

User: Update my project: the mobile app is now 80% complete
Agent: Updated your project status successfully.
```

If you get “Connection failed”, ensure you have a valid API key from [Mem0 Dashboard](https://app.mem0.ai/settings/api-keys?utm_source=oss&utm_medium=platform-mem0-mcp).

* * *

## [​](https://docs.mem0.ai/platform/mem0-mcp\#quick-recovery)  Quick Recovery

- **“Connection refused”** → Check your internet connection and ensure the MCP client is correctly configured
- **“Invalid API key”** → Get a new key from [Mem0 Dashboard](https://app.mem0.ai/settings/api-keys?utm_source=oss&utm_medium=platform-mem0-mcp)
- **“npx command not found”** → Install Node.js from [nodejs.org](https://nodejs.org/)

* * *

## [​](https://docs.mem0.ai/platform/mem0-mcp\#next-steps)  Next Steps

[**MCP Integration Feature**](https://docs.mem0.ai/platform/features/mcp-integration)

[**Gemini 3 with Mem0 MCP**](https://docs.mem0.ai/cookbooks/frameworks/gemini-3-with-mem0-mcp)

## [​](https://docs.mem0.ai/platform/mem0-mcp\#additional-resources)  Additional Resources

- **[Platform Quickstart](https://docs.mem0.ai/platform/quickstart)** \- Direct API integration guide
- **[MCP Specification](https://modelcontextprotocol.io/)** \- Learn about MCP protocol

Was this page helpful?

YesNo

[Suggest edits](https://github.com/mem0ai/mem0/edit/main/docs/platform/mem0-mcp.mdx) [Raise issue](https://github.com/mem0ai/mem0/issues/new?title=Issue%20on%20docs&body=Path:%20/platform/mem0-mcp)

[Vibecoding with Mem0\\
\\
Previous](https://docs.mem0.ai/vibecoding) [CLI\\
\\
Next](https://docs.mem0.ai/platform/cli)

Ctrl+I

[discord](https://mem0.dev/DiD) [x](https://x.com/mem0ai) [github](https://github.com/mem0ai) [linkedin](https://www.linkedin.com/company/mem0)

[Powered byThis documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=mem0)

Assistant

Responses are generated using AI and may contain mistakes.

Suggestions

How do I search stored memories?How do I set up Mem0 MCP?What memory tools are available?

[Contact support](mailto:support@mem0.ai)

![](https://downloads.intercomcdn.com/i/o/jjv2r0tt/659404/9e903493dd0a115e31b620e84189/9a987d2bf694d15c37d85f66f2be4813.png)