import * as React from "react";

import { cn } from "@/lib/utils";

type AmbientGlowTone = "blue" | "cyan" | "violet";

const glowTokenByTone: Record<AmbientGlowTone, string> = {
  blue: "--glow-blue",
  cyan: "--glow-cyan",
  violet: "--glow-violet",
};

type AmbientGlowProps = React.HTMLAttributes<HTMLDivElement> & {
  tone?: AmbientGlowTone;
};

export function AmbientGlow({
  className,
  tone = "blue",
  style,
  ...props
}: AmbientGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute size-[28rem] rounded-full blur-3xl",
        "bg-[radial-gradient(circle,var(--ambient-glow)_0%,transparent_68%)]",
        className,
      )}
      style={
        {
          "--ambient-glow": `var(${glowTokenByTone[tone]})`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    />
  );
}
