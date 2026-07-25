"use client";

import GlareHover from "@/components/react-bits/GlareHover";
import { BookingCta } from "@/components/crypto/BookingCta";
import { SectionPill } from "@/components/crypto/ui/SectionPill";
import { TerminalPanel } from "@/components/crypto/ui/TerminalPanel";
import { Reveal } from "@/components/crypto/ui/Reveal";
import { cryptoClosing } from "@/content/crypto";
import { cn } from "@/lib/utils";

const HEADLINE_CLASS =
  "font-grotesk text-[1.75rem] font-bold leading-[1.15] tracking-tight sm:text-3xl md:text-4xl lg:text-[2.65rem]";

/**
 * Closing CTA — "studio close desk."
 * Channels Kidan Get In Touch + Nutriseed case-study craft:
 * left-biased copy, split ivory/indigo type, CTA with quiet note,
 * and a structured outcomes rail. No centered BorderGlow box.
 */
export function Closing() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Asymmetric studio lamps — not a centred bloom framing a box */}
      <div
        className="pointer-events-none absolute -left-[10%] bottom-[-8%] h-[420px] w-[520px] rounded-full bg-kidan-indigo/14 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-[6%] top-[12%] h-[260px] w-[300px] rounded-full bg-kidan-lightIndigo/8 blur-[100px]"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-6">
        <Reveal>
          <GlareHover
            glareOpacity={0.14}
            glareSize={420}
            className="rounded-2xl"
          >
            <TerminalPanel
              edgeGlow="always"
              lift={false}
              spotlight={false}
              cornerGlare={false}
              className="rounded-2xl border-kidan-navymid/80 bg-kidan-card/92"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Primary column — ask + action */}
                <div className="flex flex-col justify-between gap-10 p-8 md:gap-12 md:p-10 lg:col-span-7 lg:p-12 xl:p-14">
                  <div>
                    <SectionPill className="mb-5 md:mb-6">
                      {cryptoClosing.eyebrow}
                    </SectionPill>

                    <h2 className="mb-5 max-w-xl md:mb-6">
                      <span
                        className={cn("block text-kidan-ivory", HEADLINE_CLASS)}
                      >
                        {cryptoClosing.headlineLead}
                      </span>
                      <span
                        className={cn(
                          "mt-2 block text-kidan-lightIndigo",
                          HEADLINE_CLASS
                        )}
                      >
                        {cryptoClosing.headlineAccent}
                      </span>
                    </h2>

                    <p className="max-w-md font-sans text-[15px] leading-relaxed text-kidan-silver md:text-base">
                      {cryptoClosing.subline}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                    <BookingCta location="closing" />
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-kidan-slate">
                      {cryptoClosing.ctaNote}
                    </p>
                  </div>
                </div>

                {/* Outcomes rail — instrument read of what the call delivers */}
                <aside
                  className="flex flex-col border-t border-kidan-navymid/70 lg:col-span-5 lg:border-l lg:border-t-0"
                  aria-label={cryptoClosing.railLabel}
                >
                  <div className="flex items-center justify-between gap-4 border-b border-kidan-navymid/70 px-8 py-4 md:px-10">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-kidan-slate">
                      {cryptoClosing.railLabel}
                    </p>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-kidan-lightIndigo">
                      {cryptoClosing.railIndex}
                    </p>
                  </div>

                  <ul className="flex flex-1 flex-col">
                    {cryptoClosing.outcomes.map((item, i) => (
                      <li
                        key={item.label}
                        className={cn(
                          "flex flex-1 flex-col justify-center gap-2 px-8 py-6 md:px-10 md:py-7",
                          i > 0 && "border-t border-kidan-navymid/70"
                        )}
                      >
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-kidan-slate">
                          {item.label}
                        </span>
                        <span className="font-grotesk text-lg font-semibold leading-snug text-kidan-ivory md:text-xl">
                          {item.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
            </TerminalPanel>
          </GlareHover>
        </Reveal>
      </div>
    </section>
  );
}
