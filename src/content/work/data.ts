import type { WorkItemInput } from "./schema";

export const rawWorkItems = [
  {
    slug: "hybrid-sentiment-intelligence-system",
    title: "Hybrid Sentiment Intelligence System",
    summary:
      "A hybrid sentiment classification pipeline combining semantic DeBERTa embeddings with structural XGBoost features through a learned gating mechanism.",
    description:
      "Representative AI/ML systems work focused on model comparison, feature fusion, and backend-ready sentiment inference boundaries.",
    type: "project",
    status: "active",
    areas: ["ai-ml", "nlp", "backend"],
    technologies: ["Python", "DeBERTa", "XGBoost", "PyTorch"],
    date: "2026-08",
    featured: true,
    priority: 1,
    contentPath: "content/work/hybrid-sentiment-intelligence-system.mdx",
    metrics: [
      {
        label: "Test Accuracy",
        value: "0.8741",
        description: "Final fusion model classification accuracy.",
      },
      {
        label: "Macro F1",
        value: "0.874",
        description: "Class-balanced F1 score.",
      },
      {
        label: "AUC",
        value: "0.947",
        description: "Ranking quality across thresholds.",
      },
      {
        label: "ECE",
        value: "0.0065",
        description: "Expected calibration error.",
      },
    ],
    project: {
      role: "Modeling and backend architecture",
      outcome: "Structured as a future case study around hybrid model design.",
    },
  },
  {
    slug: "backend-location-safety-service",
    title: "Backend Location / Safety Service",
    summary:
      "A service-oriented backend concept for location-aware safety workflows, combining geofencing, messaging boundaries, and notification delivery paths.",
    description:
      "Designed as representative backend architecture work without implying production deployment or employer-owned scope.",
    type: "project",
    status: "prototype",
    areas: ["backend", "databases", "infrastructure", "security"],
    technologies: ["FastAPI", "PostgreSQL", "Redis", "Docker"],
    date: "2026-07",
    featured: true,
    priority: 2,
    contentPath: "content/work/backend-location-safety-service.mdx",
    project: {
      role: "Backend service design",
      outcome: "Prepared for a future technical walkthrough.",
    },
  },
  {
    slug: "distributed-notification-architecture",
    title: "Distributed Notification Architecture",
    summary:
      "A backend architecture study focused on idempotency, retries, queue boundaries, and graceful degradation across asynchronous notification workflows.",
    description:
      "The item is explicitly modeled as a design study so future detail pages can distinguish assumptions from measured production results.",
    type: "system-design",
    status: "design-study",
    areas: [
      "backend",
      "distributed-systems",
      "infrastructure",
      "observability",
    ],
    technologies: ["Kafka", "Redis", "Docker"],
    date: "2026-06",
    featured: true,
    priority: 3,
    contentPath: "content/work/distributed-notification-architecture.mdx",
    systemDesign: {
      designOnly: true,
      scaleAssumptions: [
        "Queue depth, retry windows, and delivery fan-out are architecture assumptions, not measured production claims.",
      ],
    },
  },
  {
    slug: "semantic-structural-sentiment-fusion",
    title: "Semantic + Structural Sentiment Fusion",
    summary:
      "Research notes for comparing semantic embeddings, classical feature sets, and fusion strategies in sentiment classification workflows.",
    type: "research",
    status: "research",
    areas: ["ai-ml", "nlp"],
    technologies: ["Python", "DeBERTa", "XGBoost", "PyTorch"],
    date: "2026-05",
    featured: false,
    contentPath: "content/work/semantic-structural-sentiment-fusion.mdx",
    research: {
      methodology:
        "Future MDX should hold the full problem framing, baselines, evaluation, error analysis, and limitations.",
    },
  },
  {
    slug: "designing-reliable-event-consumers",
    title: "Designing Reliable Event Consumers",
    summary:
      "A practical article outline on message processing, deduplication, retries, and failure recovery in event-driven backend systems.",
    type: "writing",
    status: "completed",
    areas: ["backend", "distributed-systems", "observability"],
    technologies: ["Redis", "Kafka"],
    date: "2026-04",
    featured: false,
    contentPath: "content/work/designing-reliable-event-consumers.mdx",
    writing: {
      readingTime: 6,
      publishedAt: "2026-04",
    },
  },
  {
    slug: "why-rag-systems-fail-in-production",
    title: "Why RAG Systems Fail in Production",
    summary:
      "Notes on retrieval quality, context boundaries, evaluation gaps, and operational feedback loops in retrieval-augmented systems.",
    type: "writing",
    status: "completed",
    areas: ["ai-ml", "retrieval", "observability"],
    technologies: ["Embeddings", "Vector Search"],
    date: "2026-03",
    featured: false,
    contentPath: "content/work/why-rag-systems-fail-in-production.mdx",
    writing: {
      readingTime: 8,
      publishedAt: "2026-03",
    },
  },
  {
    slug: "vector-retrieval-benchmark",
    title: "Vector Retrieval Benchmark",
    summary:
      "A lab for benchmarking dense retrieval behavior across embedding choices, index settings, and evaluation queries.",
    type: "lab",
    status: "prototype",
    areas: ["retrieval", "ai-ml", "databases"],
    technologies: ["Python", "Embeddings", "HNSW"],
    date: "2026-02",
    featured: false,
    contentPath: "content/work/vector-retrieval-benchmark.mdx",
    lab: {
      experimentQuestion:
        "How do embedding choices and HNSW settings affect retrieval quality and latency tradeoffs?",
    },
  },
] satisfies WorkItemInput[];
