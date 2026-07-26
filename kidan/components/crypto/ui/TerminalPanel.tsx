"use client";

import type { MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/motion";

type TerminalPanelProps = {
  children: React.ReactNode;
  className?: string;
  /** Cursor-following indigo wash + violet glare. */
  spotlight?: boolean;
  /**
   * Top-edge gradient line.
   * "hover" lights on hover, "always" stays faintly on and brightens on hover.
   */
  edgeGlow?: "hover" | "always" | "none";
  /** Disable the hover lift for panels that should stay grounded. */
  lift?: boolean;
  /** Soft top-left corner highlight (Kidan case-study chip language). */
  cornerGlare?: boolean;
  /**
   * Card background gradient treatment.
   * "indigo"  — rich indigo wash (accent hero cards like Problem "Us")
   * "subtle"  — light top-edge tint (secondary service/feature cards)
   * "none"    — no gradient, plain bg (default)
   */
  gradient?: "indigo" | "subtle" | "none";
};

/**
 * The page's shared card primitive (KidanCard language): navymid border,
 * inset top highlight, edge light, optional cursor spotlight + violet glare,
 * and a 2px hover lift with indigo shadow.
 *
 * Lift + hover brighten are gated to fine-pointer devices so touch
 * taps do not leave sticky :hover states.
 */
export function TerminalPanel({
  children,
  className,
  spotlight = false,
  edgeGlow = "hover",
  lift = true,
  cornerGlare = true,
  gradient = "none",
}: TerminalPanelProps) {
  const isMobile = useIsMobile();
  const reduceMotion = usePrefersReducedMotion();
  const glareEnabled = spotlight && !isMobile && !reduceMotion;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!glareEnabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--panel-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--panel-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      onMouseMove={glareEnabled ? handleMouseMove : undefined}
      className={cn(
        "group/panel relative overflow-hidden rounded-xl border border-kidan-navymid bg-kidan-card/70 shadow-panel transition-all duration-300 ease-out-expo can-hover:hover:border-kidan-indigo/40 can-hover:hover:shadow-panel-hover",
        lift && "motion-safe:can-hover:hover:-translate-y-1",
        className
      )}
    >
      {/* Gradient background overlay — indigo or subtle tint */}
      {gradient === "indigo" && (
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: "var(--background-image-card-indigo)" }}
          aria-hidden
        />
      )}
      {gradient === "subtle" && (
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: "var(--background-image-card-subtle)" }}
          aria-hidden
        />
      )}
      {/* Indigo glow orb — top-right for indigo gradient cards */}
      {gradient === "indigo" && (
        <div
          className="pointer-events-none absolute -right-10 -top-10 z-0 h-36 w-36 rounded-full bg-kidan-lightIndigo/20 blur-3xl"
          aria-hidden
        />
      )}
      {cornerGlare && (
        <div
          className="pointer-events-none absolute -left-8 -top-8 z-20 h-24 w-24 rounded-full bg-kidan-lightIndigo/25 blur-2xl opacity-50 transition-opacity duration-300 can-hover:group-hover/panel:opacity-80"
          aria-hidden
        />
      )}
      {edgeGlow !== "none" && (
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 z-20 h-[2px] bg-panel-edge transition-opacity duration-300",
            edgeGlow === "always"
              ? "opacity-50 can-hover:group-hover/panel:opacity-100"
              : "opacity-0 can-hover:group-hover/panel:opacity-100"
          )}
          aria-hidden
        />
      )}
      {spotlight && (
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-panel-spotlight opacity-0 transition-opacity duration-300 can-hover:group-hover/panel:opacity-100"
          aria-hidden
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

/** Alias matching the design-system name used in the aesthetic upgrade plan. */
export { TerminalPanel as KidanCard };
