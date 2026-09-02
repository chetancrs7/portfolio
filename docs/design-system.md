# Design System

## Foundations

shadcn/ui provides the base UI primitives. Geist Sans is used for interface and display typography, while Geist Mono is used for metrics, labels, tags, and technical metadata.

## Color

The system is dark-first: near-black backgrounds, charcoal surfaces, soft off-white foreground text, muted cool gray secondary text, and thin low-contrast borders. Cyan, blue, and violet are accent tokens for emphasis only.

Key tokens live in `src/app/globals.css`: `--background`, `--foreground`, `--surface`, `--surface-elevated`, `--border`, `--border-strong`, `--primary`, `--accent-blue`, `--accent-cyan`, `--accent-violet`, `--glow-blue`, and `--glow-violet`.

## Typography

Reusable classes cover display, headings, body text, labels, eyebrow text, and mono metadata: `.type-display`, `.type-h1`, `.type-h2`, `.type-h3`, `.type-h4`, `.type-body-lg`, `.type-body`, `.type-body-sm`, `.type-label`, `.type-eyebrow`, and `.type-mono`.

## Layout

Use `.container-page` for normal page content, `.container-reading` for prose, `.container-wide` for wider technical diagrams, and `.section-space` for responsive vertical rhythm.

## Surfaces

Cards use dark translucent fills, subtle borders, restrained hover states, and optional faint technical texture. The available variants are `default`, `interactive`, `featured`, and `technical`.

## Diagrams

Technical diagrams use `DiagramPanel` for the shared figure shell, with Mermaid diagrams rendered through a client-only `MermaidDiagram` component and flagship visuals authored as custom React SVG components. Complex diagrams keep a readable minimum width and scroll inside the panel on narrow screens.

## Buttons And Badges

Buttons are compact, rounded, and precise. Primary buttons use an off-white fill on the dark background; secondary and outline buttons use dark surfaces with subtle borders. Badges are small, uppercase, mono-styled, and low-contrast, with status, blue, and violet variants for technical labeling.

## Motion

Motion is a restrained enhancement layer over the static portfolio system. Magic UI is used only for installed components that appear in the product: animated gradient text, number ticker, and a single border beam treatment.

Motion rules:

- Hero content uses a short reveal-up sequence with staggered delays.
- The homepage headline uses one slow cyan-to-violet animated gradient accent.
- Availability status uses a subtle dot pulse.
- The technical hero diagram uses slow orbit markers on desktop.
- The first genuine numeric metric may count in once when it enters view.
- Only the flagship work card receives the animated border beam.
- `prefers-reduced-motion: reduce` disables CSS loops, reveals, pulses, and Motion-powered client wrappers.

Deferred effects: animated beams between sections, marquees, particles, custom cursors, parallax, and broad scroll-triggered reveals.
