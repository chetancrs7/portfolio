import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import "@/app/globals.css";
import { siteConfig } from "@/config/site";
import { SiteShell } from "@/components/layout/site-shell";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${GeistSans.variable} ${GeistMono.variable} dark`}
      lang="en"
    >
      <body>
        <TooltipProvider>
          <SiteShell>{children}</SiteShell>
        </TooltipProvider>
      </body>
    </html>
  );
}
