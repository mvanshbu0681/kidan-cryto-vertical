"use client";

import { Fragment, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { TerminalPanel } from "@/components/crypto/ui/TerminalPanel";
import { Reveal, REVEAL_EASE } from "@/components/crypto/ui/Reveal";
import { cryptoLaunchSteps } from "@/content/crypto";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const NODE_NUMBERS = ["01", "02", "03", "04"];
const HEADLINE = "Strategy call → Campaign build → Live → Measurement";

function NodeCard({
  step,
  index,
  active,
  reduceMotion,
}: {
  step: (typeof cryptoLaunchSteps)[number];
  index: number;
  active: boolean;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: reduceMotion ? 0 : index * 0.12,
        ease: REVEAL_EASE,
      }}
      className="h-full"
    >
      <TerminalPanel
        edgeGlow="hover"
        className={cn(
          "h-full p-6 transition-opacity duration-500",
          active ? "opacity-100" : "opacity-70"
        )}
      >
        <h3 className="mb-2 font-grotesk text-lg font-bold text-kidan-ivory">
          {step.title}
        </h3>
        <p className="font-sans text-sm leading-relaxed text-kidan-silver">
          {step.body}
        </p>
      </TerminalPanel>
    </motion.div>
  );
}

function NodeDot({
  index,
  active,
  latest,
}: {
  index: number;
  active: boolean;
  /** The most recently reached node — the one that pulses. */
  latest: boolean;
}) {
  return (
    <span
      className={cn(
        "relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-bold transition-all duration-500",
        active
          ? "border-kidan-indigo bg-kidan-indigo text-white shadow-[0_0_20px_-4px_rgba(58,79,214,0.7)]"
          : "border-kidan-navymid bg-kidan-obsidian text-kidan-lightIndigo",
        latest && "animate-node-pulse"
      )}
    >
      {NODE_NUMBERS[index]}
    </span>
  );
}

/** Headline with arrows that light up in sequence, once. Arrows stay glued to
 *  their segment so a line never opens with "→". */
function SequencedHeadline({ reduceMotion }: { reduceMotion: boolean }) {
  const parts = HEADLINE.split("→").map((p) => p.trim());
  return (
    <p className="mb-16 max-w-xl font-grotesk text-3xl font-bold text-kidan-ivory md:text-4xl">
      {parts.map((part, i) => (
        <Fragment key={part}>
          {i > 0 && " "}
          <span className="whitespace-nowrap">
            {part}
            {i < parts.length - 1 && (
              <motion.span
                className="inline-block pl-2 text-kidan-lightIndigo"
                initial={reduceMotion ? false : { opacity: 0.15 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.35 + (i + 1) * 0.35 }}
              >
                →
              </motion.span>
            )}
          </span>
        </Fragment>
      ))}
    </p>
  );
}

export function LaunchFlow() {
  const reduceMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const horizontalRef = useRef<HTMLDivElement>(null);
  const verticalRef = useRef<HTMLDivElement>(null);
  const stepCount = cryptoLaunchSteps.length;
  const [activeIndex, setActiveIndex] = useState(
    reduceMotion ? stepCount - 1 : 0
  );

  const { scrollYProgress: horizontalProgress } = useScroll({
    target: horizontalRef,
    offset: ["start 80%", "end 55%"],
  });
  const { scrollYProgress: verticalProgress } = useScroll({
    target: verticalRef,
    offset: ["start 75%", "end 60%"],
  });

  /**
   * Nodes light up as the fill passes them and stay lit (completed steps).
   * Only the visible orientation drives the index.
   */
  const activeProgress = isMobile ? verticalProgress : horizontalProgress;
  useMotionValueEvent(activeProgress, "change", (v) => {
    const idx = Math.min(
      stepCount - 1,
      Math.floor(v * (stepCount - 1) + 0.12)
    );
    setActiveIndex((prev) => (idx > prev ? idx : prev));
  });

  return (
    <section
      id="how"
      className="relative scroll-mt-24 border-b border-kidan-navymid py-24"
    >
      {/* Ground beat: radial instead of the obsidian slab that Services just used */}
      <div
        className="pointer-events-none absolute inset-0 bg-ground-radial"
        aria-hidden
      />
      <div className="container relative z-10 mx-auto px-6">
        <Reveal>
          <h2 className="mb-4 font-mono text-sm uppercase tracking-widest text-kidan-indigo">
            How a launch runs with us
          </h2>
          <SequencedHeadline reduceMotion={reduceMotion} />
        </Reveal>

        {/* Desktop: horizontal scroll-linked timeline */}
        <div ref={horizontalRef} className="relative hidden md:block">
          {/* Track + scroll-driven fill */}
          <div
            className="absolute top-[22px] right-[12.5%] left-[12.5%] h-px bg-kidan-navymid"
            aria-hidden
          >
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-kidan-indigo to-kidan-lightIndigo"
              style={
                reduceMotion
                  ? { transform: "scaleX(1)" }
                  : { scaleX: horizontalProgress }
              }
            />
          </div>

          <div className="grid grid-cols-4 gap-6">
            {cryptoLaunchSteps.map((step, i) => (
              <div key={step.id} className="group flex flex-col items-center gap-8">
                <NodeDot
                  index={i}
                  active={i <= activeIndex}
                  latest={i === activeIndex && !reduceMotion}
                />
                <NodeCard
                  step={step}
                  index={i}
                  active={i <= activeIndex}
                  reduceMotion={reduceMotion}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical scroll-linked timeline */}
        <div ref={verticalRef} className="relative md:hidden">
          <div
            className="absolute top-2 bottom-2 left-[22px] w-px bg-kidan-navymid"
            aria-hidden
          >
            <motion.div
              className="w-full origin-top bg-gradient-to-b from-kidan-indigo to-kidan-lightIndigo"
              style={
                reduceMotion
                  ? { transform: "scaleY(1)" }
                  : { scaleY: verticalProgress }
              }
            />
          </div>

          <div className="flex flex-col gap-10">
            {cryptoLaunchSteps.map((step, i) => (
              <div key={step.id} className="group flex items-start gap-6">
                <NodeDot
                  index={i}
                  active={i <= activeIndex}
                  latest={i === activeIndex && !reduceMotion}
                />
                <div className="flex-1 pt-1">
                  <NodeCard
                    step={step}
                    index={i}
                    active={i <= activeIndex}
                    reduceMotion={reduceMotion}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
