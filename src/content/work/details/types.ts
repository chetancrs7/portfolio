import type { WorkType } from "@/content/work/schema";

export type CaseStudyTemplateSection = {
  id: string;
  label: string;
};

export type TextContent = {
  bullets?: string[];
  paragraphs?: string[];
};

export type ArchitecturePanelData = {
  caption?: string;
  description: string;
  nodes?: string[];
  title: string;
};

export type DataFlowData = {
  caption?: string;
  steps: string[];
};

export type ApiEndpointData = {
  description: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
};

export type DatabaseIndexData = {
  columns: string;
  name?: string;
  reason: string;
};

export type DatabaseTableData = {
  columns: string[];
  indexes?: DatabaseIndexData[];
  name: string;
  notes?: string[];
};

export type EngineeringDecisionData = {
  context: string;
  decision: string;
  id: string;
  options?: string[];
  title: string;
  tradeoffs?: string[];
};

export type TradeoffOptionData = {
  label: string;
  notes: string[];
  status: string;
};

export type FailureModeData = {
  behavior: string;
  failure: string;
  protection: string;
  title: string;
};

export type BenchmarkTableData = {
  caption?: string;
  columns: string[];
  highlightRow?: string;
  rows: Record<string, string>[];
};

export type ErrorAnalysisData = {
  likelyCause: string;
  observation: string;
  possibleImprovement: string;
  type: string;
};

export type CaseStudySectionData = TextContent & {
  apiEndpoints?: ApiEndpointData[];
  architecture?: ArchitecturePanelData;
  benchmark?: BenchmarkTableData;
  constraints?: string[];
  dataFlow?: DataFlowData;
  databaseTables?: DatabaseTableData[];
  decisions?: EngineeringDecisionData[];
  errorAnalyses?: ErrorAnalysisData[];
  failureModes?: FailureModeData[];
  id: string;
  limitations?: string[];
  tradeoffs?: TradeoffOptionData[];
};

export type CaseStudyDetail = {
  role?: string;
  sections: CaseStudySectionData[];
  slug: string;
  template: WorkType;
};
