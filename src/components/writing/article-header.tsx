import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { formatArticleDate } from "@/components/writing/article-card";
import { articleCategoryLabels, type Article } from "@/content/writing";

type ArticleHeaderProps = {
  article: Article;
  readingTime: number;
};

export function ArticleHeader({ article, readingTime }: ArticleHeaderProps) {
  return (
    <header className="pt-10 sm:pt-14">
      <Link
        className={buttonVariants({ className: "mb-8", variant: "secondary" })}
        href="/writing"
      >
        <ArrowLeft data-icon="inline-start" />
        All Writing
      </Link>

      <p className="type-eyebrow text-accent-cyan">
        {articleCategoryLabels[article.category]}
      </p>
      <h1 className="type-h1 mt-4 max-w-4xl text-balance">{article.title}</h1>
      <p className="type-body-lg text-muted-foreground mt-5 max-w-3xl">
        {article.description}
      </p>

      <div className="type-mono text-muted-foreground mt-6 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span>{formatArticleDate(article.publishedAt)}</span>
        {article.updatedAt ? (
          <>
            <span aria-hidden="true">·</span>
            <span>Updated {formatArticleDate(article.updatedAt)}</span>
          </>
        ) : null}
        <span aria-hidden="true">·</span>
        <span>{readingTime} min read</span>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="type-mono text-muted-foreground border-border rounded-full border px-2 py-0.5 text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
    </header>
  );
}
