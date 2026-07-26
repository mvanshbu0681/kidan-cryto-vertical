import { cn } from "@/lib/utils";

type GradientNumeralProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Vertical ivory→indigo clipped text for impact stats.
 * Matches Nutriseed "The Impact" card numerals.
 */
export function GradientNumeral({ children, className }: GradientNumeralProps) {
  return (
    <span
      className={cn(
        "text-gradient-vertical font-mono font-bold tabular-nums",
        className
      )}
    >
      {children}
    </span>
  );
}
