import type { TechnicalArea, WorkType } from "./schema";

export type WorkTypeFilter = {
  label: string;
  type: WorkType | "all";
};

export type WorkAreaFilter = {
  area: TechnicalArea;
  label: string;
  description?: string;
};

export const workAreaDescriptions: Partial<Record<TechnicalArea, string>> = {
  backend: "APIs, services, databases, and application infrastructure.",
  "ai-ml": "Machine learning systems, NLP experiments, and model engineering.",
  nlp: "Language modeling, sentiment, and text representation work.",
  "deep-learning": "Neural architectures, embeddings, and training pipelines.",
  "model-evaluation":
    "Metrics, calibration, baselines, and honest benchmarking.",
  interpretability: "Decomposable models and attribution over predictions.",
  "distributed-systems":
    "Event-driven flows, reliability, and service boundaries.",
  databases: "Relational, spatial, and time-series data modeling.",
  infrastructure: "Containerization, orchestration, and deployment topology.",
  retrieval: "Vector search, embeddings, and retrieval-quality tradeoffs.",
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
