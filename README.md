# Backend + AI/ML Engineering Portfolio

A modern developer portfolio showcasing backend engineering, AI/ML projects, system design case studies, technical research, and engineering insights.

## Status

This portfolio is under active development. The current branch establishes the project foundation only; final portfolio pages, visual design, content systems, and enhanced interactions will be added in later branches.

## Technology Foundation

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- pnpm
- ESLint
- Prettier
- Vercel-ready project structure

Planned future additions include shadcn/ui, Magic UI, MDX, Shiki, Mermaid, Zod, Resend, Playwright, Vitest, and analytics.

## Local Development

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Available Scripts

- `pnpm dev` - start the local development server
- `pnpm build` - create a production build
- `pnpm start` - run the production server
- `pnpm lint` - run ESLint
- `pnpm typecheck` - run TypeScript checks
- `pnpm format` - format the repository with Prettier
- `pnpm format:check` - check formatting without writing changes

## Project Structure

```text
src/
  app/
  components/
    ui/
    layout/
    shared/
    sections/
  config/
  content/
  hooks/
  lib/
  types/
public/
  documents/
  icons/
  images/
docs/
tests/
.github/workflows/
```

## Branch and Development Workflow

Use short-lived branches for focused changes. Bootstrap work lives on `chore/project-bootstrap`; future feature branches should keep setup, design-system work, content modeling, and integrations separated where practical.

Pull requests should pass linting, type checks, formatting checks, and production builds before merging into `main`.

## Environment Variables

Copy `.env.example` to `.env.local` for local development and fill in values as needed. Do not commit real secrets.
