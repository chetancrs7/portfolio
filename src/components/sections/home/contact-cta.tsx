import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function ContactCta() {
  return (
    <section className="section-space pt-0">
      <PageContainer>
        <div className="border-border border-t pt-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="type-eyebrow text-accent-cyan">Contact</p>
              <h2 className="type-h2 mt-4 max-w-3xl text-balance">
                Interested in building technically difficult systems?
              </h2>
              <p className="type-body-lg text-muted-foreground mt-5 max-w-2xl">
                I am open to conversations around backend engineering, AI/ML
                systems and technical collaboration.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link className={buttonVariants({ size: "lg" })} href="/contact">
                Get in Touch
                <ArrowRight data-icon="inline-end" />
              </Link>
              <a
                aria-label="GitHub opens in a new tab"
                className={buttonVariants({ size: "lg", variant: "secondary" })}
                href={siteConfig.links.github}
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
                <ExternalLink data-icon="inline-end" />
              </a>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
