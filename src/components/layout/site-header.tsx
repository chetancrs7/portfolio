"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ExternalAction } from "@/components/layout/external-action";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLink } from "@/components/layout/nav-link";
import { StatusBadge } from "@/components/shared/status-badge";
import { mainNavigation, shellActions } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showBlur = isScrolled && !isHovered;

  return (
    <header
      className={cn(
        "border-border/70 sticky top-0 z-40 border-b transition-all duration-300",
        showBlur
          ? "bg-background/60 backdrop-blur-xl"
          : "bg-background/95"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container-page flex min-h-20 items-center justify-between gap-4">
        <Link
          className="group focus-visible:ring-ring/45 rounded-full outline-none focus-visible:ring-3"
          href="/"
        >
          <span className="sr-only">{siteConfig.title}</span>
          <span
            aria-hidden="true"
            className="text-foreground flex max-w-[13rem] items-center gap-2 truncate font-mono text-sm font-semibold uppercase sm:max-w-none"
          >
            <span className="bg-accent-cyan size-1.5 rounded-full shadow-[0_0_12px_var(--accent-cyan)]" />
            {siteConfig.name}
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="border-border bg-surface/72 hidden rounded-full border p-1 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.03)] backdrop-blur-md md:flex"
        >
          {mainNavigation.map((item) => (
            <NavLink href={item.href} key={item.href} label={item.label} />
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <StatusBadge className="hidden lg:inline-flex">Open</StatusBadge>
          {shellActions.map((action) => (
            <ExternalAction
              disabled={action.placeholder}
              external={action.external}
              href={action.href}
              key={action.label}
              label={action.label}
            />
          ))}
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
