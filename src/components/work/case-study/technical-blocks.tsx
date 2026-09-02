import {
  type ApiEndpointData,
  type ArchitecturePanelData,
  type BenchmarkTableData,
  type DataFlowData,
  type DatabaseTableData,
  type EngineeringDecisionData,
  type ErrorAnalysisData,
  type FailureModeData,
  type TradeoffOptionData,
} from "@/components/work/case-study/types";
import { cn } from "@/lib/utils";
import type * as React from "react";

export function WideContent({ children }: { children: React.ReactNode }) {
  return <div className="min-w-0 overflow-x-auto py-1">{children}</div>;
}

export function ConstraintList({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item, index) => (
        <div
          className="border-border bg-card/45 grid gap-3 rounded-lg border p-4 sm:grid-cols-[3rem_1fr]"
          key={item}
        >
          <span className="type-mono text-accent-cyan">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="text-muted-foreground text-sm leading-6">{item}</p>
        </div>
      ))}
    </div>
  );
}

type ArchitecturePanelProps = Partial<ArchitecturePanelData> & {
  children?: React.ReactNode;
  panel?: ArchitecturePanelData;
};

export function ArchitecturePanel({
  caption,
  children,
  description,
  nodes: directNodes,
  panel,
  title,
}: ArchitecturePanelProps) {
  const panelData = panel ?? {
    caption,
    description,
    nodes: directNodes,
    title: title ?? "Architecture",
  };
  const nodes = panelData.nodes ?? [];

  return (
    <WideContent>
      <figure className="border-border bg-card/45 min-w-[42rem] rounded-xl border p-5">
        <figcaption>
          <p className="type-mono text-accent-cyan uppercase">
            {panelData.title}
          </p>
          {panelData.description ? (
            <p className="text-muted-foreground mt-2 max-w-3xl text-sm leading-6">
              {panelData.description}
            </p>
          ) : null}
        </figcaption>
        {nodes.length > 0 ? (
          <div aria-hidden="true" className="mt-6 flex items-center gap-3">
            {nodes.map((node, index) => (
              <div
                className="flex min-w-0 flex-1 items-center gap-3"
                key={node}
              >
                <div className="border-accent-blue/25 bg-background/60 rounded-lg border px-3 py-4 text-center shadow-[inset_0_1px_0_rgb(255_255_255_/_0.04)]">
                  <span className="type-mono text-foreground">{node}</span>
                </div>
                {index < nodes.length - 1 ? (
                  <div className="bg-border-strong h-px min-w-5 flex-1" />
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
        {children ? <div className="mt-6">{children}</div> : null}
        {panelData.caption ? (
          <p className="type-body-sm text-muted-foreground mt-5">
            {panelData.caption}
          </p>
        ) : null}
      </figure>
    </WideContent>
  );
}

type DataFlowProps = Partial<DataFlowData> & {
  flow?: DataFlowData;
};

export function DataFlow({ caption, flow, steps }: DataFlowProps) {
  const flowData = flow ?? {
    caption,
    steps: steps ?? [],
  };

  if (flowData.steps.length === 0) {
    return null;
  }

  return (
    <WideContent>
      <figure className="min-w-[38rem]">
        <div className="border-border bg-card/45 flex items-center gap-3 rounded-xl border p-4">
          {flowData.steps.map((step, index) => (
            <div className="flex min-w-0 flex-1 items-center gap-3" key={step}>
              <div className="border-accent-cyan/25 bg-accent-cyan/8 min-w-24 flex-1 rounded-lg border px-3 py-3 text-center">
                <span className="type-mono text-foreground">{step}</span>
              </div>
              {index < flowData.steps.length - 1 ? (
                <span className="text-muted-foreground" aria-hidden="true">
                  /
                </span>
              ) : null}
            </div>
          ))}
        </div>
        {flowData.caption ? (
          <figcaption className="type-body-sm text-muted-foreground mt-3">
            {flowData.caption}
          </figcaption>
        ) : null}
      </figure>
    </WideContent>
  );
}

export function ApiEndpoint(endpoint: ApiEndpointData) {
  return <ApiEndpointList endpoints={[endpoint]} />;
}

export function ApiEndpointList({
  endpoints,
}: {
  endpoints: ApiEndpointData[];
}) {
  return (
    <div className="border-border bg-card/45 overflow-hidden rounded-xl border">
      {endpoints.map((endpoint) => (
        <div
          className="border-border grid gap-3 border-b p-4 last:border-b-0 sm:grid-cols-[5rem_1fr]"
          key={`${endpoint.method}-${endpoint.path}`}
        >
          <span
            className={cn(
              "type-mono w-fit rounded-full border px-2 py-1",
              methodClasses[endpoint.method],
            )}
          >
            {endpoint.method}
          </span>
          <div className="min-w-0">
            <p className="text-foreground font-mono text-sm break-words">
              {endpoint.path}
            </p>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              {endpoint.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DatabaseTable(table: DatabaseTableData) {
  return <DatabaseTables tables={[table]} />;
}

export function DatabaseTables({ tables }: { tables: DatabaseTableData[] }) {
  return (
    <div className="grid gap-4">
      {tables.map((table) => (
        <div
          className="border-border bg-card/45 rounded-xl border p-5"
          key={table.name}
        >
          <p className="type-mono text-accent-cyan">{table.name}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {table.columns.map((column) => (
              <code
                className="border-border bg-background/45 text-muted-foreground rounded-full border px-2 py-1 text-xs"
                key={column}
              >
                {column}
              </code>
            ))}
          </div>
          {table.indexes && table.indexes.length > 0 ? (
            <div className="border-border mt-5 space-y-3 border-t pt-4">
              {table.indexes.map((index) => (
                <div key={index.columns}>
                  <p className="type-mono text-foreground">
                    INDEX {index.columns}
                  </p>
                  <p className="text-muted-foreground mt-1 text-sm leading-6">
                    {index.reason}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function EngineeringDecision(decision: EngineeringDecisionData) {
  return <EngineeringDecisionList decisions={[decision]} />;
}

export function EngineeringDecisionList({
  decisions,
}: {
  decisions: EngineeringDecisionData[];
}) {
  return (
    <div className="space-y-4">
      {decisions.map((decision) => (
        <article
          className="border-border bg-card/45 rounded-xl border p-5"
          key={decision.id}
        >
          <p className="type-mono text-accent-violet">{decision.id}</p>
          <h3 className="text-foreground mt-2 text-lg font-semibold">
            {decision.title}
          </h3>
          <dl className="mt-5 grid gap-4">
            {decision.context ? (
              <DecisionRow label="Context" value={decision.context} />
            ) : null}
            {decision.options && decision.options.length > 0 ? (
              <div>
                <dt className="type-mono text-muted-foreground uppercase">
                  Options
                </dt>
                <dd className="text-muted-foreground mt-2 text-sm leading-6">
                  {decision.options.join(" / ")}
                </dd>
              </div>
            ) : null}
            <DecisionRow label="Decision" value={decision.decision} />
            {decision.tradeoffs && decision.tradeoffs.length > 0 ? (
              <div>
                <dt className="type-mono text-muted-foreground uppercase">
                  Tradeoffs
                </dt>
                <dd className="mt-2">
                  <ul className="text-muted-foreground space-y-2 text-sm leading-6">
                    {decision.tradeoffs.map((tradeoff) => (
                      <li key={tradeoff}>{tradeoff}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ) : null}
          </dl>
        </article>
      ))}
    </div>
  );
}

export function Tradeoff(option: TradeoffOptionData) {
  return <TradeoffComparison options={[option]} />;
}

export function TradeoffComparison({
  options,
}: {
  options: TradeoffOptionData[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {options.map((option) => (
        <article
          className="border-border bg-card/45 rounded-xl border p-5"
          key={option.label}
        >
          <p className="type-mono text-accent-cyan">{option.label}</p>
          <p className="type-mono text-muted-foreground mt-2 uppercase">
            {option.status}
          </p>
          <ul className="text-muted-foreground mt-4 space-y-2 text-sm leading-6">
            {option.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function FailureMode(mode: FailureModeData) {
  return <FailureModeList modes={[mode]} />;
}

export function FailureModeList({ modes }: { modes: FailureModeData[] }) {
  return (
    <div className="space-y-4">
      {modes.map((mode) => (
        <article
          className="border-border bg-card/45 rounded-xl border p-5"
          key={mode.title}
        >
          <p className="type-mono text-accent-cyan uppercase">{mode.title}</p>
          <dl className="mt-4 grid gap-4 sm:grid-cols-3">
            <DecisionRow label="Failure" value={mode.failure} />
            <DecisionRow label="Behavior" value={mode.behavior} />
            <DecisionRow label="Protection" value={mode.protection} />
          </dl>
        </article>
      ))}
    </div>
  );
}

type BenchmarkTableProps = Partial<BenchmarkTableData> & {
  table?: BenchmarkTableData;
};

export function BenchmarkTable({
  caption,
  columns,
  highlightRow,
  rows,
  table,
}: BenchmarkTableProps) {
  const tableData = table ?? {
    caption,
    columns: columns ?? [],
    highlightRow,
    rows: rows ?? [],
  };
  const firstColumn = tableData.columns[0];

  if (!firstColumn || tableData.rows.length === 0) {
    return null;
  }

  return (
    <WideContent>
      <table className="border-border bg-card/45 min-w-[38rem] overflow-hidden rounded-xl border text-left text-sm">
        {tableData.caption ? (
          <caption className="type-body-sm text-muted-foreground caption-bottom pt-3 text-left">
            {tableData.caption}
          </caption>
        ) : null}
        <thead>
          <tr className="border-border border-b">
            {tableData.columns.map((column) => (
              <th
                className="type-mono text-muted-foreground px-4 py-3 uppercase"
                key={column}
                scope="col"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.rows.map((row, index) => {
            const isHighlighted =
              tableData.highlightRow &&
              row[firstColumn] === tableData.highlightRow;

            return (
              <tr
                className={cn(
                  "border-border border-b last:border-b-0",
                  isHighlighted ? "bg-accent-cyan/6" : undefined,
                )}
                key={`${row[firstColumn]}-${index}`}
              >
                {tableData.columns.map((column) => (
                  <td
                    className={cn(
                      "px-4 py-3 align-top",
                      column === firstColumn
                        ? "text-foreground font-medium"
                        : "text-muted-foreground font-mono",
                    )}
                    key={column}
                  >
                    {row[column]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </WideContent>
  );
}

export function ErrorAnalysis(item: ErrorAnalysisData) {
  return <ErrorAnalysisList items={[item]} />;
}

export function ErrorAnalysisList({ items }: { items: ErrorAnalysisData[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <article
          className="border-border bg-card/45 rounded-xl border p-5"
          key={item.type}
        >
          <p className="type-mono text-accent-violet uppercase">{item.type}</p>
          <dl className="mt-4 grid gap-4">
            <DecisionRow label="Observation" value={item.observation} />
            <DecisionRow label="Likely Cause" value={item.likelyCause} />
            <DecisionRow
              label="Possible Improvement"
              value={item.possibleImprovement}
            />
          </dl>
        </article>
      ))}
    </div>
  );
}

export function Limitations({ items }: { items: string[] }) {
  return <LimitationList items={items} />;
}

export function LimitationList({ items }: { items: string[] }) {
  return (
    <div className="border-border bg-card/45 rounded-xl border p-5">
      <ul className="text-muted-foreground space-y-3 text-sm leading-6">
        {items.map((item) => (
          <li className="flex gap-3" key={item}>
            <span className="type-mono text-accent-cyan">LIMIT</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const methodClasses: Record<ApiEndpointData["method"], string> = {
  DELETE: "border-destructive/25 bg-destructive/10 text-red-200",
  GET: "border-accent-cyan/25 bg-accent-cyan/8 text-accent-cyan",
  PATCH: "border-accent-violet/25 bg-accent-violet/10 text-violet-200",
  POST: "border-accent-blue/25 bg-accent-blue/10 text-blue-200",
  PUT: "border-accent-teal/25 bg-accent-teal/10 text-teal-200",
};

function DecisionRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="type-mono text-muted-foreground uppercase">{label}</dt>
      <dd className="text-muted-foreground mt-2 text-sm leading-6">{value}</dd>
    </div>
  );
}
