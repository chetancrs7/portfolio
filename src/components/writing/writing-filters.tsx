import Link from "next/link";

import { WritingSearch } from "@/components/writing/writing-search";
import {
  articleCategoryDescriptions,
  articleCategoryLabels,
  type ArticleCategory,
} from "@/content/writing";
import { cn } from "@/lib/utils";

type WritingFiltersProps = {
  activeCategory?: ArticleCategory;
  activeQuery?: string;
  availableCategories: ArticleCategory[];
  resultCount: number;
  totalCount: number;
};

function createFilterHref({
  category,
  query,
}: {
  category?: ArticleCategory;
  query?: string;
}) {
  const params = new URLSearchParams();

  if (category) {
    params.set("category", category);
  }

  if (query) {
    params.set("q", query);
  }

  const value = params.toString();

  return value ? `/writing?${value}` : "/writing";
}

function chipClassName(active: boolean) {
  return cn(
    "focus-visible:ring-ring/45 inline-flex min-h-9 shrink-0 items-center gap-2 rounded-full border px-3 text-sm font-medium transition-colors outline-none focus-visible:ring-3",
    active
      ? "border-accent-cyan/35 bg-surface-elevated text-foreground shadow-[inset_0_1px_0_rgb(255_255_255_/_0.04)]"
      : "border-border bg-background/20 text-muted-foreground hover:border-border-strong hover:bg-muted/50 hover:text-foreground",
  );
}

export function WritingFilters({
  activeCategory,
  activeQuery,
  availableCategories,
  resultCount,
  totalCount,
}: WritingFiltersProps) {
  const hasActiveFilters = Boolean(activeCategory || activeQuery);
  const activeDescription = activeCategory
    ? articleCategoryDescriptions[activeCategory]
    : undefined;

  return (
    <div className="border-border bg-card flex flex-col gap-5 rounded-2xl border p-4 sm:p-5">
      <WritingSearch />

      <div>
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="type-label text-muted-foreground">Category</p>
          <p className="type-mono text-muted-foreground">
            Showing {resultCount} of {totalCount}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            aria-current={activeCategory ? undefined : "page"}
            className={chipClassName(!activeCategory)}
            href={createFilterHref({ query: activeQuery })}
          >
            {!activeCategory ? (
              <span
                aria-hidden="true"
                className="bg-accent-cyan size-1.5 rounded-full"
              />
            ) : null}
            All
          </Link>
          {availableCategories.map((category) => {
            const active = activeCategory === category;

            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={chipClassName(active)}
                href={createFilterHref({
                  category: active ? undefined : category,
                  query: activeQuery,
                })}
                key={category}
              >
                {active ? (
                  <span
                    aria-hidden="true"
                    className="bg-accent-cyan size-1.5 rounded-full"
                  />
                ) : null}
                {articleCategoryLabels[category]}
              </Link>
            );
          })}
        </div>
        {activeDescription ? (
          <p className="text-muted-foreground mt-3 text-sm leading-6">
            {activeDescription}
          </p>
        ) : null}
        {hasActiveFilters ? (
          <Link
            className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/45 mt-4 inline-flex rounded-full text-sm transition-colors outline-none focus-visible:ring-3"
            href="/writing"
          >
            Clear filters
          </Link>
        ) : null}
      </div>
    </div>
  );
}
