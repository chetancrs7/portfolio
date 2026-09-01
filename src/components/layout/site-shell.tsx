import * as React from "react";

import { AmbientGlow } from "@/components/design/ambient-glow";
import { TechnicalGrid } from "@/components/design/technical-grid";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background text-foreground relative min-h-screen overflow-x-hidden">
      <a
        className="bg-primary text-primary-foreground focus-visible:ring-ring/45 fixed top-3 left-3 z-50 -translate-y-16 rounded-full px-4 py-2 text-sm font-medium transition-transform focus:translate-y-0 focus:outline-none focus-visible:ring-3"
        href="#main-content"
      >
        Skip to content
      </a>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <TechnicalGrid className="opacity-25" />
        <AmbientGlow className="-top-48 left-[8%] opacity-70" tone="violet" />
        <AmbientGlow className="right-[2%] -bottom-56 opacity-55" tone="blue" />
      </div>
      <SiteHeader />
      <main
        className="relative z-10 min-h-[calc(100vh-20rem)]"
        id="main-content"
      >
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
