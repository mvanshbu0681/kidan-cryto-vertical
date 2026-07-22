"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import GlareHover from "@/components/react-bits/GlareHover";
import FadeContent from "@/components/react-bits/FadeContent";
import { TerminalPanel } from "@/components/crypto/ui/TerminalPanel";
import { SectionPill } from "@/components/crypto/ui/SectionPill";
import { RevealGroup, RevealItem } from "@/components/crypto/ui/Reveal";
import { cryptoServices, type ServiceCard } from "@/content/crypto";
import { track } from "@/lib/analytics";

function ServiceCardItem({ service }: { service: ServiceCard }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.35 });

  useEffect(() => {
    if (inView) track("crypto_service_card_view", { service: service.id });
  }, [inView, service.id]);

  return (
    <div ref={ref} className="h-full">
      <GlareHover glareOpacity={0.2} glareSize={300} className="h-full rounded-xl">
      <TerminalPanel
        spotlight={false}
        edgeGlow="hover"
        lift
        cornerGlare={false}
        className="h-full min-h-[280px] border-kidan-navymid/80 bg-kidan-card/92"
      >
        <div className="flex h-full flex-col p-8 md:p-10">
          <p className="mb-6 font-mono text-3xl font-bold tracking-tight text-kidan-lightIndigo md:text-4xl">
            {service.number}
          </p>
          <p className="mb-4 font-mono text-xs uppercase tracking-wider text-kidan-slate">
            Service {service.number} · {service.category}
          </p>
          <h3 className="mb-3 font-grotesk text-xl font-bold leading-snug text-kidan-ivory md:text-2xl">
            {service.title}
          </h3>
          <p className="mt-auto font-sans leading-relaxed text-kidan-silver">
            {service.body}
          </p>
        </div>
      </TerminalPanel>
      </GlareHover>
    </div>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 py-24 md:py-28"
    >
      <div className="container relative z-10 mx-auto px-6">
        <FadeContent className="mb-16" duration={0.6}>
          <SectionPill className="mb-4">Services</SectionPill>
          <h2 className="max-w-2xl font-grotesk text-3xl font-bold text-kidan-ivory md:text-4xl">
            Four services, mapped to crypto
          </h2>
        </FadeContent>

        <RevealGroup
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          delay={0.08}
          stagger={0.1}
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
