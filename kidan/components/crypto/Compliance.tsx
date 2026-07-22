"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import GlareHover from "@/components/react-bits/GlareHover";
import FadeContent from "@/components/react-bits/FadeContent";
import { SectionPill } from "@/components/crypto/ui/SectionPill";
import { TerminalPanel } from "@/components/crypto/ui/TerminalPanel";
import { Reveal, RevealGroup, REVEAL_EASE } from "@/components/crypto/ui/Reveal";
import { cryptoCompliance } from "@/content/crypto";

/** Distilled from the locked compliance copy — no invented commitments. */
const TRUST_CHECKLIST = [
  "Clear disclosure on paid posts",
  "No promises of returns",
  "Regional gating where required",
] as const;

const REGIONS = ["UAE", "UK", "US"] as const;

const CHECK_ROW = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const CHECK_POP = {
  hidden: { scale: 0.5, opacity: 0 },
  show: { scale: 1, opacity: 1 },
};

export function Compliance() {
  return (
    <section className="relative py-24 md:py-28">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <FadeContent duration={0.6}>
              <h2 className="mb-6 font-grotesk text-3xl font-bold text-kidan-ivory md:text-4xl">
                Compliance and trust
              </h2>
              <div className="flex flex-wrap gap-2" aria-label="Markets served">
                {REGIONS.map((region) => (
                  <SectionPill key={region} size="sm">
                    {region}
                  </SectionPill>
                ))}
              </div>
            </FadeContent>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.15}>
              <p className="font-sans text-lg leading-relaxed text-kidan-silver">
                {cryptoCompliance.paragraphs[0]}
              </p>
            </Reveal>

            <RevealGroup className="my-8" delay={0.25} stagger={0.07}>
              <ul className="space-y-3 border-y border-kidan-navymid py-6">
                {TRUST_CHECKLIST.map((item) => (
                  <motion.li
                    key={item}
                    variants={CHECK_ROW}
                    transition={{ duration: 0.45, ease: REVEAL_EASE }}
                    className="flex items-center gap-3"
                  >
                    <motion.span
                      variants={CHECK_POP}
                      transition={{ duration: 0.4, ease: REVEAL_EASE }}
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-kidan-indigo/40 bg-kidan-indigo/10"
                    >
                      <Check
                        className="h-3.5 w-3.5 text-kidan-lightIndigo"
                        aria-hidden
                      />
                    </motion.span>
                    <span className="font-mono text-sm uppercase tracking-wider text-kidan-ivory">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </RevealGroup>
          </div>
        </div>

        {/* Pull-quote block — Nutriseed testimonial language */}
        <Reveal delay={0.2}>
          <GlareHover glareOpacity={0.18} glareSize={360} className="mt-12 rounded-xl">
          <TerminalPanel
            edgeGlow="always"
            lift={false}
            spotlight={false}
            cornerGlare={false}
            className="border-kidan-navymid/80 bg-kidan-card/92"
          >
            <blockquote className="px-8 py-10 md:px-12 md:py-12">
              <p className="font-grotesk text-2xl font-bold leading-snug text-kidan-ivory md:text-3xl lg:text-4xl">
                {cryptoCompliance.paragraphs[1]}
              </p>
              <footer className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-kidan-slate">
                Compliance and trust
              </footer>
            </blockquote>
          </TerminalPanel>
          </GlareHover>
        </Reveal>
      </div>
    </section>
  );
}
