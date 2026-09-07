import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Building2,
  Code2,
  FileText,
  FlaskConical,
  MapPin,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import {
  experience,
  experienceIntro,
  experienceStats,
  type ExperienceEntry,
} from "@/data/profile";
import { cn } from "@/lib/utils";

const statIcons: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  building: Building2,
  code: Code2,
};

const entryIcons: Record<ExperienceEntry["icon"], LucideIcon> = {
  briefcase: Briefcase,
  flask: FlaskConical,
  code: Code2,
};

const accent = {
  blue: {
    text: "text-accent-blue",
    border: "border-accent-blue/30",
    bg: "bg-accent-blue/10",
    dot: "bg-accent-blue",
  },
  violet: {
    text: "text-accent-violet",
    border: "border-accent-violet/30",
    bg: "bg-accent-violet/10",
    dot: "bg-accent-violet",
  },
  cyan: {
    text: "text-accent-cyan",
    border: "border-accent-cyan/30",
    bg: "bg-accent-cyan/10",
    dot: "bg-accent-cyan",
  },
} as const;

export function ExperienceTimeline() {
  return (
    <section className="grid gap-10 lg:grid-cols-[0.82fr_1.6fr] lg:gap-14">
      {/* Left column */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <p className="type-eyebrow text-accent-cyan flex items-center gap-3">
          Experience
          <span aria-hidden="true" className="bg-border-strong h-px w-10" />
        </p>
        <h2 className="type-h1 mt-6 text-balance">
          {experienceIntro.headingLead}
          <br />
          <span className="from-accent-cyan to-accent-violet bg-gradient-to-r bg-clip-text text-transparent">
            {experienceIntro.headingAccent}
          </span>
        </h2>
        <p className="type-body text-muted-foreground mt-5 max-w-md">
          {experienceIntro.subtitle}
        </p>

        <OrbitalGraphic />

        <div className="border-border bg-card/45 mt-2 rounded-2xl border p-5">
          <Sparkles aria-hidden="true" className="text-accent-violet size-4" />
          <p className="type-body-sm text-muted-foreground mt-3">
            {experienceIntro.note}
          </p>
        </div>
      </div>

      {/* Right column */}
      <div className="min-w-0">
        {/* Stats */}
        <div className="border-border bg-border grid grid-cols-1 gap-px overflow-hidden rounded-2xl border sm:grid-cols-3">
          {experienceStats.map((stat) => {
            const Icon = statIcons[stat.icon] ?? Briefcase;

            return (
              <div
                className="bg-background/86 flex items-center gap-4 p-5"
                key={stat.label}
              >
                <span
                  aria-hidden="true"
                  className="border-border bg-card/60 text-accent-cyan flex size-11 shrink-0 items-center justify-center rounded-xl border"
                >
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-foreground font-mono text-2xl font-semibold">
                    {stat.value}
                  </p>
                  <p className="type-mono text-muted-foreground mt-1">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline */}
        <ol className="mt-6 space-y-5">
          {experience.map((entry) => (
            <ExperienceCard entry={entry} key={entry.organization} />
          ))}
        </ol>

        {/* Résumé CTA */}
        <div className="mt-6">
          <a
            className={cn(
              buttonVariants({ size: "lg" }),
              "w-full justify-center gap-2 sm:w-auto",
            )}
            href={siteConfig.links.resume}
            rel="noreferrer"
            target="_blank"
          >
            <FileText aria-hidden="true" className="size-4" />
            View full résumé
            <ArrowRight data-icon="inline-end" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ entry }: { entry: ExperienceEntry }) {
  const tone = accent[entry.accent];
  const Icon = entryIcons[entry.icon];

  return (
    <li className="grid gap-x-6 gap-y-3 sm:grid-cols-[6.5rem_1fr]">
      <p className="type-mono text-muted-foreground sm:pt-6 sm:text-right">
        <span className={tone.text}>{entry.period.split("—")[0].trim()}</span>
        {entry.period.includes("—") ? (
          <>
            <span className="hidden sm:block">—</span>
            <span className="sm:block">
              {" "}
              {entry.period.split("—")[1].trim()}
            </span>
          </>
        ) : null}
      </p>

      <div className="relative sm:pl-8">
        {/* timeline rail + node */}
        <span
          aria-hidden="true"
          className="bg-border absolute top-0 left-0 hidden h-full w-px sm:block"
        />
        <span
          aria-hidden="true"
          className={cn(
            "ring-background absolute top-6 left-[-4px] hidden size-2.5 rounded-full ring-4 sm:block",
            tone.dot,
          )}
        />

        <article className="border-border bg-card/55 hover:border-border-strong rounded-2xl border p-6 transition-colors sm:p-7">
          <div className="flex items-start gap-4">
            {entry.logo ? (
              <span
                className={cn(
                  "relative size-20 shrink-0 overflow-hidden rounded-xl border p-1.5 sm:size-24",
                  tone.border,
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
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-xl border",
                  tone.border,
                  tone.bg,
                  tone.text,
                )}
              >
                <Icon className="size-5" />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className={cn("type-mono uppercase", tone.text)}>
                {entry.role}
              </p>
              <h3 className="type-h4 text-foreground mt-1">
                {entry.organization}
              </h3>
              <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <span className="inline-flex items-center gap-1.5 text-sm">
                  <MapPin aria-hidden="true" className="size-3.5" />
                  {entry.location}
                </span>
                <span className="border-border text-muted-foreground type-mono rounded-full border px-2 py-0.5 text-xs">
                  {entry.mode}
                </span>
              </div>
            </div>
          </div>

          <ul className="mt-5 space-y-2.5">
            {entry.highlights.map((highlight) => (
              <li
                className="text-muted-foreground flex gap-3 text-sm leading-6"
                key={highlight}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-2 size-1.5 shrink-0 rounded-full",
                    tone.dot,
                  )}
                />
                {highlight}
              </li>
            ))}
          </ul>

          <div className="border-border mt-5 flex flex-wrap items-end justify-between gap-4 border-t pt-5">
            <div>
              <p className="type-mono text-muted-foreground uppercase">
                Tech stack
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {entry.technologies.map((tech) => (
                  <span
                    className="type-mono text-muted-foreground border-border bg-background/40 rounded-full border px-2.5 py-1 text-xs"
                    key={tech}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            {entry.cta ? (
              <Link
                className={cn(
                  "focus-visible:ring-ring/45 inline-flex items-center gap-1.5 rounded-full text-sm font-medium transition-colors outline-none focus-visible:ring-3",
                  tone.text,
                  "hover:text-foreground",
                )}
                href={entry.cta.href}
              >
                {entry.cta.label}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            ) : null}
          </div>
        </article>
      </div>
    </li>
  );
}

function OrbitalGraphic() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto my-8 hidden aspect-square w-full max-w-[22rem] items-center justify-center sm:flex lg:mx-0"
    >
      <svg
        className="text-border h-full w-full"
        fill="none"
        viewBox="0 0 320 320"
      >
        <circle
          cx="160"
          cy="160"
          r="52"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle
          cx="160"
          cy="160"
          r="96"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.7"
        />
        <circle
          cx="160"
          cy="160"
          r="140"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.45"
        />
        <circle className="fill-accent-cyan" cx="256" cy="160" r="3" />
        <circle className="fill-accent-violet" cx="160" cy="64" r="3" />
        <circle className="fill-accent-blue" cx="94" cy="238" r="2.5" />
        <circle className="fill-accent-cyan/70" cx="64" cy="160" r="2.5" />
      </svg>
      <span className="border-accent-violet/25 bg-accent-violet/10 text-accent-violet shadow-accent-violet/25 absolute flex size-16 items-center justify-center rounded-2xl border shadow-lg">
        <Briefcase className="size-6" />
      </span>
    </div>
  );
}
