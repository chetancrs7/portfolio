import * as React from "react";

import { cn } from "@/lib/utils";

type PageContainerVariant = "default" | "wide" | "reading";

const containerClassName: Record<PageContainerVariant, string> = {
  default: "container-page",
  wide: "container-wide",
  reading: "container-reading",
};

type PageContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: PageContainerVariant;
};

export function PageContainer({
  children,
  className,
  variant = "default",
  ...props
}: PageContainerProps) {
  return (
    <div
      className={cn(containerClassName[variant], "min-w-0", className)}
      {...props}
    >
      {children}
    </div>
  );
}
