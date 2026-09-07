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
    slug: "iot-hiker-tracking-platform",
    title: "IoT Hiker Tracking Platform",
    summary:
      "A geospatial backend design for hiker location, monitoring, geofencing, and emergency workflows — built on an implemented NestJS API foundation.",
    description:
      "A backend systems-design case study: an implemented NestJS / TypeScript API scaffold plus a documented geospatial architecture (PostGIS, time-series monitoring, workflow orchestration). Geospatial subsystems are presented as design and planned work, not production claims.",
    type: "system-design",
    status: "design-study",
    areas: [
      "backend",
      "distributed-systems",
      "databases",
      "infrastructure",
      "observability",
    ],
    technologies: [
      "NestJS",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "PostGIS",
      "InfluxDB",
      "Docker",
      "Grafana",
    ],
    date: "2026-09",
    featured: true,
    priority: 2,
    contentPath: "content/work/iot-hiker-tracking-platform.mdx",
    systemDesign: {
      designOnly: true,
      scaleAssumptions: [
        "Ingestion rates, throughput, and fan-out figures in this study are architecture thought-experiments, not measured production numbers.",
      ],
    },
    project: {
      role: "Backend architecture, API design, and geospatial data modeling",
      outcome:
        "An implemented NestJS API foundation plus a documented geospatial system design with explicit implemented-vs-planned status.",
    },
  },
  {
    slug: "personal-portfolio-website",
    title: "Personal Portfolio Website",
    summary:
      "The site you're reading — a Next.js portfolio built with the App Router, MDX case studies, and a design system tuned for technical writing.",
    description:
      "A full-stack portfolio site engineered as a real project: MDX-driven case studies, a validated Zod-typed content registry, static generation with Next.js 15 App Router, and a dark-first design system with a scroll-aware navigation shell.",
    type: "project",
    status: "active",
    areas: ["backend", "infrastructure"],
    technologies: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "MDX",
      "Zod",
      "Framer Motion",
      "Vercel",
    ],
    date: "2026-09",
    featured: true,
    priority: 3,
    repository: "https://github.com/chetancrs7/portfolio",
    project: {
      role: "Design, architecture, and full-stack engineering",
      outcome:
        "A production portfolio with a schema-validated content registry, statically generated MDX case studies, and honest disclosure between designed vs implemented work.",
    },
  },
] satisfies WorkItemInput[];
