"use client";

import CountUp from "@/components/react-bits/CountUp";
import FadeContent from "@/components/react-bits/FadeContent";
import GlassSurface from "@/components/react-bits/GlassSurface";
import { cryptoProofStats } from "@/content/crypto";
import { cn } from "@/lib/utils";

export function ProofBar() {
  return (
    <section className="border-b border-kidan-navymid bg-kidan-ink py-24">
      <div className="container mx-auto px-6">
        <FadeContent delay={0.05}>
          <GlassSurface className="px-6 py-10 md:px-10 md:py-12">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {cryptoProofStats.map((stat, i) => (
                <div
                  key={stat.id}
                  className={cn(
                    "flex flex-col gap-2",
                    i > 0 &&
                      "border-t border-kidan-navymid pt-8 md:border-t-0 md:border-l md:pt-0 md:pl-8"
                  )}
                >
                  <div className="flex items-baseline font-mono text-5xl font-bold text-kidan-ivory">
                    <CountUp
                      to={stat.value}
                      suffix={stat.suffix ?? ""}
                      prefix={stat.prefix ?? ""}
                      className="font-mono text-5xl font-bold text-kidan-lightIndigo"
                    />
                    {stat.displaySuffix ? (
                      <span className="font-mono text-kidan-ivory">
                        {stat.displaySuffix}
                      </span>
                    ) : null}
                  </div>
                  <p className="h-12 font-mono text-xs tracking-widest text-kidan-silver uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </GlassSurface>
        </FadeContent>
      </div>
    </section>
  );
}
