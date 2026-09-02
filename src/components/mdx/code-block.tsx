import type * as React from "react";
import { isValidElement } from "react";

import { CopyCodeButton } from "@/components/mdx/copy-code-button";
import { cn } from "@/lib/utils";

type CodeBlockProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
};

type CodeFigureProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
};

type ElementWithProps = React.ReactElement<Record<string, unknown>>;

const languageLabels: Record<string, string> = {
  bash: "Bash",
  docker: "Dockerfile",
  dockerfile: "Dockerfile",
  gql: "GraphQL",
  graphql: "GraphQL",
  http: "HTTP",
  ini: "INI",
  javascript: "JavaScript",
  js: "JavaScript",
  json: "JSON",
  jsonc: "JSONC",
  markdown: "Markdown",
  md: "Markdown",
  py: "Python",
  python: "Python",
  sh: "Shell",
  shell: "Shell",
  sql: "SQL",
  terminal: "Terminal",
  text: "Text",
  toml: "TOML",
  ts: "TypeScript",
  tsx: "TSX",
  typescript: "TypeScript",
  yaml: "YAML",
  yml: "YAML",
};

export function CodeFigure({ children, className, ...props }: CodeFigureProps) {
  if (!("data-rehype-pretty-code-figure" in props)) {
    return (
      <figure className={className} {...props}>
        {children}
      </figure>
    );
  }

  const childArray = toChildArray(children);
  const titleChild = childArray.find(hasPrettyCodeTitle);
  const preChild = childArray.find(hasPreTag);
  const code = trimTrailingNewline(extractText(preChild ?? children));
  const language = getPreLanguage(preChild) ?? "text";
  const title = titleChild ? extractText(titleChild) : null;
  const copyCode = stripTerminalPrompts(code, language);
  const copyLabel = title
    ? `Copy contents of ${title}`
    : `Copy ${getLanguageLabel(language)} code`;

  return (
    <figure
      className={cn(
        "border-border bg-background/75 my-7 overflow-hidden rounded-xl border",
        className,
      )}
      {...props}
    >
      <figcaption className="border-border bg-card/55 flex min-h-11 items-center gap-3 border-b px-4 py-2">
        <div className="min-w-0 flex-1">
          {title ? (
            <p className="type-mono text-foreground truncate" title={title}>
              {title}
            </p>
          ) : (
            <p className="type-mono text-muted-foreground uppercase">
              Code Example
            </p>
          )}
        </div>
        <p className="type-mono text-muted-foreground hidden shrink-0 uppercase sm:block">
          {getLanguageLabel(language)}
        </p>
        <CopyCodeButton code={copyCode} label={copyLabel} />
      </figcaption>
      {childArray
        .filter((child) => !hasPrettyCodeTitle(child))
        .map((child, index) => (
          <CodeFigureChild child={child} key={index} />
        ))}
    </figure>
  );
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  return (
    <pre
      className={cn(
        "overflow-x-auto p-4 font-mono text-[0.8125rem] leading-7 [tab-size:4] sm:text-sm",
        className,
      )}
      {...props}
    >
      {children}
    </pre>
  );
}

export function getLanguageLabel(language: string) {
  return languageLabels[language.toLowerCase()] ?? language.toUpperCase();
}

function CodeFigureChild({ child }: { child: React.ReactNode }) {
  return <>{child}</>;
}

function toChildArray(children: React.ReactNode) {
  return Array.isArray(children) ? children : [children];
}

function hasPrettyCodeTitle(child: React.ReactNode) {
  return (
    isValidElement(child) &&
    Object.prototype.hasOwnProperty.call(
      (child as ElementWithProps).props,
      "data-rehype-pretty-code-title",
    )
  );
}

function hasPreTag(child: React.ReactNode) {
  if (!isValidElement(child)) {
    return false;
  }

  return child.type === "pre" || child.type === CodeBlock;
}

function getPreLanguage(child: React.ReactNode) {
  if (!isValidElement(child)) {
    return null;
  }

  const props = (child as ElementWithProps).props;
  const language = props["data-language"];

  if (typeof language === "string" && language.length > 0) {
    return language;
  }

  const className = props.className;

  if (typeof className === "string") {
    const match = /language-([a-z0-9-]+)/i.exec(className);
    return match?.[1] ?? null;
  }

  return null;
}

function extractText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(extractText).join("");
  }

  if (!isValidElement(node)) {
    return "";
  }

  return extractText(
    (node as ElementWithProps).props.children as React.ReactNode,
  );
}

function trimTrailingNewline(value: string) {
  return value.replace(/\n$/, "");
}

function stripTerminalPrompts(code: string, language: string) {
  if (!["bash", "sh", "shell", "terminal"].includes(language.toLowerCase())) {
    return code;
  }

  const lines = code.split("\n");
  const nonEmptyLines = lines.filter((line) => line.trim().length > 0);
  const allPrompted = nonEmptyLines.every((line) => /^\s*[$>]\s+/.test(line));

  if (!allPrompted) {
    return code;
  }

  return lines.map((line) => line.replace(/^\s*[$>]\s+/, "")).join("\n");
}
