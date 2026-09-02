import Link from "next/link";
import { ExternalLink } from "lucide-react";

import {
  workStatusLabels,
  workTypeLabels,
  type WorkItem,
} from "@/content/work";

import { formatWorkDate } from "./case-study-header";

type TechnicalSnapshotProps = {
  item: WorkItem;
  role?: string;
};

export function TechnicalSnapshot({ item, role }: TechnicalSnapshotProps) {
  const rows = [
    ["Role", role ?? item.project?.role ?? "Engineering"],
    ["Type", workTypeLabels[item.type]],
    ["Status", workStatusLabels[item.status]],
    ["Stack", item.technologies.join(" · ")],
    ["Date", formatWorkDate(item.date)],
  ];

  return (
    <aside className="border-border bg-card/55 rounded-xl border p-5">
      <p className="type-mono text-foreground uppercase">Technical Snapshot</p>
      <dl className="mt-5 space-y-4">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="type-mono text-muted-foreground uppercase">
              {label}
            </dt>
            <dd className="text-foreground mt-1 text-sm leading-6">{value}</dd>
          </div>
        ))}
      </dl>
      {item.repository ? (
        <Link
          className="text-accent-cyan focus-visible:ring-ring/45 mt-5 inline-flex items-center gap-1.5 rounded-sm text-sm font-medium outline-none focus-visible:ring-3"
          href={item.repository}
          rel="noreferrer"
          target="_blank"
        >
          Repository
          <ExternalLink aria-hidden="true" className="size-3.5" />
        </Link>
      ) : null}
    </aside>
  );
}
