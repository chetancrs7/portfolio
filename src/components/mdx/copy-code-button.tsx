"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

type CopyCodeButtonProps = {
  code: string;
  label: string;
};

export function CopyCodeButton({ code, label }: CopyCodeButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = window.setTimeout(() => setCopied(false), 1800);

    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      aria-label={label}
      className={cn(
        "border-border bg-background/45 text-muted-foreground hover:text-foreground focus-visible:ring-ring/45 inline-flex h-7 min-w-20 items-center justify-center gap-1.5 rounded-full border px-2.5 text-xs font-medium outline-none focus-visible:ring-3",
        copied ? "text-accent-cyan" : undefined,
      )}
      onClick={copyCode}
      type="button"
    >
      {copied ? (
        <Check aria-hidden="true" className="size-3.5" />
      ) : (
        <Copy aria-hidden="true" className="size-3.5" />
      )}
      <span className="w-10 text-left">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
