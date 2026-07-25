"use client";

import FadeContent from "@/components/react-bits/FadeContent";
import { BookingCta } from "@/components/crypto/BookingCta";
import { SectionPill } from "@/components/crypto/ui/SectionPill";
import { HeroMetaStrip } from "@/components/crypto/ui/HeroMetaStrip";
import { HeroMesh } from "@/components/crypto/HeroMesh";
import { cryptoHero, cryptoHeroMeta } from "@/content/crypto";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const HEADLINE_CLASS =
  "font-grotesk text-[1.65rem] font-bold leading-[1.15] tracking-tight sm:text-3xl md:text-[2.25rem] lg:text-[2.75rem] xl:text-[3rem]";

/** Fades hero-only layers into the continuous page background — no hard slab seam. */
const HERO_BLEND_MASK =
  "[mask-image:linear-gradient(to_bottom,black_0%,black_65%,transparent_100%)]";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-8 md:pb-12">

      {/* Ink base scrim — fades into page */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-0 bg-kidan-ink/90",
          HERO_BLEND_MASK
        )}
        aria-hidden
      />

      {/* Asymmetric studio-light veil: top-right lamp glow + left-edge bleed */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-[1] bg-hero-veil",
          HERO_BLEND_MASK
        )}
        aria-hidden
      />

      {/* Thin left-edge prism streak */}
      <div
        className={cn(
          "pointer-events-none absolute left-0 top-0 z-[2] h-full w-px",
          HERO_BLEND_MASK
        )}
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(102,117,234,0.6) 28%, rgba(102,117,234,0.4) 58%, transparent 100%)",
        }}
        aria-hidden
      />

      {/* Studio mesh + mild cursor-following reveal (fine-pointer only) */}
      <HeroMesh />

      {/* ── Content ── */}
      <div className="container relative z-10 mx-auto px-6 pt-16 md:pt-20 lg:pt-24">
        <div className="max-w-3xl">

          {/* Eyebrow — editorial pill, not an SEO keyword dump */}
          <FadeContent delay={0} duration={0.5} className="mb-4 md:mb-5">
            <SectionPill>Crypto Launches</SectionPill>
          </FadeContent>

          {/* Headline — lead ivory, accent in static indigo (no animated gradient) */}
          <FadeContent delay={0.1} duration={0.65} className="mb-4 md:mb-5">
            <h1 className="max-w-2xl">
              <span className={cn("block text-kidan-ivory", HEADLINE_CLASS)}>
                {cryptoHero.headlineLead}
              </span>
              <span
                className={cn(
                  "mt-1 block text-kidan-lightIndigo",
                  HEADLINE_CLASS
                )}
              >
                {cryptoHero.headlineAccent}
              </span>
            </h1>
          </FadeContent>

          {/* Subline — tighter max-width so it breathes */}
          <FadeContent delay={0.22} duration={0.6} className="mb-6 md:mb-7">
            <p className="max-w-lg font-sans text-[15px] leading-relaxed text-kidan-silver md:text-base">
              {cryptoHero.subline}
            </p>
          </FadeContent>

          {/* CTAs + metadata strip — single entrance beat, not staged gadgetry */}
          <FadeContent delay={0.34} duration={0.65}>
            <div className="mb-7 flex flex-wrap items-center gap-x-5 gap-y-3 md:mb-8">
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

            {/* Case-study metadata strip — Nutriseed pattern */}
            <HeroMetaStrip items={cryptoHeroMeta} />
          </FadeContent>

        </div>
      </div>
    </section>
  );
}
