import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { CaseStudyHeader } from "@/components/work/case-study/case-study-header";
import { CaseStudyNavigation } from "@/components/work/case-study/case-study-navigation";
import { CaseStudyToc } from "@/components/work/case-study/case-study-toc";
import { MetricStrip } from "@/components/work/case-study/metric-strip";
import { RelatedWork } from "@/components/work/case-study/related-work";
import { TechnicalSnapshot } from "@/components/work/case-study/technical-snapshot";
import { siteConfig } from "@/config/site";
import {
  getPublishedWork,
  getWorkBySlug,
  getCaseStudyTemplate,
  workTypeLabels,
  type WorkItem,
} from "@/content/work";
import { getWorkContent } from "@/content/work/mdx";

type WorkDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getPublishedWork().map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkBySlug(slug);

  if (!item) {
    return {
      title: "Work",
    };
  }

  const url = `${siteConfig.url}/work/${item.slug}`;

  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: item.title,
      description: item.summary,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.summary,
    },
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const item = getWorkBySlug(slug);

  if (!item) {
    notFound();
  }

  const content = await getWorkContent(item);
  const adjacentWork = getAdjacentPublishedWork(item.slug);
  const relatedWork = getRelatedPublishedWork(item);
  const tocItems = content?.headings ?? [];
  const Content = content?.Content;

  return (
    <div className="technical-background min-h-screen">
      <PageContainer className="pb-16" variant="wide">
        <CaseStudyHeader item={item} />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <main className="min-w-0">
            <div className="mx-auto max-w-3xl">
              <CaseStudyDisclosure item={item} />
              <MetricStrip metrics={item.metrics} />
              {tocItems.length > 0 ? (
                <div className="mt-8 lg:hidden">
                  <CaseStudyToc items={tocItems} />
                </div>
              ) : null}
            </div>

            <article className="mx-auto mt-10 max-w-3xl">
              {Content ? <Content /> : <CaseStudyFallback item={item} />}
              <RelatedWork items={relatedWork} />
              <CaseStudyNavigation
                next={adjacentWork.next}
                previous={adjacentWork.previous}
              />
            </article>
          </main>

          <div className="hidden space-y-4 lg:sticky lg:top-24 lg:block">
            <TechnicalSnapshot item={item} />
            <CaseStudyToc
              items={
                tocItems.length > 0
                  ? tocItems
                  : getCaseStudyTemplate(item.type).slice(0, 6)
              }
            />
          </div>
        </div>
      </PageContainer>
    </div>
  );
}

function getRelatedPublishedWork(item: WorkItem) {
  return getPublishedWork()
    .filter((candidate) => candidate.slug !== item.slug)
    .map((candidate) => ({
      candidate,
      score: candidate.areas.filter((area) => item.areas.includes(area)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ candidate }) => candidate);
}

function getAdjacentPublishedWork(slug: string) {
  const publishedWork = getPublishedWork();
  const index = publishedWork.findIndex((item) => item.slug === slug);

  return {
    next: index > 0 ? publishedWork[index - 1] : null,
    previous:
      index >= 0 && index < publishedWork.length - 1
        ? publishedWork[index + 1]
        : null,
  };
}

function CaseStudyDisclosure({ item }: { item: WorkItem }) {
  if (item.type === "system-design" || item.status === "design-study") {
    return (
      <Disclosure
        body="Architecture exercise based on stated scale assumptions. This is not presented as a production deployment."
        label="Design Study"
      />
    );
  }

  if (item.type === "research") {
    return (
      <Disclosure
        body="Research / experiment work. Results describe the stated evaluation context, not a production software claim."
        label="Research / Experiment"
      />
    );
  }

  return null;
}

function Disclosure({ body, label }: { body: string; label: string }) {
  return (
    <div className="border-accent-cyan/20 bg-accent-cyan/6 mb-8 rounded-xl border p-5">
      <p className="type-mono text-accent-cyan uppercase">{label}</p>
      <p className="text-muted-foreground mt-2 text-sm leading-6">{body}</p>
    </div>
  );
}

function CaseStudyFallback({ item }: { item: WorkItem }) {
  return (
    <section className="border-border bg-card/55 rounded-xl border p-6 sm:p-8">
      <Badge variant="status">Case Study In Progress</Badge>
      <h2 className="type-h3 mt-5 text-balance">
        Engineering breakdown is being documented.
      </h2>
      <p className="type-body text-muted-foreground mt-4">
        The project metadata is available, but the full technical case study is
        still being prepared for this Work type. The page stays stable so links,
        navigation, and future MDX content can land without broken routes.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        {item.repository ? (
          <Link
            className={buttonVariants({ size: "sm", variant: "outline" })}
            href={item.repository}
            rel="noreferrer"
            target="_blank"
          >
            View Source
            <ExternalLink data-icon="inline-end" />
          </Link>
        ) : null}
        {item.demo ? (
          <Link
            className={buttonVariants({ size: "sm", variant: "outline" })}
            href={item.demo}
            rel="noreferrer"
            target="_blank"
          >
            Live Demo
            <ExternalLink data-icon="inline-end" />
          </Link>
        ) : null}
        <Link
          className={buttonVariants({ size: "sm", variant: "secondary" })}
          href="/work"
        >
          <ArrowLeft data-icon="inline-start" />
          Back to Work
        </Link>
      </div>
      <div className="border-border mt-8 border-t pt-5">
        <p className="type-mono text-muted-foreground uppercase">
          Planned {workTypeLabels[item.type]} Structure
        </p>
        <ul className="text-muted-foreground mt-4 grid gap-2 text-sm sm:grid-cols-2">
          {getCaseStudyTemplate(item.type).map((section) => (
            <li key={section.id}>{section.label}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
