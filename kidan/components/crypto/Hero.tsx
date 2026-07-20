"use client";

import FadeContent from "@/components/react-bits/FadeContent";
import SplitText from "@/components/react-bits/SplitText";
import GradientText from "@/components/react-bits/GradientText";
import { BookingCta } from "@/components/crypto/BookingCta";
import { cryptoHero, cryptoProofStats } from "@/content/crypto";
import { track } from "@/lib/analytics";
import { usePrefersReducedMotion } from "@/lib/motion";

/** The three hero micro-metrics, pulled from the proof stats so they never drift. */
const HERO_METRIC_IDS = ["creators", "markets", "team"] as const;

export function Hero() {
  const reduceMotion = usePrefersReducedMotion();
  const metrics = HERO_METRIC_IDS.map((id) =>
    cryptoProofStats.find((s) => s.id === id)
  ).filter((s) => s !== undefined);

  return (
    <section className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden bg-kidan-ink">
      {/* Static CSS veil — replaces the WebGL DarkVeil per the perf rule */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-hero-veil"
        aria-hidden
      />

      {/* Masked SVG grid, ~8% opacity, no JS */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.08] [mask-image:linear-gradient(to_bottom,white_0%,transparent_85%)]"
        style={{
          backgroundImage: "url(/grid.svg)",
          backgroundRepeat: "repeat",
          backgroundSize: "60px 60px",
        }}
        aria-hidden
      />

      {/* Top-right indigo bloom */}
      <div
        className="pointer-events-none absolute top-[-20%] right-[-10%] z-[1] h-[600px] w-[600px] rounded-full bg-kidan-indigo/20 blur-[120px]"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-6 pt-28 pb-16 md:pt-32">
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

            <div className="mb-12 flex flex-wrap items-center gap-x-6 gap-y-4">
              <BookingCta location="hero" />
              <a
                href={cryptoHero.secondaryCta.href}
                onClick={() => track("crypto_see_how_we_work")}
                className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider text-kidan-lightIndigo transition-colors hover:text-kidan-ivory"
              >
                {cryptoHero.secondaryCta.label}
                <span aria-hidden>↓</span>
              </a>
            </div>

            {/* Mini metrics strip — previews the ProofBar for founders who don't scroll */}
            <dl
              className="flex flex-wrap items-stretch border-t border-kidan-navymid/80 pt-6"
              aria-label="Key numbers"
            >
              {metrics.map((stat, i) => (
                <div
                  key={stat.id}
                  className={
                    i > 0
                      ? "ml-6 border-l border-kidan-navymid/80 pl-6 md:ml-10 md:pl-10"
                      : undefined
                  }
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-mono text-2xl font-bold text-kidan-ivory md:text-3xl">
                    {stat.prefix ?? ""}
                    {stat.value}
                    {stat.suffix ?? stat.displaySuffix ?? ""}
                  </dd>
                  <dd className="mt-1 max-w-[140px] font-mono text-[10px] uppercase leading-snug tracking-widest text-kidan-slate">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeContent>
        </div>
      </div>
    </section>
  );
}
