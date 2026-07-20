"use client";

import FadeContent from "@/components/react-bits/FadeContent";
import GlareHover from "@/components/react-bits/GlareHover";
import { SpotlightCard } from "@/components/SpotlightCard";
import { cryptoServices } from "@/content/crypto";

export function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 border-y border-kidan-navymid bg-kidan-obsidian py-24"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(58,79,214,0.12)_0%,transparent_70%)]"
        aria-hidden
      />
      <div className="container relative z-10 mx-auto px-6">
        <FadeContent>
          <h2 className="mb-16 font-mono text-sm tracking-widest text-kidan-indigo uppercase">
            Services mapped to crypto
          </h2>
        </FadeContent>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {cryptoServices.map((service, i) => (
            <FadeContent key={service.id} delay={0.08 * (i + 1)}>
              <GlareHover className="h-full rounded-xl">
                <SpotlightCard className="flex h-full min-h-[250px] flex-col justify-end p-8">
                  <span className="mb-4 block font-mono text-xs tracking-wider text-kidan-silver">
                    SERVICE {service.number} · {service.category}
                  </span>
                  <h3 className="mb-3 font-grotesk text-xl font-bold text-kidan-ivory md:text-2xl">
                    {service.title}
                  </h3>
                  <p className="font-sans text-kidan-slate">{service.body}</p>
                </SpotlightCard>
              </GlareHover>
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  );
}
