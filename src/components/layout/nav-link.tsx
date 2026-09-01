"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isActivePath } from "@/config/navigation";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  className?: string;
  href: string;
  label: string;
  mobile?: boolean;
  onClick?: () => void;
};

export function NavLink({
  className,
  href,
  label,
  mobile = false,
  onClick,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = isActivePath(pathname, href);

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group/nav text-muted-foreground hover:text-foreground focus-visible:ring-ring/45 relative rounded-full font-medium transition-colors outline-none focus-visible:ring-3",
        mobile
          ? "flex min-h-11 items-center justify-between px-4 text-base"
          : "px-3 py-1.5 text-sm",
        isActive && "bg-muted/65 text-foreground",
        className,
      )}
      href={href}
      onClick={onClick}
    >
      <span>{label}</span>
      <span
        aria-hidden="true"
        className={cn(
          "bg-accent-cyan absolute rounded-full opacity-0 shadow-[0_0_12px_var(--accent-cyan)] transition-opacity",
          mobile
            ? "right-4 size-1.5"
            : "top-1/2 left-1.5 size-1 -translate-y-1/2",
          isActive && "opacity-100",
        )}
      />
    </Link>
  );
}
