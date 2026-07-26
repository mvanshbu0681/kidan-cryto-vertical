"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cryptoTickerPhrases } from "@/content/crypto";
import { REVEAL_EASE } from "@/components/crypto/ui/Reveal";

/** One copy of the phrase run. Repeated so a single copy always exceeds viewport width. */
function PhraseRun({ hidden = false }: { hidden?: boolean }) {
  const run = [...cryptoTickerPhrases, ...cryptoTickerPhrases, ...cryptoTickerPhrases];
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {run.map((phrase, i) => (
        <span
          key={`${phrase}-${i}`}
          className="flex shrink-0 items-center font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-kidan-silver/70 sm:text-xs sm:tracking-[0.2em]"
        >
          <span className="px-4 sm:px-6">{phrase}</span>
          <span
            className="h-2.5 w-px shrink-0 bg-kidan-indigo/50 sm:h-3"
            aria-hidden
          />
        </span>
      ))}
    </div>
  );
}

/**
 * Single horizontal marquee near the hero.
 * Hidden on first paint, then fades in after the hero so reload
 * never shows the strip before the upper section.
 */
export function Ticker() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      /* opacity-0 keeps the strip invisible in SSR / pre-hydration HTML
         so it never flashes before the hero on reload. Motion then fades it in. */
      className="relative w-full overflow-hidden border-y border-kidan-navymid/60 py-3 opacity-0 md:py-4"
      aria-label="What we do"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: reduceMotion ? 0 : 0.55,
        ease: REVEAL_EASE,
      }}
    >
      {/* Subtle background tint so the strip reads as a discrete band */}
      <div
        className="pointer-events-none absolute inset-0 bg-kidan-navymid/20"
        aria-hidden
      />

      {reduceMotion ? (
        <ul className="container relative mx-auto flex flex-wrap items-center justify-center gap-x-0 gap-y-2 px-4 sm:px-6">
          {cryptoTickerPhrases.map((phrase, i) => (
            <li key={phrase} className="flex items-center">
              {i > 0 && (
                <span
                  className="mx-2.5 h-2.5 w-px shrink-0 bg-kidan-indigo/40 sm:mx-3 sm:h-3"
                  aria-hidden
                />
              )}
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-kidan-silver/80 sm:text-[10px] sm:tracking-[0.2em]">
                {phrase}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="relative [mask-image:linear-gradient(to_right,transparent,white_8%,white_92%,transparent)]">
          <div className="flex w-max animate-marquee-seamless [--marquee-duration:32s] can-hover:hover:[animation-play-state:paused] motion-reduce:animate-none">
            <PhraseRun />
            <PhraseRun hidden />
          </div>
        </div>
      )}
    </motion.section>
  );
}
