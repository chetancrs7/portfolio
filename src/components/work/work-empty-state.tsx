import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export function WorkEmptyState() {
  return (
    <div className="surface-subtle rounded-2xl p-8 text-center">
      <p className="type-h4 text-foreground">No work matches these filters.</p>
      <p className="type-body text-muted-foreground mx-auto mt-3 max-w-md">
        Try clearing the active filters to return to the full technical archive.
      </p>
      <Link
        className={buttonVariants({ className: "mt-6", variant: "secondary" })}
        href="/work"
      >
        Clear filters
      </Link>
    </div>
  );
}
