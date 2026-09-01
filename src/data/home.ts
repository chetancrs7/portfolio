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

export const featuredWork = [
  {
    title: "AI Financial Intelligence Platform",
    type: "Project",
    summary:
      "Event-driven financial backend combining transaction processing, machine-learning classification and semantic analytics.",
    areas: ["Backend", "AI", "Distributed Systems"],
    technologies: "FastAPI · PostgreSQL · Kafka · PyTorch",
    href: "/work",
    emphasis: "flagship",
  },
  {
    title: "Retrieval Evaluation Lab",
    type: "Research",
    summary:
      "A structured testbed for comparing retrieval quality, prompt behavior and response grounding across AI workflows.",
    areas: ["RAG", "Evaluation", "NLP"],
    technologies: "Python · Embeddings · Vector Search",
    href: "/work",
    emphasis: "standard",
  },
  {
    title: "Service Reliability Blueprint",
    type: "System Design",
    summary:
      "A backend architecture study focused on idempotency, retries, queue boundaries and graceful degradation.",
    areas: ["Architecture", "Reliability", "Queues"],
    technologies: "Redis · Workers · Observability",
    href: "/work",
    emphasis: "standard",
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

export const writingPreviews = [
  {
    type: "Writing",
    title: "Why RAG Systems Fail in Production",
    description:
      "Notes on retrieval quality, context boundaries, evaluation gaps and operational feedback loops.",
    category: "AI Infrastructure",
    readingTime: "8 min",
    href: "/work",
  },
  {
    type: "Writing",
    title: "Designing Idempotent Event Consumers",
    description:
      "A practical look at message processing, deduplication, retries and failure recovery.",
    category: "Backend Systems",
    readingTime: "6 min",
    href: "/work",
  },
  {
    type: "Writing",
    title: "Scaling Backend APIs Beyond One Instance",
    description:
      "Service boundaries, shared state, caching and observability for growing API systems.",
    category: "Distributed Systems",
    readingTime: "7 min",
    href: "/work",
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
