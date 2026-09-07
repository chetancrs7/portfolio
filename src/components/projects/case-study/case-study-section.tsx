import Link from "next/link";
import { LinkIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

type CaseStudySectionProps = {
  children: React.ReactNode;
  className?: string;
  eyebrow?: string;
  id: string;
  title: string;
};

export function CaseStudySection({
  children,
  className,
  eyebrow,
  id,
  title,
}: CaseStudySectionProps) {
  return (
    <section className={cn("scroll-mt-28 py-10 first:pt-0", className)} id={id}>
      <div className="group/heading flex items-start gap-4">
        {eyebrow ? (
          <span className="type-mono text-accent-cyan mt-1 min-w-8">
            {eyebrow}
          </span>
        ) : null}
        <div className="min-w-0">
          <h2 className="type-h3 text-balance">{title}</h2>
          <Link
            aria-label={`Link to ${title}`}
            className="text-muted-foreground hover:text-accent-cyan focus-visible:ring-ring/45 mt-2 inline-flex items-center gap-1 rounded-sm text-xs opacity-0 transition-opacity group-hover/heading:opacity-100 focus-visible:opacity-100 focus-visible:ring-3"
            href={`#${id}`}
          >
            <LinkIcon aria-hidden="true" className="size-3" />
            Section link
          </Link>
        </div>
      </div>
      <div className="mt-6 space-y-6">{children}</div>
    </section>
  );
}

export function SectionText({
  bullets,
  paragraphs,
}: {
  bullets?: string[];
  paragraphs?: string[];
}) {
  return (
    <>
      {paragraphs?.map((paragraph) => (
        <p className="type-body text-muted-foreground" key={paragraph}>
          {paragraph}
        </p>
      ))}
      {bullets && bullets.length > 0 ? (
        <ul className="text-muted-foreground space-y-3">
          {bullets.map((bullet) => (
            <li className="type-body flex gap-3" key={bullet}>
              <span
                aria-hidden="true"
                className="bg-accent-cyan mt-3 size-1.5 shrink-0 rounded-full"
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
