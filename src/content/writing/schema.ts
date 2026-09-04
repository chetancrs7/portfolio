import { z } from "zod";

export const articleCategories = [
  "ai-ml",
  "backend",
  "systems",
  "architecture",
  "research-notes",
  "project-lessons",
] as const;

const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD dates.");

const slugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase URL-safe slugs.");

const nonEmptyStringSchema = z.string().trim().min(1);

export const articleCategorySchema = z.enum(articleCategories);

export const articleSchema = z
  .object({
    slug: slugSchema,
    title: nonEmptyStringSchema,
    description: nonEmptyStringSchema,
    category: articleCategorySchema,
    tags: z.array(nonEmptyStringSchema).min(1),
    publishedAt: dateSchema,
    updatedAt: dateSchema.optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    contentPath: nonEmptyStringSchema,
    relatedProjects: z.array(slugSchema).optional(),
    relatedArticles: z.array(slugSchema).optional(),
  })
  .strict();

export const articleRegistrySchema = z.array(articleSchema);

export type ArticleCategory = z.infer<typeof articleCategorySchema>;
export type Article = z.infer<typeof articleSchema>;
export type ArticleInput = z.input<typeof articleSchema>;
