# tinji ui — Launch Kit

Launch copy for **tinji ui** — a modern UI component library built on top of [Base UI](https://base-ui.com/), styled with Tailwind CSS, and designed for both developers and AI.

- **Site:** https://ui.tinji.dev
- **npm:** [@tinji/ui](https://www.npmjs.com/package/@tinji/ui)
- **GitHub:** https://github.com/aussieljk/tinji-ui
- **Install a component:** `npx shadcn@latest add https://ui.tinji.dev/r/<name>.json`
- **At a glance:** ~68 components, ~500+ particles, first-class AI assistant skill.

> Note: tinji ui is in early development and Base UI is in beta — keep launch messaging honest about that.

---

## 1. X / Twitter launch thread

**Tweet 1 (hook)**

Introducing tinji ui 🎛️

A modern, copy-paste React component library built on Base UI and Tailwind — designed for developers *and* AI agents.

~68 components. 500+ ready-to-use particles. You own every line.

https://ui.tinji.dev

🧵

**Tweet 2 (the foundation)**

Most copy-paste libraries are built on Radix.

tinji ui is built on Base UI from the ground up — the next-gen headless primitives from the team behind Radix and Material UI.

Accessible, unstyled, predictable. We add the design system on top.

**Tweet 3 (you own the code)**

No package to wrestle with. No black-box abstractions.

`npx shadcn@latest add https://ui.tinji.dev/r/button.json`

The source lands in your repo. Edit it, extend it, break it apart. It's yours.

**Tweet 4 (particles)**

Primitives are great, but you don't ship a <Dialog>, you ship a *settings dialog with a form*.

So we built 500+ particles: pre-assembled forms, tables, command menus, date pickers, auth flows. Real patterns, not stubs. All copy-paste.

**Tweet 5 (AI-native)**

Here's the part we're most excited about: tinji ui is built to be legible to AI.

`npx skills add aussieljk/tinji-ui`

Your assistant gets deep knowledge of the components — APIs, composition rules, migration patterns. It stops guessing.

**Tweet 6 (migration)**

Coming from shadcn/ui or Radix?

We wrote a full migration guide. asChild → render, onSelect → onClick, Select items-first, and more. Plus the skill can do the migration for you.

https://ui.tinji.dev/docs/radix-shadcn-migration

**Tweet 7 (open source / philosophy)**

tinji ui is open source and built in the open. It's the system we're progressively adopting at Cal.com — production-tested patterns, dense modern defaults, one coherent design language.

We'd love your feedback, issues, and PRs.

**Tweet 8 (CTA)**

Go build something.

📦 https://ui.tinji.dev
⭐ https://github.com/aussieljk/tinji-ui

Tell us what you make — and what you want next.

---

## 2. Product Hunt

**Tagline** (max ~60 chars)

> Modern React components on Base UI, built for devs and AI

**Alternate taglines**

- Copy-paste UI components on Base UI. You own every line.
- Base UI components, 500+ particles, made legible to AI.

**Description**

tinji ui is a collection of beautifully designed, accessible, and composable React components built on top of Base UI and styled with Tailwind CSS.

Like shadcn/ui, you don't install a package — you copy the source into your project and own it completely. Add any component with one command:

`npx shadcn@latest add https://ui.tinji.dev/r/<name>.json`

What's inside:

- ~68 primitives built from the ground up on Base UI (the next-gen headless library from the Radix and MUI teams)
- 500+ particles — pre-assembled, production-realistic patterns (forms, tables, command menus, date pickers) you can drop in and edit
- A first-class AI skill (`npx skills add aussieljk/tinji-ui`) so your coding assistant knows the components and stops guessing
- A complete migration guide from shadcn/ui and Radix UI
- Tailwind v4 theming with semantic tokens and light/dark out of the box

It's open source, built in the open, and it's the system being progressively adopted at Cal.com.

**First comment (maker)**

Hey Product Hunt 👋

I built tinji ui because I love the shadcn copy-paste model but wanted something built on Base UI from day one — not ported from Radix — with a much larger catalog of real, composed patterns rather than just primitives.

The other thing I cared about: making the library legible to AI. Coding assistants are how a lot of us write UI now, and they do much better when there's a skill that teaches them the actual component APIs and composition rules. So we shipped one.

A few honest caveats: tinji ui is early, and Base UI itself is still in beta, so expect some breaking changes as both mature. I'd love your feedback on what components and particles to prioritize next, and any rough edges you hit.

Happy to answer anything in the comments!

---

## 3. Show HN

**Title**

> Show HN: tinji ui – Copy-paste React components built on Base UI, made for AI

**Body**

tinji ui is a copy-paste React component library built on Base UI and Tailwind CSS. It's in the same spirit as shadcn/ui — you don't install a dependency, you pull the source into your repo and own it — but it's built on Base UI from the ground up rather than Radix, and it ships a much larger catalog of pre-assembled patterns.

Install a component via the shadcn registry:

  npx shadcn@latest add https://ui.tinji.dev/r/button.json

What's there today:

- ~68 components (primitives) built on Base UI, the newer headless library from the team behind Radix and MUI. Accessibility, focus management, and keyboard handling come from the primitives; we add the design system.
- ~500+ "particles" — composed patterns (forms, tables, command menus, number fields, date pickers, etc.) that combine several primitives into something you'd actually ship. They're still just source you can edit or take apart.
- An Agent Skill (`npx skills add aussieljk/tinji-ui`) that gives coding assistants structured knowledge of the component APIs, composition rules, styling conventions, and migration patterns. The motivation: assistants generate much better UI when they aren't guessing the API surface.
- A migration guide from shadcn/Radix (asChild → render, onSelect → onClick, Select items-first pattern, etc.).

Why another one of these: I wanted the shadcn workflow but on Base UI specifically, with a deep particle catalog and explicit AI legibility as a design goal rather than an afterthought. It's the system being progressively adopted at Cal.com.

Honest caveats: it's early, and Base UI is still in beta, so there will be breaking changes as both evolve. Use it where you're comfortable adapting.

Site: https://ui.tinji.dev
Code: https://github.com/aussieljk/tinji-ui

Would love feedback on the API design, the particle catalog, and the AI-skill approach in particular.

---

## 4. Reddit — r/reactjs

**Title**

> [Showoff] tinji ui — copy-paste React components on Base UI, with 500+ ready-made patterns and an AI skill

**Body**

Hey r/reactjs,

I've been building **tinji ui**, a copy-paste component library in the shadcn mold but built on **Base UI** (the newer headless primitives from the Radix/MUI folks) instead of Radix, and styled with Tailwind v4.

The copy-paste part works through the shadcn registry, so adding a component is:

```bash
npx shadcn@latest add https://ui.tinji.dev/r/button.json
```

The source lands in your project — no package dependency, full ownership.

A few things that make it a bit different:

- **Built on Base UI from day one**, not ported from Radix. The `render` prop, `Field`/`Form`, number fields, toolbar, etc. come straight from Base UI's primitives.
- **~68 components + ~500 particles.** Particles are pre-assembled patterns — settings dialogs, data tables, command menus, OTP fields, date pickers — that you copy in and then customize or pull apart.
- **An AI skill.** `npx skills add aussieljk/tinji-ui` gives your coding assistant (Claude Code, Cursor, Copilot, etc.) real knowledge of the component APIs and composition rules, so the code it generates actually matches the library instead of hallucinating props.
- **A migration guide** if you're coming from shadcn/ui or Radix.

Fair disclosure: it's early and Base UI is still in beta, so expect some churn. It's open source and it's what's being progressively adopted at Cal.com.

Site: https://ui.tinji.dev
GitHub: https://github.com/aussieljk/tinji-ui

I'd genuinely love feedback — especially on the API ergonomics vs shadcn/Radix, and whether the AI-skill approach is useful to anyone else here. What components/particles would you want next?

---

## 5. Submission checklist

Targets to submit tinji ui to after launch. Verify each link and submission process before posting; some require a PR, some a form.

### Launch platforms

- [ ] **Product Hunt** — schedule a launch — https://www.producthunt.com/posts/new
- [ ] **Hacker News (Show HN)** — https://news.ycombinator.com/submit
- [ ] **Reddit r/reactjs** — https://www.reddit.com/r/reactjs/
- [ ] **Reddit r/webdev** — https://www.reddit.com/r/webdev/
- [ ] **Reddit r/Frontend** — https://www.reddit.com/r/Frontend/
- [ ] **Reddit r/tailwindcss** — https://www.reddit.com/r/tailwindcss/
- [ ] **Lobsters** (needs invite) — https://lobste.rs/
- [ ] **Dev.to launch/announcement post** — https://dev.to/
- [ ] **Hashnode announcement post** — https://hashnode.com/

### shadcn / registry directories (PR or submission)

- [ ] **awesome-shadcn-ui** — https://github.com/birobirobiro/awesome-shadcn-ui (open a PR adding tinji ui under registries/component libraries)
- [ ] **shadcn registry directory (registry.directory)** — https://registry.directory/
- [ ] **shadcnblocks / directory listings** — search current shadcn registry aggregators and submit where listing is open
- [ ] **shadcn "Built with" / community showcase** — check shadcn/ui repo + Discord for showcase channels — https://github.com/shadcn-ui/ui

### Base UI ecosystem

- [ ] **Base UI showcase / "Built with Base UI"** — https://github.com/mui/base-ui (open issue/PR or post in discussions to be listed as an ecosystem project) — https://github.com/mui/base-ui/discussions
- [ ] **Base UI Discord / community channels** — share in the appropriate showcase channel

### Awesome lists & directories

- [ ] **awesome-react** — https://github.com/enaqx/awesome-react
- [ ] **awesome-react-components** — https://github.com/brillout/awesome-react-components
- [ ] **awesome-tailwindcss** — https://github.com/aniftyco/awesome-tailwindcss
- [ ] **Component-library / UI-kit directories** (e.g. UI library roundups, "best React UI libraries" lists) — pitch via their submission forms or PRs

### Newsletters & aggregators

- [ ] **React Status newsletter** — https://react.statuscode.com/ (submit a link)
- [ ] **JavaScript Weekly** — https://javascriptweekly.com/
- [ ] **Frontend Focus** — https://frontendfoc.us/
- [ ] **Bytes (ui.dev)** — https://bytes.dev/
- [ ] **This Week in React** — https://thisweekinreact.com/ (submit a link)
- [ ] **Console.dev** (dev tools) — https://console.dev/
- [ ] **Hackernewsletter** — https://hackernewsletter.com/

### AI / agent ecosystem

- [ ] **skills.sh directory** (the skill itself) — https://skills.sh/
- [ ] **Awesome MCP / AI-coding tool lists** — submit the tinji skill where component/registry skills are listed
- [ ] **Cursor / Claude Code / Cline community showcases** — share the skill in relevant community channels

### Owned channels

- [ ] **Cal.com blog / changelog** — announce adoption — https://cal.com/blog
- [ ] **Personal/company X, LinkedIn, Bluesky, Mastodon** — post the thread
- [ ] **YouTube / Loom walkthrough** — short demo video to link from posts
