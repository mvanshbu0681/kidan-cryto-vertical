"use client";

import FadeContent from "@/components/react-bits/FadeContent";
import { cryptoProblem } from "@/content/crypto";

export function Problem() {
  return (
    <section className="relative py-32">
      <div className="container mx-auto px-6">
        <FadeContent>
          <h2 className="mb-12 font-mono text-sm uppercase tracking-widest text-kidan-indigo">
            {cryptoProblem.eyebrow}
          </h2>
        </FadeContent>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
          {/* Failure mode — muted */}
          <FadeContent delay={0.08} className="h-full">
            <article className="flex h-full flex-col rounded-xl border border-kidan-navymid bg-kidan-card/60 p-8 md:p-10">
              <p className="mb-6 font-mono text-xs font-bold uppercase tracking-[0.2em] text-kidan-slate">
                Most agencies
              </p>
              <p className="font-sans text-lg leading-relaxed text-kidan-silver md:text-xl">
                {cryptoProblem.paragraphs[0]}
              </p>
            </article>
          </FadeContent>

          {/* vs divider */}
          <FadeContent
            delay={0.16}
            className="flex items-center justify-center lg:h-auto"
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full border border-kidan-navymid bg-kidan-obsidian font-mono text-[10px] font-bold uppercase tracking-widest text-kidan-slate"
              aria-hidden
            >
              vs
            </span>
          </FadeContent>

          {/* What we do differently — accent edge */}
          <FadeContent delay={0.24} className="h-full">
            <article className="relative flex h-full flex-col overflow-hidden rounded-xl border border-kidan-navymid bg-kidan-card p-8 shadow-panel md:p-10">
              <div
                className="absolute inset-x-0 top-0 h-[2px] bg-panel-edge"
                aria-hidden
              />
              <p className="mb-6 font-mono text-xs font-bold uppercase tracking-[0.2em] text-kidan-lightIndigo">
                Us
              </p>
              <p className="font-sans text-lg leading-relaxed text-kidan-ivory md:text-xl">
                {cryptoProblem.paragraphs[1]}
              </p>
            </article>
          </FadeContent>
        </div>
      </div>
    </section>
  );
}
