"use client";

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
        phrases.includes(part) ? (
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
    <section className="relative py-32">
      {/* Ground beat between the ProofBar card and the Services slab */}
      <div
        className="pointer-events-none absolute inset-0 bg-ground-radial"
        aria-hidden
      />
      <div className="container relative z-10 mx-auto px-6">
        <Reveal>
          <h2 className="mb-12 font-mono text-sm uppercase tracking-widest text-kidan-indigo">
            {cryptoProblem.eyebrow}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
          {/* Failure mode — muted, cooler, grounded */}
          <Reveal className="h-full">
            <TerminalPanel
              edgeGlow="none"
              lift={false}
              className="h-full border-kidan-navymid/60 bg-kidan-obsidian/60"
            >
              <article className="flex h-full flex-col p-8 md:p-10">
                <p className="mb-6 font-mono text-xs font-bold uppercase tracking-[0.2em] text-kidan-slate">
                  Most agencies
                </p>
                <p className="font-sans text-lg leading-relaxed text-kidan-silver/80 md:text-xl">
                  {cryptoProblem.paragraphs[0]}
                </p>
              </article>
            </TerminalPanel>
          </Reveal>

          {/* vs divider — glass circle with a soft indigo ring */}
          <div className="flex items-center justify-center lg:h-auto">
            <Reveal delay={0.15}>
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full border border-kidan-indigo/40 bg-kidan-ink/60 font-mono text-[10px] font-bold uppercase tracking-widest text-kidan-lightIndigo shadow-[0_0_28px_-6px_rgba(58,79,214,0.55)] backdrop-blur-md"
                aria-hidden
              >
                vs
              </span>
            </Reveal>
          </div>

          {/* What we do differently — accent edge always faintly on */}
          <Reveal delay={0.3} className="h-full">
            <TerminalPanel edgeGlow="always" spotlight className="h-full bg-kidan-card">
              <article className="flex h-full flex-col p-8 md:p-10">
                <p className="mb-6 font-mono text-xs font-bold uppercase tracking-[0.2em] text-kidan-lightIndigo">
                  Us
                </p>
                <p className="font-sans text-lg leading-relaxed text-kidan-silver md:text-xl">
                  <Highlighted
                    text={cryptoProblem.paragraphs[1]}
                    phrases={HIGHLIGHT_PHRASES}
                  />
                </p>
              </article>
            </TerminalPanel>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
