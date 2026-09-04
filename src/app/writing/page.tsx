import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AmbientGlow } from "@/components/design/ambient-glow";
import { TechnicalGrid } from "@/components/design/technical-grid";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/sections/home/section-heading";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ArticleCard } from "@/components/writing/article-card";
import { WritingFilters } from "@/components/writing/writing-filters";
import { siteConfig } from "@/config/site";
import {
  articleCategoryLabels,
  articleCategorySchema,
  getAvailableCategories,
  getFeaturedArticles,
  getPublishedArticles,
  type Article,
} from "@/content/writing";
import { getArticleReadingTime } from "@/content/writing/mdx";

export const metadata: Metadata = {
  title: "Writing & Insights",
  description:
    "Notes on backend engineering, AI/ML, systems design, and lessons from building technical projects.",
  alternates: { canonical: `${siteConfig.url}/writing` },
  openGraph: {
    type: "website",
    title: `Writing & Insights — ${siteConfig.name}`,
    description:
      "Notes on backend engineering, AI/ML, systems design, and lessons from building technical projects.",
    url: `${siteConfig.url}/writing`,
  },
};

type WritingPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function parseCategory(value: string | string[] | undefined) {
  const result = articleCategorySchema.safeParse(getSingleParam(value));

  return result.success ? result.data : undefined;
}

function matchesQuery(article: Article, query: string) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

  if (terms.length === 0) {
    return true;
  }

  const haystack = [
    article.title,
    article.description,
    articleCategoryLabels[article.category],
    ...article.tags,
  ]
    .join(" ")
    .toLowerCase();

  return terms.every((term) => haystack.includes(term));
}

export default async function WritingPage({ searchParams }: WritingPageProps) {
  const params = await searchParams;
  const activeCategory = parseCategory(params?.category);
  const activeQuery = getSingleParam(params?.q)?.trim() ?? "";

  const published = getPublishedArticles();
  const featured = getFeaturedArticles().slice(0, 2);
  const availableCategories = getAvailableCategories();
  const readingTimes = Object.fromEntries(
    published.map((article) => [
      article.slug,
      getArticleReadingTime(article.slug),
    ]),
  );

  const isFiltering = Boolean(activeCategory || activeQuery);
  const filtered = published.filter((article) => {
    if (activeCategory && article.category !== activeCategory) {
      return false;
    }

    if (activeQuery && !matchesQuery(article, activeQuery)) {
      return false;
    }

    return true;
  });

  return (
    <div className="technical-background min-h-screen">
      <section className="border-border relative isolate overflow-hidden border-b">
        <TechnicalGrid className="[mask-image:radial-gradient(circle_at_40%_20%,black,transparent_72%)] opacity-35" />
        <AmbientGlow className="-top-48 left-[8%] opacity-55" tone="violet" />
        <AmbientGlow className="top-28 right-[10%] opacity-45" tone="cyan" />
        <PageContainer className="relative py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl">
            <Badge variant="status">Writing</Badge>
            <h1 className="type-h1 mt-7 max-w-4xl text-balance">
              Writing &amp; Insights
            </h1>
            <p className="type-body-lg text-muted-foreground mt-6 max-w-2xl">
              Notes on backend engineering, AI/ML, systems design, and the
              lessons that came out of building the projects — including the
              experiments that did not go as planned.
            </p>
          </div>
        </PageContainer>
      </section>

      {featured.length > 0 && !isFiltering ? (
        <section className="section-space">
          <PageContainer>
            <SectionHeading
              description="The pieces with the strongest technical argument or the most useful negative result."
              eyebrow="Featured"
              title="Start here."
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {featured.map((article) => (
                <ArticleCard
                  article={article}
                  key={article.slug}
                  readingTime={readingTimes[article.slug]}
                  variant="featured"
                />
              ))}
            </div>
          </PageContainer>
        </section>
      ) : null}

      <section className="section-space pt-0">
        <PageContainer>
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <SectionHeading
              description="Filter by engineering area or search across titles, tags, and topics."
              eyebrow="All writing"
              title="Browse the archive."
            />
            <WritingFilters
              activeCategory={activeCategory}
              activeQuery={activeQuery}
              availableCategories={availableCategories}
              resultCount={filtered.length}
              totalCount={published.length}
            />
          </div>

          <div className="mt-10">
            {filtered.length > 0 ? (
              <div className="grid gap-5 lg:grid-cols-2">
                {filtered.map((article) => (
                  <ArticleCard
                    article={article}
                    key={article.slug}
                    readingTime={readingTimes[article.slug]}
                  />
                ))}
              </div>
            ) : (
              <div className="surface-subtle rounded-2xl p-8 text-center">
                <p className="type-h4 text-foreground">
                  No insights in this view yet.
                </p>
                <p className="type-body text-muted-foreground mx-auto mt-3 max-w-md">
                  Try a different category or clear the search to see all
                  writing.
                </p>
                <Link
                  className={buttonVariants({
                    className: "mt-6",
                    variant: "secondary",
                  })}
                  href="/writing"
                >
                  View all writing
                </Link>
              </div>
            )}
          </div>
        </PageContainer>
      </section>

      <section className="border-border border-t">
        <PageContainer className="py-14 sm:py-16">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="type-eyebrow text-accent-cyan">Next step</p>
              <h2 className="type-h3 mt-3">
                Writing explains the projects. The projects are the evidence.
              </h2>
              <p className="type-body text-muted-foreground mt-4 max-w-2xl">
                Each article links to the system it came from — read the
                engineering behind it.
              </p>
            </div>
            <Link
              className={buttonVariants({ variant: "secondary" })}
              href="/work"
            >
              Explore work
              <ArrowRight data-icon="inline-end" />
            </Link>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
