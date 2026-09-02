# Code Highlighting

Code fences in Work MDX are highlighted at build/server time with Shiki through `rehype-pretty-code`. The browser receives highlighted HTML, not a client-side syntax highlighter.

## Supported Languages

Use these fence labels:

- `python` or `py`
- `typescript` or `ts`
- `tsx`
- `javascript` or `js`
- `sql`
- `bash`, `sh`, or `shell`
- `yaml` or `yml`
- `json`
- `dockerfile`
- `markdown` or `md`
- `http`
- `graphql` or `gql`
- `toml`
- `ini`
- `text`

Unknown languages fall back safely during rendering. Prefer `text` for logs, file trees, output, and pseudocode.

## Basic Fence

````md
```python
async def predict(text: str) -> Prediction:
    return await model.predict(text)
```
````

## Filename

Add `title="..."` to show a compact filename in the code header:

````md
```python title="src/inference/predict.py"
async def predict(text: str) -> Prediction:
    return await model.predict(text)
```
````

Long filenames truncate visually in the header. The full value remains available through the element title.

## Line Numbers

Add `showLineNumbers` when line numbers help the explanation:

````md
```ts title="consumer.ts" showLineNumbers
await handleMessage(event);
await queue.ack(event.id);
```
````

Line numbers are CSS-generated and are not part of the copied code.

## Highlighted Lines

Use Shiki line metadata to emphasize important lines:

````md
```sql title="schema.sql" showLineNumbers {1-2}
CREATE INDEX idx_predictions_request_version
    ON sentiment_predictions (request_id, model_version);
```
````

Highlighted lines use a subtle cyan background and left accent. Avoid highlighting entire examples.

## Terminal Blocks

Use `bash`, `sh`, `shell`, or `terminal` for command examples:

````md
```bash title="terminal"
$ pnpm lint
$ pnpm build
```
````

When every non-empty line starts with `$` or `>`, the copy button strips those prompts and copies only the command text.

## Plain Text

Use `text` for logs and file trees:

````md
```text title="worker.log"
INFO  Worker started
WARN  Classification confidence below threshold
```
````

Plain text remains readable without token colors.

## Wide Code

Normal code blocks stay inside the reading column and scroll horizontally when needed. Wrap very wide examples in `WideContent` only when the surrounding explanation truly needs extra width:

````mdx
<WideContent>

```sql title="wide-query.sql" showLineNumbers
SELECT account_id, occurred_at, amount, category, confidence
FROM transactions
WHERE account_id = $1
ORDER BY occurred_at DESC;
```

</WideContent>
````

## Copy Behavior

Every code block gets a small copy button. It copies only the source code:

- no line numbers
- no filename
- no language label
- shell prompts stripped when every command line uses a prompt

The button is keyboard accessible and resets from `Copied` to `Copy` after roughly two seconds. If the Clipboard API is unavailable, the code remains manually selectable.

## Performance Strategy

Highlighting happens through the MDX build/server pipeline. The only hydrated code-related element is the small copy button. The page does not ship Shiki to the browser.

The configured theme is `github-dark-default` with the background disabled so the portfolio surface tokens control the block chrome.

## Security Boundary

Highlighted HTML comes from trusted local MDX content compiled during build/server rendering. Do not pass arbitrary user-submitted code strings into this renderer without a separate sanitization review.

## Authoring Recommendations

Keep code examples curated:

- Prefer snippets that explain a design decision.
- Keep examples under 30-50 lines unless the full context is necessary.
- Label metrics and hypothetical values honestly.
- Use prose before or after a snippet to explain why it exists and how it fails.
