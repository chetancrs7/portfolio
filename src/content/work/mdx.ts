import "server-only";

import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";
import GithubSlugger from "github-slugger";

import { getAllWork, getPublishedWork, type WorkItem } from "@/content/work";

export type WorkMdxHeading = {
  depth: 2 | 3;
  id: string;
  label: string;
};

type WorkMdxModule = {
  default: ComponentType<Record<string, unknown>>;
};

type WorkMdxContent = {
  Content: ComponentType<Record<string, unknown>>;
  headings: WorkMdxHeading[];
};

const workMdxModules = {
  "designing-reliable-event-consumers": () =>
    import("../../../content/work/designing-reliable-event-consumers.mdx"),
  "distributed-notification-architecture": () =>
    import("../../../content/work/distributed-notification-architecture.mdx"),
  "hybrid-sentiment-intelligence-system": () =>
    import("../../../content/work/hybrid-sentiment-intelligence-system.mdx"),
  "semantic-structural-sentiment-fusion": () =>
    import("../../../content/work/semantic-structural-sentiment-fusion.mdx"),
  "vector-retrieval-benchmark": () =>
    import("../../../content/work/vector-retrieval-benchmark.mdx"),
} satisfies Record<string, () => Promise<WorkMdxModule>>;

const contentDirectory = path.join(process.cwd(), "content", "work");
const mdxFilenamePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*\.mdx$/;

assertValidWorkMdxContent();

export async function getWorkContent(
  item: Pick<WorkItem, "contentPath" | "slug">,
): Promise<WorkMdxContent | null> {
  const loadModule = workMdxModules[item.slug as keyof typeof workMdxModules];

  if (!item.contentPath || !loadModule) {
    warnAboutMissingContent(item.slug);
    return null;
  }

  const [module, headings] = await Promise.all([
    loadModule(),
    getWorkMdxHeadings(item.slug),
  ]);

  return {
    Content: module.default,
    headings,
  };
}

export function getWorkMdxHeadings(slug: string) {
  const sourcePath = path.join(contentDirectory, `${slug}.mdx`);

  if (!fs.existsSync(sourcePath)) {
    return [];
  }

  const source = fs.readFileSync(sourcePath, "utf8");
  const slugger = new GithubSlugger();
  const headings: WorkMdxHeading[] = [];
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

    if (!label || (depth === 3 && headings.length >= 12)) {
      continue;
    }

    headings.push({
      depth,
      id: slugger.slug(label),
      label,
    });
  }

  return headings.filter((heading) => heading.depth === 2).slice(0, 12);
}

export function assertValidWorkMdxContent() {
  if (!fs.existsSync(contentDirectory)) {
    return;
  }

  const files = fs
    .readdirSync(contentDirectory)
    .filter((file) => file.endsWith(".mdx"));
  const duplicateFiles = findCaseInsensitiveDuplicates(files);
  const invalidFiles = files.filter((file) => !mdxFilenamePattern.test(file));
  const registryItems = getAllWork();
  const registrySlugs = new Set(registryItems.map((item) => item.slug));
  const publishedContentSlugs = new Set(
    getPublishedWork()
      .filter((item) => item.contentPath)
      .map((item) => item.slug),
  );
  const fileSlugs = files.map((file) => file.replace(/\.mdx$/, ""));
  const orphanFiles = fileSlugs.filter((slug) => !registrySlugs.has(slug));
  const missingExpectedFiles = [...publishedContentSlugs].filter(
    (slug) => !fileSlugs.includes(slug),
  );
  const unmappedFiles = fileSlugs.filter((slug) => !(slug in workMdxModules));

  const errors = [
    invalidFiles.length > 0
      ? `Invalid MDX filenames: ${invalidFiles.join(", ")}`
      : null,
    duplicateFiles.length > 0
      ? `Duplicate MDX filenames by case: ${duplicateFiles.join(", ")}`
      : null,
    orphanFiles.length > 0
      ? `Orphan MDX files without Work registry entries: ${orphanFiles.join(", ")}`
      : null,
    missingExpectedFiles.length > 0
      ? `Work items with contentPath but no MDX file: ${missingExpectedFiles.join(", ")}`
      : null,
    unmappedFiles.length > 0
      ? `MDX files missing from workMdxModules: ${unmappedFiles.join(", ")}`
      : null,
  ].filter(Boolean);

  if (errors.length > 0) {
    throw new Error(`Work MDX validation failed:\n${errors.join("\n")}`);
  }
}

function stripMarkdown(value: string) {
  return value
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_~]/g, "")
    .trim();
}

function findCaseInsensitiveDuplicates(files: string[]) {
  const seen = new Map<string, string>();
  const duplicates = new Set<string>();

  for (const file of files) {
    const key = file.toLowerCase();
    const existing = seen.get(key);

    if (existing) {
      duplicates.add(existing);
      duplicates.add(file);
    }

    seen.set(key, file);
  }

  return [...duplicates];
}

function warnAboutMissingContent(slug: string) {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  console.warn(`Missing MDX content for published Work item: ${slug}`);
}
