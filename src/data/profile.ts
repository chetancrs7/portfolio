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

export const experienceIntro = {
  headingLead: "Building solutions.",
  headingAccent: "Driving impact.",
  subtitle:
    "A journey of turning ideas into reliable systems, solving real-world problems, and delivering measurable results.",
  note: "I focus on building robust systems, leveraging AI/ML and modern technologies to create meaningful, well-engineered software.",
} as const;

export type ExperienceStat = {
  icon: "briefcase" | "building" | "code";
  value: string;
  label: string;
};

export const experienceStats: ExperienceStat[] = [
  { icon: "briefcase", value: "1+", label: "Years Experience" },
  { icon: "building", value: "3", label: "Companies" },
  { icon: "code", value: "3+", label: "Major Contributions" },
];

export type ExperienceEntry = {
  role: string;
  organization: string;
  location: string;
  period: string;
  mode: "On-site" | "Remote" | "Hybrid";
  highlights: string[];
  technologies: string[];
  cta?: { label: string; href: string };
  accent: "blue" | "violet" | "cyan";
  icon: "briefcase" | "flask" | "code";
  logo?: { src: string; alt: string; tone?: "light" | "dark" };
};

export const experience: ExperienceEntry[] = [
  {
    role: "Research Assistant",
    organization: "Sunway University",
    location: "Malaysia",
    period: "Apr 2026 — Present",
    mode: "On-site",
    highlights: [
      "Develop backend for a LoRa-based real-time tracking system under the APNIC ISIF Asia 2025 Project.",
      "Build MQTT/API pipelines, REST APIs, and PostgreSQL database for sensor data ingestion.",
      "Optimise system for low-latency and high-frequency data processing.",
    ],
    technologies: [
      "Node.js",
      "PostgreSQL",
      "MQTT",
      "REST APIs",
      "LoRa",
    ],
    cta: {
      label: "View project",
      href: "/work/iot-hiker-tracking-platform",
    },
    accent: "blue",
    icon: "flask",
    logo: {
      src: "/images/companies/sunway-university.png",
      alt: "Sunway University crest",
      tone: "light",
    },
  },
  {
    role: "Backend Developer Intern",
    organization: "Studio20 Sdn Bhd",
    location: "Malaysia",
    period: "Jan 2026 — Apr 2026",
    mode: "On-site",
    highlights: [
      "Developed server-side logic, RESTful APIs, and content management systems using TypeScript with Nest.js and Payload CMS.",
      "Leveraged Vercel for continuous integration (CI), automated deployments, and hosting applications.",
    ],
    technologies: [
      "TypeScript",
      "Nest.js",
      "Payload CMS",
      "Vercel",
    ],
    accent: "violet",
    icon: "code",
    logo: {
      src: "/images/companies/studio-20.svg",
      alt: "Studio 20 logo",
      tone: "light",
    },
  },
  {
    role: "Values For Life Internship Programme",
    organization: "PwC",
    location: "Moka, Mauritius",
    period: "Mar 2023 — Apr 2023",
    mode: "On-site",
    highlights: [
      "Developed a web application using ASP.NET, C#, and MySQL.",
      "Assisted in front-end design and user experience improvements.",
      "Supported back-end development and database integration.",
    ],
    technologies: ["ASP.NET", "C#", "MySQL", "HTML", "CSS"],
    accent: "cyan",
    icon: "briefcase",
    logo: {
      src: "/images/companies/pwc.svg",
      alt: "PwC logo",
      tone: "light",
    },
  },
];

export type EducationEntry = {
  degree: string;
  institution: string;
  faculty?: string;
  location?: string;
  period?: string;
  coursework?: string[];
  achievements?: string[];
  projectSlugs?: string[];
  logo?: { src: string; alt: string; tone?: "light" | "dark" };
};

export const education: EducationEntry[] = [
  {
    degree: "BSc (Honors) in Computer Science",
    institution: "Lancaster University",
    faculty: "School of Computing and Communications",
    location: "Malaysia",
    period: "Sept. 2023 – Sept. 2026",
    logo: {
      src: "/images/institutions/lancaster-university.svg",
      alt: "Lancaster University Logo",
    },
    coursework: [
      "Object-Oriented Programming",
      "Database Systems",
      "Operating Systems",
      "Computer Networks",
      "Web Development",
      "Computational Intelligence",
      "Data Mining and Knowledge Discovery",
    ],
    projectSlugs: [
      "hybrid-sentiment-intelligence-system",
      "iot-hiker-tracking-platform",
    ],
  },

  {
    degree: "A-Levels",
    institution: "Royal College Curepipe",
    faculty: "Cambridge International",
    location: "Mauritius",
    period: "Jan. 2020 – Nov. 2022",
    coursework: [
      "Mathematics — A*",
      "Physics — A*",
      "Computer Science — A*",
      "Accounting — A",
      "General Paper — A",
    ],
    achievements: [
      "80th Overall National Rank — Cambridge Assessment International Education, Mauritius",
    ],
    logo: {
      src: "/images/institutions/rcc_logo.png",
      alt: "Royal College Curepipe Logo",
    },
  },

  {
    degree: "O-Levels",
    institution: "Royal College Curepipe",
    faculty: "Cambridge International",
    location: "Mauritius",
    period: "Jan. 2018 – Nov. 2020",
    coursework: [
      "Additional Mathematics — A*",
      "Mathematics — A*",
      "English — A",
      "French — A",
      "Chemistry — A*",
      "Physics — A",
      "Computer Science — A*",
      "Principles of Accounting — A*",
    ],
    logo: {
      src: "/images/institutions/rcc_logo.png",
      alt: "Royal College Curepipe Logo",
    },
  },
];

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
  { group: "Data", items: ["PostgreSQL", "PostGIS", "MySQL", "InfluxDB"] },
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

export type AchievementEntry = {
  title: string;
  issuer: string;
  date: string;
  description: string;
  category: "academic" | "scholarship" | "competition" | "certification" | "creative";
};

export const achievements: AchievementEntry[] = [
  {
    title: "5 × Dean's List Award",
    issuer: "Sunway University, Malaysia",
    date: "2023–2026",
    description:
      "Awarded for maintaining outstanding academic performance across five consecutive semesters.",
    category: "academic",
  },
  {
    title: "3 × Jeffrey Cheah Entrance Scholarship",
    issuer: "Sunway University, Malaysia",
    date: "2023–2026",
    description:
      "Merit-based scholarship awarded for academic excellence upon admission and renewed annually.",
    category: "scholarship",
  },
  {
    title: "6th in Accounting (AS Level) - National Rank",
    issuer: "Cambridge Assessment International Education, Mauritius",
    date: "2022",
    description:
      "Ranked 6th nationally in Cambridge AS Level Accounting examinations across Mauritius.",
    category: "academic",
  },
  {
    title: "80th Overall National Rank",
    issuer: "Cambridge Assessment International Education, Mauritius",
    date: "2022",
    description:
      "Ranked 80th overall in the Cambridge A-Level examinations across all subjects nationally.",
    category: "academic",
  },
  {
    title: "Silver in Duke of Edinburgh Award",
    issuer: "Mauritius",
    date: "2021",
    description:
      "Completed the Silver level, demonstrating commitment to community service, skill development, and physical activity.",
    category: "certification",
  },
  {
    title: "First Aid Certified",
    issuer: "Fellowship First Aiders, Mauritius",
    date: "2019",
    description:
      "Certified in emergency first aid response including CPR, wound care, and basic life support.",
    category: "certification",
  },
  {
    title: "2 × Credit — Australian Mathematics Competition (Intermediate)",
    issuer: "Australian Mathematics Trust",
    date: "2018 – 2019",
    description:
      "Received Credit distinction in the AMC Intermediate Division for two consecutive years.",
    category: "competition",
  },
  {
    title: "2 × Distinction — Australian Mathematics Competition (Junior)",
    issuer: "Australian Mathematics Trust",
    date: "2016 – 2017",
    description:
      "Achieved Distinction in the AMC Junior Division for two consecutive years.",
    category: "competition",
  },
  {
    title: "Anti-Corruption Poem Award",
    issuer: "Independent Commission Against Corruption, Mauritius",
    date: "2014",
    description:
      "National award for a creative writing piece addressing anti-corruption themes.",
    category: "creative",
  },
  {
    title: "Budding Writers Award",
    issuer: "Ministry of Education & Human Resources, Mauritius",
    date: "2013",
    description:
      "Recognised for creative writing potential in a national young writers competition.",
    category: "creative",
  },
  {
    title: "InnovEd Award",
    issuer: "Ministry of Education & Human Resources, Mauritius",
    date: "2007",
    description:
      "Recognized for proposing an innovative, sustainability-focused project aimed at addressing real-world challenges through creative solutions.",
    category: "creative",
  },
];

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
