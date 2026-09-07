import type { Metadata } from "next";

import { FeaturedWorkSection } from "@/components/projects/featured-work-section";
import { WorkAreasSummary } from "@/components/projects/work-areas-summary";
import { WorkCta } from "@/components/projects/work-cta";
import { WorkExplorer } from "@/components/projects/work-explorer";
import { WorkHeader } from "@/components/projects/work-header";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/sections/home/section-heading";
import { siteConfig } from "@/config/site";
import {
  buildPrinciples,
  currentDirection,
  technicalStack,
} from "@/data/profile";
import {
  getFeaturedWork,
  getPublishedWork,
  technicalAreaLabels,
  technicalAreaSchema,
  workStatusLabels,
  workTypeFilters,
  workTypeLabels,
  workTypeSchema,
  type TechnicalArea,
  type WorkItem,
  type WorkType,
} from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects, research, architecture studies, writing, and labs across backend engineering and AI/ML systems.",
  alternates: { canonical: `${siteConfig.url}/work` },
  openGraph: {
    type: "website",
    title: `Work — ${siteConfig.name}`,
    description:
      "Projects, research, and architecture studies across backend engineering and AI/ML systems.",
    url: `${siteConfig.url}/work`,
  },
};

type WorkPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function parseWorkType(value: string | string[] | undefined) {
  const result = workTypeSchema.safeParse(getSingleParam(value));

  return result.success ? result.data : undefined;
}

function parseTechnicalArea(value: string | string[] | undefined) {
  const result = technicalAreaSchema.safeParse(getSingleParam(value));

  return result.success ? result.data : undefined;
}

function buildSearchIndex(item: WorkItem) {
  return [
    item.title,
    item.summary,
    item.description ?? "",
    workTypeLabels[item.type],
    workStatusLabels[item.status],
    ...item.areas.map((area) => technicalAreaLabels[area]),
    ...item.technologies,
  ]
    .join(" ")
    .toLowerCase();
}

function matchesQuery(item: WorkItem, query: string) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

  if (terms.length === 0) {
    return true;
  }

  const haystack = buildSearchIndex(item);

  return terms.every((term) => haystack.includes(term));
}

function filterWork({
  area,
  items,
  query,
  type,
}: {
  area?: TechnicalArea;
  items: ReturnType<typeof getPublishedWork>;
  query?: string;
  type?: WorkType;
}) {
  return items.filter((item) => {
    if (type && item.type !== type) {
      return false;
    }

    if (area && !item.areas.includes(area)) {
      return false;
    }

    if (query && !matchesQuery(item, query)) {
      return false;
    }

    return true;
  });
}

export default async function WorkPage({ searchParams }: WorkPageProps) {
  const params = await searchParams;
  const activeType = parseWorkType(params?.type);
  const activeArea = parseTechnicalArea(params?.area);
  const activeQuery = getSingleParam(params?.q)?.trim() ?? "";
  const publishedWork = getPublishedWork();
  const featuredWork = getFeaturedWork().slice(0, 3);
  const filteredWork = filterWork({
    area: activeArea,
    items: publishedWork,
    query: activeQuery,
    type: activeType,
  });
  const counts = workTypeFilters
    .filter(
      (filter): filter is { label: string; type: WorkType } =>
        filter.type !== "all",
    )
    .map((filter) => ({
      label: filter.label,
      type: filter.type,
      value: publishedWork.filter((item) => item.type === filter.type).length,
    }));

  return (
    <div className="technical-background min-h-screen">
      <WorkHeader counts={counts} totalCount={publishedWork.length} />
      <FeaturedWorkSection items={featuredWork} />
      <WorkExplorer
        activeArea={activeArea}
        activeQuery={activeQuery}
        activeType={activeType}
        items={filteredWork}
        totalCount={publishedWork.length}
      />
      <WorkAreasSummary items={publishedWork} />

      {/* Technical stack */}
      <section className="section-space pt-0">
        <PageContainer>
          <SectionHeading
            description="Grouped by role, not ranked by a made-up percentage."
            eyebrow="Technical focus"
            title="Tools I build with."
          />
          <div className="border-border bg-border mt-10 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-3">
            {technicalStack.map((group) => (
              <div className="bg-background/86 p-5 sm:p-6" key={group.group}>
                <p className="type-mono text-accent-cyan uppercase">
                  {group.group}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      className="type-mono text-foreground border-border bg-card/50 rounded-full border px-2.5 py-1 text-xs"
                      key={item}
                    >
                      {item}
                    </span>
                  ))}
                </div>
                {group.note ? (
                  <p className="type-body-sm text-muted-foreground mt-3">
                    {group.note}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Current direction + principles */}
      <section className="section-space pt-0">
        <PageContainer>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Current direction"
                title="What I'm exploring."
              />
              <p className="type-body text-foreground border-accent-cyan/40 mt-6 border-l-2 pl-4 italic">
                {currentDirection.philosophy}
              </p>
              <ul className="mt-6 space-y-2">
                {currentDirection.areas.map((area) => (
                  <li
                    className="type-body text-muted-foreground flex gap-3"
                    key={area}
                  >
                    <span aria-hidden="true" className="text-accent-cyan">
                      →
                    </span>
                    {area}
                  </li>
                ))}
              </ul>
              <p className="type-body-sm text-muted-foreground mt-6 max-w-xl">
                {currentDirection.careerNote}
              </p>
            </div>
            <div>
              <SectionHeading eyebrow="How I build" title="Principles." />
              <div className="mt-6 grid gap-3">
                {buildPrinciples.map((principle) => (
                  <div
                    className="border-border bg-card/45 rounded-xl border p-4"
                    key={principle.title}
                  >
                    <p className="text-foreground font-medium">
                      {principle.title}
                    </p>
                    <p className="type-body-sm text-muted-foreground mt-1.5">
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      <WorkCta />
    </div>
  );
}

