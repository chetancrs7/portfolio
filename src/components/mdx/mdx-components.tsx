import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Info, LinkIcon, TriangleAlert } from "lucide-react";
import type { MDXComponents } from "mdx/types";
import type * as React from "react";

import { HybridSentimentArchitecture } from "@/components/diagrams/custom/hybrid-sentiment-architecture";
import { DiagramPanel } from "@/components/diagrams/diagram-panel";
import { MermaidDiagram } from "@/components/diagrams/mermaid-diagram";
import { CodeBlock, CodeFigure } from "@/components/mdx/code-block";
import {
  ApiEndpoint,
  ApiEndpointList,
  ArchitecturePanel,
  BenchmarkTable,
  ConstraintList,
  DataFlow,
  DatabaseTable,
  DatabaseTables,
  EngineeringDecision,
  EngineeringDecisionList,
  ErrorAnalysis,
  ErrorAnalysisList,
  FailureMode,
  FailureModeList,
  Limitations,
  LimitationList,
  Tradeoff,
  TradeoffComparison,
  WideContent,
} from "@/components/work/case-study/technical-blocks";
import { cn } from "@/lib/utils";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;

type CalloutProps = React.HTMLAttributes<HTMLDivElement> & {
  type?: "info" | "note" | "warning" | "result";
};

type FigureProps = {
  alt: string;
  caption?: string;
  height?: number;
  src: string;
  wide?: boolean;
  width?: number;
};

export function usePortfolioMDXComponents(
  components?: MDXComponents,
): MDXComponents {
  return {
    a: MdxLink,
    blockquote: MdxBlockquote,
    code: MdxInlineCode,
    figure: CodeFigure,
    h2: MdxH2,
    h3: MdxH3,
    hr: MdxHr,
    img: MdxImage,
    li: MdxLi,
    ol: MdxOl,
    p: MdxParagraph,
    pre: CodeBlock,
    strong: MdxStrong,
    table: MdxTable,
    tbody: MdxTbody,
    td: MdxTd,
    th: MdxTh,
    thead: MdxThead,
    tr: MdxTr,
    ul: MdxUl,
    ApiEndpoint,
    ApiEndpointList,
    ArchitecturePanel,
    BenchmarkTable,
    Callout,
    ConstraintList,
    DataFlow,
    DatabaseTable,
    DatabaseTables,
    DiagramPanel,
    EngineeringDecision,
    EngineeringDecisionList,
    ErrorAnalysis,
    ErrorAnalysisList,
    FailureMode,
    FailureModeList,
    Figure,
    HybridSentimentArchitecture,
    Limitations,
    LimitationList,
    MermaidDiagram,
    Tradeoff,
    TradeoffComparison,
    WideContent,
    ...components,
  };
}

function MdxH2({ children, className, id, ...props }: HeadingProps) {
  return (
    <h2
      className={cn("type-h3 group/heading scroll-mt-28 pt-10", className)}
      id={id}
      {...props}
    >
      <HeadingAnchor id={id} />
      {children}
    </h2>
  );
}

function MdxH3({ children, className, id, ...props }: HeadingProps) {
  return (
    <h3
      className={cn(
        "text-foreground group/heading scroll-mt-28 pt-4 text-xl leading-snug font-semibold",
        className,
      )}
      id={id}
      {...props}
    >
      <HeadingAnchor id={id} />
      {children}
    </h3>
  );
}

function HeadingAnchor({ id }: { id?: string }) {
  if (!id) {
    return null;
  }

  return (
    <Link
      aria-label="Link to this section"
      className="text-muted-foreground hover:text-accent-cyan focus-visible:ring-ring/45 mr-2 inline-flex rounded-sm opacity-0 transition-opacity group-hover/heading:opacity-100 focus-visible:opacity-100 focus-visible:ring-3"
      href={`#${id}`}
    >
      <LinkIcon aria-hidden="true" className="size-4" />
    </Link>
  );
}

function MdxParagraph({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("type-body text-muted-foreground my-5", className)}
      {...props}
    />
  );
}

function MdxLink({
  children,
  className,
  href = "",
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = /^https?:\/\//.test(href);
  const sharedClassName = cn(
    "text-accent-cyan hover:text-foreground focus-visible:ring-ring/45 rounded-sm underline underline-offset-4 outline-none focus-visible:ring-3",
    className,
  );

  if (isExternal) {
    return (
      <a
        className={sharedClassName}
        href={href}
        rel="noreferrer"
        target="_blank"
        {...props}
      >
        {children}
        <ExternalLink aria-hidden="true" className="ml-1 inline size-3" />
      </a>
    );
  }

  return (
    <Link className={sharedClassName} href={href} {...props}>
      {children}
    </Link>
  );
}

function MdxUl({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={cn(
        "text-muted-foreground marker:text-accent-cyan my-5 list-disc space-y-2 pl-6",
        className,
      )}
      {...props}
    />
  );
}

function MdxOl({
  className,
  ...props
}: React.HTMLAttributes<HTMLOListElement>) {
  return (
    <ol
      className={cn(
        "text-muted-foreground marker:text-accent-cyan my-5 list-decimal space-y-2 pl-6 marker:font-mono",
        className,
      )}
      {...props}
    />
  );
}

function MdxLi({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={cn("type-body pl-1", className)} {...props} />;
}

function MdxBlockquote({
  className,
  ...props
}: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cn(
        "border-accent-cyan/30 bg-card/45 text-muted-foreground my-7 rounded-r-xl border-l-2 px-5 py-4 text-sm leading-7",
        className,
      )}
      {...props}
    />
  );
}

function MdxTable({
  className,
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <WideContent>
      <table
        className={cn(
          "border-border bg-card/45 my-7 min-w-[38rem] overflow-hidden rounded-xl border text-left text-sm",
          className,
        )}
        {...props}
      />
    </WideContent>
  );
}

function MdxThead(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead {...props} />;
}

function MdxTbody(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />;
}

function MdxTr({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn("border-border border-b last:border-b-0", className)}
      {...props}
    />
  );
}

function MdxTh({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "type-mono text-muted-foreground px-4 py-3 uppercase",
        className,
      )}
      scope="col"
      {...props}
    />
  );
}

function MdxTd({
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn("text-muted-foreground px-4 py-3 align-top", className)}
      {...props}
    />
  );
}

function MdxInlineCode({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cn(
        "border-border bg-background/55 text-foreground rounded-md border px-1.5 py-0.5 font-mono text-[0.88em]",
        className,
      )}
      {...props}
    />
  );
}

function MdxStrong({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <strong
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
}

function MdxHr({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn("border-border my-10", className)} {...props} />;
}

function MdxImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  if (!props.src || !props.alt) {
    return null;
  }

  return (
    <Figure alt={props.alt} height={540} src={String(props.src)} width={960} />
  );
}

export function Callout({
  children,
  className,
  type = "note",
  ...props
}: CalloutProps) {
  const Icon = type === "warning" ? TriangleAlert : Info;

  return (
    <aside
      className={cn(
        "border-border bg-card/55 my-7 rounded-xl border p-5",
        calloutClasses[type],
        className,
      )}
      {...props}
    >
      <p className="type-mono text-foreground flex items-center gap-2 uppercase">
        <Icon aria-hidden="true" className="size-3.5" />
        {type}
      </p>
      <div className="text-muted-foreground mt-3 text-sm leading-6">
        {children}
      </div>
    </aside>
  );
}

export function Figure({
  alt,
  caption,
  height = 720,
  src,
  wide = false,
  width = 1280,
}: FigureProps) {
  const content = (
    <figure className="my-8">
      <div className="border-border bg-card/45 overflow-hidden rounded-xl border">
        <Image
          alt={alt}
          className="h-auto w-full"
          height={height}
          sizes={wide ? "100vw" : "(min-width: 1024px) 768px, 100vw"}
          src={src}
          width={width}
        />
      </div>
      {caption ? (
        <figcaption className="type-body-sm text-muted-foreground mt-3">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );

  return wide ? <WideContent>{content}</WideContent> : content;
}

const calloutClasses: Record<NonNullable<CalloutProps["type"]>, string> = {
  info: "border-accent-blue/25",
  note: "border-accent-cyan/20",
  result: "border-accent-cyan/30 bg-accent-cyan/6",
  warning: "border-destructive/25 bg-destructive/8",
};
