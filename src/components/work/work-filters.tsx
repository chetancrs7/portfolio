import Link from "next/link";

import {
  workAreaFilters,
  workTypeFilters,
  type TechnicalArea,
  type WorkType,
} from "@/content/work";
import { cn } from "@/lib/utils";

type WorkFiltersProps = {
  activeArea?: TechnicalArea;
  activeType?: WorkType;
  resultCount: number;
  totalCount: number;
};

function createFilterHref({
  area,
  type,
}: {
  area?: TechnicalArea;
  type?: WorkType;
}) {
  const params = new URLSearchParams();

  if (type) {
    params.set("type", type);
  }

  if (area) {
    params.set("area", area);
  }

  const query = params.toString();

  return query ? `/work?${query}` : "/work";
}

function filterClassName(active: boolean) {
  return cn(
    "focus-visible:ring-ring/45 inline-flex min-h-9 shrink-0 items-center gap-2 rounded-full border px-3 text-sm font-medium transition-colors outline-none focus-visible:ring-3",
    active
      ? "border-accent-cyan/35 bg-surface-elevated text-foreground shadow-[inset_0_1px_0_rgb(255_255_255_/_0.04)]"
      : "border-border bg-background/20 text-muted-foreground hover:border-border-strong hover:bg-muted/50 hover:text-foreground",
  );
}

export function WorkFilters({
  activeArea,
  activeType,
  resultCount,
  totalCount,
}: WorkFiltersProps) {
  const hasActiveFilters = Boolean(activeArea || activeType);

  return (
    <div className="border-border bg-card rounded-2xl border p-4 sm:p-5">
      <div className="flex flex-col gap-5">
        <div>
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="type-label text-muted-foreground">Type</p>
            {hasActiveFilters ? (
              <Link
                className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/45 rounded-full text-sm transition-colors outline-none focus-visible:ring-3"
                href="/work"
              >
                Clear filters
              </Link>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2">
            {workTypeFilters.map((filter) => {
              const type = filter.type === "all" ? undefined : filter.type;
              const active = type ? activeType === type : !activeType;

              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={filterClassName(active)}
                  href={createFilterHref({ area: activeArea, type })}
                  key={filter.type}
                >
                  {active ? (
                    <span
                      aria-hidden="true"
                      className="bg-accent-cyan size-1.5 rounded-full"
                    />
                  ) : null}
                  {filter.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="type-label text-muted-foreground">Area</p>
            <p className="type-mono text-muted-foreground">
              Showing {resultCount} of {totalCount}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {workAreaFilters.map((filter) => {
              const active = activeArea === filter.area;
              const href = createFilterHref({
                area: active ? undefined : filter.area,
                type: activeType,
              });

              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={filterClassName(active)}
                  href={href}
                  key={filter.area}
                >
                  {active ? (
                    <span
                      aria-hidden="true"
                      className="bg-accent-cyan size-1.5 rounded-full"
                    />
                  ) : null}
                  {filter.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
