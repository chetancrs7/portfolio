"use client";

import { useEffect, useId, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type MermaidDiagramProps = {
  accessibleLabel?: string;
  chart: string;
  className?: string;
};

type MermaidState =
  | { status: "idle" | "loading" }
  | { message: string; status: "error" }
  | { status: "ready"; svg: string };

const mermaidTheme = {
  actorBkg: "#10141d",
  actorBorder: "#50627c",
  actorTextColor: "#f4f7fb",
  background: "transparent",
  edgeLabelBackground: "#0a0d13",
  errorBkgColor: "#2a1116",
  errorTextColor: "#f4f7fb",
  fontFamily: "var(--font-geist-sans), Arial, sans-serif",
  lineColor: "#748096",
  mainBkg: "#10141d",
  nodeBorder: "#50627c",
  noteBkgColor: "#111827",
  noteTextColor: "#d9e2ee",
  primaryBorderColor: "#43d9ff",
  primaryColor: "#10141d",
  primaryTextColor: "#f4f7fb",
  secondaryBorderColor: "#8b5cf6",
  secondaryColor: "#121827",
  secondaryTextColor: "#eef3fa",
  tertiaryBorderColor: "#3b82f6",
  tertiaryColor: "#0f1724",
  tertiaryTextColor: "#eef3fa",
};

let mermaidConfigured = false;

export function MermaidDiagram({
  accessibleLabel,
  chart,
  className,
}: MermaidDiagramProps) {
  const reactId = useId();
  const diagramId = useMemo(
    () => `mermaid-${sanitizeId(reactId)}-${hashChart(chart)}`,
    [chart, reactId],
  );
  const [state, setState] = useState<MermaidState>({ status: "idle" });

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      if (!chart.trim()) {
        setState({
          message: "Diagram source is empty.",
          status: "error",
        });
        return;
      }

      setState({ status: "loading" });

      try {
        const mermaidModule = await import("mermaid");
        const mermaid = mermaidModule.default;

        if (!mermaidConfigured) {
          mermaid.initialize({
            fontFamily: "var(--font-geist-sans), Arial, sans-serif",
            securityLevel: "strict",
            startOnLoad: false,
            theme: "base",
            themeVariables: mermaidTheme,
          });
          mermaidConfigured = true;
        }

        const { svg } = await mermaid.render(diagramId, chart);

        if (!cancelled) {
          setState({ status: "ready", svg });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            message:
              process.env.NODE_ENV === "development"
                ? getErrorMessage(error)
                : "This diagram could not be rendered.",
            status: "error",
          });
        }
      }
    }

    renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [chart, diagramId]);

  if (state.status === "error") {
    return (
      <div
        className={cn(
          "border-destructive/25 bg-destructive/8 text-muted-foreground rounded-lg border p-4 text-sm leading-6",
          className,
        )}
        role="status"
      >
        {state.message}
      </div>
    );
  }

  if (state.status !== "ready") {
    return (
      <div
        aria-label={accessibleLabel ?? "Rendering diagram"}
        className={cn(
          "border-border bg-background/40 text-muted-foreground flex min-h-64 items-center justify-center rounded-lg border text-sm",
          className,
        )}
      >
        Rendering diagram...
      </div>
    );
  }

  return (
    <div
      aria-label={accessibleLabel}
      className={cn(
        "diagram-mermaid text-foreground min-w-[42rem] overflow-x-auto",
        className,
      )}
      data-testid="mermaid-diagram"
      dangerouslySetInnerHTML={{ __html: state.svg }}
      role={accessibleLabel ? "img" : undefined}
    />
  );
}

function sanitizeId(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "");
}

function hashChart(chart: string) {
  let hash = 0;

  for (let index = 0; index < chart.length; index += 1) {
    hash = (hash << 5) - hash + chart.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash).toString(36);
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unable to render diagram.";
}
