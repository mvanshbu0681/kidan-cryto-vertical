"use client";

import dynamic from "next/dynamic";
import { Squares } from "@/components/Squares";
import FadeContent from "@/components/react-bits/FadeContent";
import SplitText from "@/components/react-bits/SplitText";
import GradientText from "@/components/react-bits/GradientText";
import { cryptoHero } from "@/content/crypto";
import { track } from "@/lib/analytics";
import { usePrefersReducedMotion } from "@/lib/motion";

const DarkVeil = dynamic(() => import("@/components/react-bits/DarkVeil"), {
  ssr: false,
  loading: () => (
    <div
      className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(58,79,214,0.35)_0%,transparent_55%),#0E1116]"
      aria-hidden
    />
  ),
});

export function Hero() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.55]">
        <DarkVeil speed={0.55} noiseIntensity={0.06} warpAmount={0.35} />
      </div>

      <div
        className="pointer-events-none absolute top-[-20%] right-[-10%] z-[1] h-[600px] w-[600px] rounded-full bg-kidan-indigo/20 blur-[120px]"
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.12] [mask-image:linear-gradient(to_bottom,white,transparent_90%)]">
        <Squares
          direction="up"
          speed={0.4}
          squareSize={60}
          borderColor="rgba(255,255,255,0.1)"
          hoverFillColor="rgba(102, 117, 234, 0.05)"
        />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-4xl">
          <h1 className="mb-8 font-grotesk text-4xl font-bold leading-tight text-kidan-ivory md:text-6xl md:leading-[1.1] lg:text-7xl">
            {reduceMotion ? (
              <>
                {cryptoHero.headlineLead}{" "}
                <span className="bg-gradient-to-r from-kidan-lightIndigo to-kidan-indigo bg-clip-text text-transparent">
                  {cryptoHero.headlineAccent}
                </span>
              </>
            ) : (
              <>
                <SplitText
                  text={cryptoHero.headlineLead}
                  className="font-grotesk text-4xl font-bold text-kidan-ivory md:text-6xl lg:text-7xl"
                  stagger={0.018}
                  duration={0.55}
                  tag="span"
                />{" "}
                <GradientText className="font-grotesk text-4xl font-bold md:text-6xl lg:text-7xl">
                  {cryptoHero.headlineAccent}
                </GradientText>
              </>
            )}
          </h1>

          <FadeContent delay={0.35} duration={0.6}>
            <p className="mb-10 max-w-2xl font-sans text-lg leading-relaxed text-kidan-silver md:text-xl">
              {cryptoHero.subline}
            </p>
            <a
              href={cryptoHero.secondaryCta.href}
              onClick={() => track("crypto_see_how_we_work")}
              className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider text-kidan-lightIndigo transition-colors hover:text-kidan-ivory"
            >
              {cryptoHero.secondaryCta.label}
              <span aria-hidden>↓</span>
            </a>
          </FadeContent>
        </div>
      </div>
    </section>
  );
}
