import type { WorkType } from "./schema";

export type CaseStudyTemplateSection = {
  id: string;
  label: string;
};

export const caseStudyTemplates = {
  project: [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "Problem" },
    { id: "constraints", label: "Requirements / Constraints" },
    { id: "architecture", label: "Architecture" },
    { id: "data-flow", label: "Data Flow" },
    { id: "backend-design", label: "Backend Design" },
    { id: "database-design", label: "Database Design" },
    { id: "api-design", label: "API Design" },
    { id: "ai-architecture", label: "AI / ML Architecture" },
    { id: "evaluation", label: "Evaluation" },
    { id: "performance", label: "Performance" },
    { id: "reliability", label: "Reliability / Failure Modes" },
    { id: "security", label: "Security" },
    { id: "deployment", label: "Deployment" },
    { id: "observability", label: "Observability" },
    { id: "engineering-decisions", label: "Engineering Decisions" },
    { id: "limitations", label: "Limitations" },
    { id: "what-i-would-change", label: "What I Would Change" },
  ],
  research: [
    { id: "research-problem", label: "Research Problem" },
    { id: "hypothesis", label: "Hypothesis" },
    { id: "dataset", label: "Dataset" },
    { id: "baselines", label: "Baselines" },
    { id: "methodology", label: "Methodology" },
    { id: "model-architecture", label: "Model Architecture" },
    { id: "experiment-setup", label: "Experiment Setup" },
    { id: "evaluation-metrics", label: "Evaluation Metrics" },
    { id: "results", label: "Results" },
    { id: "ablation-study", label: "Ablation Study" },
    { id: "error-analysis", label: "Error Analysis" },
    { id: "computational-performance", label: "Computational Performance" },
    { id: "limitations", label: "Limitations" },
    { id: "conclusion", label: "Conclusion" },
    { id: "next-experiments", label: "Next Experiments" },
  ],
  "system-design": [
    { id: "problem", label: "Problem" },
    { id: "functional-requirements", label: "Functional Requirements" },
    { id: "non-functional-requirements", label: "Non-Functional Requirements" },
    { id: "scale-assumptions", label: "Scale Assumptions" },
    { id: "capacity-estimates", label: "Capacity Estimates" },
    { id: "api-design", label: "API Design" },
    { id: "data-model", label: "Data Model" },
    { id: "high-level-architecture", label: "High-Level Architecture" },
    { id: "component-deep-dives", label: "Component Deep Dives" },
    { id: "failure-scenarios", label: "Failure Scenarios" },
    { id: "scaling-strategy", label: "Scaling Strategy" },
    { id: "observability", label: "Observability" },
    { id: "security", label: "Security" },
    { id: "tradeoffs", label: "Tradeoffs" },
    { id: "alternative-designs", label: "Alternative Designs" },
    { id: "limitations", label: "Limitations" },
  ],
  writing: [
    { id: "the-problem", label: "The Problem" },
    {
      id: "why-the-naive-approach-fails",
      label: "Why the Naive Approach Fails",
    },
    { id: "better-design", label: "Better Design" },
    { id: "implementation", label: "Implementation" },
    { id: "tradeoffs", label: "Tradeoffs" },
    { id: "performance-considerations", label: "Performance Considerations" },
    { id: "when-not-to-use-this", label: "When Not to Use This" },
    { id: "key-takeaways", label: "Key Takeaways" },
  ],
  lab: [
    { id: "question", label: "Question" },
    { id: "setup", label: "Setup" },
    { id: "experiment", label: "Experiment" },
    { id: "results", label: "Results" },
    { id: "interpretation", label: "Interpretation" },
    { id: "limitations", label: "Limitations" },
    { id: "what-i-learned", label: "What I Learned" },
  ],
} satisfies Record<WorkType, CaseStudyTemplateSection[]>;

export function getCaseStudyTemplate(type: WorkType) {
  return caseStudyTemplates[type];
}
