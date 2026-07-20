"use client";

import FadeContent from "@/components/react-bits/FadeContent";
import { cryptoProblem } from "@/content/crypto";

export function Problem() {
  return (
    <section className="relative py-32">
      <div className="container mx-auto px-6">
        <FadeContent>
          <div className="max-w-3xl">
            <h2 className="mb-6 font-mono text-sm tracking-widest text-kidan-indigo uppercase">
              {cryptoProblem.eyebrow}
            </h2>
            <div className="space-y-8 font-sans text-2xl leading-relaxed text-kidan-silver md:text-3xl">
              {cryptoProblem.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </div>
        </FadeContent>
      </div>
    </section>
  );
}
