"use client";

import { cryptoTickerPhrases } from "@/content/crypto";
import { usePrefersReducedMotion } from "@/lib/motion";

/** One copy of the phrase run. Repeated so a single copy always exceeds viewport width. */
function PhraseRun({ hidden = false }: { hidden?: boolean }) {
  const run = [...cryptoTickerPhrases, ...cryptoTickerPhrases, ...cryptoTickerPhrases];
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {run.map((phrase, i) => (
        <span
          key={`${phrase}-${i}`}
          className="flex shrink-0 items-center font-mono text-xs font-bold uppercase tracking-[0.2em] text-kidan-silver/70"
        >
          <span className="px-6">{phrase}</span>
          <span
            className="h-3 w-px shrink-0 bg-kidan-indigo/50"
            aria-hidden
          />
        </span>
      ))}
    </div>
  );
}

/**
 * Single horizontal marquee near the hero (PRD: one only).
 * CSS animation — no JS loop cost. Static wrap under reduced-motion.
 */
export function Ticker() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section
      className="relative w-full overflow-hidden border-y border-kidan-navymid/60 py-3.5 md:py-4"
      aria-label="What we do"
    >
      {reduceMotion ? (
        /* Reduced-motion: same phrases as a quiet static row */
        <ul className="container mx-auto flex flex-wrap items-center justify-center gap-x-0 gap-y-2 px-6">
          {cryptoTickerPhrases.map((phrase, i) => (
            <li key={phrase} className="flex items-center">
              {i > 0 && (
                <span
                  className="mx-3 h-3 w-px shrink-0 bg-kidan-indigo/40"
                  aria-hidden
                />
              )}
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-kidan-silver/80 sm:text-xs">
                {phrase}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
          <div className="flex w-max animate-marquee-seamless [--marquee-duration:36s] can-hover:hover:[animation-play-state:paused] motion-reduce:animate-none">
            <PhraseRun />
            <PhraseRun hidden />
          </div>
        </div>
      )}
    </section>
  );
}
