"use client";

import GradientText from "@/components/react-bits/GradientText";
import FadeContent from "@/components/react-bits/FadeContent";
import { BookingCta } from "@/components/crypto/BookingCta";
import { InfoBar, type InfoBarItem } from "@/components/crypto/ui/InfoBar";
import { cryptoHero, cryptoProofStats } from "@/content/crypto";
import { track } from "@/lib/analytics";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const HEADLINE_CLASS =
  "font-grotesk text-[1.65rem] font-bold leading-[1.15] tracking-tight text-kidan-ivory sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-5xl";

/** Fades hero-only layers into the continuous page background (no hard seam). */
const HERO_BLEND_MASK =
  "[mask-image:linear-gradient(to_bottom,black_0%,black_68%,transparent_100%)]";

const HERO_INFO_ITEMS: InfoBarItem[] = cryptoProofStats.map((stat) => ({
  id: stat.id,
  label: stat.label,
  stat,
}));

export function Hero() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="relative overflow-hidden pb-8 md:pb-12">
      {/* Brief §04/§07: dark hero + mesh/grid — blended at bottom, not a hard slab */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-0 bg-kidan-ink/88",
          HERO_BLEND_MASK
        )}
        aria-hidden
      />

      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-[1] bg-hero-veil",
          HERO_BLEND_MASK
        )}
        aria-hidden
      />

      {/* Faint masked grid — CSS + SVG only, no video / WebGL load cost */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-[2] opacity-[0.2]",
          HERO_BLEND_MASK
        )}
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(102,117,234,0.07) 0px, rgba(102,117,234,0.07) 1px, transparent 1px, transparent 64px), repeating-linear-gradient(90deg, rgba(102,117,234,0.05) 0px, rgba(102,117,234,0.05) 1px, transparent 1px, transparent 64px)",
        }}
        aria-hidden
      />

      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-[3] opacity-[0.14]",
          HERO_BLEND_MASK
        )}
        style={{
          backgroundImage: "url(/grid.svg)",
          backgroundRepeat: "repeat",
          backgroundSize: "56px 56px",
        }}
        aria-hidden
      />

      {/* Soft indigo mesh glow — top-right, PRD depth flourish */}
      <div
        className="pointer-events-none absolute top-[-18%] right-[-10%] z-[4] h-[min(480px,70vw)] w-[min(480px,70vw)] rounded-full bg-kidan-indigo/22 blur-[100px]"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-6 pt-28 md:pt-36 lg:pt-40">
        <div className="max-w-3xl">
          <h1 className="mb-5 max-w-2xl md:mb-6">
            <FadeContent delay={0} duration={0.55}>
              <span className="mb-3 block font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-kidan-silver md:mb-4 md:text-[11px]">
                Crypto marketing agency · Web3 KOL · Token launch marketing
              </span>
            </FadeContent>

            <FadeContent delay={0.08} duration={0.6}>
              <span className={cn("block", HEADLINE_CLASS)}>
                {cryptoHero.headlineLead}{" "}
                {reduceMotion ? (
                  <span className="text-gradient-vertical">
                    {cryptoHero.headlineAccent}
                  </span>
                ) : (
                  <GradientText
                    colors={["#F7F5EF", "#C4CAD8", "#6675EA", "#3A4FD6"]}
                    animationSpeed={10}
                  >
                    {cryptoHero.headlineAccent}
                  </GradientText>
                )}
              </span>
            </FadeContent>
          </h1>

          <FadeContent delay={0.18} duration={0.6}>
            <p className="mb-8 max-w-xl font-sans text-[15px] leading-relaxed text-kidan-silver md:mb-9 md:text-base md:leading-relaxed">
              {cryptoHero.subline}
            </p>
          </FadeContent>

          <FadeContent delay={0.28} duration={0.6}>
            <div className="mb-10 flex flex-wrap items-center gap-x-5 gap-y-3 md:mb-12">
              <BookingCta location="hero" size="default" />
              <a
                href={cryptoHero.secondaryCta.href}
                onClick={() => track("crypto_see_how_we_work")}
                className="group inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-kidan-lightIndigo transition-colors can-hover:hover:text-kidan-ivory"
              >
                <span className="relative">
                  {cryptoHero.secondaryCta.label}
                  <span
                    className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out-expo can-hover:group-hover:scale-x-100"
                    aria-hidden
                  />
                </span>
                <span
                  aria-hidden
                  className="transition-transform duration-300 ease-out-expo can-hover:group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </a>
            </div>
          </FadeContent>

          <FadeContent delay={0.38} duration={0.65}>
            <InfoBar items={HERO_INFO_ITEMS} />
          </FadeContent>
        </div>
      </div>
    </section>
  );
}
