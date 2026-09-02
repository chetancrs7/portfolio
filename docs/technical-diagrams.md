# Technical Diagrams

Work case studies support two diagram paths:

- `MermaidDiagram` for text-authored flowcharts, sequence diagrams, and ER diagrams.
- Custom React SVG components for flagship diagrams that need portfolio-specific layout or interpretation.

Both paths should be wrapped in `DiagramPanel` so captions, expand behavior, overflow, and visual treatment stay consistent.

## Architecture

`DiagramPanel` is a server component. It owns the figure structure, title, description, optional caption, wide-content wrapping, and optional expand trigger.

`MermaidDiagram` is a client component. It dynamically imports `mermaid`, configures a dark theme, renders SVG client-side, and reports render errors without exposing Mermaid source in production UI.

Custom diagrams live under `src/components/diagrams/custom`. They are normal React SVG components and should include `role="img"`, a `<title>`, and a `<desc>`.

## Server And Client Boundary

MDX pages remain server-rendered by default. Only Mermaid rendering and the optional expand dialog cross into client components:

- `DiagramPanel`: server
- `DiagramExpand`: client
- `MermaidDiagram`: client
- custom SVG diagrams: server unless they need interaction

This keeps Mermaid out of pages that do not render a Mermaid component and avoids loading a global Mermaid script.

## Mermaid Authoring

Use Mermaid when the source should stay editable in MDX:

```mdx
<DiagramPanel title="Service flow" expandable wide>
  <MermaidDiagram
    accessibleLabel="Service flow from API to queue and worker."
    chart={`flowchart LR
  API[API] --> Queue[Queue]
  Queue --> Worker[Worker]
  Worker --> Store[(Store)]`}
  />
</DiagramPanel>
```

Supported diagram types currently used in content:

- `flowchart`
- `sequenceDiagram`
- `erDiagram`

Keep labels concise and avoid generic examples such as Alice/Bob in portfolio case studies.

## IDs And Errors

Mermaid element IDs are generated from React `useId()` plus a stable hash of the chart source. Do not use `Math.random()` or date-based IDs; they can cause hydration mismatch or duplicate SVG IDs.

In development, Mermaid render errors show the parser message. In production, users see a generic render failure instead of source details.

## Theming

Mermaid uses `theme: "base"` with portfolio color tokens mapped into Mermaid theme variables. Shared CSS in `src/app/globals.css` normalizes Mermaid SVG sizing, text, label backgrounds, and horizontal overflow.

Custom SVG diagrams use the same token classes:

- `.diagram-svg`
- `.diagram-canvas`
- `.diagram-node`
- `.diagram-connector`
- `.diagram-annotation`

## Responsive Behavior

Complex diagrams intentionally keep a readable minimum width and scroll horizontally inside `.diagram-surface` on narrow screens. This is preferable to shrinking text until labels become unreadable.

Use `wide` on `DiagramPanel` for architecture, sequence, ER, and multi-node diagrams. Smaller inline diagrams can omit `wide`.

## Expand Behavior

Set `expandable` for diagrams that may be hard to inspect at article width. The expand action opens a dialog with the same diagram content in a larger scrollable surface.

## Current Custom Diagram

`HybridSentimentArchitecture` visualizes the hybrid sentiment pipeline:

- clean tweet input
- DeBERTa semantic branch
- structural feature branch
- KAN semantic expert
- XGBoost expert
- fusion gate
- final sentiment probability

It includes the known interpretation that mean gate alpha is approximately 0.924.

## Deferred

`content/flagship-case-study` should own any future deep flagship narrative, including richer interactive explainers, expanded ML error slices, and production screenshots. This phase only adds reusable diagram infrastructure and representative diagrams to existing case studies.
