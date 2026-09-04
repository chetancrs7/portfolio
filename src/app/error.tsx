"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface for local debugging; no internal detail is shown to the user.
    console.error(error);
  }, [error]);

  return (
    <div className="technical-background flex min-h-[70vh] items-center">
      <div className="mx-auto w-full max-w-2xl px-4 py-20 sm:px-6">
        <Badge variant="status">Error</Badge>
        <h1 className="type-h1 mt-6 text-balance">Something went wrong.</h1>
        <p className="type-body-lg text-muted-foreground mt-5">
          An unexpected error occurred while rendering this page. You can retry,
          or head back home.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            className={cn(buttonVariants(), "gap-1.5")}
            onClick={() => reset()}
            type="button"
          >
            <RotateCcw aria-hidden="true" className="size-4" />
            Try again
          </button>
          <Link className={buttonVariants({ variant: "secondary" })} href="/">
            <ArrowLeft data-icon="inline-start" />
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
