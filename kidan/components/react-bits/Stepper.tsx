"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type StepItem = {
  id: string;
  title: string;
  body: string;
};

type StepperProps = {
  steps: StepItem[];
  className?: string;
};

/** React Bits–style Stepper — linear launch flow. */
export default function Stepper({ steps, className }: StepperProps) {
  const [active, setActive] = useState(0);

  return (
    <div className={cn("w-full", className)}>
      <ol className="mb-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-2">
        {steps.map((step, i) => (
          <li key={step.id} className="flex flex-1 items-center gap-3">
            <button
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors",
                i === active
                  ? "text-kidan-ivory"
                  : "text-kidan-slate hover:text-kidan-silver"
              )}
              aria-current={i === active ? "step" : undefined}
            >
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-mono text-xs",
                  i === active
                    ? "border-kidan-lightIndigo bg-kidan-indigo/30 text-kidan-ivory"
                    : "border-kidan-navymid bg-kidan-card text-kidan-slate"
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-grotesk text-sm font-semibold md:text-base">
                {step.title}
              </span>
            </button>
            {i < steps.length - 1 && (
              <div
                className="mx-1 hidden h-px flex-1 bg-kidan-navymid md:block"
                aria-hidden
              />
            )}
          </li>
        ))}
      </ol>

      <div className="rounded-xl border border-kidan-navymid bg-kidan-card/80 p-8 md:p-10">
        <p className="mb-2 font-mono text-xs tracking-widest text-kidan-indigo uppercase">
          Step {String(active + 1).padStart(2, "0")}
        </p>
        <h3 className="mb-3 font-grotesk text-2xl font-bold text-kidan-ivory md:text-3xl">
          {steps[active].title}
        </h3>
        <p className="max-w-2xl font-sans text-lg text-kidan-silver">
          {steps[active].body}
        </p>
        <div className="mt-8 flex gap-3">
          <button
            type="button"
            disabled={active === 0}
            onClick={() => setActive((a) => Math.max(0, a - 1))}
            className="rounded-lg border border-kidan-navymid px-4 py-2 font-mono text-xs tracking-wider uppercase text-kidan-silver transition-colors hover:border-kidan-lightIndigo disabled:opacity-30"
          >
            Back
          </button>
          <button
            type="button"
            disabled={active === steps.length - 1}
            onClick={() => setActive((a) => Math.min(steps.length - 1, a + 1))}
            className="rounded-lg bg-kidan-indigo px-4 py-2 font-mono text-xs tracking-wider uppercase text-white transition-colors hover:bg-kidan-lightIndigo disabled:opacity-30"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
