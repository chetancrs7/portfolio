import { AmbientGlow } from "@/components/design/ambient-glow";
import { TechnicalGrid } from "@/components/design/technical-grid";
import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import type { WorkType } from "@/content/work";

type WorkHeaderProps = {
  counts: Array<{
    label: string;
    type: WorkType;
    value: number;
  }>;
  totalCount: number;
};

export function WorkHeader({ counts, totalCount }: WorkHeaderProps) {
  return (
    <section className="border-border relative isolate overflow-hidden border-b">
      <TechnicalGrid className="[mask-image:radial-gradient(circle_at_40%_20%,black,transparent_72%)] opacity-35" />
      <AmbientGlow className="-top-48 left-[8%] opacity-55" tone="violet" />
      <AmbientGlow className="top-28 right-[10%] opacity-45" tone="cyan" />

      <PageContainer className="relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl">
          <Badge variant="status">Work</Badge>
          <h1 className="type-h1 mt-7 max-w-4xl text-balance">
            Systems, experiments, and engineering thinking.
          </h1>
          <p className="type-body-lg text-muted-foreground mt-6 max-w-2xl">
            Projects, AI/ML research, architecture studies, technical writing,
            and labs across backend engineering and applied intelligence.
          </p>
        </div>

        <div className="border-border bg-border mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border lg:grid-cols-6">
          <div className="bg-background/86 p-4 sm:p-5">
            <p className="text-foreground font-mono text-2xl font-semibold">
              {totalCount}
            </p>
            <p className="type-mono text-muted-foreground mt-2 uppercase">
              Total
            </p>
          </div>
          {counts.map((count) => (
            <div className="bg-background/86 p-4 sm:p-5" key={count.type}>
              <p className="text-foreground font-mono text-2xl font-semibold">
                {count.value}
              </p>
              <p className="type-mono text-muted-foreground mt-2 uppercase">
                {count.label}
              </p>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
