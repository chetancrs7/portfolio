import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";

export function WorkCta() {
  return (
    <section className="border-border border-t">
      <PageContainer className="py-14 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="type-eyebrow text-accent-cyan">Next step</p>
            <h2 className="type-h3 mt-3">
              Interested in the engineering behind these systems?
            </h2>
            <p className="type-body text-muted-foreground mt-4 max-w-2xl">
              Explore my experience context or start a conversation about
              backend and AI/ML systems work.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              className={buttonVariants({ variant: "secondary" })}
              href="/experience"
            >
              Experience
              <ArrowRight data-icon="inline-end" />
            </Link>
            <Link className={buttonVariants()} href="/contact">
              Contact
              <ArrowRight data-icon="inline-end" />
            </Link>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
