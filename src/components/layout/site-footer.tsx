import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { footerLinks, mainNavigation } from "@/config/navigation";
import { isPlaceholderLink, siteConfig } from "@/config/site";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const visibleFooterLinks = footerLinks.filter(
    (link) => link.href && !isPlaceholderLink(link.href),
  );

  return (
    <footer className="border-border bg-background/72 relative z-10 border-t">
      <PageContainer className="py-10">
        <div className="grid gap-10 md:grid-cols-[1fr_auto_auto]">
          <div>
            <p className="text-foreground font-mono text-sm font-semibold uppercase">
              {siteConfig.name}
            </p>
            <p className="type-body-sm text-muted-foreground mt-2 max-w-sm">
              Backend & AI/ML Engineer
            </p>
          </div>

          <nav aria-label="Footer navigation" className="grid gap-2">
            {mainNavigation.map((item) => (
              <Link
                className="type-body-sm text-muted-foreground hover:text-foreground focus-visible:ring-ring/45 rounded-md transition-colors outline-none focus-visible:ring-3"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="grid gap-2">
            {visibleFooterLinks.map((link) =>
              link.external ? (
                <a
                  aria-label={`${link.label} opens in a new tab`}
                  className="type-body-sm text-muted-foreground hover:text-foreground focus-visible:ring-ring/45 inline-flex items-center gap-1.5 rounded-md transition-colors outline-none focus-visible:ring-3"
                  href={link.href}
                  key={link.label}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {link.label}
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </a>
              ) : (
                <a
                  className="type-body-sm text-muted-foreground hover:text-foreground focus-visible:ring-ring/45 inline-flex items-center gap-1.5 rounded-md transition-colors outline-none focus-visible:ring-3"
                  href={link.href}
                  key={link.label}
                >
                  {link.label === "Email" ? (
                    <Mail aria-hidden="true" className="size-3.5" />
                  ) : null}
                  {link.label}
                </a>
              ),
            )}
          </div>
        </div>

        <div className="border-border mt-10 flex flex-col gap-2 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-mono text-muted-foreground">
            © {currentYear} {siteConfig.name}
          </p>
          <p className="type-mono text-muted-foreground">
            AI infrastructure / systems research
          </p>
        </div>
      </PageContainer>
    </footer>
  );
}
