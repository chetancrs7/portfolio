import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";

type RoutePlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export function RoutePlaceholder({
  ctaHref,
  ctaLabel,
  description,
  eyebrow,
  title,
}: RoutePlaceholderProps) {
  return (
    <section className="section-space">
      <PageContainer>
        <div className="max-w-3xl">
          <p className="type-eyebrow text-accent-cyan">{eyebrow}</p>
          <h1 className="type-h1 mt-5 text-balance">{title}</h1>
          <p className="type-body-lg text-muted-foreground mt-6 max-w-2xl">
            {description}
          </p>
          <p className="type-mono text-muted-foreground mt-6">
            Content coming in a later phase.
          </p>
          {ctaHref && ctaLabel ? (
            <Link
              className={buttonVariants({
                className: "mt-9",
                size: "lg",
              })}
              href={ctaHref}
            >
              {ctaLabel}
              <ArrowRight data-icon="inline-end" />
            </Link>
          ) : null}
        </div>
      </PageContainer>
    </section>
  );
}
