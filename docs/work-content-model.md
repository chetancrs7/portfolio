# Work Content Model

The Work system uses local structured content under `src/content/work`. It is designed for static generation, future MDX detail pages, and filtering without adding a CMS or database.

## Core Types

Canonical work categories:

- `project`
- `research`
- `system-design`
- `writing`
- `lab`

Canonical technical areas:

- `backend`
- `ai-ml`
- `distributed-systems`
- `databases`
- `infrastructure`
- `retrieval`
- `nlp`
- `observability`
- `security`

Canonical statuses:

- `active`
- `completed`
- `research`
- `prototype`
- `design-study`
- `archived`

Display labels live beside the model so UI components do not repeat string conversion logic.

## Registry

`src/content/work/data.ts` stores the raw local entries. `src/content/work/index.ts` validates and exports the canonical registry:

- `workItems`
- `getAllWork()`
- `getPublishedWork()`
- `getFeaturedWork()`
- `getWorkBySlug(slug)`
- `getWorkByType(type)`
- `getWorkByArea(area)`
- `sortWorkByDate(items)`
- `sortFeaturedWork(items)`

UI code should import from `@/content/work` rather than importing schema or data internals directly.

## Validation

Zod validates every registry item during module initialization. Validation fails loudly for invalid types, statuses, areas, dates, empty required text, malformed URLs, and non-URL-safe slugs. Duplicate slugs are checked after schema validation and throw an error.

Slugs must be lowercase and URL-safe. Dates must use `YYYY-MM` or `YYYY-MM-DD` so content can sort consistently.

## Sorting

Published work is sorted by date descending. Featured work is sorted by `priority` ascending, then date descending. Undefined priority is treated as lower precedence than numbered priority.

Draft entries use `draft: true` and are excluded from published, featured, type, area, and default slug queries.

## Metrics

Metrics are optional and should only be included when genuinely measured. Do not add claims such as production scale, uptime, users, or throughput without evidence. Hypothetical scale belongs in `systemDesign.scaleAssumptions`, not metrics.

## Future MDX

The registry is index metadata. Detailed case studies, research sections, architecture diagrams, code blocks, Shiki highlighting, Mermaid diagrams, and SEO metadata will come later.

Current convention:

```txt
content/work/{slug}.mdx
```

The `contentPath` field records that intended mapping, but this branch does not install or load MDX.

## Current Placeholders

The initial entries are representative portfolio examples based on backend systems, AI/ML, retrieval, geofencing-style service design, event-driven workflows, and network/security-oriented engineering. They should be refined in future content branches before final publication.

Deferred to `feat/work-page`: final Work page UI, filters, detail routes, MDX rendering, syntax highlighting, diagrams, search, pagination, and per-item SEO.
