import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { getArticleHref, type Article } from "@/content/writing";
import { cn } from "@/lib/utils";

type ArticleNavProps = {
  newer: Article | null;
  older: Article | null;
};

export function ArticleNav({ newer, older }: ArticleNavProps) {
  if (!newer && !older) {
    return null;
  }

  return (
    <nav
      aria-label="More articles"
      className="border-border mt-12 grid gap-4 border-t pt-8 sm:grid-cols-2"
    >
      {older ? (
        <Link
          className="group border-border bg-card/45 hover:border-border-strong focus-visible:ring-ring/45 rounded-xl border p-5 transition-colors outline-none focus-visible:ring-3"
          href={getArticleHref(older)}
        >
          <span className="type-mono text-muted-foreground inline-flex items-center gap-1.5">
            <ArrowLeft aria-hidden="true" className="size-3.5" />
            Older
          </span>
          <span className="text-foreground group-hover:text-accent-cyan mt-2 block font-medium transition-colors">
            {older.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {newer ? (
        <Link
          className={cn(
            "group border-border bg-card/45 hover:border-border-strong focus-visible:ring-ring/45 rounded-xl border p-5 transition-colors outline-none focus-visible:ring-3",
            !older ? "sm:col-start-2" : undefined,
          )}
          href={getArticleHref(newer)}
        >
          <span className="type-mono text-muted-foreground inline-flex items-center gap-1.5 sm:justify-end">
            Newer
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </span>
          <span className="text-foreground group-hover:text-accent-cyan mt-2 block font-medium transition-colors sm:text-right">
            {newer.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
