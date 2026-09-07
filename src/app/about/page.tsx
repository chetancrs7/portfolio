import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, GraduationCap } from "lucide-react";

import { ExperienceTimeline } from "@/components/about/experience-timeline";
import { AmbientGlow } from "@/components/design/ambient-glow";
import { TechnicalGrid } from "@/components/design/technical-grid";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/sections/home/section-heading";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ArticleCard } from "@/components/writing/article-card";
import { WorkCard } from "@/components/work/work-card";
import { isPlaceholderLink, siteConfig } from "@/config/site";
import { getFeaturedWork, getWorkBySlug } from "@/content/work";
import { getFeaturedArticles } from "@/content/writing";
import { getArticleReadingTime } from "@/content/writing/mdx";
import {
  aboutIntro,
  buildPrinciples,
  currentDirection,
  education,
  engineeringFocus,
  technicalStack,
} from "@/data/profile";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Backend and AI/ML engineer focused on reliable systems, applied machine learning, and honest evaluation. Computer Science at Lancaster University.",
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    type: "profile",
    title: `About — ${siteConfig.author.name}`,
    description:
      "Backend and AI/ML engineer focused on reliable systems, applied machine learning, and honest evaluation.",
    url: `${siteConfig.url}/about`,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.author.name,
  jobTitle: "Backend & AI/ML Engineer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Lancaster University",
  },
  url: `${siteConfig.url}/about`,
  sameAs: [siteConfig.links.github].filter((href) => !isPlaceholderLink(href)),
};

export default function AboutPage() {
  const contactLinks = [
    { label: "GitHub", href: siteConfig.links.github },
    { label: "LinkedIn", href: siteConfig.links.linkedin },
    { label: "Email", href: siteConfig.links.email },
  ].filter((link) => !isPlaceholderLink(link.href));

  const selectedWork = getFeaturedWork().slice(0, 2);
  const selectedWriting = getFeaturedArticles().slice(0, 2);
  const writingReadingTimes = Object.fromEntries(
    selectedWriting.map((article) => [
      article.slug,
      getArticleReadingTime(article.slug),
    ]),
  );

  return (
    <div className="technical-background min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* Hero */}
      <section className="border-border relative isolate overflow-hidden border-b">
        <TechnicalGrid className="[mask-image:radial-gradient(circle_at_35%_20%,black,transparent_72%)] opacity-35" />
        <AmbientGlow className="-top-48 left-[6%] opacity-55" tone="violet" />
        <AmbientGlow className="top-24 right-[8%] opacity-45" tone="cyan" />
        <PageContainer className="relative py-16 sm:py-20 lg:py-24">
          <div className="lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14">
            {/* Identity */}
            <div className="max-w-3xl">
              <Badge variant="status">About</Badge>
              <h1 className="type-h1 mt-7 text-balance">
                {siteConfig.author.name}
              </h1>
              <p className="type-body-lg text-accent-cyan mt-4 font-medium">
                {aboutIntro.identity}
              </p>
              <p className="type-body-lg text-muted-foreground mt-5 max-w-2xl">
                {aboutIntro.statement}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  className={buttonVariants({ size: "sm" })}
                  href="/contact"
                >
                  Get in touch
                  <ArrowRight data-icon="inline-end" />
                </Link>
                {contactLinks.map((link) => (
                  <a
                    className={cn(
                      buttonVariants({ size: "sm", variant: "outline" }),
                      "gap-1.5",
                    )}
                    href={link.href}
                    key={link.label}
                    rel="noreferrer"
                    target={
                      link.href.startsWith("mailto:") ? undefined : "_blank"
                    }
                  >
                    {link.label}
                    <ArrowUpRight data-icon="inline-end" />
                  </a>
                ))}
              </div>
            </div>

            {/* Portrait */}
            <div className="relative order-first mx-auto mb-10 w-48 sm:w-56 lg:order-last lg:mx-0 lg:mb-0 lg:w-72 xl:w-80">
              <div
                className="relative aspect-[3/4] overflow-hidden rounded-2xl"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 65%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 65%, transparent 100%)",
                }}
              >
                <Image
                  alt={`Portrait of ${siteConfig.author.name}`}
                  className="object-cover"
                  fill
                  priority
                  quality={95}
                  sizes="(min-width: 1280px) 320px, (min-width: 1024px) 288px, (min-width: 640px) 224px, 192px"
                  src="/images/portrait.png"
                />
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Short introduction */}
      <section className="section-space">
        <PageContainer>
          <div className="max-w-3xl space-y-5">
            {aboutIntro.paragraphs.map((paragraph) => (
              <p className="type-body text-muted-foreground" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Engineering focus */}
      <section className="section-space pt-0">
        <PageContainer>
          <SectionHeading
            description="Areas I work in — each backed by a project or a piece of writing you can inspect."
            eyebrow="Engineering focus"
            title="What I work on."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {engineeringFocus.map((focus) => (
              <div
                className="border-border bg-card/55 rounded-2xl border p-6"
                key={focus.title}
              >
                <h3 className="type-h4 text-foreground">{focus.title}</h3>
                <p className="type-body text-muted-foreground mt-3">
                  {focus.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                  {focus.evidence.map((link) => (
                    <Link
                      className="text-accent-cyan hover:text-foreground focus-visible:ring-ring/45 inline-flex items-center gap-1 rounded-sm text-sm font-medium transition-colors outline-none focus-visible:ring-3"
                      href={link.href}
                      key={link.href}
                    >
                      {link.label}
                      <ArrowRight aria-hidden="true" className="size-3.5" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Experience */}
      <section className="section-space pt-0">
        <PageContainer>
          <ExperienceTimeline />
        </PageContainer>
      </section>

      {/* Education */}
      <section className="section-space pt-0">
        <PageContainer>
          <SectionHeading
            description="Where the foundations came from. The projects are the evidence of what it built toward."
            eyebrow="Education"
            title="Academic background."
          />
          <div className="mt-10 grid gap-5">
            {education.map((entry) => {
              const projects = (entry.projectSlugs ?? [])
                .map((slug) => getWorkBySlug(slug))
                .filter((item): item is NonNullable<typeof item> =>
                  Boolean(item),
                );

              return (
                <div
                  className="border-border bg-card/55 rounded-2xl border p-6 sm:p-7"
                  key={entry.degree}
                >
                  <div className="flex items-start gap-4">
                    {entry.logo ? (
                      <span
                        className={cn(
                          "border-border relative size-20 shrink-0 overflow-hidden rounded-xl border p-1.5 sm:size-24",
                          entry.logo.tone === "light"
                            ? "bg-white"
                            : "bg-background/60",
                        )}
                      >
                        <Image
                          alt={entry.logo.alt}
                          className="object-contain"
                          fill
                          sizes="(min-width: 640px) 96px, 80px"
                          src={entry.logo.src}
                        />
                      </span>
                    ) : (
                      <span
                        aria-hidden="true"
                        className="border-border bg-background/60 text-accent-cyan flex size-11 shrink-0 items-center justify-center rounded-full border"
                      >
                        <GraduationCap className="size-5" />
                      </span>
                    )}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="type-h4 text-foreground">
                          {entry.degree}
                        </h3>
                        {entry.period ? (
                          <span className="type-mono text-muted-foreground">
                            {entry.period}
                          </span>
                        ) : null}
                      </div>
                      <p className="type-mono text-muted-foreground mt-1">
                        {entry.institution}
                        {entry.location ? ` · ${entry.location}` : ""}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    {entry.coursework && entry.coursework.length > 0 ? (
                      <div>
                        <p className="type-mono text-muted-foreground uppercase">
                          Relevant coursework
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {entry.coursework.map((course) => (
                            <span
                              className="type-mono text-muted-foreground border-border rounded-full border px-2 py-0.5 text-xs"
                              key={course}
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    {projects.length > 0 ? (
                      <div>
                        <p className="type-mono text-muted-foreground uppercase">
                          Academic projects
                        </p>
                        <ul className="mt-3 space-y-2">
                          {projects.map((project) => (
                            <li key={project.slug}>
                              <Link
                                className="text-accent-cyan hover:text-foreground focus-visible:ring-ring/45 inline-flex items-center gap-1 rounded-sm text-sm font-medium transition-colors outline-none focus-visible:ring-3"
                                href={`/work/${project.slug}`}
                              >
                                {project.title}
                                <ArrowRight
                                  aria-hidden="true"
                                  className="size-3.5"
                                />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </PageContainer>
      </section>

      {/* Technical stack */}
      <section className="section-space pt-0">
        <PageContainer>
          <SectionHeading
            description="Grouped by role, not ranked by a made-up percentage."
            eyebrow="Technical focus"
            title="Tools I build with."
          />
          <div className="border-border bg-border mt-10 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-3">
            {technicalStack.map((group) => (
              <div className="bg-background/86 p-5 sm:p-6" key={group.group}>
                <p className="type-mono text-accent-cyan uppercase">
                  {group.group}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      className="type-mono text-foreground border-border bg-card/50 rounded-full border px-2.5 py-1 text-xs"
                      key={item}
                    >
                      {item}
                    </span>
                  ))}
                </div>
                {group.note ? (
                  <p className="type-body-sm text-muted-foreground mt-3">
                    {group.note}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Current direction + principles */}
      <section className="section-space pt-0">
        <PageContainer>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Current direction"
                title="What I'm exploring."
              />
              <p className="type-body text-foreground border-accent-cyan/40 mt-6 border-l-2 pl-4 italic">
                {currentDirection.philosophy}
              </p>
              <ul className="mt-6 space-y-2">
                {currentDirection.areas.map((area) => (
                  <li
                    className="type-body text-muted-foreground flex gap-3"
                    key={area}
                  >
                    <span aria-hidden="true" className="text-accent-cyan">
                      →
                    </span>
                    {area}
                  </li>
                ))}
              </ul>
              <p className="type-body-sm text-muted-foreground mt-6 max-w-xl">
                {currentDirection.careerNote}
              </p>
            </div>
            <div>
              <SectionHeading eyebrow="How I build" title="Principles." />
              <div className="mt-6 grid gap-3">
                {buildPrinciples.map((principle) => (
                  <div
                    className="border-border bg-card/45 rounded-xl border p-4"
                    key={principle.title}
                  >
                    <p className="text-foreground font-medium">
                      {principle.title}
                    </p>
                    <p className="type-body-sm text-muted-foreground mt-1.5">
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Selected work */}
      <section className="section-space pt-0">
        <PageContainer>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Selected work" title="The evidence." />
            <Link
              className="text-foreground hover:text-accent-cyan focus-visible:ring-ring/45 inline-flex items-center gap-1.5 rounded-full text-sm font-medium transition-colors outline-none focus-visible:ring-3"
              href="/work"
            >
              All work
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {selectedWork.map((item) => (
              <WorkCard item={item} key={item.slug} variant="compact" />
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Selected writing */}
      {selectedWriting.length > 0 ? (
        <section className="section-space pt-0">
          <PageContainer>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Selected writing" title="How I think." />
              <Link
                className="text-foreground hover:text-accent-cyan focus-visible:ring-ring/45 inline-flex items-center gap-1.5 rounded-full text-sm font-medium transition-colors outline-none focus-visible:ring-3"
                href="/writing"
              >
                All writing
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {selectedWriting.map((article) => (
                <ArticleCard
                  article={article}
                  key={article.slug}
                  readingTime={writingReadingTimes[article.slug]}
                />
              ))}
            </div>
          </PageContainer>
        </section>
      ) : null}

      {/* Contact CTA */}
      <section className="border-border border-t">
        <PageContainer className="py-14 sm:py-16">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="type-eyebrow text-accent-cyan">
                Let’s build something
              </p>
              <h2 className="type-h3 mt-3">
                Open to backend and AI/ML engineering work.
              </h2>
              <p className="type-body text-muted-foreground mt-4 max-w-2xl">
                If you’re working on data-intensive backends, applied ML, or
                system design, I’d be glad to talk.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link className={buttonVariants()} href="/contact">
                Contact
                <ArrowRight data-icon="inline-end" />
              </Link>
              <a
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "gap-1.5",
                )}
                href={siteConfig.links.github}
                rel="noreferrer"
                target="_blank"
              >
                GitHub
                <ArrowUpRight data-icon="inline-end" />
              </a>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
