import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { ArrowUpRight, Download, Mail } from "lucide-react";

import { AmbientGlow } from "@/components/design/ambient-glow";
import { TechnicalGrid } from "@/components/design/technical-grid";
import { CopyEmailButton } from "@/components/contact/copy-email-button";
import { SocialLinks } from "@/components/contact/social-links";
import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Contact — ${siteConfig.author.name}`,
  description:
    "Get in touch about backend engineering, AI/ML systems, or technical collaboration.",
};

const openTo = [
  {
    title: "Engineering roles",
    description:
      "Backend and AI/ML engineering positions involving system design and data-intensive applications.",
  },
  {
    title: "Technical collaboration",
    description:
      "Backend, ML, or systems projects with an interesting architectural problem.",
  },
  {
    title: "Research & experiments",
    description:
      "Model evaluation, applied ML experiments, and honest benchmarking.",
  },
];

function resumeHref() {
  const resumePath = path.join(process.cwd(), "public", "resume.pdf");

  return fs.existsSync(resumePath) ? "/resume.pdf" : null;
}

export default function ContactPage() {
  const email = siteConfig.author.email;
  const resume = resumeHref();

  return (
    <div className="technical-background min-h-screen">
      {/* Hero */}
      <section className="border-border relative isolate overflow-hidden border-b">
        <TechnicalGrid className="[mask-image:radial-gradient(circle_at_35%_20%,black,transparent_72%)] opacity-35" />
        <AmbientGlow className="-top-48 left-[8%] opacity-55" tone="cyan" />
        <AmbientGlow className="top-24 right-[10%] opacity-45" tone="violet" />
        <PageContainer className="relative py-16 sm:py-20">
          <div className="max-w-3xl">
            <Badge variant="status">Contact</Badge>
            <h1 className="type-h1 mt-7 text-balance">Get in touch</h1>
            <p className="type-body-lg text-muted-foreground mt-6 max-w-2xl">
              Interested in backend engineering, AI/ML systems, or technical
              collaboration? The fastest way to reach me is a direct email.
            </p>
            <p className="type-mono text-accent-cyan mt-6 inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className="bg-accent-cyan size-1.5 rounded-full"
              />
              {siteConfig.availability}
            </p>
          </div>
        </PageContainer>
      </section>

      {/* Primary email */}
      <section className="section-space">
        <PageContainer>
          <div className="border-border bg-card/55 rounded-2xl border p-6 sm:p-8">
            <p className="type-eyebrow text-accent-cyan">Email</p>
            <p className="type-body text-muted-foreground mt-3 max-w-2xl">
              Have a technical problem worth discussing, a role in mind, or a
              project to talk through? Send a note.
            </p>
            <a
              className="text-foreground hover:text-accent-cyan focus-visible:ring-ring/45 mt-5 inline-flex items-center gap-3 rounded-md text-2xl font-semibold break-all transition-colors outline-none focus-visible:ring-3 sm:text-3xl"
              href={`mailto:${email}`}
            >
              <Mail
                aria-hidden="true"
                className="hidden size-6 shrink-0 sm:block"
              />
              {email}
            </a>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}
                href={`mailto:${email}`}
              >
                <Mail aria-hidden="true" className="size-4" />
                Email me
              </a>
              <CopyEmailButton email={email} />
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Professional profiles */}
      <section className="section-space pt-0">
        <PageContainer>
          <h2 className="type-h3">Professional profiles</h2>
          <p className="type-body text-muted-foreground mt-3 max-w-2xl">
            The work is the evidence — the code and experience are public.
          </p>
          <SocialLinks className="mt-6" />

          {resume ? (
            <a
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "mt-6 gap-1.5",
              )}
              download
              href={resume}
            >
              <Download aria-hidden="true" className="size-4" />
              Download résumé
            </a>
          ) : null}
        </PageContainer>
      </section>

      {/* Open to */}
      <section className="section-space pt-0">
        <PageContainer>
          <h2 className="type-h3">What I&rsquo;m open to</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {openTo.map((item) => (
              <div
                className="border-border bg-card/45 rounded-xl border p-5"
                key={item.title}
              >
                <p className="text-foreground font-medium">{item.title}</p>
                <p className="type-body-sm text-muted-foreground mt-2">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Final note */}
      <section className="border-border border-t">
        <PageContainer className="py-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="type-body text-muted-foreground max-w-xl">
              Prefer email over a form — it reaches me directly, with no
              third-party service in between. I read every message and reply
              when it&rsquo;s a fit.
            </p>
            <a
              className={cn(buttonVariants({ variant: "outline" }), "gap-1.5")}
              href={siteConfig.links.github}
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
