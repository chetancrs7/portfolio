import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  technicalAreaLabels,
  workStatusLabels,
  workTypeLabels,
  type WorkItem,
} from "@/content/work";
import { cn } from "@/lib/utils";

type CaseStudyHeaderProps = {
  item: WorkItem;
};

type HeaderAction = {
  href: string;
  label: string;
};

export function CaseStudyHeader({ item }: CaseStudyHeaderProps) {
  const actions = [
    item.repository
      ? {
          href: item.repository,
          label: "View Source",
        }
      : null,
    item.demo
      ? {
          href: item.demo,
          label: "Live Demo",
        }
      : null,
    item.externalUrl
      ? {
          href: item.externalUrl,
          label: "Read Article",
        }
      : null,
  ].filter((action): action is HeaderAction => Boolean(action));

  return (
    <header className="pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20">
      <Link
        className={buttonVariants({
          className: "mb-10",
          variant: "secondary",
        })}
        href="/work"
      >
        <ArrowLeft data-icon="inline-start" />
        All Work
      </Link>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Badge variant="status">
          {workTypeLabels[item.type].toUpperCase()}
        </Badge>
        <Badge variant="outline">{workStatusLabels[item.status]}</Badge>
        <span className="type-mono text-muted-foreground">
          {formatWorkDate(item.date)}
        </span>
      </div>

      <h1 className="type-h1 max-w-5xl text-balance">{item.title}</h1>
      <p className="type-body-lg text-muted-foreground mt-6 max-w-3xl">
        {item.summary}
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {item.areas.map((area) => (
          <Badge key={area} variant="outline">
            {technicalAreaLabels[area]}
          </Badge>
        ))}
      </div>

      {actions.length > 0 ? (
        <div className="mt-8 flex flex-wrap gap-3">
          {actions.map((action) => (
            <Link
              className={cn(
                buttonVariants({ size: "sm", variant: "outline" }),
                "gap-1.5",
              )}
              href={action.href}
              key={action.href}
              rel="noreferrer"
              target="_blank"
            >
              {action.label}
              <ExternalLink data-icon="inline-end" />
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}

export function formatWorkDate(date: string) {
  const normalizedDate = date.length === 7 ? `${date}-01` : date;

  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(new Date(`${normalizedDate}T00:00:00Z`));
}
