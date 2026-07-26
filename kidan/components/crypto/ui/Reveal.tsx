"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

/** Page-wide motion signature: 600ms expo-out, one direction (lift up). */
export const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

/** PRD: scroll-reveal lifts in — one direction only. */
const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /**
   * Kept for call-site compatibility. Always resolves to fadeUp so the
   * page stays one-direction per the PRD flourish note.
   */
  variant?: string;
  /** Seconds before this element starts. */
  delay?: number;
  /** Seconds the transition runs. Defaults to 0.6 (PRD). */
  duration?: number;
};

/**
 * Scroll-triggered entrance. Always lifts up (~600ms).
 * Snaps to final state under prefers-reduced-motion.
 * amount: 0.12 — works on mobile where tall cards rarely reach 30%
 */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={FADE_UP}
      initial={reduceMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration, delay, ease: REVEAL_EASE }}
    >
      {children}
    </motion.div>
  );
}

type RevealGroupProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds before the first child starts. */
  delay?: number;
  /** Seconds between children. */
  stagger?: number;
};

/** Container that staggers its <RevealItem> children once on scroll into view. */
export function RevealGroup({
  children,
  className,
  delay = 0,
  stagger = 0.09,
}: RevealGroupProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.08 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {children}
    </motion.div>
  );
}

type RevealItemProps = {
  children: React.ReactNode;
  className?: string;
  /** Ignored — always fadeUp. */
  variant?: string;
  duration?: number;
};

/** Child of <RevealGroup> — timing comes from the group's stagger. */
export function RevealItem({
  children,
  className,
  duration = 0.6,
}: RevealItemProps) {
  return (
    <motion.div
      className={className}
      variants={FADE_UP}
      transition={{ duration, ease: REVEAL_EASE }}
    >
      {children}
    </motion.div>
  );
}
