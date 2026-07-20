"use client";

import type { ComponentType } from "react";
import {
  SiBitcoin,
  SiBnbchain,
  SiEthereum,
  SiPolygon,
  SiSolana,
  SiTon,
} from "react-icons/si";
import { cryptoNetworks } from "@/content/crypto";

/** Base chain mark — react-icons/si has no Base glyph in this version. */
function BaseMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm2 9h8v2h-8v-2Z"
      />
    </svg>
  );
}

/** Minimal Arbitrum mark — react-icons/si has no Arbitrum glyph in this version. */
function ArbitrumMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 2.5 21.5 19h-4L12 9.7 6.5 19h-4L12 2.5Z" />
      <path d="M12 14.2 15.6 20.5H8.4L12 14.2Z" opacity="0.65" />
    </svg>
  );
}

type Chain = {
  name: string;
  Icon: ComponentType<{ className?: string }>;
  /** Brand color revealed on fine-pointer hover. */
  brand: string;
};

const CHAIN_ICONS: Record<string, Chain> = {
  Ethereum: { name: "Ethereum", Icon: SiEthereum, brand: "#8CA5F6" },
  Solana: { name: "Solana", Icon: SiSolana, brand: "#9945FF" },
  Base: { name: "Base", Icon: BaseMark, brand: "#3A6FF6" },
  Bitcoin: { name: "Bitcoin", Icon: SiBitcoin, brand: "#F7931A" },
  "BNB Chain": { name: "BNB Chain", Icon: SiBnbchain, brand: "#F0B90B" },
  Polygon: { name: "Polygon", Icon: SiPolygon, brand: "#9B5CF6" },
  Arbitrum: { name: "Arbitrum", Icon: ArbitrumMark, brand: "#28A0F0" },
  TON: { name: "TON", Icon: SiTon, brand: "#31A6F5" },
};

function ChainItem({ chain }: { chain: Chain }) {
  return (
    <span
      className="group flex items-center gap-2.5 rounded-full border border-kidan-navymid bg-kidan-card/60 px-4 py-2.5 transition-colors duration-300 can-hover:hover:border-kidan-indigo/40"
      style={{ "--brand": chain.brand } as React.CSSProperties}
    >
      <chain.Icon className="h-4 w-4 text-kidan-slate transition-colors duration-300 can-hover:group-hover:text-(--brand)" />
      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-kidan-slate transition-colors duration-300 can-hover:group-hover:text-kidan-ivory sm:text-xs">
        {chain.name}
      </span>
    </span>
  );
}

/**
 * Quiet factual strip of ecosystems we can service.
 * Static wrap only — the page already has one marquee (Ticker).
 * Hidden until `cryptoNetworks.confirmed` is flipped in content.
 */
export function Networks() {
  if (!cryptoNetworks.confirmed) return null;

  const chains = cryptoNetworks.chains
    .map((name) => CHAIN_ICONS[name])
    .filter((c): c is Chain => c !== undefined);

  return (
    <section className="border-b border-kidan-navymid py-14">
      <div className="container mx-auto px-6">
        <p className="mb-8 text-center font-mono text-xs uppercase tracking-widest text-kidan-slate">
          {cryptoNetworks.eyebrow}
        </p>
        <ul
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
          aria-label="Ecosystems we can service"
        >
          {chains.map((chain) => (
            <li key={chain.name}>
              <ChainItem chain={chain} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
