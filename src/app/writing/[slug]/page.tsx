import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Writing — Coming Soon",
  alternates: { canonical: `${siteConfig.url}/writing` },
  robots: { index: false, follow: true },
};

export function generateStaticParams() {
  return [];
}

export default function ArticleRedirect() {
  redirect("/writing");
}
