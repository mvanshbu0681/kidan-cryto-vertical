"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import FadeContent from "@/components/react-bits/FadeContent";
import { TerminalPanel } from "@/components/crypto/ui/TerminalPanel";
import { RevealGroup, RevealItem } from "@/components/crypto/ui/Reveal";
import {
  cryptoServices,
  cryptoServicesIntro,
  type ServiceCard,
} from "@/content/crypto";
import { track } from "@/lib/analytics";

/**
 * Kidan case-study card craft: short title + body.
 * Hover lift + top-edge glow kept (PRD interaction flourish).
 * No giant numerals / "SERVICE 01 · …" chrome — that was reading as template.
 */
function ServiceCardItem({ service }: { service: ServiceCard }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) track("crypto_service_card_view", { service: service.id });
  }, [inView, service.id]);

  return (
    <div ref={ref} className="h-full">
      <TerminalPanel
        spotlight={false}
        edgeGlow="hover"
        lift
        cornerGlare={false}
        className="h-full rounded-2xl border-kidan-navymid/70 bg-kidan-card/90"
      >
        <div className="flex h-full flex-col gap-4 p-7 md:gap-5 md:p-8 lg:p-9">
          <h3 className="font-grotesk text-xl font-bold leading-snug tracking-tight text-kidan-ivory md:text-[1.35rem] lg:text-2xl">
            {service.title}
          </h3>
          <p className="mt-auto font-sans text-[15px] leading-relaxed text-kidan-silver md:text-base">
            {service.body}
          </p>
        </div>
      </TerminalPanel>
    </div>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 overflow-hidden py-20 md:py-24"
    >
      {/* Soft section lamp — Kidan depth, not a wallpaper */}
      <div
        className="pointer-events-none absolute -right-[12%] top-0 h-[420px] w-[420px] rounded-full bg-kidan-indigo/12 blur-[110px]"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-6">
        {/* Header — title + intro, Nutriseed "What We Did" pacing */}
        <FadeContent className="mb-10 max-w-2xl md:mb-12" duration={0.6}>
          <h2 className="mb-4 font-grotesk text-3xl font-bold tracking-tight text-kidan-ivory md:text-4xl">
            What we do
          </h2>
          <p className="font-sans text-[15px] leading-relaxed text-kidan-silver md:text-base">
            {cryptoServicesIntro}
          </p>
        </FadeContent>

        <RevealGroup
          className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-5 lg:gap-6"
          delay={0.06}
          stagger={0.08}
        >
          {cryptoServices.map((service) => (
            <RevealItem key={service.id} className="h-full">
              <ServiceCardItem service={service} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
