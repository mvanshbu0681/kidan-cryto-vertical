"use client";

import { cn } from "@/lib/utils";
import type { HeroMetaItem } from "@/content/crypto";

type HeroMetaStripProps = {
  items: HeroMetaItem[];
  className?: string;
};

/**
 * Case-study–style metadata panel below the hero headline.
 * Four columns: label on top (mono, quiet), value below (grotesk, ivory).
 * Mirrors the Kidan Nutriseed info strip — labels stay mono, values in grotesk
 * so Proof's Space Mono numerals remain the unique "fintech" signal.
 */
export function HeroMetaStrip({ items, className }: HeroMetaStripProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-kidan-navymid/70 bg-kidan-card/80",
        className
      )}
    >
      <dl
        className={cn(
          "grid",
          items.length <= 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4"
        )}
      >
        {items.map((item, i) => (
          <div
            key={item.label}
            className={cn(
              "flex flex-col gap-1.5 px-4 py-3 sm:px-5 sm:py-4",
              // Mobile: right border on cols 1,3 (right of left column)
              i % 2 !== 0 && "border-l border-kidan-navymid/60",
              // Mobile: top border on second row
              i >= 2 && "border-t border-kidan-navymid/60",
              // Desktop (sm+): remove top border, add left on 1/2/3
              i >= 1 && "sm:border-t-0 sm:border-l sm:border-kidan-navymid/60"
            )}
          >
            <dt className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-kidan-slate sm:text-[10px]">
              {item.label}
            </dt>
            <dd className="font-grotesk text-sm font-semibold leading-snug text-kidan-ivory sm:text-[15px]">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
