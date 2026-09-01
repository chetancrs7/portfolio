import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/sections/home/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { experiencePreview } from "@/data/home";

export function ExperiencePreview() {
  return (
    <section className="section-space pt-0">
      <PageContainer>
        <div className="surface-subtle rounded-2xl p-6 sm:p-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <SectionHeading
                eyebrow="Experience"
                title="Roles and context, kept concise."
              />
              <Link
                className={buttonVariants({ className: "mt-8", size: "lg" })}
                href="/experience"
              >
                View Experience
                <ArrowRight data-icon="inline-end" />
              </Link>
            </div>

            <div className="border-border bg-border grid gap-px overflow-hidden rounded-xl border sm:grid-cols-3">
              {experiencePreview.map((item) => (
                <div className="bg-background/86 p-5" key={item.area}>
                  <p className="type-mono text-accent-cyan">{item.area}</p>
                  <p className="text-foreground mt-5 text-base font-medium">
                    {item.organization}
                  </p>
                  <p className="type-body-sm text-muted-foreground mt-2">
                    {item.period}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
