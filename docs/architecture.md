# Architecture

This portfolio uses the Next.js App Router as the application foundation, with Server Components preferred by default.

Components will be organized by responsibility: reusable primitives in `components/ui`, layout-level structures in `components/layout`, cross-page pieces in `components/shared`, and page-specific composition in `components/sections`.

Portfolio content will eventually be separated from presentation so project case studies, technical writing, and profile data can evolve independently from UI components. Technical content will later support MDX.

shadcn/ui will be the primary UI foundation, while Magic UI will be used selectively for enhanced visual interactions. Deployment will target Vercel.

## Design System

shadcn/ui is the component foundation for reusable interface primitives. The portfolio uses a dark-first visual system with near-black backgrounds, charcoal surfaces, soft off-white foreground text, and restrained cyan, blue, and violet accents.

Static visual effects should favor CSS over JavaScript. Technical grids, ambient glows, borders, and surface highlights are token-driven so later portfolio sections can reuse them without introducing animation dependencies.

Magic UI is intentionally deferred to a later enhancement phase and should only augment selected interactions once the base interface is strong on its own. Accessibility takes priority over decorative effects, including focus states, contrast, reduced-motion compatibility, and semantic controls.
