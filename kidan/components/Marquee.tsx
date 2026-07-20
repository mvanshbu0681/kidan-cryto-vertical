"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "../lib/utils";
import { usePrefersReducedMotion } from "@/lib/motion";

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  /** Seconds for one full loop */
  speed?: number;
  className?: string;
}

export function Marquee({
  children,
  direction = "left",
  speed = 40,
  className,
}: MarqueeProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reduceMotion || !scrollerRef.current) return;
    const scroller = scrollerRef.current;
    // Avoid duplicating if effect re-runs
    if (scroller.dataset.duplicated === "true") return;
    const items = Array.from(scroller.children);
    items.forEach((item) => {
      scroller.appendChild(item.cloneNode(true));
    });
    scroller.dataset.duplicated = "true";
  }, [reduceMotion]);

  return (
    <div
      className={cn(
        "relative z-20 max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]",
        className
      )}
    >
      <div
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-8 py-4 w-max flex-nowrap",
          !reduceMotion && "animate-marquee"
        )}
        style={
          {
            "--marquee-duration": `${speed}s`,
            animationDirection: direction === "right" ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
}
