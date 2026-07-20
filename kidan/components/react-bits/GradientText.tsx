"use client";

import { cn } from "@/lib/utils";

type GradientTextProps = {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
};

/** React Bits–style GradientText. */
export default function GradientText({
  children,
  className,
  colors = ["#6675EA", "#3A4FD6", "#AF9DFF", "#6675EA"],
  animationSpeed = 8,
}: GradientTextProps) {
  const gradient = `linear-gradient(90deg, ${colors.join(", ")})`;

  return (
    <span
      className={cn(
        "inline animate-gradient-text bg-clip-text text-transparent",
        className
      )}
      style={{
        backgroundImage: gradient,
        backgroundSize: "200% auto",
        animationDuration: `${animationSpeed}s`,
      }}
    >
      {children}
    </span>
  );
}
