import { z } from "zod";

export const workTypes = [
  "project",
  "research",
  "system-design",
  "writing",
  "lab",
] as const;

export const technicalAreas = [
  "backend",
  "ai-ml",
  "distributed-systems",
  "databases",
  "infrastructure",
  "retrieval",
  "nlp",
  "observability",
  "security",
] as const;

export const workStatuses = [
  "active",
  "completed",
  "research",
  "prototype",
  "design-study",
  "archived",
] as const;

const sortableDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}(-\d{2})?$/, "Use YYYY-MM or YYYY-MM-DD.");

const slugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase URL-safe slugs.");

const nonEmptyStringSchema = z.string().trim().min(1);

export const workTypeSchema = z.enum(workTypes);
export const technicalAreaSchema = z.enum(technicalAreas);
export const workStatusSchema = z.enum(workStatuses);

export const workMetricSchema = z
  .object({
    label: nonEmptyStringSchema,
    value: nonEmptyStringSchema,
    description: nonEmptyStringSchema.optional(),
  })
  .strict();

export const workItemSchema = z
  .object({
    slug: slugSchema,
    title: nonEmptyStringSchema,
    summary: nonEmptyStringSchema,
    description: nonEmptyStringSchema.optional(),
    type: workTypeSchema,
    status: workStatusSchema,
    areas: z.array(technicalAreaSchema).min(1),
    technologies: z.array(nonEmptyStringSchema).min(1),
    date: sortableDateSchema,
    featured: z.boolean(),
    priority: z.number().int().positive().optional(),
    repository: z.string().url().optional(),
    demo: z.string().url().optional(),
    externalUrl: z.string().url().optional(),
    metrics: z.array(workMetricSchema).optional(),
    cover: z
      .object({
        src: nonEmptyStringSchema,
        alt: nonEmptyStringSchema,
      })
      .strict()
      .optional(),
    contentPath: nonEmptyStringSchema.optional(),
    draft: z.boolean().default(false),
    project: z
      .object({
        role: nonEmptyStringSchema.optional(),
        outcome: nonEmptyStringSchema.optional(),
      })
      .strict()
      .optional(),
    research: z
      .object({
        dataset: nonEmptyStringSchema.optional(),
        methodology: nonEmptyStringSchema.optional(),
        bestMetric: workMetricSchema.optional(),
      })
      .strict()
      .optional(),
    systemDesign: z
      .object({
        designOnly: z.literal(true).optional(),
        scaleAssumptions: z.array(nonEmptyStringSchema).optional(),
      })
      .strict()
      .optional(),
    writing: z
      .object({
        readingTime: z.number().int().positive().optional(),
        publishedAt: sortableDateSchema.optional(),
        updatedAt: sortableDateSchema.optional(),
      })
      .strict()
      .optional(),
    lab: z
      .object({
        experimentQuestion: nonEmptyStringSchema.optional(),
      })
      .strict()
      .optional(),
  })
  .strict();

export const workRegistrySchema = z.array(workItemSchema);

export type WorkType = z.infer<typeof workTypeSchema>;
export type TechnicalArea = z.infer<typeof technicalAreaSchema>;
export type WorkStatus = z.infer<typeof workStatusSchema>;
export type WorkMetric = z.infer<typeof workMetricSchema>;
export type WorkItem = z.infer<typeof workItemSchema>;
export type WorkItemInput = z.input<typeof workItemSchema>;
