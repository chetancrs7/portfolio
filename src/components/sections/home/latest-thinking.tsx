import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/sections/home/section-heading";
import { Badge } from "@/components/ui/badge";
import {
  getWorkByType,
  getWritingReadingTime,
  technicalAreaLabels,
  workTypeLabels,
} from "@/content/work";

export function LatestThinking() {
  const writingPreviews = getWorkByType("writing").slice(0, 3);

  return (
    <section className="section-space pt-0">
      <PageContainer>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            description="Short previews for future technical writing, linked safely to Work until article routes exist."
            eyebrow="Latest thinking"
            title="Notes from systems and AI work."
          />
          <Link
            className="text-foreground hover:text-accent-cyan focus-visible:ring-ring/45 inline-flex w-fit items-center gap-1.5 rounded-full text-sm font-medium transition-colors outline-none focus-visible:ring-3"
            href="/work"
          >
            View writing
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <div className="border-border mt-10 border-y">
          {writingPreviews.map((item) => (
            <Link
              className="group border-border hover:bg-muted/20 focus-visible:ring-ring/45 grid gap-5 border-b py-6 transition-colors outline-none last:border-b-0 focus-visible:ring-3 sm:grid-cols-[9rem_1fr_auto]"
              href="/work"
              key={item.slug}
            >
              <div>
                <Badge variant="outline">{workTypeLabels[item.type]}</Badge>
                <p className="type-mono text-muted-foreground mt-3">
                  {getWritingReadingTime(item)}
                </p>
              </div>
              <div>
                <h3 className="type-h4 group-hover:text-accent-cyan transition-colors">
                  {item.title}
                </h3>
                <p className="type-body text-muted-foreground mt-3 max-w-3xl">
                  {item.summary}
                </p>
              </div>
              <p className="type-mono text-muted-foreground sm:text-right">
                {item.areas
                  .map((area) => technicalAreaLabels[area])
                  .join(" / ")}
              </p>
            </Link>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
