# Deployment

This portfolio is a **Next.js (App Router) application** that renders as static
and server-rendered pages. It has **no database**, **no backend API routes**, and
**no server-side form** — the contact flow is a `mailto:` link. That keeps
deployment simple: any Node-compatible host or a managed Next.js platform works.

## Prerequisites

- **Node.js** `>= 20.9` (the repo pins `22` in [`.nvmrc`](.nvmrc); CI uses `22`)
- **pnpm** `11.19.0` (pinned via `packageManager`; run `corepack enable` to match it)

## Environment variables

There is exactly one variable, and it is public and optional (the build succeeds
without it, falling back to a placeholder). See [`.env.example`](.env.example).

| Variable               | Required                  | Scope  | Purpose                                                                                                                                                                                                      |
| ---------------------- | ------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | Recommended in production | Public | Base URL for canonical links, Open Graph, sitemap, robots, and RSS. Set to the canonical production origin, no trailing slash (e.g. `https://yourdomain.com`). Falls back to `https://example.com` if unset. |

No secrets are used anywhere in the project, so nothing needs to be kept
server-side. Never add real secrets to `.env.example`.

## Local production build

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm format:check
pnpm build
pnpm start   # serves the production build on http://localhost:3000 (respects $PORT)
```

## Deploy to Vercel (recommended)

Next.js deploys to Vercel with zero extra configuration — no `vercel.json` is
needed, and the security headers in [`next.config.ts`](next.config.ts) are applied
automatically.

1. Import the repository into Vercel. The framework (Next.js) and package manager
   (pnpm, from the lockfile) are detected automatically.
2. Add the environment variable **`NEXT_PUBLIC_SITE_URL`** = your production
   origin, for the Production environment.
3. Deploy. Vercel builds every pull request as a **preview** and promotes `main`
   to **production**, with automatic HTTPS, CDN, and one-click rollback.
4. Add your custom domain in the Vercel dashboard and pick a canonical host
   (apex `yourdomain.com` **or** `www.yourdomain.com`). Configure the other host
   to redirect to the canonical one; set `NEXT_PUBLIC_SITE_URL` to the canonical
   origin so canonical/OG/sitemap URLs stay consistent.

## Deploy to any Node host

```bash
pnpm install --frozen-lockfile
pnpm build
PORT=3000 pnpm start
```

`next start` binds to `$PORT` (default `3000`). Put it behind a reverse proxy /
platform that terminates TLS. Node `>= 20.9` is required.

## Post-deployment verification

- Routes return **200**: `/`, `/work`, `/work/<project>`, `/writing`,
  `/writing/<article>`, `/about`, `/contact`. A nonexistent route returns **404**.
- `/<origin>/sitemap.xml` and `/<origin>/robots.txt` use the production origin
  (not `localhost`), and drafts are excluded.
- View source on a page: `<link rel="canonical">`, `og:url`, and JSON-LD use the
  production origin.
- The résumé downloads at `/resume.pdf`; fonts, images, and Mermaid diagrams render.
- Security headers are present on responses (`X-Content-Type-Options`,
  `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`).

## Continuous integration

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on pull requests and
pushes to `main`: `pnpm install --frozen-lockfile`, then `lint`, `typecheck`,
`format:check`, and `build`. A failure in any step fails the build, so broken code
does not reach production.
