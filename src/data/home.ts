export const homeHero = {
  eyebrow: "Backend + AI/ML Engineering",
  headline: {
    lead: "Engineering Systems",
    middle: "Behind",
    accent: "Intelligent Software.",
  },
  description:
    "Backend and AI/ML engineer building reliable APIs and services, machine-learning pipelines, and data-intensive applications — with a focus on evaluation, architecture, and honest tradeoffs.",
  primaryCta: {
    label: "View Work",
    href: "/work",
  },
} as const;

export const credibilityItems = [
  {
    value: "3",
    label: "Core areas",
    description: "Backend, AI/ML, infrastructure",
  },
  {
    value: "AI/ML",
    label: "Primary focus",
    description: "Applied intelligence systems",
  },
  {
    value: "Systems",
    label: "Build style",
    description: "APIs, data flow, reliability",
  },
  {
    value: "Research",
    label: "Technical direction",
    description: "Evaluation and iteration",
  },
] as const;

export const engineeringFocusAreas = [
  {
    index: "01",
    title: "Backend Systems",
    summary:
      "APIs, services, data modeling, and clear service boundaries designed around reliability.",
    capabilities: [
      "Service boundaries",
      "Relational & spatial data",
      "Event-driven design",
      "Failure handling",
    ],
    stack: "NestJS · Node.js · PostgreSQL/PostGIS · Docker",
  },
  {
    index: "02",
    title: "AI / ML Systems",
    summary:
      "NLP model engineering with an emphasis on evaluation, calibration, and honest baselines.",
    capabilities: [
      "NLP pipelines",
      "Model evaluation",
      "Calibration",
      "Baselines & error analysis",
    ],
    stack: "Python · PyTorch · Transformers · XGBoost",
  },
  {
    index: "03",
    title: "Infrastructure",
    summary:
      "Containerized environments, reproducible builds, and CI-validated delivery.",
    capabilities: [
      "Containerized services",
      "CI pipelines",
      "Reproducible builds",
      "Reverse proxy / TLS",
    ],
    stack: "Docker · Docker Compose · Nginx · Linux",
  },
] as const;

export const engineeringPrinciples = [
  {
    index: "01",
    title: "Architecture before abstraction",
    description:
      "Understand requirements, data flow, service boundaries and failure modes before adding complexity.",
  },
  {
    index: "02",
    title: "Measure what matters",
    description:
      "Use latency, throughput, model quality, retrieval performance and reliability signals rather than assumptions.",
  },
  {
    index: "03",
    title: "Treat AI as a system",
    description:
      "Models sit beside APIs, data pipelines, evaluation, observability and deployment.",
  },
  {
    index: "04",
    title: "Design for failure",
    description:
      "Plan for retries, idempotency, timeouts, graceful degradation and recoverability.",
  },
] as const;

export const experiencePreview = [
  {
    area: "Education",
    organization: "Sunway University · BSc Computer Science",
    period: "2023 – 2026",
  },
  {
    area: "AI / ML",
    organization: "KAN + XGBoost sentiment system",
    period: "2026",
  },
  {
    area: "Backend Systems",
    organization: "IoT Hiker Tracking platform",
    period: "2026",
  },
] as const;
