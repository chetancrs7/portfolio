import type { Metadata } from "next";

import { FeaturedWorkSection } from "@/components/work/featured-work-section";
import { WorkAreasSummary } from "@/components/work/work-areas-summary";
import { WorkCta } from "@/components/work/work-cta";
import { WorkExplorer } from "@/components/work/work-explorer";
import { WorkHeader } from "@/components/work/work-header";
import {
  getFeaturedWork,
  getPublishedWork,
  technicalAreaSchema,
  workTypeFilters,
  workTypeSchema,
  type TechnicalArea,
  type WorkType,
} from "@/content/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects, research, architecture studies, writing, and labs across backend engineering and AI/ML systems.",
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

function filterWork({
  area,
  items,
  type,
}: {
  area?: TechnicalArea;
  items: ReturnType<typeof getPublishedWork>;
  type?: WorkType;
}) {
  return items.filter((item) => {
    if (type && item.type !== type) {
      return false;
    }

    if (area && !item.areas.includes(area)) {
      return false;
    }

    return true;
  });
}

export default async function WorkPage({ searchParams }: WorkPageProps) {
  const params = await searchParams;
  const activeType = parseWorkType(params?.type);
  const activeArea = parseTechnicalArea(params?.area);
  const publishedWork = getPublishedWork();
  const featuredWork = getFeaturedWork().slice(0, 3);
  const filteredWork = filterWork({
    area: activeArea,
    items: publishedWork,
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
        activeType={activeType}
        items={filteredWork}
        totalCount={publishedWork.length}
      />
      <WorkAreasSummary items={publishedWork} />
      <WorkCta />
    </div>
  );
}
