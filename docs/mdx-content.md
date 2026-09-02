# MDX Content

Long-form Work content lives in `content/work`. Each routable MDX filename must match the Work registry slug exactly:

```txt
slug: "hybrid-sentiment-intelligence-system"
content/work/hybrid-sentiment-intelligence-system.mdx
```

Use kebab-case filenames only.

## Registry And MDX

The Work registry remains the metadata authority for:

- title
- summary
- type
- status
- areas
- technologies
- date
- featured state
- repository/demo/external links
- metrics
- draft state

MDX is the body-content authority. Do not duplicate registry metadata in MDX frontmatter. This branch does not use frontmatter; if it is added later, registry values should win when fields overlap.

## Creating New Content

1. Add WorkItem metadata in `src/content/work/data.ts`.
2. Choose a unique kebab-case slug.
3. Add `contentPath: "content/work/[slug].mdx"` when the long-form content is ready.
4. Create `content/work/[slug].mdx`.
5. Start from the closest template in `docs/templates`.
6. Add technical assets under `public/images/work/[slug]/`.
7. Run the normal validation path with `pnpm build`.

Published Work items without `contentPath` render the polished in-progress fallback.

## Loader And Validation

`src/content/work/mdx.ts` is server-only. It statically maps approved MDX files, extracts H2 headings for the table of contents, and validates content during build.

Validation catches:

- invalid MDX filenames
- duplicate filenames by case
- MDX files without matching Work registry entries
- Work items with `contentPath` but no MDX file
- MDX files that are not present in the approved module map

Draft status is controlled by the Work registry. A draft item is not publicly routable merely because an MDX file exists.

## Heading Rules

Do not add an H1 to Work MDX. The page chrome renders the title.

Use H2 for major sections. H2 headings receive stable anchor IDs through MDX compilation and appear in the TOC. Duplicate headings receive unique IDs through the slugging strategy. H3 headings are styled and anchorable, but are not included in the default TOC.

## Available MDX Components

Common Markdown elements are styled through `src/components/mdx/mdx-components.tsx`:

- headings
- paragraphs
- links
- lists
- blockquotes
- tables
- inline code
- code fences
- horizontal rules

Technical components available in MDX:

- `Callout`
- `Figure`
- `WideContent`
- `DiagramPanel`
- `MermaidDiagram`
- `HybridSentimentArchitecture`
- `ArchitecturePanel` (legacy placeholder, avoid for new content)
- `DataFlow`
- `ApiEndpoint`
- `ApiEndpointList`
- `DatabaseTable`
- `DatabaseTables`
- `EngineeringDecision`
- `EngineeringDecisionList`
- `TradeoffComparison`
- `FailureMode`
- `FailureModeList`
- `BenchmarkTable`
- `ErrorAnalysis`
- `Limitations`

Use JSX components for structured technical evidence. Keep most source content as Markdown prose, lists, and tables.

Use `DiagramPanel` with `MermaidDiagram` for authored technical diagrams, and use custom SVG components for flagship visuals that need specific layout. See `docs/technical-diagrams.md`.

## Images

Use `Figure` for technical images:

```mdx
<Figure
  src="/images/work/example/diagram.png"
  alt="Specific description of the technical figure."
  caption="Optional caption."
/>
```

Store assets by Work slug under `public/images/work/[slug]/`. Do not use vague alt text such as `image`.

## Code Blocks

Code fences render as Shiki-highlighted blocks with compact metadata headers, language labels, optional filenames, copy buttons, optional line numbers, and highlighted lines.

Inline code uses a compact bordered treatment suitable for identifiers such as `account_id`.

Example:

````md
```python title="src/inference/predict.py" showLineNumbers {4-7}
async def predict_sentiment(text: str) -> Prediction:
    return await model.predict(text)
```
````

Use `text` for logs, file trees, output, and pseudocode. See `docs/code-highlighting.md` for the full authoring syntax.

## Metric Honesty

Clearly label metrics as test, validation, oracle, estimate, design target, or assumption. Do not collapse them into vague performance claims.

For system-design MDX, label hypothetical scale numbers explicitly with `ASSUMPTION`, `DESIGN TARGET`, or `ESTIMATE`.

## Fallback Behavior

Published Work without MDX content renders a polished `Case Study In Progress` fallback. Invalid slugs still return 404. Missing MDX for an item with `contentPath` fails validation instead of silently shipping broken content.
