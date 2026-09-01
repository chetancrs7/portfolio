import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

import { AmbientGlow } from "@/components/design/ambient-glow";
import { TechnicalGrid } from "@/components/design/technical-grid";
import { PageContainer } from "@/components/layout/page-container";
import { TechnicalVisual } from "@/components/sections/home/technical-visual";
import { StatusBadge } from "@/components/shared/status-badge";
import { buttonVariants } from "@/components/ui/button";
import { homeHero } from "@/data/home";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  return (
    <section className="border-border relative isolate min-h-[calc(82vh-5rem)] overflow-hidden border-b">
      <TechnicalGrid className="[mask-image:radial-gradient(circle_at_45%_38%,black,transparent_72%)] opacity-45" />
      <AmbientGlow className="-top-44 left-[8%] opacity-80" tone="violet" />
      <AmbientGlow className="top-32 right-[8%] opacity-75" tone="cyan" />

      <PageContainer className="relative grid min-h-[calc(82vh-5rem)] gap-12 py-20 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:py-24">
        <div className="max-w-4xl min-w-0">
          <StatusBadge>{siteConfig.availability}</StatusBadge>
          <p className="type-mono text-muted-foreground mt-7 uppercase">
            {homeHero.eyebrow}
          </p>
          <h1 className="type-display mt-5 max-w-5xl text-balance">
            {homeHero.headline.lead}
            <br />
            {homeHero.headline.middle}
            <span className="hidden sm:inline"> </span>
            <br className="sm:hidden" />
            <span className="text-gradient-primary">
              {homeHero.headline.accent}
            </span>
          </h1>
          <p className="type-body-lg text-muted-foreground mt-7 max-w-2xl text-wrap">
            {homeHero.description}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              className={buttonVariants({
                className: "w-full sm:w-auto",
                size: "lg",
              })}
              href={homeHero.primaryCta.href}
            >
              {homeHero.primaryCta.label}
              <ArrowRight data-icon="inline-end" />
            </Link>
            <a
              aria-label="GitHub opens in a new tab"
              className={buttonVariants({
                className: "w-full sm:w-auto",
                size: "lg",
                variant: "secondary",
              })}
              href={siteConfig.links.github}
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
              <ExternalLink data-icon="inline-end" />
            </a>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <TechnicalVisual />
        </div>
      </PageContainer>
    </section>
  );
}
