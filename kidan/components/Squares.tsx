"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";
import { usePrefersReducedMotion } from "@/lib/motion";

interface SquaresProps {
  direction?: "right" | "left" | "up" | "down";
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
  className?: string;
}

export const Squares: React.FC<SquaresProps> = ({
  direction = "right",
  speed = 1,
  borderColor = "#333",
  squareSize = 40,
  hoverFillColor = "#222",
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  const numSquaresX = useRef<number>(0);
  const numSquaresY = useRef<number>(0);
  const drawOffset = useRef({ x: 0, y: 0 });
  const [hoveredSquare, setHoveredSquare] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const startX = Math.floor(drawOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(drawOffset.current.y / squareSize) * squareSize;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (drawOffset.current.x % squareSize);
          const squareY = y - (drawOffset.current.y % squareSize);

          if (
            hoveredSquare &&
            Math.floor((x - startX) / squareSize) === hoveredSquare.x &&
            Math.floor((y - startY) / squareSize) === hoveredSquare.y
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
          }

          ctx.strokeStyle = borderColor;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }
    };

    if (reduceMotion) {
      drawGrid();
      return () => {
        window.removeEventListener("resize", resizeCanvas);
      };
    }

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      switch (direction) {
        case "right":
          drawOffset.current.x =
            (drawOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          break;
        case "left":
          drawOffset.current.x =
            (drawOffset.current.x + effectiveSpeed) % squareSize;
          break;
        case "up":
          drawOffset.current.y =
            (drawOffset.current.y + effectiveSpeed) % squareSize;
          break;
        case "down":
          drawOffset.current.y =
            (drawOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
      }
      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    requestRef.current = requestAnimationFrame(updateAnimation);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(requestRef.current);
    };
  }, [
    direction,
    speed,
    borderColor,
    hoverFillColor,
    hoveredSquare,
    squareSize,
    reduceMotion,
  ]);

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const hoveredX = Math.floor(
      (mouseX + (drawOffset.current.x % squareSize)) / squareSize
    );
    const hoveredY = Math.floor(
      (mouseY + (drawOffset.current.y % squareSize)) / squareSize
    );

    setHoveredSquare({ x: hoveredX, y: hoveredY });
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredSquare(null)}
      className={cn("block h-full w-full", className)}
      aria-hidden
    />
  );
};
