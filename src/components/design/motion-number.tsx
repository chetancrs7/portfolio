"use client";

import { NumberTicker } from "@/components/ui/number-ticker";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

type MotionNumberProps = {
  ariaLabel: string;
  className?: string;
  decimalPlaces?: number;
  delay?: number;
  suffix?: string;
  value: number;
};

export function MotionNumber({
  ariaLabel,
  className,
  decimalPlaces = 0,
  delay = 0,
  suffix,
  value,
}: MotionNumberProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const formattedValue = value.toLocaleString("en-US", {
    maximumFractionDigits: decimalPlaces,
    minimumFractionDigits: decimalPlaces,
  });

  return (
    <span aria-label={ariaLabel} className={cn("inline-flex", className)}>
      {prefersReducedMotion ? (
        <span className="inline-block text-inherit tabular-nums">
          {formattedValue}
        </span>
      ) : (
        <NumberTicker
          decimalPlaces={decimalPlaces}
          delay={delay}
          value={value}
        />
      )}
      {suffix ? <span aria-hidden="true">{suffix}</span> : null}
    </span>
  );
}
