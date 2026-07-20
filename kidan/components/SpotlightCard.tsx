"use client";

import React, { useRef, useState } from "react";
import { cn } from "../lib/utils";

export const SpotlightCard = ({
  children,
  className,
  spotlightColor = "rgba(102, 117, 234, 0.18)",
}: {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={() => {
        setIsFocused(true);
        setOpacity(1);
      }}
      onBlur={() => {
        setIsFocused(false);
        setOpacity(0);
      }}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-kidan-navymid bg-kidan-card transition-all duration-300 hover:-translate-y-1",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      {/* Always-visible faint top edge; strengthens on hover */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-kidan-indigo/50 to-transparent opacity-60 transition-opacity duration-300 group-hover:via-kidan-lightIndigo group-hover:opacity-100" />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
};
