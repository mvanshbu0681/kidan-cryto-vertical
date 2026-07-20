"use client";

import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/motion";

type LogoLoopProps = {
  items: React.ReactNode[];
  speed?: number;
  className?: string;
  gap?: number;
};

/** React Bits–style Logo Loop — works with text pills, not only images. */
export default function LogoLoop({
  items,
  speed = 40,
  className,
  gap = 16,
}: LogoLoopProps) {
  const reduceMotion = usePrefersReducedMotion();
  const row = (
    <div className="flex w-max items-center" style={{ gap }}>
      {items.map((item, i) => (
        <div key={i} className="shrink-0">
          {item}
        </div>
      ))}
    </div>
  );

  if (reduceMotion) {
    return (
      <div
        className={cn(
          "flex flex-wrap items-center justify-center gap-3",
          className
        )}
      >
        {items}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_8%,white_92%,transparent)]",
        className
      )}
    >
      <div
        className="flex w-max animate-marquee"
        style={
          {
            "--marquee-duration": `${speed}s`,
            gap,
          } as React.CSSProperties
        }
      >
        {row}
        <div className="flex w-max items-center" style={{ gap }} aria-hidden>
          {items.map((item, i) => (
            <div key={`dup-${i}`} className="shrink-0">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
