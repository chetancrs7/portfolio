# Work Case Studies

The `/work/[slug]` route is the reusable detail-page system for portfolio work. It is designed to read like an engineering design document, research report, or architecture case study instead of a marketing gallery.

## Dynamic Route Behavior

`src/app/work/[slug]/page.tsx` resolves work items with `getWorkBySlug(slug)`. Unknown slugs call `notFound()` so broken URLs render the framework 404 instead of an empty detail shell.

The route is primarily server-rendered. It reads local registry and detail content directly; there are no API routes for local case-study data.

## Static Generation

`generateStaticParams()` is derived from `getPublishedWork()`, which excludes items marked `draft: true`. Draft slugs are therefore not generated and are also excluded from normal lookup.

`generateMetadata()` sets the page title and description from the Work item:

- `title`: item title plus the portfolio author name
- `description`: item summary

Full SEO metadata, canonical URLs, JSON-LD, dynamic Open Graph fields, and social cards remain deferred to `feat/seo-metadata`.

## WorkType Templates

The temporary template registry in `src/content/work/details/templates.ts` defines the supported section order for every current WorkType:

- `project`
- `research`
- `system-design`
- `writing`
- `lab`

Each WorkType has its own section vocabulary. Project pages can emphasize backend architecture, APIs, data flow, failure modes, and decisions. Research pages can emphasize hypothesis, baselines, methodology, metrics, results, and error analysis. System-design pages explicitly include requirements, scale assumptions, reliability, alternatives, and limitations. Writing and lab structures are present for future detail content without forcing them into the project template.

Only sections with content are rendered, so pages do not show empty headings.

## Shared Section System

Reusable components live in `src/components/work/case-study/`:

- `CaseStudyHeader`
- `TechnicalSnapshot`
- `MetricStrip`
- `CaseStudySection`
- `CaseStudyToc`
- `DiagramPanel`
- `MermaidDiagram`
- `HybridSentimentArchitecture`
- `ArchitecturePanel`
- `DataFlow`
- `ApiEndpointList`
- `DatabaseTables`
- `EngineeringDecisionList`
- `TradeoffComparison`
- `FailureModeList`
- `BenchmarkTable`
- `ErrorAnalysisList`
- `LimitationList`
- `CaseStudyNavigation`

`CaseStudySection` standardizes heading hierarchy, section spacing, stable anchor IDs, and sticky-header offset via `scroll-mt-28`.

## TOC Behavior

The table of contents accepts section metadata from the renderer. It does not parse HTML headings. On desktop it appears in a restrained sticky sidebar with the technical snapshot. On mobile it renders as a compact in-flow navigation near the top of the article.

Active-section tracking and scroll spy behavior are intentionally not implemented yet.

## Technical Snapshot And Metrics

`TechnicalSnapshot` renders compact metadata from the Work registry:

- role
- type
- status
- stack
- date
- repository link when present

`MetricStrip` renders only when a Work item has genuine registry metrics. The hybrid sentiment project currently exposes known values for test accuracy, Macro F1, AUC, and ECE.

Metric labels describe what the number represents. The system avoids vague claims like generic AI performance.

## Architecture And Data Flow

`DiagramPanel` provides the standard figure shell for technical diagrams, including title, description, caption, wide layout, horizontal overflow, and optional expand behavior.

`MermaidDiagram` renders text-authored diagrams inside a small client boundary. Flowcharts, sequence diagrams, and ER diagrams are the preferred defaults for case-study architecture, request lifecycles, and data relationships.

`HybridSentimentArchitecture` is the current custom React SVG flagship diagram. Custom SVG diagrams should be used when a case study needs a precise visual explanation that Mermaid cannot express cleanly.

`ArchitecturePanel` and `DataFlow` remain available as legacy structured blocks, but new MDX content should start with `DiagramPanel`.

## Technical Evidence Patterns

The system supports:

- API endpoint lists with restrained HTTP method styling
- compact database table/index presentations with reasons for indexes
- ADR-like engineering decisions
- contextual tradeoff comparisons
- reliability failure modes with failure, behavior, and protection fields
- benchmark and research-result tables
- structured error analysis for AI/ML work
- visible limitations and final lessons

Technical tables and diagrams are wrapped in overflow containers so they can remain readable on mobile.

## MDX Detail Content

Long-form detail content lives in `content/work` as MDX. The Work registry remains responsible for canonical metadata such as slug, title, summary, type, status, technologies, metrics, and links.

The MDX layer handles long-form sections only. It keeps prose close to the content while importing structured evidence blocks through the shared MDX component map.

Current rich examples:

- Project: `hybrid-sentiment-intelligence-system`
- Research: `semantic-structural-sentiment-fusion`
- System design: `distributed-notification-architecture`

Other published work items render a polished `Case Study In Progress` state with planned template sections and any available actions.

## Disclosures

System-design pages and `design-study` status pages show a clear `Design Study` disclosure near the top. The copy states that the page is an architecture exercise based on assumptions and is not presented as a production deployment.

Research pages show a `Research / Experiment` disclosure so prototype or experimental work is not framed as production software.

## Technical Diagrams

Deferred to `content/flagship-case-study`: deeper flagship storytelling, richer interactive explainers, production screenshots, and expanded ML error slices.

The current diagram system focuses on reusable infrastructure for existing case studies. See `docs/technical-diagrams.md` for authoring, accessibility, responsive, and Mermaid error-handling notes.
