"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/motion";

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  tag?: "h1" | "h2" | "p" | "span";
};

/** React Bits–style SplitText (GSAP character stagger). */
export default function SplitText({
  text,
  className,
  delay = 0,
  duration = 0.6,
  stagger = 0.02,
  tag: Tag = "h1",
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reduceMotion || !ref.current) return;
    const chars = ref.current.querySelectorAll("[data-char]");
    gsap.fromTo(
      chars,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger,
        ease: "power3.out",
      }
    );
  }, [text, delay, duration, stagger, reduceMotion]);

  if (reduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag ref={ref as never} className={cn("inline-block", className)} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          data-char
          className="inline-block whitespace-pre"
          style={{ opacity: 0 }}
          aria-hidden
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Tag>
  );
}
