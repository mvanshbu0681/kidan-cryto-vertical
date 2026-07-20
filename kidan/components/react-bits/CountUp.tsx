"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/motion";

type CountUpProps = {
  to: number;
  from?: number;
  duration?: number;
  delay?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
  separator?: string;
};

/** React Bits–style Count Up (framer spring). Space Mono via className. */
export default function CountUp({
  to,
  from = 0,
  duration = 2,
  delay = 0,
  className,
  suffix = "",
  prefix = "",
  separator = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
    duration: duration * 1000,
  });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    if (reduceMotion) {
      motionValue.set(to);
      return;
    }
    const t = setTimeout(() => motionValue.set(to), delay * 1000);
    return () => clearTimeout(t);
  }, [isInView, delay, motionValue, to, reduceMotion]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (!ref.current) return;
      const formatted = Intl.NumberFormat("en-US", {
        maximumFractionDigits: 0,
        useGrouping: !!separator,
      })
        .format(Math.round(latest))
        .replace(/,/g, separator || "");
      ref.current.textContent = `${prefix}${formatted}${suffix}`;
    });
  }, [springValue, prefix, suffix, separator]);

  return (
    <span ref={ref} className={cn("font-mono", className)}>
      {prefix}
      {from}
      {suffix}
    </span>
  );
}
