# Work Page

The `/work` page is the central technical archive for projects, research, system design, technical writing, and labs. It consumes the canonical registry from `@/content/work`; it does not define its own project data.

## Page Hierarchy

1. Work header with concise positioning copy and registry-derived counts.
2. Featured Work with one flagship card and supporting featured items.
3. Explore Work with URL-aware type and area filters.
4. All matching work cards.
5. Technical-area summary with derived counts.
6. Small Experience / Contact CTA.

The page should feel like an engineering knowledge base, not a thumbnail gallery.

## Filtering

Filters are link-based and server-rendered. No client state is required.

Supported query params:

- `type=project`
- `type=research`
- `type=system-design`
- `type=writing`
- `type=lab`
- `area=backend`
- `area=ai-ml`
- `area=distributed-systems`
- `area=databases`
- `area=infrastructure`
- `area=retrieval`

Type and area filters can be combined, for example `/work?type=project&area=backend`. Invalid values are ignored and fall back to the unfiltered archive.

Active filters use `aria-current="page"` and visible indicators. The clear link returns to `/work`.

## Sorting

The page uses content helpers instead of sorting in JSX:

- Featured work: priority ascending, then newest first.
- Archive work: newest first.
- Draft content: excluded through `getPublishedWork()`.

Featured items also appear in the full archive so filters remain complete.

## Cards

`WorkCard` renders all WorkType values with the same structural system:

- type label
- title
- summary
- technical areas
- selected technologies
- date
- optional useful status
- optional genuine metrics
- Explore action

Cards do not require cover images. Technologies are capped so tooling does not overwhelm the technical summary.

System design cards show `Design Study` and clarify that assumptions are not measured production results.

## Routes

Explore links resolve to `/work/[slug]`. This branch includes minimal placeholder detail routes for published work so links are not broken. Full case-study layouts are intentionally deferred.

## Boundaries

The `/work` page is a Server Component. Filtering is handled through search params and links, with no global state or client filtering store.

Deferred to `feat/work-case-studies`: full MDX case studies, Shiki, Mermaid, architecture diagrams, benchmark tables, search, pagination, and per-item SEO.
