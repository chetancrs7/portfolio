import type { ArticleInput } from "./schema";

export const rawArticles = [
  {
    slug: "why-a-stronger-expert-made-fusion-pointless",
    title: "Why a Stronger Expert Made My Fusion Model Pointless",
    description:
      "Adding a second model to a strong semantic classifier produced no measurable accuracy gain. Here is what the learned gate and an oracle bound revealed about when model fusion is worth it.",
    category: "research-notes",
    tags: ["KAN", "XGBoost", "Model Fusion", "NLP", "Calibration", "PyTorch"],
    publishedAt: "2026-09-02",
    featured: true,
    contentPath:
      "content/writing/why-a-stronger-expert-made-fusion-pointless.mdx",
    relatedProjects: ["hybrid-sentiment-intelligence-system"],
    relatedArticles: ["postgis-and-a-separate-time-series-store"],
  },
  {
    slug: "postgis-and-a-separate-time-series-store",
    title:
      "PostGIS and a Separate Time-Series Store: When One Database Isn't Right",
    description:
      "Location data is space and time at once. Designing a hiker-tracking backend, I split current spatial state from historical telemetry across two stores — here is the reasoning, and the cost.",
    category: "backend",
    tags: [
      "PostGIS",
      "PostgreSQL",
      "InfluxDB",
      "NestJS",
      "Geospatial",
      "System Design",
    ],
    publishedAt: "2026-08-20",
    featured: true,
    contentPath: "content/writing/postgis-and-a-separate-time-series-store.mdx",
    relatedProjects: ["iot-hiker-tracking-platform"],
    relatedArticles: ["why-a-stronger-expert-made-fusion-pointless"],
  },
] satisfies ArticleInput[];
