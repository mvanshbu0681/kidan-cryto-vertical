"use client";

import CountUp from "@/components/react-bits/CountUp";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ProofStat } from "@/content/crypto";

type StatValueProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  displaySuffix?: string;
  className?: string;
  size?: "hero" | "proof" | "result";
};

const SIZE_CLASS = {
  hero: "text-2xl sm:text-3xl",
  proof: "text-5xl md:text-6xl",
  result: "text-5xl md:text-6xl",
} as const;

/**
 * Brief-compliant monospace stat: Space Mono (every numeral), ivory,
 * React Bits CountUp. Instantly reads as fintech / on-chain.
 */
export function StatValue({
  value,
  prefix = "",
  suffix = "",
  displaySuffix,
  className,
  size = "proof",
}: StatValueProps) {
  const reduceMotion = usePrefersReducedMotion();
  const fullSuffix = suffix || displaySuffix || "";

  if (reduceMotion) {
    return (
      <span
        className={cn(
          "font-mono font-bold tabular-nums text-kidan-ivory",
          SIZE_CLASS[size],
          className
        )}
      >
        {prefix}
        {value}
        {fullSuffix}
      </span>
    );
  }

  return (
    <CountUp
      to={value}
      prefix={prefix}
      suffix={fullSuffix}
      duration={1.4}
      className={cn(
        "font-mono font-bold tabular-nums text-kidan-ivory",
        SIZE_CLASS[size],
        className
      )}
    />
  );
}

/** Convenience wrapper for `ProofStat` CMS shape. */
export function ProofStatValue({
  stat,
  size = "proof",
  className,
}: {
  stat: ProofStat;
  size?: StatValueProps["size"];
  className?: string;
}) {
  return (
    <StatValue
      value={stat.value}
      prefix={stat.prefix}
      suffix={stat.suffix}
      displaySuffix={stat.displaySuffix}
      size={size}
      className={className}
    />
  );
}
