# @tinji/mcp

A [Model Context Protocol](https://modelcontextprotocol.io) (MCP) server that lets
AI agents discover, preview, and install [tinji ui](https://ui.tinji.dev)
components and particles.

It reads from the public tinji registry (served at `https://ui.tinji.dev/r`) and
exposes tools so an agent can list components, read their source + docs, search by
keyword, and get the exact `shadcn` install command.

## Tools

| Tool | Description |
| --- | --- |
| `list_components` | List all components with names + descriptions. |
| `get_component` | Get a component by name → source code, docs, install command. |
| `search_components` | Search components **and** particles by query. |
| `list_particles` | List all particles (example blocks). |
| `get_particle` | Get a particle by name → source code. |
| `get_install_command` | Get the `shadcn` install command for any item. |

Install commands use the format:

```
npx shadcn@latest add https://ui.tinji.dev/r/<name>.json
```

## Configuration

The registry base URL can be overridden with the `TINJI_REGISTRY_BASE`
environment variable (defaults to `https://ui.tinji.dev/r`).

## Registering the server

### Claude Code

Add to your `.mcp.json` (project) or `~/.claude.json` (global):

```json
{
  "mcpServers": {
    "tinji": {
      "command": "bunx",
      "args": ["@tinji/mcp"]
    }
  }
}
```

Or, with the Claude Code CLI:

```bash
claude mcp add tinji -- bunx @tinji/mcp
```

### Cursor

Add to `.cursor/mcp.json` (project) or `~/.cursor/mcp.json` (global):

```json
{
  "mcpServers": {
    "tinji": {
      "command": "bunx",
      "args": ["@tinji/mcp"]
    }
  }
}
```

### Using a local / built copy

If you have built the package (`bun run build` produces `dist/index.js`), point
the runner at Node and the built entry instead:

```json
{
  "mcpServers": {
    "tinji": {
      "command": "node",
      "args": ["/absolute/path/to/packages/mcp/dist/index.js"]
    }
  }
}
```

To point at a non-production registry, add an `env` block:

```json
{
  "mcpServers": {
    "tinji": {
      "command": "bunx",
      "args": ["@tinji/mcp"],
      "env": { "TINJI_REGISTRY_BASE": "http://localhost:3000/r" }
    }
  }
}
```

## Development

```bash
# Run directly from source (no build step needed)
bun packages/mcp/src/index.ts

# Type-check
bun run --cwd packages/mcp typecheck

# Build to dist/
bun run --cwd packages/mcp build
```

To verify it speaks MCP, you can drive it with the official inspector:

```bash
bunx @modelcontextprotocol/inspector bun packages/mcp/src/index.ts
```

## License

AGPL-3.0-or-later
