"use client";

import { Shield } from "lucide-react";
import FadeContent from "@/components/react-bits/FadeContent";
import TrueFocus from "@/components/react-bits/TrueFocus";
import { cryptoCompliance } from "@/content/crypto";

export function Compliance() {
  return (
    <section className="relative overflow-hidden border-y border-kidan-navymid bg-kidan-card py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <FadeContent>
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-kidan-navymid bg-kidan-ink">
                <Shield
                  className="h-6 w-6 text-kidan-lightIndigo"
                  aria-hidden
                />
              </div>
              <h2 className="font-grotesk text-3xl font-bold text-kidan-ivory md:text-4xl">
                Compliance and trust
              </h2>
            </FadeContent>
          </div>
          <div className="lg:col-span-7">
            <FadeContent delay={0.15}>
              <div className="space-y-8 font-sans text-lg text-kidan-silver">
                <p>{cryptoCompliance.paragraphs[0]}</p>
                <TrueFocus
                  sentence={cryptoCompliance.paragraphs[1]}
                  className="text-lg md:text-xl"
                />
              </div>
            </FadeContent>
          </div>
        </div>
      </div>
    </section>
  );
}
