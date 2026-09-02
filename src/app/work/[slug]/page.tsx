import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  getPublishedWork,
  getWorkBySlug,
  technicalAreaLabels,
  workStatusLabels,
  workTypeLabels,
} from "@/content/work";

type WorkDetailPlaceholderProps = {
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
}: WorkDetailPlaceholderProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkBySlug(slug);

  if (!item) {
    return {
      title: "Work",
    };
  }

  return {
    title: item.title,
    description: item.summary,
  };
}

export default async function WorkDetailPlaceholder({
  params,
}: WorkDetailPlaceholderProps) {
  const { slug } = await params;
  const item = getWorkBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="technical-background min-h-screen">
      <PageContainer className="py-16 sm:py-20 lg:py-24">
        <Link
          className={buttonVariants({
            className: "mb-10",
            variant: "secondary",
          })}
          href="/work"
        >
          <ArrowLeft data-icon="inline-start" />
          Work
        </Link>

        <div className="surface-subtle rounded-2xl p-6 sm:p-8 lg:p-10">
          <div className="mb-7 flex flex-wrap gap-2">
            <Badge variant="status">{workTypeLabels[item.type]}</Badge>
            <Badge variant="outline">{workStatusLabels[item.status]}</Badge>
            {item.areas.map((area) => (
              <Badge key={area} variant="outline">
                {technicalAreaLabels[area]}
              </Badge>
            ))}
          </div>

          <h1 className="type-h1 max-w-4xl text-balance">{item.title}</h1>
          <p className="type-body-lg text-muted-foreground mt-6 max-w-3xl">
            {item.summary}
          </p>

          {item.type === "system-design" && item.systemDesign?.designOnly ? (
            <p className="type-mono text-accent-cyan mt-8 uppercase">
              Design study - not a production deployment
            </p>
          ) : null}

          <div className="border-border mt-10 border-t pt-6">
            <p className="type-h4">Detailed case study coming next.</p>
            <p className="type-body text-muted-foreground mt-3 max-w-2xl">
              This route exists so Work links are stable while the full case
              study engine, MDX rendering, diagrams, and technical layouts are
              deferred to the next development phase.
            </p>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
