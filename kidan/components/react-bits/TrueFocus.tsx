"use client";

import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/motion";

type TrueFocusProps = {
  sentence: string;
  className?: string;
  blurAmount?: number;
  borderColor?: string;
  animationDuration?: number;
};

/**
 * React Bits–style True Focus.
 * Emphasizes the full sentence as the focal line (compliance deliverable).
 */
export default function TrueFocus({
  sentence,
  className,
  blurAmount = 0,
  borderColor = "#6675EA",
  animationDuration = 0.6,
}: TrueFocusProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <p
      className={cn(
        "relative inline-block font-medium text-kidan-ivory",
        className
      )}
      style={{
        textShadow: reduceMotion
          ? undefined
          : `0 0 24px rgba(102, 117, 234, 0.25)`,
        transition: `filter ${animationDuration}s ease`,
        filter: blurAmount ? `blur(${blurAmount}px)` : undefined,
      }}
    >
      <span
        className="absolute -inset-x-3 -inset-y-2 rounded-lg border opacity-60"
        style={{ borderColor }}
        aria-hidden
      />
      <span className="relative z-10">{sentence}</span>
    </p>
  );
}
