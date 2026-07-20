"use client";

import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/motion";

type BorderGlowProps = {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  /** Seconds per border rotation — higher is slower. */
  speed?: number;
};

/** React Bits–style Border Glow frame. */
export default function BorderGlow({
  children,
  className,
  glowColor = "58, 79, 214",
  speed = 8,
}: BorderGlowProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div className={cn("relative rounded-2xl p-[1px]", className)}>
      {!reduceMotion ? (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
          aria-hidden
        >
          <div
            className="absolute inset-[-50%] opacity-90"
            style={{
              background: `conic-gradient(from var(--border-glow-angle, 0deg), transparent 0%, rgba(${glowColor},0.75) 12%, transparent 28%, transparent 50%, rgba(102,117,234,0.55) 62%, transparent 78%)`,
              animation: `border-glow-spin ${speed}s linear infinite`,
            }}
          />
        </div>
      ) : (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, rgba(${glowColor},0.55), rgba(${glowColor},0.12))`,
          }}
          aria-hidden
        />
      )}
      <div className="relative z-10 rounded-2xl bg-kidan-ink/95 px-8 py-12 backdrop-blur-sm md:px-14 md:py-16">
        {children}
      </div>
    </div>
  );
}
