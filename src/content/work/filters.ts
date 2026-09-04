import type { TechnicalArea, WorkType } from "./schema";

export type WorkTypeFilter = {
  label: string;
  type: WorkType | "all";
};

export type WorkAreaFilter = {
  area: TechnicalArea;
  label: string;
};

export const workTypeFilters: WorkTypeFilter[] = [
  { label: "All", type: "all" },
  { label: "Projects", type: "project" },
  { label: "Research", type: "research" },
  { label: "Systems", type: "system-design" },
  { label: "Writing", type: "writing" },
  { label: "Labs", type: "lab" },
];

export const workAreaFilters: WorkAreaFilter[] = [
  { area: "backend", label: "Backend" },
  { area: "ai-ml", label: "AI / ML" },
  { area: "nlp", label: "NLP" },
  { area: "deep-learning", label: "Deep Learning" },
  { area: "model-evaluation", label: "Model Evaluation" },
  { area: "interpretability", label: "Interpretability" },
  { area: "distributed-systems", label: "Distributed Systems" },
  { area: "databases", label: "Databases" },
  { area: "infrastructure", label: "Infrastructure" },
  { area: "retrieval", label: "Retrieval" },
];
