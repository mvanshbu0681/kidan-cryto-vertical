"use client";

import { useCallback, type MouseEvent } from "react";
import BorderGlow from "@/components/react-bits/BorderGlow";
import { BookingCta } from "@/components/crypto/BookingCta";
import { Reveal } from "@/components/crypto/ui/Reveal";
import { cryptoClosing } from "@/content/crypto";
import { usePrefersReducedMotion } from "@/lib/motion";

export function Closing() {
  const reduceMotion = usePrefersReducedMotion();

  /** Faint radial follow behind the card — CSS vars only, no re-render. */
  const handleFollow = useCallback((e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--cx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--cy", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <section
      className="relative py-28 md:py-36"
      onMouseMove={reduceMotion ? undefined : handleFollow}
    >
      {/* Cursor-follow radial (tighter than before — 480px) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(480px circle at var(--cx, 50%) var(--cy, 50%), rgba(58,79,214,0.08), transparent 60%)",
        }}
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-6">
        <Reveal>
          {/* Single rotating conic moment on the page */}
          <BorderGlow
            speed={14}
            className="mx-auto max-w-4xl text-center shadow-[0_0_90px_-24px_rgba(58,79,214,0.55)]"
          >
            <h2 className="mb-6 font-grotesk text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              <span className="text-gradient-vertical">
                {cryptoClosing.headline}
              </span>
            </h2>
            <p className="mx-auto mb-10 max-w-2xl font-sans text-lg text-kidan-slate md:text-xl">
              {cryptoClosing.subline}
            </p>
            <Reveal delay={0.35}>
              <BookingCta location="closing" />
            </Reveal>
          </BorderGlow>
        </Reveal>
      </div>
    </section>
  );
}
