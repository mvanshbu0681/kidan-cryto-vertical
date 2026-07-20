"use client";

import FadeContent from "@/components/react-bits/FadeContent";
import Stepper from "@/components/react-bits/Stepper";
import { cryptoLaunchSteps } from "@/content/crypto";

export function LaunchFlow() {
  return (
    <section
      id="how"
      className="scroll-mt-24 border-b border-kidan-navymid bg-kidan-obsidian py-24"
    >
      <div className="container mx-auto px-6">
        <FadeContent>
          <h2 className="mb-4 font-mono text-sm tracking-widest text-kidan-indigo uppercase">
            How a launch runs with us
          </h2>
          <p className="mb-12 max-w-xl font-grotesk text-3xl font-bold text-kidan-ivory md:text-4xl">
            Strategy call → Campaign build → Live → Measurement
          </p>
        </FadeContent>
        <FadeContent delay={0.1}>
          <Stepper steps={[...cryptoLaunchSteps]} />
        </FadeContent>
      </div>
    </section>
  );
}
