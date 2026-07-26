"use client";

import GlareHover from "@/components/react-bits/GlareHover";
import FadeContent from "@/components/react-bits/FadeContent";
import { SectionPill } from "@/components/crypto/ui/SectionPill";
import { TerminalPanel } from "@/components/crypto/ui/TerminalPanel";
import { StatValue } from "@/components/crypto/ui/StatValue";
import { RevealGroup, RevealItem } from "@/components/crypto/ui/Reveal";
import { cryptoResults, type ResultCard } from "@/content/crypto";

function ResultCardItem({ result }: { result: ResultCard }) {
  const isCrypto = result.type === "crypto";

  return (
    <GlareHover glareOpacity={0.2} glareSize={300} className="h-full rounded-xl">
      <TerminalPanel
        edgeGlow="hover"
        spotlight={false}
        cornerGlare={false}
        className="h-full border-kidan-navymid/80 bg-kidan-card/92"
      >
        <div className="flex h-full flex-col p-8 md:p-10">
          <div className="mb-8 flex items-center justify-between gap-4">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-kidan-ivory">
              {result.brand}
            </p>
            <SectionPill size="sm" dot={isCrypto}>
              {isCrypto ? "Crypto" : "Transferable"}
            </SectionPill>
          </div>

          <StatValue
            value={result.value}
            suffix={result.suffix}
            size="result"
            className="mb-2"
          />
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.14em] text-kidan-lightIndigo">
            {result.metricLabel}
          </p>

          <p className="mt-auto font-sans leading-relaxed text-kidan-silver">
            {result.framing}
          </p>
        </div>
      </TerminalPanel>
    </GlareHover>
  );
}

export function Results() {
  const sorted = [...cryptoResults].sort((a, b) =>
    a.type === b.type ? 0 : a.type === "crypto" ? -1 : 1
  );

  return (
    <section className="relative py-24 md:py-28">
      <div className="container mx-auto px-6">
        <FadeContent duration={0.6}>
          <SectionPill className="mb-6">Results</SectionPill>
          <h2 className="mb-4 max-w-2xl font-grotesk text-3xl font-bold text-kidan-ivory md:text-4xl">
            Proof and early results
          </h2>
          <p className="mb-16 max-w-2xl font-sans text-kidan-silver">
            Transferable proof from BACtrack and Nutriseed — framed for a crypto
            reader until a cleared crypto case study goes live.
          </p>
        </FadeContent>

        <RevealGroup
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          delay={0.1}
          stagger={0.12}
        >
          {sorted.map((result) => (
            <RevealItem key={result.id} className="h-full">
              <ResultCardItem result={result} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
