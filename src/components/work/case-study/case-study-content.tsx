import type { RenderableCaseStudySection } from "@/content/work/details";

import { CaseStudySection, SectionText } from "./case-study-section";
import {
  ApiEndpointList,
  ArchitecturePanel,
  BenchmarkTable,
  ConstraintList,
  DataFlow,
  DatabaseTables,
  EngineeringDecisionList,
  ErrorAnalysisList,
  FailureModeList,
  LimitationList,
  TradeoffComparison,
} from "./technical-blocks";

type CaseStudyContentProps = {
  sections: RenderableCaseStudySection[];
};

export function CaseStudyContent({ sections }: CaseStudyContentProps) {
  return (
    <>
      {sections.map((section) => (
        <CaseStudySection
          eyebrow={section.eyebrow}
          id={section.id}
          key={section.id}
          title={section.label}
        >
          <SectionText
            bullets={section.bullets}
            paragraphs={section.paragraphs}
          />
          {section.constraints ? (
            <ConstraintList items={section.constraints} />
          ) : null}
          {section.architecture ? (
            <ArchitecturePanel panel={section.architecture} />
          ) : null}
          {section.dataFlow ? <DataFlow flow={section.dataFlow} /> : null}
          {section.apiEndpoints ? (
            <ApiEndpointList endpoints={section.apiEndpoints} />
          ) : null}
          {section.databaseTables ? (
            <DatabaseTables tables={section.databaseTables} />
          ) : null}
          {section.decisions ? (
            <EngineeringDecisionList decisions={section.decisions} />
          ) : null}
          {section.tradeoffs ? (
            <TradeoffComparison options={section.tradeoffs} />
          ) : null}
          {section.failureModes ? (
            <FailureModeList modes={section.failureModes} />
          ) : null}
          {section.benchmark ? (
            <BenchmarkTable table={section.benchmark} />
          ) : null}
          {section.errorAnalyses ? (
            <ErrorAnalysisList items={section.errorAnalyses} />
          ) : null}
          {section.limitations ? (
            <LimitationList items={section.limitations} />
          ) : null}
        </CaseStudySection>
      ))}
    </>
  );
}
