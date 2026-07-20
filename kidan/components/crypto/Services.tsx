"use client";

import { useEffect } from "react";
import type { ComponentType } from "react";
import { MessageCircle, Sparkles, Users, Zap } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { TerminalPanel } from "@/components/crypto/ui/TerminalPanel";
import { SectionPill } from "@/components/crypto/ui/SectionPill";
import { Reveal, RevealGroup, RevealItem } from "@/components/crypto/ui/Reveal";
import { cryptoServices, type ServiceCard } from "@/content/crypto";
import { track } from "@/lib/analytics";

const ICONS: Record<ServiceCard["iconKey"], ComponentType<{ className?: string }>> = {
  users: Users,
  zap: Zap,
  sparkles: Sparkles,
  messages: MessageCircle,
};

function ServiceCardItem({ service }: { service: ServiceCard }) {
  const Icon = ICONS[service.iconKey];
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.35 });

  useEffect(() => {
    if (inView) track("crypto_service_card_view", { service: service.id });
  }, [inView, service.id]);

  return (
    <div ref={ref} className="h-full">
      <TerminalPanel
        spotlight
        edgeGlow="hover"
        className="h-full min-h-[280px]"
      >
        <div className="flex h-full flex-col p-8">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-kidan-navymid bg-kidan-ink transition-colors duration-300 can-hover:group-hover/panel:border-kidan-indigo/50 can-hover:group-hover/panel:bg-kidan-indigo/20">
            <Icon
              className="h-5 w-5 text-kidan-lightIndigo transition-colors duration-300 can-hover:group-hover/panel:text-kidan-ivory"
              aria-hidden
            />
          </div>
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
    </div>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 border-y border-kidan-navymid bg-kidan-obsidian/70 py-24"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(58,79,214,0.12)_0%,transparent_70%)]"
        aria-hidden
      />
      <div className="container relative z-10 mx-auto px-6">
        <Reveal>
          <SectionPill dot className="mb-16">
            Services mapped to crypto
          </SectionPill>
        </Reveal>

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
