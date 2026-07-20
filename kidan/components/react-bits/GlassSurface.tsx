"use client";

import { cn } from "@/lib/utils";

type GlassSurfaceProps = {
  children: React.ReactNode;
  className?: string;
};

/** React Bits–style Glass Surface — ink-tinted, not frosted white. */
export default function GlassSurface({ children, className }: GlassSurfaceProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-kidan-card/60 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-xl",
        className
      )}
    >
      {children}
    </div>
  );
}
