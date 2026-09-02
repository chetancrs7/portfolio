import type { WorkItem } from "@/content/work";

import { WorkCard } from "./work-card";
import { WorkEmptyState } from "./work-empty-state";

type WorkGridProps = {
  items: WorkItem[];
};

export function WorkGrid({ items }: WorkGridProps) {
  if (items.length === 0) {
    return <WorkEmptyState />;
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {items.map((item) => (
        <WorkCard item={item} key={item.slug} />
      ))}
    </div>
  );
}
