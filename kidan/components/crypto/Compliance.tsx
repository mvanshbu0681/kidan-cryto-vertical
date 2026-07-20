"use client";

import { motion } from "framer-motion";
import { Check, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal, RevealGroup, REVEAL_EASE } from "@/components/crypto/ui/Reveal";
import { cryptoCompliance } from "@/content/crypto";
import { usePrefersReducedMotion } from "@/lib/motion";

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
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="relative overflow-hidden py-24">
      {/* Border beam — travels the section top once on enter, then rests */}
      <motion.div
        className="absolute top-0 h-px w-40 bg-gradient-to-r from-transparent via-kidan-lightIndigo/80 to-transparent"
        initial={reduceMotion ? false : { x: "-20vw", opacity: 0 }}
        whileInView={{ x: "120vw", opacity: [0, 1, 0] }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
        aria-hidden
      />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative mb-8 w-fit">
                {/* Soft indigo halo behind the shield ring */}
                <div
                  className="absolute -inset-3 rounded-full bg-kidan-indigo/25 blur-xl"
                  aria-hidden
                />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-kidan-indigo/40 bg-kidan-ink/80 shadow-[0_0_36px_-4px_rgba(58,79,214,0.55)]">
                  <Shield
                    className="h-6 w-6 text-kidan-lightIndigo"
                    aria-hidden
                  />
                </div>
              </div>
              <h2 className="mb-6 font-grotesk text-3xl font-bold text-kidan-ivory md:text-4xl">
                Compliance and trust
              </h2>
              <div className="flex flex-wrap gap-2" aria-label="Markets served">
                {REGIONS.map((region) => (
                  <Badge
                    key={region}
                    variant="secondary"
                    className="can-hover:hover:border-kidan-indigo/60 can-hover:hover:text-kidan-ivory"
                  >
                    {region}
                  </Badge>
                ))}
              </div>
            </Reveal>
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

            {/* Trust pull-quote, not body text */}
            <Reveal delay={0.1}>
              <p className="border-l-2 border-kidan-indigo pl-6 font-grotesk text-xl font-bold leading-snug text-kidan-ivory md:text-2xl">
                {cryptoCompliance.paragraphs[1]}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
