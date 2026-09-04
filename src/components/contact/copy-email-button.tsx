"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

type CopyEmailButtonProps = {
  className?: string;
  email: string;
};

/**
 * Copies the email to the clipboard with visual + screen-reader confirmation.
 * The email itself is always reachable via the adjacent mailto link, so contact
 * never depends on this button or on JavaScript.
 */
export function CopyEmailButton({ className, email }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setFailed(false);
    } catch {
      // Clipboard blocked (permissions, insecure context) — the mailto link and
      // selectable text remain the fallback.
      setCopied(false);
      setFailed(true);
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setCopied(false);
      setFailed(false);
    }, 2000);
  }

  return (
    <div className={cn("inline-flex flex-col items-start gap-1.5", className)}>
      <button
        className="border-border bg-background/40 text-foreground hover:border-border-strong hover:bg-muted/50 focus-visible:ring-ring/45 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-3"
        onClick={handleCopy}
        type="button"
      >
        {copied ? (
          <Check aria-hidden="true" className="text-accent-cyan size-4" />
        ) : (
          <Copy aria-hidden="true" className="size-4" />
        )}
        {copied ? "Copied" : "Copy email"}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Email copied to clipboard" : ""}
      </span>
      {failed ? (
        <span className="type-body-sm text-muted-foreground" role="status">
          Copy blocked — select the address to copy it manually.
        </span>
      ) : null}
    </div>
  );
}
