import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  articleCategoryLabels,
  getArticleHref,
  type Article,
} from "@/content/writing";
import { cn } from "@/lib/utils";

type ArticleCardProps = {
  article: Article;
  className?: string;
  readingTime?: number;
  variant?: "default" | "featured";
};

export function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function ArticleCard({
  article,
  className,
  readingTime,
  variant = "default",
}: ArticleCardProps) {
  const isFeatured = variant === "featured";
  const href = getArticleHref(article);
  const visibleTags = article.tags.slice(0, isFeatured ? 5 : 3);

  return (
    <article
      className={cn(
        "group/card border-border bg-card/55 hover:border-border-strong relative flex flex-col rounded-2xl border p-6 transition-colors sm:p-7",
        className,
      )}
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge variant="outline">
          {articleCategoryLabels[article.category]}
        </Badge>
        <span className="type-mono text-muted-foreground ml-auto">
          {formatArticleDate(article.publishedAt)}
        </span>
      </div>

      <h3
        className={cn(
          "text-foreground group-hover/card:text-accent-cyan text-balance transition-colors",
          isFeatured ? "type-h3" : "type-h4",
        )}
      >
        <Link
          className="focus-visible:ring-ring/45 rounded-sm outline-none after:absolute after:inset-0 focus-visible:ring-3"
          href={href}
        >
          {article.title}
        </Link>
      </h3>

      <p
        className={cn(
          "text-muted-foreground mt-3",
          isFeatured ? "type-body-lg max-w-3xl" : "type-body",
        )}
      >
        {article.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2">
        {visibleTags.map((tag) => (
          <span
            key={tag}
            className="type-mono text-muted-foreground border-border rounded-full border px-2 py-0.5 text-xs"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        {readingTime ? (
          <span className="type-mono text-muted-foreground">
            {readingTime} min read
          </span>
        ) : (
          <span />
        )}
        <span className="text-foreground group-hover/card:text-accent-cyan inline-flex items-center gap-1.5 text-sm font-medium transition-colors">
          Read
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover/card:translate-x-1"
          />
        </span>
      </div>
    </article>
  );
}
