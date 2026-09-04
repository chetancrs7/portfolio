import type { Metadata } from "next";

import { FeaturedWorkSection } from "@/components/work/featured-work-section";
import { WorkAreasSummary } from "@/components/work/work-areas-summary";
import { WorkCta } from "@/components/work/work-cta";
import { WorkExplorer } from "@/components/work/work-explorer";
import { WorkHeader } from "@/components/work/work-header";
import { siteConfig } from "@/config/site";
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
} from "@/content/work";

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
      <WorkCta />
    </div>
  );
}
