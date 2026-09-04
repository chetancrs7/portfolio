import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

import { FlagshipBorderBeam } from "@/components/design/flagship-border-beam";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkMetric } from "@/components/work/work-metric";
import {
  getWorkHref,
  getWritingReadingTime,
  technicalAreaLabels,
  workStatusLabels,
  workTypeLabels,
  type WorkItem,
} from "@/content/work";
import { cn } from "@/lib/utils";

type WorkCardProps = {
  className?: string;
  item: WorkItem;
  variant?: "default" | "featured" | "compact";
};

const typeAccentClasses: Record<WorkItem["type"], string> = {
  project: "bg-accent-blue",
  research: "bg-accent-violet",
  "system-design": "bg-accent-cyan",
  writing: "bg-muted-foreground",
  lab: "bg-accent-teal",
};

function formatDate(date: string) {
  const normalizedDate = date.length === 7 ? `${date}-01` : date;

  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(new Date(`${normalizedDate}T00:00:00Z`));
}

function getVisibleTechnologies(technologies: string[]) {
  const visible = technologies.slice(0, 5);
  const remaining = technologies.length - visible.length;

  return remaining > 0
    ? `${visible.join(" · ")} · +${remaining}`
    : visible.join(" · ");
}

function shouldShowStatus(item: WorkItem) {
  return item.status !== "completed" || item.type === "system-design";
}

export function WorkCard({
  className,
  item,
  variant = "default",
}: WorkCardProps) {
  const isFeatured = variant === "featured";
  const metrics = item.metrics?.slice(0, isFeatured ? 2 : 1) ?? [];
  const readingTime = getWritingReadingTime(item);

  return (
    <Card
      className={cn("relative isolate", className)}
      variant={isFeatured ? "featured" : "interactive"}
    >
      {isFeatured ? <FlagshipBorderBeam /> : null}
      <CardHeader>
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <Badge variant={isFeatured ? "status" : "outline"}>
            <span
              aria-hidden="true"
              className={cn(
                "size-1.5 rounded-full",
                typeAccentClasses[item.type],
              )}
            />
            {workTypeLabels[item.type]}
          </Badge>
          {shouldShowStatus(item) ? (
            <Badge variant="outline">{workStatusLabels[item.status]}</Badge>
          ) : null}
          <span className="type-mono text-muted-foreground ml-auto">
            {formatDate(item.date)}
          </span>
        </div>
        <CardTitle className={isFeatured ? "type-h2" : "type-h4"}>
          {item.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="relative mt-auto">
        <p
          className={cn(
            "text-muted-foreground",
            isFeatured ? "type-body-lg max-w-3xl" : "type-body",
          )}
        >
          {item.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {item.areas.map((area) => (
            <Badge key={area} variant="outline">
              {technicalAreaLabels[area]}
            </Badge>
          ))}
        </div>

        <p className="type-mono border-border text-muted-foreground mt-6 border-t pt-5">
          {getVisibleTechnologies(item.technologies)}
        </p>

        {item.type === "writing" && readingTime ? (
          <p className="type-mono text-muted-foreground mt-3">
            {readingTime} read
          </p>
        ) : null}

        {item.type === "system-design" &&
        item.systemDesign?.scaleAssumptions ? (
          <p className="type-body-sm text-muted-foreground mt-4">
            Design assumptions, not measured production results.
          </p>
        ) : null}

        {metrics.length > 0 ? (
          <div className="border-border mt-6 grid gap-4 border-t pt-5 sm:grid-cols-2">
            {metrics.map((metric) => (
              <WorkMetric key={metric.label} metric={metric} />
            ))}
          </div>
        ) : null}

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link
            className="text-foreground hover:text-accent-cyan focus-visible:ring-ring/45 inline-flex items-center gap-1.5 rounded-full text-sm font-medium transition-colors outline-none focus-visible:ring-3"
            href={getWorkHref(item)}
          >
            {item.contentPath ? "Read case study" : "View project"}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover/card:translate-x-1"
            />
          </Link>
          {item.repository ? (
            <a
              className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/45 inline-flex items-center gap-1.5 rounded-full text-sm font-medium transition-colors outline-none focus-visible:ring-3"
              href={item.repository}
              rel="noreferrer"
              target="_blank"
            >
              GitHub
              <ExternalLink aria-hidden="true" className="size-3.5" />
            </a>
          ) : null}
          {item.demo ? (
            <a
              className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/45 inline-flex items-center gap-1.5 rounded-full text-sm font-medium transition-colors outline-none focus-visible:ring-3"
              href={item.demo}
              rel="noreferrer"
              target="_blank"
            >
              Live demo
            </a>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
