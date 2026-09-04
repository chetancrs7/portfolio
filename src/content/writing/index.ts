import { getWorkBySlug, type WorkItem } from "@/content/work";

import { rawArticles } from "./data";
import {
  articleRegistrySchema,
  type Article,
  type ArticleCategory,
} from "./schema";

export {
  articleCategories,
  articleCategorySchema,
  articleSchema,
  type Article,
  type ArticleCategory,
  type ArticleInput,
} from "./schema";
export {
  articleCategoryLabels,
  articleCategoryDescriptions,
} from "./categories";

function assertUniqueSlugs(items: Article[]) {
  const seen = new Set<string>();

  for (const item of items) {
    if (seen.has(item.slug)) {
      throw new Error(`Duplicate article slug detected: ${item.slug}`);
    }

    seen.add(item.slug);
  }
}

function toSortableDate(date: string) {
  return Date.parse(`${date}T00:00:00Z`);
}

const parsedArticles = articleRegistrySchema.parse(rawArticles);

assertUniqueSlugs(parsedArticles);

export const articles = parsedArticles;

/** Published = not a draft and not dated in the future. */
export function getPublishedArticles() {
  const now = Date.now();

  return [...articles]
    .filter(
      (article) => !article.draft && toSortableDate(article.publishedAt) <= now,
    )
    .sort(
      (a, b) => toSortableDate(b.publishedAt) - toSortableDate(a.publishedAt),
    );
}

export function getFeaturedArticles() {
  return getPublishedArticles().filter((article) => article.featured);
}

export function getArticleBySlug(slug: string) {
  return getPublishedArticles().find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: ArticleCategory) {
  return getPublishedArticles().filter(
    (article) => article.category === category,
  );
}

/** Categories that actually have at least one published article. */
export function getAvailableCategories(): ArticleCategory[] {
  const present = new Set(
    getPublishedArticles().map((article) => article.category),
  );

  return [...present];
}

export function getArticleHref(article: Pick<Article, "slug">) {
  return `/writing/${article.slug}`;
}

/** Resolve `relatedProjects` slugs against the Work registry (no duplication). */
export function getRelatedProjects(article: Article): WorkItem[] {
  return (article.relatedProjects ?? [])
    .map((slug) => getWorkBySlug(slug))
    .filter((item): item is WorkItem => Boolean(item));
}

/** Resolve related articles, falling back to same-category then shared tags. */
export function getRelatedArticles(article: Article, limit = 2): Article[] {
  const published = getPublishedArticles().filter(
    (candidate) => candidate.slug !== article.slug,
  );
  const explicit = (article.relatedArticles ?? [])
    .map((slug) => published.find((candidate) => candidate.slug === slug))
    .filter((candidate): candidate is Article => Boolean(candidate));

  if (explicit.length >= limit) {
    return explicit.slice(0, limit);
  }

  const scored = published
    .filter((candidate) => !explicit.includes(candidate))
    .map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) =>
        article.tags.includes(tag),
      ).length;
      const sameCategory = candidate.category === article.category ? 1 : 0;

      return { candidate, score: sharedTags + sameCategory };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ candidate }) => candidate);

  return [...explicit, ...scored].slice(0, limit);
}

export function getAdjacentArticles(slug: string) {
  const published = getPublishedArticles();
  const index = published.findIndex((article) => article.slug === slug);

  return {
    newer: index > 0 ? published[index - 1] : null,
    older:
      index >= 0 && index < published.length - 1 ? published[index + 1] : null,
  };
}
