import type { ArticleCategory } from "./schema";

export const articleCategoryLabels: Record<ArticleCategory, string> = {
  "ai-ml": "AI / ML",
  backend: "Backend",
  systems: "Systems",
  architecture: "Architecture",
  "research-notes": "Research Notes",
  "project-lessons": "Project Lessons",
};

export const articleCategoryDescriptions: Record<ArticleCategory, string> = {
  "ai-ml": "Model engineering, experiments, and evaluation.",
  backend: "APIs, services, data modeling, and reliability.",
  systems: "Distributed systems, data flows, and infrastructure.",
  architecture: "System decomposition, boundaries, and tradeoffs.",
  "research-notes": "Findings, negative results, and what the metrics showed.",
  "project-lessons": "What building a specific system actually taught me.",
};
