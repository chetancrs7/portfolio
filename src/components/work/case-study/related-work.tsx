import type { WorkItem } from "@/content/work";

import { WorkCard } from "../work-card";

type RelatedWorkProps = {
  items: WorkItem[];
};

export function RelatedWork({ items }: RelatedWorkProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <div className="mb-6">
        <p className="type-eyebrow text-accent-cyan">Related work</p>
        <h2 className="type-h3 mt-3">Continue exploring</h2>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {items.map((item) => (
          <WorkCard item={item} key={item.slug} variant="compact" />
        ))}
      </div>
    </section>
  );
}
