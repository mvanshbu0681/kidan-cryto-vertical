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

/**
 * React Bits–style SplitText (GSAP character stagger).
 * Chars are grouped inside nowrap word spans so lines only break
 * at word boundaries — never mid-word.
 */
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

  const words = text.split(" ");

  return (
    <Tag ref={ref as never} className={cn("inline-block", className)} aria-label={text}>
      {words.map((word, wi) => (
        <span key={`${word}-${wi}`}>
          <span className="inline-block whitespace-nowrap" aria-hidden>
            {word.split("").map((char, ci) => (
              <span
                key={`${char}-${ci}`}
                data-char
                className="inline-block"
                style={{ opacity: 0 }}
              >
                {char}
              </span>
            ))}
          </span>
          {wi < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
