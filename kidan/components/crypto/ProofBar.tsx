"use client";

import NumberFlow from "@number-flow/react";
import { useInView } from "react-intersection-observer";
import FadeContent from "@/components/react-bits/FadeContent";
import { cryptoProofStats } from "@/content/crypto";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function ProofBar() {
  const reduceMotion = usePrefersReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="border-b border-kidan-navymid py-24">
      <div className="container mx-auto px-6">
        <FadeContent delay={0.05}>
          <div
            ref={ref}
            className="rounded-2xl border border-kidan-navymid bg-kidan-card/80 px-6 py-10 shadow-panel backdrop-blur-sm md:px-10 md:py-12"
          >
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
              {cryptoProofStats.map((stat, i) => (
                <div
                  key={stat.id}
                  className={cn(
                    "flex flex-col gap-3",
                    /* Connector lines: horizontal on mobile, vertical on desktop */
                    i > 0 &&
                      "border-t border-kidan-navymid pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8"
                  )}
                >
                  <div className="flex items-baseline font-mono text-5xl font-bold text-kidan-ivory md:text-6xl">
                    <NumberFlow
                      value={inView || reduceMotion ? stat.value : 0}
                      prefix={stat.prefix ?? ""}
                      suffix={stat.suffix ?? stat.displaySuffix ?? ""}
                      animated={!reduceMotion}
                      transformTiming={{ duration: 900, easing: "ease-out" }}
                      spinTiming={{ duration: 900, easing: "ease-out" }}
                      willChange
                    />
                  </div>
                  <p className="max-w-[26ch] font-mono text-xs uppercase leading-relaxed tracking-widest text-kidan-silver text-balance line-clamp-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeContent>
      </div>
    </section>
  );
}
