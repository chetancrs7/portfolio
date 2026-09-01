# Architecture

This portfolio uses the Next.js App Router as the application foundation, with Server Components preferred by default.

Components will be organized by responsibility: reusable primitives in `components/ui`, layout-level structures in `components/layout`, cross-page pieces in `components/shared`, and page-specific composition in `components/sections`.

Portfolio content will eventually be separated from presentation so project case studies, technical writing, and profile data can evolve independently from UI components. Technical content will later support MDX.

shadcn/ui will be the primary UI foundation, while Magic UI will be used selectively for enhanced visual interactions. Deployment will target Vercel.
