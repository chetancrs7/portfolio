import { WorkMetric } from "@/components/work/work-metric";
import type { WorkMetric as WorkMetricValue } from "@/content/work";

type MetricStripProps = {
  metrics?: WorkMetricValue[];
};

export function MetricStrip({ metrics }: MetricStripProps) {
  if (!metrics || metrics.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Key metrics"
      className="border-border bg-card/55 grid gap-5 rounded-xl border p-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      {metrics.map((metric) => (
        <WorkMetric key={metric.label} metric={metric} />
      ))}
    </section>
  );
}
