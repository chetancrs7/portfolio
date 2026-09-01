import * as React from "react";

import { cn } from "@/lib/utils";

export function TechnicalGrid({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0",
        "bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:44px_44px]",
        "[mask-image:linear-gradient(to_bottom,black,transparent_78%)]",
        className,
      )}
      {...props}
    />
  );
}
