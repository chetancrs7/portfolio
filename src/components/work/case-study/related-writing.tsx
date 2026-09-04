import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  articleCategoryLabels,
  getArticleHref,
  type Article,
} from "@/content/writing";

type RelatedWritingProps = {
  articles: Article[];
};

/** Project → article links, completing the content graph on case-study pages. */
export function RelatedWriting({ articles }: RelatedWritingProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="mt-14">
      <div className="mb-5">
        <p className="type-eyebrow text-accent-cyan">Related writing</p>
        <h2 className="type-h3 mt-3">The thinking behind it</h2>
      </div>
      <div className="grid gap-4">
        {articles.map((article) => (
          <Link
            className="group border-border bg-card/45 hover:border-border-strong focus-visible:ring-ring/45 rounded-xl border p-5 transition-colors outline-none focus-visible:ring-3"
            href={getArticleHref(article)}
            key={article.slug}
          >
            <p className="type-mono text-muted-foreground uppercase">
              {articleCategoryLabels[article.category]}
            </p>
            <h3 className="text-foreground group-hover:text-accent-cyan mt-2 font-medium transition-colors">
              {article.title}
            </h3>
            <p className="type-body-sm text-muted-foreground mt-2">
              {article.description}
            </p>
            <span className="text-accent-cyan mt-3 inline-flex items-center gap-1.5 text-sm font-medium">
              Read the analysis
              <ArrowRight aria-hidden="true" className="size-4" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
