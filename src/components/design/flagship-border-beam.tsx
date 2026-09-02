"use client";

import { BorderBeam } from "@/components/ui/border-beam";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function FlagshipBorderBeam() {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <BorderBeam
      borderWidth={1}
      className="opacity-45"
      colorFrom="var(--accent-cyan)"
      colorTo="var(--accent-violet)"
      duration={24}
      size={180}
    />
  );
}
