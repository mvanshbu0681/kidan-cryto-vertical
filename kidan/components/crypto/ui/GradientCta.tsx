"use client";

import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/motion";

type GradientCtaProps = {
  children: React.ReactNode;
  className?: string;
  /** Renders an anchor when set, otherwise a button. */
  href?: string;
  onClick?: () => void;
  size?: "default" | "lg";
};

/**
 * Primary conversion primitive: indigo→lightIndigo gradient pill,
 * continuous light sweep (Kidan "Start A Project" language), soft outer
 * glow that expands on hover. Sweep is disabled under reduced-motion.
 */
export function GradientCta({
  children,
  className,
  href,
  onClick,
  size = "lg",
}: GradientCtaProps) {
  const reduceMotion = usePrefersReducedMotion();

  const classes = cn(
    "group/cta relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full bg-cta-gradient bg-[length:220%_220%] bg-[position:0%_50%] font-mono text-sm font-bold uppercase tracking-wider text-white shadow-cta-glow transition-all duration-300 ease-out-expo can-hover:hover:bg-[position:100%_50%] can-hover:hover:shadow-cta-glow-hover motion-safe:can-hover:hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kidan-lightIndigo focus-visible:ring-offset-2 focus-visible:ring-offset-kidan-ink [&_svg]:pointer-events-none [&_svg]:shrink-0",
    size === "lg" ? "h-13 px-8 text-base" : "h-11 px-6",
    className
  );

  const glare = !reduceMotion ? (
    <span
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-full"
      aria-hidden
    >
      <span className="absolute inset-y-0 left-0 w-1/2 animate-cta-glare-sweep bg-cta-glare" />
    </span>
  ) : null;

  const content = (
    <>
      {glare}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
