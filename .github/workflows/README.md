# GitHub Workflows

## Workflows

### `ci.yml` — Continuous Integration

Runs on every `pull_request` and on `push` to `master`.

Steps: checkout → setup Bun 1.3.1 → `bun install --frozen-lockfile` →
`bun run typecheck` → `bun run lint` →
`cd apps/ui && bun run registry:validate-deps && bun run build`.

Bun's install cache, `node_modules`, and the turbo cache are cached between runs.

### `release.yml` — Release (Changesets)

Runs on `push` to `master`. Uses
[`changesets/action@v1`](https://github.com/changesets/action):

- When there are unreleased changesets, it opens/updates a **"Version Packages"**
  PR (running `bun run version`).
- When that PR is merged (and package versions are ahead of npm), it builds and
  publishes via `bun run release` (which runs `changeset publish`).

## Required repository secrets

| Secret         | Purpose                                                                 |
| -------------- | ----------------------------------------------------------------------- |
| `NPM_TOKEN`    | npm automation token with publish rights to the `@tinji` scope.         |
| `GITHUB_TOKEN` | Provided automatically by GitHub Actions — no manual setup needed.      |

> The release job sets `permissions: contents: write` and
> `pull-requests: write` so the action can push the version PR. Also enable
> "Allow GitHub Actions to create and approve pull requests" in
> repo Settings → Actions → General.

## How to cut a release

1. Add a changeset for your change: `bun changeset` (commit the generated file
   in `.changeset/`).
2. Merge your PR into `master`.
3. The Release workflow opens a "Version Packages" PR.
4. Merge that PR → packages are published to npm automatically.

See `.changeset/README.md` for more detail.
