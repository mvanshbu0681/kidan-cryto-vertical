"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/motion";

type GlareHoverProps = {
  children: React.ReactNode;
  className?: string;
  glareColor?: string;
  glareOpacity?: number;
  glareSize?: number;
  transitionDuration?: number;
};

/** React Bits–style Glare Hover. Disabled on touch / reduced-motion. */
export default function GlareHover({
  children,
  className,
  glareColor = "rgba(102, 117, 234, 0.35)",
  glareOpacity = 0.35,
  glareSize = 280,
  transitionDuration = 400,
}: GlareHoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const reduceMotion = usePrefersReducedMotion();
  const disabled = isMobile || reduceMotion;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty("--glare-x", `${x}px`);
    ref.current.style.setProperty("--glare-y", `${y}px`);
    ref.current.style.setProperty("--glare-opacity", String(glareOpacity));
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty("--glare-opacity", "0");
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("relative overflow-hidden", className)}
      style={
        {
          "--glare-x": "50%",
          "--glare-y": "50%",
          "--glare-opacity": "0",
        } as React.CSSProperties
      }
    >
      {children}
      {!disabled && (
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            opacity: "var(--glare-opacity)",
            background: `radial-gradient(${glareSize}px circle at var(--glare-x) var(--glare-y), ${glareColor}, transparent 55%)`,
            transition: `opacity ${transitionDuration}ms ease`,
          }}
          aria-hidden
        />
      )}
    </div>
  );
}
