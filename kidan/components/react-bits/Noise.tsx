"use client";

import { cn } from "@/lib/utils";

type NoiseProps = {
  className?: string;
  patternAlpha?: number;
};

/** Film-grain overlay (React Bits Noise–style). CSS-only for performance. */
export default function Noise({ className, patternAlpha = 0.05 }: NoiseProps) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-[1] mix-blend-overlay",
        className
      )}
      style={{ opacity: patternAlpha }}
      aria-hidden
    >
      <div
        className="h-full w-full"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
        }}
      />
    </div>
  );
}
