import type { TechnicalArea, WorkStatus, WorkType } from "./schema";

export const workTypeLabels: Record<WorkType, string> = {
  project: "Project",
  research: "Research",
  "system-design": "System Design",
  writing: "Writing",
  lab: "Lab",
};

export const technicalAreaLabels: Record<TechnicalArea, string> = {
  backend: "Backend",
  "ai-ml": "AI / ML",
  "deep-learning": "Deep Learning",
  "distributed-systems": "Distributed Systems",
  databases: "Databases",
  infrastructure: "Infrastructure",
  interpretability: "Interpretability",
  "model-evaluation": "Model Evaluation",
  retrieval: "Retrieval",
  nlp: "NLP",
  observability: "Observability",
  security: "Security",
};

export const workStatusLabels: Record<WorkStatus, string> = {
  active: "Active",
  completed: "Completed",
  research: "Research",
  prototype: "Prototype",
  "design-study": "Design Study",
  archived: "Archived",
};

export const workTypeIconNames: Record<WorkType, string> = {
  project: "Boxes",
  research: "FlaskConical",
  "system-design": "Network",
  writing: "FileText",
  lab: "TestTube",
};
