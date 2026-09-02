export const homeHero = {
  eyebrow: "Backend + AI/ML Engineering",
  headline: {
    lead: "Engineering Systems",
    middle: "Behind",
    accent: "Intelligent Software.",
  },
  description:
    "Backend and AI/ML engineer building reliable APIs, distributed services, ML pipelines, retrieval infrastructure and data-intensive applications.",
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
      "APIs, asynchronous services, data architecture and distributed processing.",
    capabilities: [
      "Service boundaries",
      "Database design",
      "Caching strategies",
      "Event-driven workflows",
    ],
    stack: "FastAPI · PostgreSQL · Redis · Kafka",
  },
  {
    index: "02",
    title: "AI / ML Systems",
    summary:
      "Machine learning pipelines, LLM applications, retrieval and model evaluation.",
    capabilities: [
      "NLP pipelines",
      "Retrieval systems",
      "Evaluation loops",
      "Model-serving APIs",
    ],
    stack: "Python · PyTorch · LangChain · Vector DBs",
  },
  {
    index: "03",
    title: "Infrastructure",
    summary:
      "Containers, CI/CD, observability, deployment and reliability practices.",
    capabilities: [
      "Containerized services",
      "Deployment pipelines",
      "Telemetry",
      "Failure handling",
    ],
    stack: "Docker · GitHub Actions · Linux · Cloud",
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
    area: "Backend Engineering",
    organization: "Organization TBD",
    period: "Current",
  },
  {
    area: "AI Research",
    organization: "Research context TBD",
    period: "Recent",
  },
  {
    area: "Computer Science",
    organization: "Education details TBD",
    period: "Timeline TBD",
  },
] as const;
