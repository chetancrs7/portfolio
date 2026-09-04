import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getPublishedWork } from "@/content/work";
import { getPublishedArticles } from "@/content/writing";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/work`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/writing`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/about`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.6 },
  ];

  const workRoutes: MetadataRoute.Sitemap = getPublishedWork().map((item) => ({
    url: `${base}/work/${item.slug}`,
    lastModified: new Date(
      item.date.length === 7 ? `${item.date}-01` : item.date,
    ),
    changeFrequency: "monthly",
    priority: item.featured ? 0.8 : 0.6,
  }));

  const articleRoutes: MetadataRoute.Sitemap = getPublishedArticles().map(
    (article) => ({
      url: `${base}/writing/${article.slug}`,
      lastModified: new Date(article.updatedAt ?? article.publishedAt),
      changeFrequency: "monthly",
      priority: article.featured ? 0.7 : 0.5,
    }),
  );

  return [...staticRoutes, ...workRoutes, ...articleRoutes];
}
