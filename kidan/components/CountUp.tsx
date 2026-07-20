"use client";
import React, { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface CountUpProps {
  to: number;
  from?: number;
  direction?: "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
  separator?: string;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export const CountUp = ({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "",
  separator = "",
  decimals = 0,
  suffix = "",
  prefix = "",
}: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? to : from);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
    duration: duration * 1000,
  });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(direction === "down" ? from : to);
      }, delay * 1000);
    }
  }, [isInView, delay, motionValue, direction, from, to]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        const formattedNumber = Intl.NumberFormat("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
          useGrouping: !!separator,
        }).format(Number(latest.toFixed(decimals))).replace(/,/g, separator || "");
        
        ref.current.textContent = `${prefix}${formattedNumber}${suffix}`;
      }
    });
  }, [springValue, decimals, separator, prefix, suffix]);

  const initial =
    direction === "down"
      ? `${prefix}${to}${suffix}`
      : `${prefix}${from}${suffix}`;

  return (
    <span className={className} ref={ref}>
      {initial}
    </span>
  );
};
