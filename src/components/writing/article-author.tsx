import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { siteConfig } from "@/config/site";

export function ArticleAuthor() {
  const initials = siteConfig.author.name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <aside className="border-border bg-card/55 mt-12 flex flex-col gap-4 rounded-xl border p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="border-border bg-background/60 text-foreground type-mono flex size-11 items-center justify-center rounded-full border"
        >
          {initials}
        </span>
        <div>
          <p className="text-foreground font-medium">
            {siteConfig.author.name}
          </p>
          <p className="type-mono text-muted-foreground mt-0.5">
            Backend &amp; AI/ML Engineer
          </p>
        </div>
      </div>
      <Link
        className="text-accent-cyan hover:text-foreground focus-visible:ring-ring/45 inline-flex items-center gap-1.5 rounded-full text-sm font-medium transition-colors outline-none focus-visible:ring-3"
        href="/about"
      >
        About
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </aside>
  );
}
