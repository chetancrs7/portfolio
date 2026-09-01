import * as React from "react";

import { cn } from "@/lib/utils";

type MetricProps = React.HTMLAttributes<HTMLDivElement> & {
  label: string;
  value: string;
  detail?: string;
};

export function Metric({
  className,
  detail,
  label,
  value,
  ...props
}: MetricProps) {
  return (
    <div className={cn("min-w-0", className)} {...props}>
      <p className="text-foreground font-mono text-2xl font-semibold sm:text-3xl">
        {value}
      </p>
      <p className="type-mono text-muted-foreground mt-1 uppercase">{label}</p>
      {detail ? (
        <p className="type-body-sm text-muted-foreground mt-3">{detail}</p>
      ) : null}
    </div>
  );
}
