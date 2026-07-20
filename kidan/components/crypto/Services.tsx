"use client";

import { useEffect } from "react";
import type { ComponentType, MouseEvent } from "react";
import { MessageCircle, Sparkles, Users, Zap } from "lucide-react";
import { useInView } from "react-intersection-observer";
import FadeContent from "@/components/react-bits/FadeContent";
import { Card } from "@/components/ui/card";
import { cryptoServices, type ServiceCard } from "@/content/crypto";
import { track } from "@/lib/analytics";

const ICONS: Record<ServiceCard["iconKey"], ComponentType<{ className?: string }>> = {
  users: Users,
  zap: Zap,
  sparkles: Sparkles,
  messages: MessageCircle,
};

function ServiceCardItem({
  service,
  index,
}: {
  service: ServiceCard;
  index: number;
}) {
  const Icon = ICONS[service.iconKey];
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.35 });

  useEffect(() => {
    if (inView) track("crypto_service_card_view", { service: service.id });
  }, [inView, service.id]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <FadeContent delay={0.08 * (index + 1)} className="h-full">
      <div ref={ref} className="h-full">
        <Card
          onMouseMove={handleMouseMove}
          className="group relative flex h-full min-h-[280px] flex-col overflow-hidden p-8 transition-all duration-300 ease-out-expo motion-safe:hover:-translate-y-1 hover:border-kidan-indigo/40 hover:shadow-panel-hover"
        >
          {/* Cursor spotlight */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(560px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(102,117,234,0.12), transparent 45%)",
            }}
            aria-hidden
          />
          {/* Top-edge glow — lights up on hover per design direction */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-panel-edge opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          />

          <div className="relative z-10 flex h-full flex-col">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-kidan-navymid bg-kidan-ink">
              <Icon className="h-5 w-5 text-kidan-lightIndigo" aria-hidden />
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
        </Card>
      </div>
    </FadeContent>
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
        <FadeContent>
          <h2 className="mb-16 font-mono text-sm uppercase tracking-widest text-kidan-indigo">
            Services mapped to crypto
          </h2>
        </FadeContent>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {cryptoServices.map((service, i) => (
            <ServiceCardItem key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
