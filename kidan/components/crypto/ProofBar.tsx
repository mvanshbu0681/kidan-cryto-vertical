"use client";

import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SectionPill } from "@/components/crypto/ui/SectionPill";
import { Reveal, RevealGroup, RevealItem, REVEAL_EASE } from "@/components/crypto/ui/Reveal";
import { cryptoProofStats } from "@/content/crypto";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Column-to-column stagger, in seconds. */
const COLUMN_STAGGER = 0.08;

function DividerDraw({ index, reduceMotion }: { index: number; reduceMotion: boolean }) {
  const delay = 0.2 + index * COLUMN_STAGGER;
  return (
    <>
      {/* Mobile: horizontal hairline centered in the row gap */}
      <motion.span
        className="absolute -top-6 right-0 left-0 h-px origin-left bg-kidan-navymid lg:hidden"
        initial={reduceMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, delay, ease: REVEAL_EASE }}
        aria-hidden
      />
      {/* Desktop: vertical hairline at the column's padding edge */}
      <motion.span
        className="absolute top-0 bottom-0 left-0 hidden w-px origin-top bg-kidan-navymid lg:block"
        initial={reduceMotion ? false : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, delay, ease: REVEAL_EASE }}
        aria-hidden
      />
    </>
  );
}

export function ProofBar() {
  const reduceMotion = usePrefersReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="border-b border-kidan-navymid py-24">
      <div className="container mx-auto px-6">
        <Reveal className="mb-10 flex justify-center">
          <SectionPill>Proof</SectionPill>
        </Reveal>

        <Reveal delay={0.05}>
          <div
            ref={ref}
            className="rounded-2xl border border-kidan-navymid bg-kidan-card/80 px-6 py-10 shadow-panel backdrop-blur-sm md:px-10 md:py-12"
          >
            <RevealGroup
              className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-0"
              delay={0.15}
              stagger={COLUMN_STAGGER}
            >
              {cryptoProofStats.map((stat, i) => (
                <RevealItem key={stat.id}>
                  <div
                    className={cn(
                      "group/col relative flex flex-col gap-3",
                      i > 0 && "lg:pl-8"
                    )}
                  >
                    {i > 0 && (
                      <DividerDraw index={i} reduceMotion={reduceMotion} />
                    )}
                    {/* Hover hairline — tab-style glow above the number */}
                    <span
                      className="pointer-events-none absolute -top-3 right-0 left-0 h-px bg-panel-edge opacity-0 transition-opacity duration-300 can-hover:group-hover/col:opacity-100 lg:-top-4"
                      aria-hidden
                    />
                    <div className="flex items-baseline font-mono text-5xl font-bold text-kidan-ivory transition-colors duration-300 can-hover:group-hover/col:text-white md:text-6xl">
                      <NumberFlow
                        value={inView || reduceMotion ? stat.value : 0}
                        prefix={stat.prefix ?? ""}
                        suffix={stat.suffix ?? stat.displaySuffix ?? ""}
                        animated={!reduceMotion}
                        transformTiming={{ duration: 900, easing: "ease-out" }}
                        spinTiming={{ duration: 900, easing: "ease-out" }}
                        willChange
                      />
                    </div>
                    <p className="max-w-[26ch] font-mono text-xs uppercase leading-relaxed tracking-widest text-kidan-silver text-balance line-clamp-2 transition-colors duration-300 can-hover:group-hover/col:text-kidan-ivory">
                      {stat.label}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
