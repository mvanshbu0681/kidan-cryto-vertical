"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import FadeContent from "@/components/react-bits/FadeContent";
import { cryptoLaunchSteps } from "@/content/crypto";
import { usePrefersReducedMotion } from "@/lib/motion";

const NODE_NUMBERS = ["01", "02", "03", "04"];

function NodeCard({
  step,
  index,
  reduceMotion,
}: {
  step: (typeof cryptoLaunchSteps)[number];
  index: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: reduceMotion ? 0 : index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative rounded-xl border border-kidan-navymid bg-kidan-card/70 p-6 transition-all duration-300 ease-out-expo motion-safe:hover:-translate-y-1 hover:border-kidan-indigo/40 hover:shadow-panel-hover"
    >
      <h3 className="mb-2 font-grotesk text-lg font-bold text-kidan-ivory">
        {step.title}
      </h3>
      <p className="font-sans text-sm leading-relaxed text-kidan-silver">
        {step.body}
      </p>
    </motion.div>
  );
}

function NodeDot({ index }: { index: number }) {
  return (
    <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-kidan-navymid bg-kidan-obsidian font-mono text-xs font-bold text-kidan-lightIndigo transition-colors duration-300 group-hover:border-kidan-indigo group-hover:text-kidan-ivory">
      {NODE_NUMBERS[index]}
    </span>
  );
}

export function LaunchFlow() {
  const reduceMotion = usePrefersReducedMotion();
  const horizontalRef = useRef<HTMLDivElement>(null);
  const verticalRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: horizontalProgress } = useScroll({
    target: horizontalRef,
    offset: ["start 80%", "end 55%"],
  });
  const { scrollYProgress: verticalProgress } = useScroll({
    target: verticalRef,
    offset: ["start 75%", "end 60%"],
  });

  return (
    <section
      id="how"
      className="scroll-mt-24 border-b border-kidan-navymid bg-kidan-obsidian/70 py-24"
    >
      <div className="container mx-auto px-6">
        <FadeContent>
          <h2 className="mb-4 font-mono text-sm uppercase tracking-widest text-kidan-indigo">
            How a launch runs with us
          </h2>
          <p className="mb-16 max-w-xl font-grotesk text-3xl font-bold text-kidan-ivory md:text-4xl">
            Strategy call → Campaign build → Live → Measurement
          </p>
        </FadeContent>

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
                <NodeDot index={i} />
                <NodeCard step={step} index={i} reduceMotion={reduceMotion} />
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
                <NodeDot index={i} />
                <div className="flex-1 pt-1">
                  <NodeCard step={step} index={i} reduceMotion={reduceMotion} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
