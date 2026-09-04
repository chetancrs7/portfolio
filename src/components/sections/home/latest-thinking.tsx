import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/sections/home/section-heading";
import { formatArticleDate } from "@/components/writing/article-card";
import { Badge } from "@/components/ui/badge";
import {
  articleCategoryLabels,
  getArticleHref,
  getPublishedArticles,
} from "@/content/writing";
import { getArticleReadingTime } from "@/content/writing/mdx";

export function LatestThinking() {
  const previews = getPublishedArticles().slice(0, 3);

  if (previews.length === 0) {
    return null;
  }

  return (
    <section className="section-space pt-0">
      <PageContainer>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            description="Technical writing that explains the reasoning behind the projects — including the experiments that did not go as planned."
            eyebrow="Latest thinking"
            title="Notes from systems and AI work."
          />
          <Link
            className="text-foreground hover:text-accent-cyan focus-visible:ring-ring/45 inline-flex w-fit items-center gap-1.5 rounded-full text-sm font-medium transition-colors outline-none focus-visible:ring-3"
            href="/writing"
          >
            View writing
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <div className="border-border mt-10 border-y">
          {previews.map((article) => (
            <Link
              className="group border-border hover:bg-muted/20 focus-visible:ring-ring/45 grid gap-5 border-b py-6 transition-colors outline-none last:border-b-0 focus-visible:ring-3 sm:grid-cols-[9rem_1fr_auto]"
              href={getArticleHref(article)}
              key={article.slug}
            >
              <div>
                <Badge variant="outline">
                  {articleCategoryLabels[article.category]}
                </Badge>
                <p className="type-mono text-muted-foreground mt-3">
                  {getArticleReadingTime(article.slug)} min read
                </p>
              </div>
              <div>
                <h3 className="type-h4 group-hover:text-accent-cyan transition-colors">
                  {article.title}
                </h3>
                <p className="type-body text-muted-foreground mt-3 max-w-3xl">
                  {article.description}
                </p>
              </div>
              <p className="type-mono text-muted-foreground sm:text-right">
                {formatArticleDate(article.publishedAt)}
              </p>
            </Link>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
