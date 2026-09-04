"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

import { cn } from "@/lib/utils";

type WorkSearchProps = {
  className?: string;
};

/**
 * Lightweight, URL-driven project search. The uncontrolled input debounces into
 * the `q` search param so results stay server-rendered and shareable, while the
 * existing type/area filters are preserved. No search backend — the dataset is
 * small enough to filter on the server per request.
 */
export function WorkSearch({ className }: WorkSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep the uncontrolled field in sync when the URL changes externally (e.g.
  // the "Clear filters" link or back/forward). Imperative DOM write, so there is
  // no derived state to reconcile in an effect.
  useEffect(() => {
    const input = inputRef.current;

    if (input && input.value !== urlQuery) {
      input.value = urlQuery;
    }
  }, [urlQuery]);

  function pushQuery(nextValue: string) {
    const params = new URLSearchParams(searchParams.toString());
    const trimmed = nextValue.trim();

    if (trimmed) {
      params.set("q", trimmed);
    } else {
      params.delete("q");
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const nextValue = event.target.value;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => pushQuery(nextValue), 220);
  }

  function handleClear() {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }

    pushQuery("");
  }

  return (
    <div className={cn("relative", className)}>
      <Search
        aria-hidden="true"
        className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2"
      />
      <input
        aria-label="Search work by title, technology, or area"
        autoComplete="off"
        className="border-border bg-background/40 text-foreground placeholder:text-muted-foreground focus-visible:border-accent-cyan/40 focus-visible:ring-ring/45 peer h-11 w-full rounded-full border pr-10 pl-10 text-sm outline-none focus-visible:ring-3 [&::-webkit-search-cancel-button]:hidden"
        defaultValue={urlQuery}
        onChange={handleChange}
        placeholder="Search projects, tech, or areas…"
        ref={inputRef}
        type="search"
      />
      <button
        aria-label="Clear search"
        className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/45 absolute top-1/2 right-3 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-full outline-none peer-placeholder-shown:hidden focus-visible:ring-3"
        onClick={handleClear}
        type="button"
      >
        <X aria-hidden="true" className="size-4" />
      </button>
    </div>
  );
}
