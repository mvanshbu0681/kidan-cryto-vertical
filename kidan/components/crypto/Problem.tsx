"use client";

import GlareHover from "@/components/react-bits/GlareHover";
import FadeContent from "@/components/react-bits/FadeContent";
import { TerminalPanel } from "@/components/crypto/ui/TerminalPanel";
import { Reveal } from "@/components/crypto/ui/Reveal";
import { cryptoProblem } from "@/content/crypto";

/** Key phrases lifted to ivory semibold — same technique as the main site's scroll-reveal text. */
const HIGHLIGHT_PHRASES = ["sixty thousand", "wallet or a signup"] as const;

function Highlighted({ text, phrases }: { text: string; phrases: readonly string[] }) {
  const escaped = phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "g"));
  return (
    <>
      {parts.map((part, i) =>
        phrases.includes(part as (typeof phrases)[number]) ? (
          <strong key={i} className="font-semibold text-kidan-ivory">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}

export function Problem() {
  return (
    <section className="relative py-16 md:py-24 lg:py-28">
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <FadeContent className="mb-8 md:mb-12" duration={0.6}>
          <h2 className="max-w-2xl font-grotesk text-2xl font-bold text-kidan-ivory sm:text-3xl md:text-4xl">
            {cryptoProblem.eyebrow}
          </h2>
        </FadeContent>

        <div className="grid grid-cols-1 items-stretch gap-4 sm:gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
          {/* Failure mode — muted, cooler, grounded */}
          <Reveal className="h-full">
            <TerminalPanel
              edgeGlow="none"
              lift={false}
              cornerGlare={false}
              gradient="none"
              className="h-full border-kidan-navymid/80 bg-kidan-card/88"
            >
              <article className="flex h-full flex-col p-5 sm:p-7 md:p-10">
                <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-kidan-slate sm:mb-6 sm:text-xs">
                  Most agencies
                </p>
                <p className="font-sans text-base leading-relaxed text-kidan-silver/80 sm:text-lg md:text-xl">
                  {cryptoProblem.paragraphs[0]}
                </p>
              </article>
            </TerminalPanel>
          </Reveal>

          {/* vs divider */}
          <div className="flex items-center justify-center lg:h-auto">
            <Reveal delay={0.15}>
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full border border-kidan-indigo/40 bg-kidan-ink/45 font-mono text-[10px] font-bold uppercase tracking-widest text-kidan-lightIndigo shadow-[0_0_28px_-6px_rgba(58,79,214,0.55)] animate-node-pulse motion-reduce:animate-none sm:h-12 sm:w-12"
                aria-hidden
              >
                vs
              </span>
            </Reveal>
          </div>

          {/* What we do differently — indigo gradient + glare */}
          <Reveal delay={0.3} className="h-full">
            <GlareHover glareOpacity={0.2} glareSize={300} className="h-full rounded-xl">
            <TerminalPanel
              edgeGlow="always"
              spotlight={false}
              cornerGlare={false}
              gradient="indigo"
              className="h-full border-kidan-indigo/45 bg-kidan-card/92"
            >
              <article className="flex h-full flex-col p-5 sm:p-7 md:p-10">
                <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-kidan-lightIndigo sm:mb-6 sm:text-xs">
                  Us
                </p>
                <p className="font-sans text-base leading-relaxed text-kidan-silver sm:text-lg md:text-xl">
                  <Highlighted
                    text={cryptoProblem.paragraphs[1]}
                    phrases={HIGHLIGHT_PHRASES}
                  />
                </p>
              </article>
            </TerminalPanel>
            </GlareHover>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
