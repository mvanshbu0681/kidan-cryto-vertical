"use client";

import { cryptoTickerPhrases } from "@/content/crypto";
import { usePrefersReducedMotion } from "@/lib/motion";

const SEPARATOR = "✦";

/** One copy of the phrase run. Repeated so a single copy always exceeds viewport width. */
function PhraseRun({ hidden = false }: { hidden?: boolean }) {
  const run = [...cryptoTickerPhrases, ...cryptoTickerPhrases, ...cryptoTickerPhrases];
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {run.map((phrase, i) => (
        <span
          key={`${phrase}-${i}`}
          className="flex shrink-0 items-center font-mono text-xs font-bold uppercase tracking-[0.2em] text-kidan-ivory/90"
        >
          <span className="px-6">{phrase}</span>
          <span className="text-kidan-lightIndigo" aria-hidden>
            {SEPARATOR}
          </span>
        </span>
      ))}
    </div>
  );
}

export function Ticker() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section
      className="w-full overflow-hidden border-y border-kidan-navymid bg-kidan-obsidian/80 py-4"
      aria-label="What we do"
    >
      {reduceMotion ? (
        /* Reduced-motion: same phrases as a static tag grid */
        <ul className="container mx-auto flex flex-wrap justify-center gap-2 px-6">
          {cryptoTickerPhrases.map((phrase) => (
            <li
              key={phrase}
              className="rounded-full border border-kidan-navymid px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-kidan-silver"
            >
              {phrase}
            </li>
          ))}
        </ul>
      ) : (
        <div className="[mask-image:linear-gradient(to_right,transparent,white_6%,white_94%,transparent)]">
          <div className="flex w-max animate-marquee-seamless [--marquee-duration:36s] can-hover:hover:[animation-play-state:paused]">
            <PhraseRun />
            <PhraseRun hidden />
          </div>
        </div>
      )}
    </section>
  );
}
