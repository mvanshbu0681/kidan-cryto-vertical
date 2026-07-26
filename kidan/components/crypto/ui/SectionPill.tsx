"use client";

import { cn } from "@/lib/utils";

type SectionPillProps = {
  children: React.ReactNode;
  className?: string;
  /** Small chip size for inline labels (e.g. result badges). */
  size?: "default" | "sm";
  /** Pulsing indigo status dot before the label. */
  dot?: boolean;
  /**
   * Kept for API compatibility. Pills always use the static editorial
   * treatment — no rotating conic borders.
   */
  animated?: boolean;
};

/**
 * Kidan editorial chip: dark ink pill, quiet navymid border, soft top-left
 * purple glare. Static only — no rotating conic border.
 */
export function SectionPill({
  children,
  className,
  size = "default",
  dot = false,
}: SectionPillProps) {
  return (
    <span
      className={cn(
        "relative inline-flex w-fit items-center overflow-hidden rounded-full border border-kidan-navymid/60 bg-kidan-ink",
        className
      )}
    >
      {/* Top-left purple glare accent — static, matches case-study tags */}
      <span
        className="pointer-events-none absolute -left-3 -top-3 h-10 w-10 rounded-full bg-kidan-lightIndigo/40 blur-md"
        aria-hidden
      />
      <span
        className={cn(
          "relative z-10 inline-flex items-center gap-2 font-mono font-bold uppercase tracking-[0.18em] text-kidan-ivory",
          size === "sm" ? "px-3 py-1 text-[10px]" : "px-4 py-1.5 text-xs"
        )}
      >
        {dot && (
          <span className="relative flex h-1.5 w-1.5" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-kidan-lightIndigo opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-kidan-lightIndigo" />
          </span>
        )}
        {children}
      </span>
    </span>
  );
}
