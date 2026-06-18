# @tinji/cli

Branded CLI for the [tinji ui](https://ui.tinji.dev) component registry. A thin,
shadcn-compatible wrapper that installs components from
`https://ui.tinji.dev/r/<name>.json`.

## Install

```bash
# run without installing
npx @tinji/cli list

# or install globally
npm i -g @tinji/cli
tinji --help
```

## Commands

| Command | Description |
| --- | --- |
| `tinji init` | Run `shadcn init`, then print tinji-specific next steps. |
| `tinji add <components...>` | Install one or more components/particles. |
| `tinji list` | Fetch the registry and list components (grouped). |
| `tinji theme [--print]` | Open (or print) the theme generator at `/themes`. |
| `tinji doctor` | Check `components.json`, Tailwind, and React setup. |
| `tinji --help` / `tinji -v` | Usage and version. |

### Examples

```bash
tinji init
tinji add button dialog
tinji add p-button-1          # particles work too
tinji list
tinji theme                   # opens https://ui.tinji.dev/themes
tinji theme --print           # prints the URL
tinji doctor
```

`add` and `init` shell out to `npx shadcn@latest …` under the hood, so they
respect your existing `components.json` and project conventions.

## Configuration

Set `TINJI_REGISTRY_BASE` to point at a different registry (defaults to
`https://ui.tinji.dev/r`):

```bash
TINJI_REGISTRY_BASE=http://localhost:3000/r tinji list
```

## Development

```bash
# run from source
bun packages/cli/src/index.ts list

# build to dist/
bun run build      # tsc
node dist/index.js --help
```

## License

AGPL-3.0-or-later
