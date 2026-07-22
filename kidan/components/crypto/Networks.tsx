"use client";

import { cryptoNetworks } from "@/content/crypto";
import { Reveal } from "@/components/crypto/ui/Reveal";

/**
 * Quiet factual strip of ecosystems we can service.
 * Static wrap only — the page already has one marquee (Ticker).
 * Wordmarks only (no decorative icons, no pill cluster).
 * Hidden until `cryptoNetworks.confirmed` is flipped in content.
 */
export function Networks() {
  if (!cryptoNetworks.confirmed) return null;

  return (
    <section className="py-14 md:py-16">
      <div className="container mx-auto px-6">
        <Reveal>
          <p className="mb-8 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-kidan-slate sm:text-xs">
            {cryptoNetworks.eyebrow}
          </p>
          <ul
            className="flex flex-wrap items-center justify-center gap-x-0 gap-y-3"
            aria-label="Ecosystems we can service"
          >
            {cryptoNetworks.chains.map((name, i) => (
              <li key={name} className="flex items-center">
                {i > 0 && (
                  <span
                    className="mx-3 h-3 w-px shrink-0 bg-kidan-navymid sm:mx-4"
                    aria-hidden
                  />
                )}
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-kidan-silver transition-colors duration-300 can-hover:hover:text-kidan-ivory sm:text-xs">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
