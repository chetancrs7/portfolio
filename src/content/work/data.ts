import type { WorkItemInput } from "./schema";

export const rawWorkItems = [
  {
    slug: "hybrid-sentiment-intelligence-system",
    title: "Hybrid Sentiment Classification with KAN + XGBoost",
    summary:
      "A hybrid sentiment classifier combining spline-based semantic modeling with engineered linguistic features and adaptive decision-level fusion.",
    description:
      "Experimental AI/ML engineering work focused on semantic modeling, feature engineering, calibration, expert fusion, and honest evaluation of a KAN + XGBoost sentiment system.",
    type: "project",
    status: "completed",
    areas: [
      "ai-ml",
      "nlp",
      "deep-learning",
      "model-evaluation",
      "interpretability",
      "backend",
    ],
    technologies: [
      "Python",
      "PyTorch",
      "Transformers",
      "DeBERTa",
      "KAN",
      "XGBoost",
      "Hydra",
      "SHAP",
    ],
    date: "2026-08",
    featured: true,
    priority: 1,
    repository: "https://github.com/chetancrs7/kan_xgboost_sentiment",
    contentPath: "content/work/hybrid-sentiment-intelligence-system.mdx",
    metrics: [
      {
        label: "Test Accuracy",
        value: "0.875",
        description: "Final fusion model classification accuracy.",
      },
      {
        label: "Macro F1",
        value: "0.875",
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
      role: "AI/ML engineering, feature engineering, evaluation",
      outcome:
        "Evaluated a hybrid KAN + XGBoost sentiment architecture on a 160,000-sample held-out test split.",
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
