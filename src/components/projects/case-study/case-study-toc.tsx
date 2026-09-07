import Link from "next/link";

import { cn } from "@/lib/utils";

type TocItem = {
  id: string;
  label: string;
};

type CaseStudyTocProps = {
  className?: string;
  items: TocItem[];
  title?: string;
};

export function CaseStudyToc({
  className,
  items,
  title = "On This Page",
}: CaseStudyTocProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label={title}
      className={cn(
        "border-border bg-card/55 rounded-xl border p-4",
        className,
      )}
    >
      <p className="type-mono text-foreground uppercase">{title}</p>
      <ol className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              className="text-muted-foreground hover:text-accent-cyan focus-visible:ring-ring/45 block rounded-sm py-1 text-sm leading-5 transition-colors outline-none focus-visible:ring-3"
              href={`#${item.id}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
