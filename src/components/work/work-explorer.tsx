import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/sections/home/section-heading";
import { WorkFilters } from "@/components/work/work-filters";
import { WorkGrid } from "@/components/work/work-grid";
import type { TechnicalArea, WorkItem, WorkType } from "@/content/work";

type WorkExplorerProps = {
  activeArea?: TechnicalArea;
  activeType?: WorkType;
  items: WorkItem[];
  totalCount: number;
};

export function WorkExplorer({
  activeArea,
  activeType,
  items,
  totalCount,
}: WorkExplorerProps) {
  return (
    <section className="section-space pt-0">
      <PageContainer>
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <SectionHeading
              description="Combine content type and technical area to narrow the archive without leaving the page's server-rendered flow."
              eyebrow="Explore work"
              title="Filter by engineering shape."
            />
          </div>
          <WorkFilters
            activeArea={activeArea}
            activeType={activeType}
            resultCount={items.length}
            totalCount={totalCount}
          />
        </div>

        <div className="mt-10">
          <WorkGrid items={items} />
        </div>
      </PageContainer>
    </section>
  );
}
