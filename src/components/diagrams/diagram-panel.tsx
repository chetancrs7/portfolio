import type * as React from "react";
import { Maximize2 } from "lucide-react";

import { DiagramExpand } from "@/components/diagrams/diagram-expand";
import { WideContent } from "@/components/work/case-study/technical-blocks";
import { cn } from "@/lib/utils";

type DiagramPanelProps = {
  caption?: string;
  children: React.ReactNode;
  className?: string;
  description?: string;
  expandable?: boolean;
  title: string;
  wide?: boolean;
};

export function DiagramPanel({
  caption,
  children,
  className,
  description,
  expandable = false,
  title,
  wide = false,
}: DiagramPanelProps) {
  const panel = (
    <figure
      className={cn(
        "border-border bg-card/45 my-8 rounded-xl border",
        wide ? "min-w-[52rem]" : "min-w-0",
        className,
      )}
    >
      <div className="border-border flex items-start gap-4 border-b p-5">
        <div className="min-w-0 flex-1">
          <p className="type-mono text-accent-cyan uppercase">{title}</p>
          {description ? (
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              {description}
            </p>
          ) : null}
        </div>
        {expandable ? (
          <div className="shrink-0">
            <DiagramExpand description={description} title={title}>
              <div className="min-w-[52rem]">{children}</div>
            </DiagramExpand>
          </div>
        ) : (
          <Maximize2
            aria-hidden="true"
            className="text-muted-foreground size-4 opacity-45"
          />
        )}
      </div>
      <div className="diagram-surface p-5">{children}</div>
      {caption ? (
        <figcaption className="type-body-sm text-muted-foreground border-border border-t px-5 py-4">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );

  return wide ? <WideContent>{panel}</WideContent> : panel;
}
