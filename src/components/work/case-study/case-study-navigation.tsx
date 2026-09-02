import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { getWorkHref, type WorkItem } from "@/content/work";

type CaseStudyNavigationProps = {
  next: WorkItem | null;
  previous: WorkItem | null;
};

export function CaseStudyNavigation({
  next,
  previous,
}: CaseStudyNavigationProps) {
  if (!previous && !next) {
    return null;
  }

  return (
    <nav
      aria-label="Adjacent work"
      className="border-border mt-12 grid gap-4 border-t pt-8 sm:grid-cols-2"
    >
      <AdjacentLink direction="previous" item={previous} />
      <AdjacentLink direction="next" item={next} />
    </nav>
  );
}

function AdjacentLink({
  direction,
  item,
}: {
  direction: "next" | "previous";
  item: WorkItem | null;
}) {
  if (!item) {
    return <div className="hidden sm:block" />;
  }

  const isNext = direction === "next";

  return (
    <Link
      className="border-border bg-card/45 hover:border-border-strong focus-visible:ring-ring/45 rounded-xl border p-5 transition-colors outline-none focus-visible:ring-3"
      href={getWorkHref(item)}
    >
      <span className="type-mono text-muted-foreground inline-flex items-center gap-2 uppercase">
        {isNext ? null : <ArrowLeft aria-hidden="true" className="size-3.5" />}
        {isNext ? "Next" : "Previous"}
        {isNext ? <ArrowRight aria-hidden="true" className="size-3.5" /> : null}
      </span>
      <span className="text-foreground mt-2 block text-base font-medium">
        {item.title}
      </span>
    </Link>
  );
}
