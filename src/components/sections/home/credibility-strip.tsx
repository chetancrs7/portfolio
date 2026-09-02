import { type CSSProperties } from "react";

import { MotionNumber } from "@/components/design/motion-number";
import { PageContainer } from "@/components/layout/page-container";
import { credibilityItems } from "@/data/home";

export function CredibilityStrip() {
  return (
    <section className="border-border border-b">
      <PageContainer>
        <div className="border-border bg-border grid gap-px overflow-hidden rounded-b-2xl border-x sm:grid-cols-2 lg:grid-cols-4">
          {credibilityItems.map((item, index) => (
            <div
              className="bg-background/86 motion-reveal p-5 sm:p-6"
              key={item.label}
              style={{ "--motion-delay": `${index * 55}ms` } as CSSProperties}
            >
              <p className="text-foreground font-mono text-2xl font-semibold">
                {item.label === "Core areas" ? (
                  <MotionNumber
                    ariaLabel="3 core areas"
                    className="font-mono"
                    value={3}
                  />
                ) : (
                  item.value
                )}
              </p>
              <p className="type-mono text-muted-foreground mt-2 uppercase">
                {item.label}
              </p>
              <p className="type-body-sm text-muted-foreground mt-3">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
