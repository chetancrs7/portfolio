import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/sections/home/section-heading";
import {
  technicalAreaLabels,
  workAreaFilters,
  type WorkItem,
} from "@/content/work";

type WorkAreasSummaryProps = {
  items: WorkItem[];
};

export function WorkAreasSummary({ items }: WorkAreasSummaryProps) {
  const areas = workAreaFilters.map((filter) => ({
    ...filter,
    count: items.filter((item) => item.areas.includes(filter.area)).length,
  }));

  return (
    <section className="section-space pt-0">
      <PageContainer>
        <SectionHeading
          description="A compact view of the archive's current technical emphasis."
          eyebrow="Areas"
          title="Where the work clusters."
        />

        <div className="border-border bg-border mt-10 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <Link
              className="bg-background/86 hover:bg-muted/30 focus-visible:ring-ring/45 p-5 transition-colors outline-none focus-visible:ring-3"
              href={`/work?area=${area.area}`}
              key={area.area}
            >
              <p className="type-h4">{technicalAreaLabels[area.area]}</p>
              <p className="type-mono text-muted-foreground mt-3 uppercase">
                {area.count} {area.count === 1 ? "piece" : "pieces"}
              </p>
            </Link>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
