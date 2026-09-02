import { rawWorkItems } from "./data";
import {
  workRegistrySchema,
  type TechnicalArea,
  type WorkItem,
  type WorkType,
} from "./schema";

export {
  technicalAreaLabels,
  workStatusLabels,
  workTypeIconNames,
  workTypeLabels,
} from "./labels";
export { workAreaFilters, workTypeFilters } from "./filters";
export {
  technicalAreaSchema,
  workItemSchema,
  workMetricSchema,
  workRegistrySchema,
  workStatusSchema,
  workTypeSchema,
  type TechnicalArea,
  type WorkItem,
  type WorkMetric,
  type WorkStatus,
  type WorkType,
} from "./schema";

function assertUniqueSlugs(items: WorkItem[]) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const item of items) {
    if (seen.has(item.slug)) {
      duplicates.add(item.slug);
    }

    seen.add(item.slug);
  }

  if (duplicates.size > 0) {
    throw new Error(
      `Duplicate work slugs detected: ${Array.from(duplicates).join(", ")}`,
    );
  }
}

function toSortableDate(date: string) {
  return Date.parse(
    date.length === 7 ? `${date}-01T00:00:00Z` : `${date}T00:00:00Z`,
  );
}

const parsedWorkItems = workRegistrySchema.parse(rawWorkItems);

assertUniqueSlugs(parsedWorkItems);

export const workItems = parsedWorkItems;

export function sortWorkByDate(items: WorkItem[] = workItems) {
  return [...items].sort(
    (a, b) => toSortableDate(b.date) - toSortableDate(a.date),
  );
}

export function sortFeaturedWork(items: WorkItem[]) {
  return [...items].sort((a, b) => {
    const priorityA = a.priority ?? Number.POSITIVE_INFINITY;
    const priorityB = b.priority ?? Number.POSITIVE_INFINITY;

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    return toSortableDate(b.date) - toSortableDate(a.date);
  });
}

export function getAllWork() {
  return sortWorkByDate(workItems);
}

export function getPublishedWork() {
  return sortWorkByDate(workItems.filter((item) => !item.draft));
}

export function getFeaturedWork() {
  return sortFeaturedWork(getPublishedWork().filter((item) => item.featured));
}

export function getWorkBySlug(
  slug: string,
  options?: { includeDrafts?: boolean },
) {
  const items = options?.includeDrafts ? getAllWork() : getPublishedWork();

  return items.find((item) => item.slug === slug);
}

export function getWorkByType(type: WorkType) {
  return getPublishedWork().filter((item) => item.type === type);
}

export function getWorkByArea(area: TechnicalArea) {
  return getPublishedWork().filter((item) => item.areas.includes(area));
}

export function getWorkHref(item: Pick<WorkItem, "slug">) {
  return `/work/${item.slug}`;
}

export function getWritingReadingTime(item: Pick<WorkItem, "writing">) {
  return item.writing?.readingTime ? `${item.writing.readingTime} min` : null;
}
