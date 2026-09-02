import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FlagshipBorderBeam } from "@/components/design/flagship-border-beam";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/sections/home/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { featuredWork } from "@/data/home";
import { cn } from "@/lib/utils";

export function FeaturedWork() {
  const [flagship, ...supportingWork] = featuredWork;

  return (
    <section className="section-space pt-0">
      <PageContainer>
        <SectionHeading
          description="A small preview of work that will later move into a structured content model for projects, research, and system design."
          eyebrow="Selected work"
          title="Systems I've designed and built."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <FeaturedWorkCard
            className="lg:min-h-[34rem]"
            item={flagship}
            large
          />
          <div className="grid gap-5">
            {supportingWork.map((item) => (
              <FeaturedWorkCard item={item} key={item.title} />
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

type FeaturedWorkItem = (typeof featuredWork)[number];

function FeaturedWorkCard({
  className,
  item,
  large = false,
}: {
  className?: string;
  item: FeaturedWorkItem;
  large?: boolean;
}) {
  return (
    <Card
      className={cn("relative isolate", className)}
      variant={large ? "featured" : "interactive"}
    >
      {large ? (
        <div
          aria-hidden="true"
          className="absolute right-0 bottom-0 h-40 w-64 bg-[radial-gradient(circle_at_bottom_right,rgb(67_217_255_/_0.14),transparent_70%)]"
        />
      ) : null}
      {large ? <FlagshipBorderBeam /> : null}
      <CardHeader>
        <div className="mb-7 flex flex-wrap items-center gap-2">
          <Badge variant={large ? "status" : "outline"}>{item.type}</Badge>
          {item.areas.map((area) => (
            <Badge key={area} variant="outline">
              {area}
            </Badge>
          ))}
        </div>
        <CardTitle className={large ? "type-h2" : "type-h4"}>
          {item.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative mt-auto">
        <p
          className={cn(
            "text-muted-foreground",
            large ? "type-body-lg max-w-2xl" : "type-body",
          )}
        >
          {item.summary}
        </p>
        <p className="type-mono border-border text-muted-foreground mt-7 border-t pt-5">
          {item.technologies}
        </p>
        <Link
          className="text-foreground hover:text-accent-cyan focus-visible:ring-ring/45 mt-7 inline-flex items-center gap-1.5 rounded-full text-sm font-medium transition-colors outline-none focus-visible:ring-3"
          href={item.href}
        >
          Explore
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover/card:translate-x-1"
          />
        </Link>
      </CardContent>
    </Card>
  );
}
