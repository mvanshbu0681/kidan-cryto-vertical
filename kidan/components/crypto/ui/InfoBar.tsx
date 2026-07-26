"use client";

import { cn } from "@/lib/utils";
import { TerminalPanel } from "@/components/crypto/ui/TerminalPanel";
import { ProofStatValue } from "@/components/crypto/ui/StatValue";
import type { ProofStat } from "@/content/crypto";

export type InfoBarItem = {
  id: string;
  label: string;
  /** When set, renders animated Space Mono stat per brief. */
  stat?: ProofStat;
  /** Static fallback when no stat object is provided. */
  value?: string;
};

type InfoBarProps = {
  items: InfoBarItem[];
  className?: string;
};

/**
 * Brief §06 hero band: one rounded panel, Space Mono numerals,
 * one clause of context under each.
 */
export function InfoBar({ items, className }: InfoBarProps) {
  return (
    <TerminalPanel
      edgeGlow="always"
      lift={false}
      spotlight={false}
      className={cn("border-kidan-navymid/80 bg-kidan-card/92", className)}
    >
      <dl
        className={cn(
          "grid gap-6 px-6 py-6 sm:px-8 sm:py-7",
          items.length <= 2
            ? "grid-cols-2"
            : "grid-cols-2 lg:grid-cols-4 lg:gap-0"
        )}
      >
        {items.map((item, i) => (
          <div
            key={item.id}
            className={cn(
              "relative flex flex-col gap-2",
              i > 0 && "lg:pl-8",
              i > 0 &&
                "lg:before:absolute lg:before:inset-y-1 lg:before:left-0 lg:before:w-px lg:before:bg-kidan-navymid"
            )}
          >
            <dt className="font-mono text-[10px] font-bold uppercase leading-snug tracking-[0.14em] text-kidan-silver">
              {item.label}
            </dt>
            <dd>
              {item.stat ? (
                <ProofStatValue stat={item.stat} size="hero" />
              ) : (
                <span className="font-mono text-2xl font-bold text-kidan-ivory sm:text-3xl">
                  {item.value}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </TerminalPanel>
  );
}
