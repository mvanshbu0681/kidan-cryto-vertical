"use client";

import { useCallback, useEffect, useRef } from "react";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Hero studio mesh with a mild cursor-following reveal.
 * Listens on the parent <section> so content (z-10) still receives clicks
 * while the mesh pocket trails the pointer underneath.
 * Fine-pointer only — touch / reduced-motion get the static mesh.
 */
export function HeroMesh({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const interactive = !reduceMotion && !isMobile;

  const target = useRef({ x: 0.55, y: 0.85 });
  const current = useRef({ x: 0.55, y: 0.85 });
  const active = useRef(false);
  const raf = useRef(0);

  const paint = useCallback(() => {
    const el = revealRef.current;
    if (!el) return;

    // Soft lerp — pocket drifts behind the cursor (classy, not twitchy)
    current.current.x += (target.current.x - current.current.x) * 0.07;
    current.current.y += (target.current.y - current.current.y) * 0.07;

    el.style.setProperty(
      "--mesh-x",
      `${(current.current.x * 100).toFixed(2)}%`
    );
    el.style.setProperty(
      "--mesh-y",
      `${(current.current.y * 100).toFixed(2)}%`
    );
    el.style.opacity = active.current ? "1" : "0";

    raf.current = requestAnimationFrame(paint);
  }, []);

  useEffect(() => {
    if (!interactive) return;

    const section = rootRef.current?.parentElement;
    if (!section) return;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      target.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
      active.current = true;
    };

    const onLeave = () => {
      active.current = false;
    };

    section.addEventListener("mousemove", onMove, { passive: true });
    section.addEventListener("mouseleave", onLeave);
    raf.current = requestAnimationFrame(paint);

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [interactive, paint]);

  const gridStyle = {
    backgroundImage: "url(/grid.svg)",
    backgroundRepeat: "repeat" as const,
    backgroundSize: "48px 48px",
  };

  return (
    <div
      ref={rootRef}
      className={cn("pointer-events-none absolute inset-0 z-[3]", className)}
      aria-hidden
    >
      {/* Baseline mesh — soft lower-band presence */}
      <div
        className="absolute inset-0 mix-blend-soft-light"
        style={{
          ...gridStyle,
          opacity: 0.42,
          maskImage:
            "radial-gradient(ellipse 110% 75% at 55% 108%, black 0%, rgba(0,0,0,0.65) 32%, rgba(0,0,0,0.2) 55%, transparent 74%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 110% 75% at 55% 108%, black 0%, rgba(0,0,0,0.65) 32%, rgba(0,0,0,0.2) 55%, transparent 74%)",
        }}
      />

      {/* Cursor pocket — mild brighten that trails the pointer */}
      {interactive && (
        <div
          ref={revealRef}
          className="absolute inset-0 mix-blend-soft-light transition-opacity duration-[600ms] ease-out-expo"
          style={{
            ...gridStyle,
            opacity: 0,
            ["--mesh-x" as string]: "55%",
            ["--mesh-y" as string]: "85%",
            maskImage:
              "radial-gradient(circle 240px at var(--mesh-x) var(--mesh-y), rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 42%, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(circle 240px at var(--mesh-x) var(--mesh-y), rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 42%, transparent 72%)",
          }}
        />
      )}
    </div>
  );
}
