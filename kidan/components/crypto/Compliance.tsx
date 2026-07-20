"use client";

import { Check, Shield } from "lucide-react";
import FadeContent from "@/components/react-bits/FadeContent";
import { Badge } from "@/components/ui/badge";
import { cryptoCompliance } from "@/content/crypto";

/** Distilled from the locked compliance copy — no invented commitments. */
const TRUST_CHECKLIST = [
  "Clear disclosure on paid posts",
  "No promises of returns",
  "Regional gating where required",
] as const;

const REGIONS = ["UAE", "UK", "US"] as const;

export function Compliance() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <FadeContent>
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-kidan-navymid bg-kidan-ink/80">
                <Shield
                  className="h-6 w-6 text-kidan-lightIndigo"
                  aria-hidden
                />
              </div>
              <h2 className="mb-6 font-grotesk text-3xl font-bold text-kidan-ivory md:text-4xl">
                Compliance and trust
              </h2>
              <div className="flex flex-wrap gap-2" aria-label="Markets served">
                {REGIONS.map((region) => (
                  <Badge key={region} variant="secondary">
                    {region}
                  </Badge>
                ))}
              </div>
            </FadeContent>
          </div>
          <div className="lg:col-span-7">
            <FadeContent delay={0.15}>
              <div className="space-y-8">
                <p className="font-sans text-lg leading-relaxed text-kidan-silver">
                  {cryptoCompliance.paragraphs[0]}
                </p>

                <ul className="space-y-3 border-y border-kidan-navymid py-6">
                  {TRUST_CHECKLIST.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-kidan-indigo/40 bg-kidan-indigo/10">
                        <Check
                          className="h-3.5 w-3.5 text-kidan-lightIndigo"
                          aria-hidden
                        />
                      </span>
                      <span className="font-mono text-sm uppercase tracking-wider text-kidan-ivory">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="font-grotesk text-xl font-bold leading-snug text-kidan-ivory md:text-2xl">
                  {cryptoCompliance.paragraphs[1]}
                </p>
              </div>
            </FadeContent>
          </div>
        </div>
      </div>
    </section>
  );
}
