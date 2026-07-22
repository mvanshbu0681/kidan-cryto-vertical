"use client";

import { motion } from "framer-motion";
import GlareHover from "@/components/react-bits/GlareHover";
import FadeContent from "@/components/react-bits/FadeContent";
import { SectionPill } from "@/components/crypto/ui/SectionPill";
import { TerminalPanel } from "@/components/crypto/ui/TerminalPanel";
import { ProofStatValue } from "@/components/crypto/ui/StatValue";
import { RevealGroup, RevealItem, REVEAL_EASE } from "@/components/crypto/ui/Reveal";
import { cryptoProofStats } from "@/content/crypto";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const COLUMN_STAGGER = 0.08;

function DividerDraw({
  index,
  reduceMotion,
}: {
  index: number;
  reduceMotion: boolean;
}) {
  const delay = 0.2 + index * COLUMN_STAGGER;
  return (
    <>
      <motion.span
        className="absolute -top-6 right-0 left-0 h-px origin-left bg-kidan-navymid lg:hidden"
        initial={reduceMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, delay, ease: REVEAL_EASE }}
        aria-hidden
      />
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

  return (
    <section className="py-24 md:py-28">
      <div className="container mx-auto px-6">
        <FadeContent className="mb-10 flex justify-center" duration={0.55}>
          <SectionPill>Proof</SectionPill>
        </FadeContent>

        <FadeContent delay={0.08} duration={0.6}>
          <GlareHover
            glareOpacity={0.22}
            glareSize={320}
            className="rounded-xl"
          >
            <TerminalPanel
              edgeGlow="always"
              lift={false}
              spotlight={false}
              cornerGlare={false}
              className="border-kidan-navymid/80 bg-kidan-card/92"
            >
              <div className="px-6 py-10 md:px-10 md:py-12">
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
                          <DividerDraw
                            index={i}
                            reduceMotion={reduceMotion}
                          />
                        )}
                        <span
                          className="pointer-events-none absolute -top-3 right-0 left-0 h-px bg-panel-edge opacity-0 transition-opacity duration-300 can-hover:group-hover/col:opacity-100 lg:-top-4"
                          aria-hidden
                        />
                        <ProofStatValue stat={stat} size="proof" />
                        <p className="max-w-[28ch] font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-kidan-silver text-balance">
                          {stat.label}
                        </p>
                      </div>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </TerminalPanel>
          </GlareHover>
        </FadeContent>
      </div>
    </section>
  );
}
