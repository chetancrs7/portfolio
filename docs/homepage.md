# Homepage

The homepage is composed from focused Server Components in `src/components/sections/home`. The root route stays small and only assembles the sections.

## Sections

- Hero: status badge, technical headline, description, Work CTA, GitHub CTA, and a static systems visual.
- Credibility strip: safe, non-fabricated focus indicators instead of inflated performance metrics.
- Engineering focus: backend systems, AI/ML systems, and infrastructure.
- Featured work: three temporary featured pieces with a larger flagship card and two supporting cards.
- Engineering approach: concise principles using numbered technical rows.
- Latest thinking: writing previews that safely link to `/work` until article routes exist.
- Experience preview: placeholder role, research, and education entries.
- Contact CTA: final route into `/contact` plus secondary GitHub action.

## Data Strategy

Repeated homepage content lives in `src/data/home.ts`. This is intentionally lightweight and temporary so later branches can migrate real work, writing, and experience content into richer models without rewriting the page structure.

## Rendering

Homepage sections are Server Components. The only existing client boundaries remain in global navigation where active route state and the mobile Sheet require browser behavior.

## Visual Hierarchy

The page uses the existing dark design system, technical grid, ambient glow, cards, badges, and typography utilities. The hero carries the largest display type; later sections use quieter headings, separators, and surface changes rather than heavy animation.
