import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { CaseStudyToc } from "@/components/work/case-study/case-study-toc";
import { RelatedWork } from "@/components/work/case-study/related-work";
import { ArticleAuthor } from "@/components/writing/article-author";
import { ArticleHeader } from "@/components/writing/article-header";
import { ArticleNav } from "@/components/writing/article-nav";
import { RelatedArticles } from "@/components/writing/related-articles";
import { siteConfig } from "@/config/site";
import {
  getAdjacentArticles,
  getArticleBySlug,
  getPublishedArticles,
  getRelatedArticles,
  getRelatedProjects,
} from "@/content/writing";
import {
  getArticleContent,
  getArticleReadingTime,
} from "@/content/writing/mdx";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublishedArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Writing" };
  }

  const url = `${siteConfig.url}/writing/${article.slug}`;

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      tags: article.tags,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const content = await getArticleContent(slug);

  if (!content) {
    notFound();
  }

  const { Content, headings, readingTime } = content;
  const relatedProjects = getRelatedProjects(article);
  const relatedArticles = getRelatedArticles(article);
  const relatedReadingTimes = Object.fromEntries(
    relatedArticles.map((related) => [
      related.slug,
      getArticleReadingTime(related.slug),
    ]),
  );
  const adjacent = getAdjacentArticles(slug);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { "@type": "Person", name: siteConfig.author.name },
    url: `${siteConfig.url}/writing/${article.slug}`,
    keywords: article.tags.join(", "),
  };

  return (
    <div className="technical-background min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <PageContainer className="pb-16" variant="wide">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-start">
          <main className="min-w-0">
            <div className="mx-auto max-w-2xl">
              <ArticleHeader article={article} readingTime={readingTime} />

              {headings.length > 0 ? (
                <div className="mt-8 lg:hidden">
                  <CaseStudyToc items={headings} />
                </div>
              ) : null}

              <article className="mt-10">
                <Content />
              </article>

              <ArticleAuthor />

              {relatedProjects.length > 0 ? (
                <RelatedWork items={relatedProjects} />
              ) : null}

              <RelatedArticles
                articles={relatedArticles}
                readingTimes={relatedReadingTimes}
              />

              <ArticleNav newer={adjacent.newer} older={adjacent.older} />

              <div className="border-border mt-12 rounded-xl border p-6 text-center">
                <p className="type-h4 text-foreground">
                  Interested in the engineering behind this?
                </p>
                <Link
                  className={buttonVariants({
                    className: "mt-5",
                    variant: "secondary",
                  })}
                  href="/work"
                >
                  Explore the projects
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </div>
            </div>
          </main>

          {headings.length > 0 ? (
            <div className="hidden pt-16 lg:sticky lg:top-24 lg:block">
              <CaseStudyToc items={headings} />
            </div>
          ) : null}
        </div>
      </PageContainer>
    </div>
  );
}
