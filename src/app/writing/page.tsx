import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, PenLine } from "lucide-react";

import { AmbientGlow } from "@/components/design/ambient-glow";
import { TechnicalGrid } from "@/components/design/technical-grid";
import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Writing — Coming Soon",
  description:
    "Notes on backend engineering, AI/ML, and systems design — coming soon.",
  alternates: { canonical: `${siteConfig.url}/writing` },
  openGraph: {
    type: "website",
    title: `Writing — Coming Soon`,
    description:
      "Notes on backend engineering, AI/ML, and systems design — coming soon.",
    url: `${siteConfig.url}/writing`,
  },
};

export default function WritingPage() {
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
              Technical notes on backend engineering, AI/ML systems, and the
              lessons that come out of building real projects.
            </p>
          </div>
        </PageContainer>
      </section>

      <section className="section-space">
        <PageContainer>
          <div className="border-border bg-card/55 mx-auto max-w-2xl rounded-2xl border p-10 text-center sm:p-14">
            <span
              aria-hidden="true"
              className="border-border bg-background/60 text-accent-cyan mx-auto flex size-14 items-center justify-center rounded-full border"
            >
              <PenLine className="size-6" />
            </span>
            <p className="type-eyebrow text-accent-cyan mt-6">Coming soon</p>
            <h2 className="type-h2 text-foreground mt-4 text-balance">
              Articles are on the way.
            </h2>
            <p className="type-body text-muted-foreground mx-auto mt-5 max-w-lg">
              I&rsquo;m preparing a set of technical write-ups on the systems,
              models, and design decisions behind the projects. Check back soon
              — or explore the projects in the meantime.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link className={buttonVariants({ size: "sm" })} href="/projects">
                Explore projects
                <ArrowRight data-icon="inline-end" />
              </Link>
              <Link
                className={buttonVariants({ size: "sm", variant: "outline" })}
                href="/contact"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
