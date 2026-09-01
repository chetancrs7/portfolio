import Link from "next/link";

import { ExternalAction } from "@/components/layout/external-action";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLink } from "@/components/layout/nav-link";
import { StatusBadge } from "@/components/shared/status-badge";
import { mainNavigation, shellActions } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="border-border/70 bg-background/72 sticky top-0 z-40 border-b backdrop-blur-md">
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
            {siteConfig.name} / Engineering
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
