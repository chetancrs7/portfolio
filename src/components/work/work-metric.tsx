import { cn } from "@/lib/utils";
import type { WorkMetric as WorkMetricValue } from "@/content/work";

type WorkMetricProps = {
  className?: string;
  metric: WorkMetricValue;
};

export function WorkMetric({ className, metric }: WorkMetricProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <p className="type-mono text-muted-foreground uppercase">
        {metric.label}
      </p>
      <p className="text-foreground mt-1 font-mono text-xl font-semibold">
        {metric.value}
      </p>
      {metric.description ? (
        <p className="type-body-sm text-muted-foreground mt-2">
          {metric.description}
        </p>
      ) : null}
    </div>
  );
}
