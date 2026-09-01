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

## Buttons And Badges

Buttons are compact, rounded, and precise. Primary buttons use an off-white fill on the dark background; secondary and outline buttons use dark surfaces with subtle borders. Badges are small, uppercase, mono-styled, and low-contrast, with status, blue, and violet variants for technical labeling.

## Motion

Motion is limited to CSS transitions for color, border, background, opacity, and very small active-state movement. Magic UI, Motion, parallax, cursor-following effects, and constant background animation are deferred.
