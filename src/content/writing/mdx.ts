import "server-only";

import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";
import GithubSlugger from "github-slugger";

import {
  articles,
  getPublishedArticles,
  type Article,
} from "@/content/writing";

export type ArticleHeading = {
  depth: 2 | 3;
  id: string;
  label: string;
};

type ArticleMdxModule = {
  default: ComponentType<Record<string, unknown>>;
};

type ArticleContent = {
  Content: ComponentType<Record<string, unknown>>;
  headings: ArticleHeading[];
  readingTime: number;
};

const articleMdxModules = {
  "why-a-stronger-expert-made-fusion-pointless": () =>
    import("../../../content/writing/why-a-stronger-expert-made-fusion-pointless.mdx"),
  "postgis-and-a-separate-time-series-store": () =>
    import("../../../content/writing/postgis-and-a-separate-time-series-store.mdx"),
} satisfies Record<string, () => Promise<ArticleMdxModule>>;

const contentDirectory = path.join(process.cwd(), "content", "writing");

assertValidArticleContent();

export async function getArticleContent(
  slug: string,
): Promise<ArticleContent | null> {
  const loadModule = articleMdxModules[slug as keyof typeof articleMdxModules];

  if (!loadModule) {
    return null;
  }

  const loaded = await loadModule();
  const source = readArticleSource(slug);

  return {
    Content: loaded.default,
    headings: extractHeadings(source),
    readingTime: estimateReadingTime(source),
  };
}

export function getArticleReadingTime(slug: string) {
  return estimateReadingTime(readArticleSource(slug));
}

function readArticleSource(slug: string) {
  const sourcePath = path.join(contentDirectory, `${slug}.mdx`);

  return fs.existsSync(sourcePath) ? fs.readFileSync(sourcePath, "utf8") : "";
}

function extractHeadings(source: string): ArticleHeading[] {
  const slugger = new GithubSlugger();
  const headings: ArticleHeading[] = [];
  let insideFence = false;

  for (const line of source.split(/\r?\n/)) {
    if (/^```/.test(line.trim())) {
      insideFence = !insideFence;
      continue;
    }

    if (insideFence) {
      continue;
    }

    const match = /^(##|###)\s+(.+?)\s*#*\s*$/.exec(line);

    if (!match) {
      continue;
    }

    const depth = match[1].length as 2 | 3;
    const label = stripMarkdown(match[2]);

    if (!label) {
      continue;
    }

    headings.push({ depth, id: slugger.slug(label), label });
  }

  return headings.filter((heading) => heading.depth === 2).slice(0, 12);
}

/** Deterministic reading time: prose words (code, JSX, and fences stripped). */
function estimateReadingTime(source: string) {
  const withoutFences = source.replace(/```[\s\S]*?```/g, " ");
  const withoutJsx = withoutFences.replace(/<[^>]+>/g, " ");
  const words = withoutJsx
    .replace(/[#>*_`|~[\]()-]/g, " ")
    .split(/\s+/)
    .filter((token) => /[a-z0-9]/i.test(token));

  return Math.max(1, Math.round(words.length / 200));
}

function stripMarkdown(value: string) {
  return value
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_~]/g, "")
    .trim();
}

export function assertValidArticleContent() {
  if (!fs.existsSync(contentDirectory)) {
    return;
  }

  const files = fs
    .readdirSync(contentDirectory)
    .filter((file) => file.endsWith(".mdx"));
  const fileSlugs = files.map((file) => file.replace(/\.mdx$/, ""));
  const registrySlugs = new Set(articles.map((article) => article.slug));
  const publishedSlugs = new Set(
    getPublishedArticles().map((article: Article) => article.slug),
  );

  const orphanFiles = fileSlugs.filter((slug) => !registrySlugs.has(slug));
  const missingFiles = [...publishedSlugs].filter(
    (slug) => !fileSlugs.includes(slug),
  );
  const unmappedFiles = fileSlugs.filter(
    (slug) => !(slug in articleMdxModules),
  );

  const errors = [
    orphanFiles.length > 0
      ? `Orphan article MDX without a registry entry: ${orphanFiles.join(", ")}`
      : null,
    missingFiles.length > 0
      ? `Published articles without an MDX file: ${missingFiles.join(", ")}`
      : null,
    unmappedFiles.length > 0
      ? `Article MDX missing from articleMdxModules: ${unmappedFiles.join(", ")}`
      : null,
  ].filter(Boolean);

  if (errors.length > 0) {
    throw new Error(`Writing MDX validation failed:\n${errors.join("\n")}`);
  }
}
