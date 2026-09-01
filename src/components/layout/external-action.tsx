import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ExternalActionProps = {
  className?: string;
  disabled?: boolean;
  external?: boolean;
  href: string;
  label: string;
};

export function ExternalAction({
  className,
  disabled = false,
  external = false,
  href,
  label,
}: ExternalActionProps) {
  const sharedClassName = cn(
    buttonVariants({ size: "sm", variant: "secondary" }),
    "text-xs",
    className,
  );

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={cn(sharedClassName, "cursor-not-allowed opacity-45")}
        title={`${label} coming soon`}
      >
        {label}
      </span>
    );
  }

  if (external) {
    return (
      <a
        aria-label={`${label} opens in a new tab`}
        className={sharedClassName}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {label}
        <ArrowUpRight data-icon="inline-end" />
      </a>
    );
  }

  return (
    <Link className={sharedClassName} href={href}>
      {label}
    </Link>
  );
}
