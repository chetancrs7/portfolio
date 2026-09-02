import { getPublishedWork, type WorkItem, type WorkType } from "@/content/work";

import { caseStudyDetails } from "./data";
import { caseStudyTemplates } from "./templates";
import type { CaseStudyDetail, CaseStudySectionData } from "./types";

export { caseStudyTemplates };
export type {
  ApiEndpointData,
  ArchitecturePanelData,
  BenchmarkTableData,
  CaseStudyDetail,
  CaseStudySectionData,
  CaseStudyTemplateSection,
  DataFlowData,
  DatabaseTableData,
  EngineeringDecisionData,
  ErrorAnalysisData,
  FailureModeData,
  TradeoffOptionData,
} from "./types";

export type RenderableCaseStudySection = CaseStudySectionData & {
  eyebrow: string;
  label: string;
};

export function getCaseStudyDetail(slug: string) {
  return caseStudyDetails.find((detail) => detail.slug === slug);
}

export function getCaseStudyTemplate(type: WorkType) {
  return caseStudyTemplates[type];
}

export function getRenderableCaseStudySections(
  item: Pick<WorkItem, "type">,
  detail: CaseStudyDetail,
) {
  const sectionsById = new Map(
    detail.sections.map((section) => [section.id, section]),
  );

  return getCaseStudyTemplate(item.type).flatMap((templateSection, index) => {
    const section = sectionsById.get(templateSection.id);

    if (!section) {
      return [];
    }

    return {
      ...section,
      eyebrow: String(index + 1).padStart(2, "0"),
      label: templateSection.label,
    } satisfies RenderableCaseStudySection;
  });
}

export function getAdjacentPublishedWork(slug: string) {
  const publishedWork = getPublishedWork();
  const index = publishedWork.findIndex((item) => item.slug === slug);

  return {
    next: index > 0 ? publishedWork[index - 1] : null,
    previous:
      index >= 0 && index < publishedWork.length - 1
        ? publishedWork[index + 1]
        : null,
  };
}
