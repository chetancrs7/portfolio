import { BrainCircuit, Database, Network } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/sections/home/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { engineeringFocusAreas } from "@/data/home";

const icons = [Database, BrainCircuit, Network];

export function EngineeringFocus() {
  return (
    <section className="section-space">
      <PageContainer>
        <SectionHeading
          description="Three connected areas shape the portfolio: reliable backend services, applied AI systems, and the infrastructure that lets them survive real use."
          eyebrow="What I work on"
          title="Engineering across systems and intelligence."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {engineeringFocusAreas.map((area, index) => {
            const Icon = icons[index];

            return (
              <Card key={area.title} variant="interactive">
                <CardHeader>
                  <div className="mb-6 flex items-center justify-between">
                    <span className="border-border bg-muted/40 text-accent-cyan grid size-10 place-items-center rounded-full border">
                      <Icon aria-hidden="true" className="size-4" />
                    </span>
                    <span className="type-mono text-muted-foreground">
                      {area.index}
                    </span>
                  </div>
                  <CardTitle className="type-h4">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="type-body text-muted-foreground">
                    {area.summary}
                  </p>
                  <ul className="mt-6 grid gap-2">
                    {area.capabilities.map((capability) => (
                      <li
                        className="type-body-sm text-muted-foreground flex gap-2"
                        key={capability}
                      >
                        <span
                          aria-hidden="true"
                          className="bg-accent-cyan mt-2 size-1 rounded-full"
                        />
                        {capability}
                      </li>
                    ))}
                  </ul>
                  <p className="type-mono border-border text-muted-foreground mt-7 border-t pt-5">
                    {area.stack}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
