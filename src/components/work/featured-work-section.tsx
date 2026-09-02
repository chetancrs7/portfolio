import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/sections/home/section-heading";
import { WorkCard } from "@/components/work/work-card";
import type { WorkItem } from "@/content/work";

type FeaturedWorkSectionProps = {
  items: WorkItem[];
};

export function FeaturedWorkSection({ items }: FeaturedWorkSectionProps) {
  const [flagship, ...supportingItems] = items;

  if (!flagship) {
    return null;
  }

  return (
    <section className="section-space">
      <PageContainer>
        <SectionHeading
          description="The most representative systems and studies, selected through featured metadata rather than a separate homepage list."
          eyebrow="Featured work"
          title="A few priority pieces."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
          <WorkCard
            className="lg:min-h-[34rem]"
            item={flagship}
            variant="featured"
          />
          <div className="grid gap-5">
            {supportingItems.map((item) => (
              <WorkCard item={item} key={item.slug} variant="compact" />
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
