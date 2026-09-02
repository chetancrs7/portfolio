import { type CSSProperties } from "react";

import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/sections/home/section-heading";
import { engineeringPrinciples } from "@/data/home";

export function EngineeringApproach() {
  return (
    <section className="section-space">
      <PageContainer>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            description="The page stays grounded in engineering decisions: boundaries, measurement, operations, and recoverability."
            eyebrow="Engineering approach"
            title="How I build technically difficult systems."
          />

          <div className="border-border border-y">
            {engineeringPrinciples.map((principle, index) => (
              <div
                className="border-border motion-reveal grid gap-4 border-b py-6 last:border-b-0 sm:grid-cols-[5rem_1fr]"
                key={principle.index}
                style={{ "--motion-delay": `${index * 70}ms` } as CSSProperties}
              >
                <p className="type-mono text-accent-cyan">{principle.index}</p>
                <div>
                  <h3 className="type-h4">{principle.title}</h3>
                  <p className="type-body text-muted-foreground mt-3">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
