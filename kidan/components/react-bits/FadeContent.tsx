"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/motion";

type FadeContentProps = {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  blur?: boolean;
  threshold?: number;
};

/** React Bits–style Fade Content (IntersectionObserver). */
export default function FadeContent({
  children,
  className,
  duration = 0.6,
  delay = 0,
  blur = false,
  threshold = 0.15,
}: FadeContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, reduceMotion]);

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={
        reduceMotion
          ? undefined
          : {
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(28px)",
              filter: blur
                ? visible
                  ? "blur(0px)"
                  : "blur(6px)"
                : undefined,
              transitionProperty: "opacity, transform, filter",
              transitionDuration: `${duration}s`,
              transitionDelay: `${delay}s`,
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }
      }
    >
      {children}
    </div>
  );
}
