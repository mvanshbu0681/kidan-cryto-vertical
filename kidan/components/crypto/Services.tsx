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

/** Service cards at index 1 and 3 get the subtle gradient accent. */
const SUBTLE_GRADIENT_INDICES = new Set([1, 3]);

/**
 * Kidan case-study card craft: short title + body.
 * Hover lift + top-edge glow kept (PRD interaction flourish).
 */
function ServiceCardItem({ service, index }: { service: ServiceCard; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const gradientVariant = SUBTLE_GRADIENT_INDICES.has(index) ? "subtle" : "none";

  useEffect(() => {
    if (inView) track("crypto_service_card_view", { service: service.id });
  }, [inView, service.id]);

  return (
    <div ref={ref} className="h-full">
      <TerminalPanel
        spotlight={false}
        edgeGlow={gradientVariant === "subtle" ? "always" : "hover"}
        lift
        cornerGlare={false}
        gradient={gradientVariant}
        className="h-full rounded-2xl border-kidan-navymid/70 bg-kidan-card/90"
      >
        <div className="flex h-full flex-col gap-3 p-5 sm:p-6 md:gap-5 md:p-8 lg:p-9">
          <h3 className="font-grotesk text-lg font-bold leading-snug tracking-tight text-kidan-ivory sm:text-xl md:text-[1.35rem] lg:text-2xl">
            {service.title}
          </h3>
          <p className="mt-auto font-sans text-sm leading-relaxed text-kidan-silver sm:text-[15px] md:text-base">
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
      className="relative scroll-mt-24 overflow-hidden py-16 md:py-20 lg:py-24"
    >
      {/* Soft section lamp */}
      <div
        className="pointer-events-none absolute -right-[12%] top-0 h-[420px] w-[420px] rounded-full bg-kidan-indigo/12 blur-[110px]"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Header */}
        <FadeContent className="mb-8 max-w-2xl md:mb-12" duration={0.6}>
          <h2 className="mb-3 font-grotesk text-2xl font-bold tracking-tight text-kidan-ivory sm:text-3xl md:mb-4 md:text-4xl">
            What we do
          </h2>
          <p className="font-sans text-sm leading-relaxed text-kidan-silver sm:text-[15px] md:text-base">
            {cryptoServicesIntro}
          </p>
        </FadeContent>

        <RevealGroup
          className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 md:gap-5 lg:gap-6"
          delay={0.06}
          stagger={0.08}
        >
          {cryptoServices.map((service, i) => (
            <RevealItem key={service.id} className="h-full">
              <ServiceCardItem service={service} index={i} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
