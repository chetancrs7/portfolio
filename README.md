# Backend + AI/ML Engineering Portfolio

The portfolio of **Chetan Rao Sonoo** — a backend and AI/ML engineer. It presents
technical projects, system-design case studies, AI/ML research, and engineering
writing, with an emphasis on architecture, evaluation, and honest tradeoffs rather
than marketing.

## Tech stack

Only what the site actually uses:

- **Next.js** (App Router, Turbopack) + **React** + **TypeScript**
- **Tailwind CSS** with **shadcn/ui** primitives and a small set of custom
  motion/border effects
- **MDX** (`@next/mdx` + `remark-gfm`) for case studies and articles
- **Shiki** (via `rehype-pretty-code`) for code highlighting; **Mermaid** for diagrams
- **Zod** for content-model validation
- **Geist Sans / Geist Mono** via `next/font`
- **GitHub Actions** for CI

There is no database, no backend API, and no server-side form — the contact flow
is a `mailto:` link, so the app is entirely static/SSR.

## Architecture

```text
Browser
  ↓
Next.js App Router  (static + server-rendered pages)
  ↓
Content registries (TypeScript + Zod)  →  MDX case studies & articles
  ↓
Static assets / fonts  →  Deployment platform CDN
```

Content is single-sourced: the Work and Writing **registries** (`src/content/*`)
hold typed, Zod-validated metadata, while long-form content lives in **MDX**
(`content/*`). Drafts and future-dated posts are filtered centrally, so they never
reach the sitemap, RSS, or any listing. See [`docs/architecture.md`](docs/architecture.md).

## Local development

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Requires Node `>= 20.9` (see [`.nvmrc`](.nvmrc)) and pnpm `11.19.0`
(`corepack enable`).

## Scripts

- `pnpm dev` — start the dev server
- `pnpm build` — production build
- `pnpm start` — serve the production build
- `pnpm lint` — ESLint
- `pnpm typecheck` — TypeScript (`tsc --noEmit`)
- `pnpm format` / `pnpm format:check` — Prettier

## Deployment

Deploys to Vercel with zero configuration, or to any Node `>= 20.9` host via
`pnpm build && pnpm start`. The one (optional, public) environment variable is
`NEXT_PUBLIC_SITE_URL`. Full instructions and a verification checklist are in
[`DEPLOYMENT.md`](DEPLOYMENT.md).

<!-- Live site: add the URL here once deployed. -->

## Project structure

```text
content/         MDX case studies and articles
src/
  app/           routes, sitemap, robots, error pages
  components/     UI, layout, work/writing, diagrams, MDX
  config/         site + navigation configuration
  content/        Work and Writing registries (typed + Zod)
  data/           profile / homepage content
docs/            architecture and authoring notes
public/          favicon, résumé, images
.github/workflows/ CI
```

## Workflow

Short-lived feature branches → pull request → CI (lint, typecheck, format, build)
→ review → merge to `main` → deploy. CI must pass before merge.
