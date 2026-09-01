import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusBadgeProps = React.ComponentProps<typeof Badge> & {
  dotClassName?: string;
  showDot?: boolean;
  variant?: React.ComponentProps<typeof Badge>["variant"];
};

export function StatusBadge({
  children,
  className,
  dotClassName,
  showDot = true,
  variant = "status",
  ...props
}: StatusBadgeProps) {
  return (
    <Badge className={className} variant={variant} {...props}>
      {showDot ? (
        <span
          aria-hidden="true"
          className={cn(
            "bg-accent-cyan size-1.5 rounded-full shadow-[0_0_12px_var(--accent-cyan)]",
            dotClassName,
          )}
        />
      ) : null}
      {children}
    </Badge>
  );
}
