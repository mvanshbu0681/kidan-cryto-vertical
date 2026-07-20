"use client";

import FadeContent from "@/components/react-bits/FadeContent";
import LogoLoop from "@/components/react-bits/LogoLoop";
import { cryptoNetworks } from "@/content/crypto";

export function Networks() {
  const pills = cryptoNetworks.chains.map((chain) => (
    <span
      key={chain}
      className="inline-flex items-center rounded-full border border-kidan-navymid bg-kidan-card/80 px-5 py-2 font-mono text-xs tracking-widest text-kidan-silver uppercase"
    >
      {chain}
    </span>
  ));

  return (
    <section className="border-b border-kidan-navymid bg-kidan-ink py-20">
      <div className="container mx-auto px-6">
        <FadeContent>
          <p className="mb-8 text-center font-mono text-xs tracking-widest text-kidan-slate uppercase">
            {cryptoNetworks.eyebrow}
            {!cryptoNetworks.confirmed ? (
              <span className="ml-2 text-kidan-graphite">· pending confirmation</span>
            ) : null}
          </p>
        </FadeContent>
        <LogoLoop items={pills} speed={45} gap={12} />
      </div>
    </section>
  );
}
