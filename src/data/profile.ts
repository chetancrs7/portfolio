/**
 * Structured profile content for the About page. Projects and writing are NOT
 * duplicated here — they are referenced by slug and resolved through the Work
 * and Writing registries.
 */

export const aboutIntro = {
  identity: "Backend + AI/ML Engineer",
  statement:
    "I build backend systems and machine-learning tools, and I care most about the parts that are easy to get wrong: evaluation, failure handling, and the boundaries between services.",
  paragraphs: [
    "I work across backend engineering and applied machine learning. On the ML side that has meant building and honestly evaluating models — including a hybrid sentiment classifier whose most useful result was a negative one. On the backend side it has meant designing services around clear boundaries, real data models, and explicit failure handling.",
    "The thread between both is measurement. I try to understand a system's data flow, boundaries, and failure modes before adding complexity, and I treat a surprising result as evidence to investigate rather than a number to inflate.",
    "I am most interested in problems at the intersection of software engineering and machine learning — data-intensive backends, model evaluation, and systems that have to manage real-world state reliably.",
  ],
} as const;

export type ProfileLink = {
  label: string;
  href: string;
};

export type EngineeringFocus = {
  title: string;
  summary: string;
  evidence: ProfileLink[];
};

export const engineeringFocus: EngineeringFocus[] = [
  {
    title: "Backend Engineering",
    summary:
      "APIs, services, data modeling, and clear service boundaries — designed around reliability rather than the happy path.",
    evidence: [
      {
        label: "IoT Hiker Tracking",
        href: "/work/iot-hiker-tracking-platform",
      },
      { label: "Backend work", href: "/work?area=backend" },
    ],
  },
  {
    title: "AI / ML",
    summary:
      "Model engineering, NLP, and — above all — honest evaluation: calibration, baselines, and diagnosing why something did not work.",
    evidence: [
      {
        label: "KAN + XGBoost case study",
        href: "/work/hybrid-sentiment-intelligence-system",
      },
      {
        label: "On model fusion",
        href: "/writing/why-a-stronger-expert-made-fusion-pointless",
      },
    ],
  },
  {
    title: "Systems & Architecture",
    summary:
      "System decomposition, data flow, and tradeoffs — separating what is implemented from what is designed.",
    evidence: [
      {
        label: "Notification design study",
        href: "/work/distributed-notification-architecture",
      },
    ],
  },
  {
    title: "Geospatial & Data",
    summary:
      "Spatial data with PostGIS, and matching storage to workload — current spatial state versus high-rate telemetry.",
    evidence: [
      {
        label: "PostGIS + time-series",
        href: "/writing/postgis-and-a-separate-time-series-store",
      },
    ],
  },
] as const;

export type ExperienceEntry = {
  role: string;
  organization: string | null;
  location: string | null;
  period: string | null;
  summary: string;
  highlights?: string[];
  technologies?: string[];
  projectSlugs?: string[];
  placeholder?: boolean;
};

// Experience details are pending confirmation and will be filled in with real
// employer/date information. Rendered as a clearly-marked placeholder.
export const experience: ExperienceEntry[] = [
  {
    role: "Software Engineering (Internship)",
    organization: null,
    location: null,
    period: null,
    summary:
      "Backend feature development and bug fixes on an existing ASP.NET / C# application in the accounting and finance domain.",
    technologies: ["C#", "ASP.NET"],
    placeholder: true,
  },
] as const;

export type EducationEntry = {
  degree: string;
  institution: string;
  location: string;
  period: string;
  coursework: string[];
  projectSlugs?: string[];
};

export const education: EducationEntry[] = [
  {
    degree: "BSc Computer Science",
    institution: "Sunway University",
    location: "Malaysia",
    period: "2023 – 2026",
    coursework: [
      "Object-Oriented Programming",
      "Database Systems",
      "Operating Systems",
      "Computer Networks",
      "Web Development",
      "Machine Learning",
    ],
    projectSlugs: [
      "hybrid-sentiment-intelligence-system",
      "iot-hiker-tracking-platform",
    ],
  },
] as const;

export type StackGroup = {
  group: string;
  note?: string;
  items: string[];
};

export const technicalStack: StackGroup[] = [
  { group: "Languages", items: ["Python", "TypeScript", "C#", "SQL"] },
  { group: "Backend", items: ["NestJS", "Node.js", "ASP.NET", "REST APIs"] },
  {
    group: "AI / ML",
    items: [
      "PyTorch",
      "Transformers",
      "XGBoost",
      "scikit-learn",
      "spaCy / VADER",
      "SHAP",
    ],
  },
  { group: "Data", items: ["PostgreSQL", "PostGIS", "InfluxDB"] },
  {
    group: "Infrastructure",
    items: ["Docker", "Docker Compose", "Nginx", "Linux"],
  },
  {
    group: "Tooling",
    items: [
      "Git",
      "GitHub",
      "Hydra",
      "Optuna",
      "TensorBoard",
      "Weights & Biases",
    ],
  },
  {
    group: "Exploring",
    note: "Early exploration, not production experience.",
    items: ["Quantum + Machine Learning"],
  },
] as const;

export const currentDirection = {
  philosophy:
    "I learn by building systems, measuring what works, and investigating why something fails.",
  areas: [
    "Scalable, observable backend services",
    "Model evaluation and calibration over raw accuracy",
    "Geospatial data systems and workload-matched storage",
    "Quantum + machine learning (early exploration)",
  ],
  careerNote:
    "I'm most interested in backend and AI/ML engineering roles involving system design, data-intensive applications, and applied machine learning.",
} as const;

export const buildPrinciples = [
  {
    title: "Measure before optimizing",
    description:
      "Latency, model quality, and calibration over assumptions about what is slow or good.",
  },
  {
    title: "Prefer simple architecture",
    description: "Add complexity only when the workload actually justifies it.",
  },
  {
    title: "Treat failure as evidence",
    description:
      "A surprising result is something to diagnose, not a number to inflate.",
  },
  {
    title: "Make tradeoffs explicit",
    description:
      "State what is implemented, what is designed, and what each decision costs.",
  },
] as const;
