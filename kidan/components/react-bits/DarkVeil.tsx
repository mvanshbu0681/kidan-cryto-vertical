"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Vec2 } from "ogl";
import { usePrefersReducedMotion, useIsMobile } from "@/lib/motion";
import { cn } from "@/lib/utils";

const vertex = `
attribute vec2 position;
void main(){gl_Position=vec4(position,0.0,1.0);}
`;

const fragment = `
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uHueShift;
uniform float uNoise;
uniform float uScan;
uniform float uWarp;

float rand(vec2 c){return fract(sin(dot(c,vec2(12.9898,78.233)))*43758.5453);}

void main(){
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= uResolution.x / uResolution.y;

  float t = uTime * 0.15;
  float w = sin(p.y * 3.0 + t) * uWarp * 0.08;
  p.x += w;

  float d = length(p);
  float glow = exp(-d * 1.8) * 0.85;
  float band = smoothstep(0.0, 1.0, 0.55 + 0.45 * sin(p.x * 2.5 + t * 1.2));

  // Indigo-biased veil (Kidan tokens)
  vec3 indigo = vec3(0.227, 0.310, 0.839);
  vec3 light = vec3(0.400, 0.459, 0.918);
  vec3 ink = vec3(0.055, 0.067, 0.086);

  vec3 col = mix(ink, indigo, glow * band);
  col = mix(col, light, glow * 0.35);

  float n = rand(uv * uResolution.xy + t) * uNoise;
  col += n * 0.08;

  float scan = sin(uv.y * uResolution.y * 0.8 + t * 4.0) * uScan * 0.04;
  col += scan;

  float hue = uHueShift * 0.002;
  col.rg += hue;

  gl_FragColor = vec4(col, 1.0);
}
`;

type DarkVeilProps = {
  className?: string;
  hueShift?: number;
  noiseIntensity?: number;
  scanlineIntensity?: number;
  speed?: number;
  warpAmount?: number;
};

/**
 * React Bits–style Dark Veil (OGL). Tuned to Kidan indigo.
 * Falls back to CSS gradient on mobile / reduced-motion.
 */
export default function DarkVeil({
  className,
  hueShift = 12,
  noiseIntensity = 0.08,
  scanlineIntensity = 0.15,
  speed = 0.6,
  warpAmount = 0.4,
}: DarkVeilProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (reduceMotion || isMobile) return;
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 1.5),
      alpha: false,
      depth: false,
    });
    const { gl } = renderer;
    container.appendChild(gl.canvas);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uResolution: { value: new Vec2(1, 1) },
        uTime: { value: 0 },
        uHueShift: { value: hueShift },
        uNoise: { value: noiseIntensity },
        uScan: { value: scanlineIntensity },
        uWarp: { value: warpAmount },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h);
      program.uniforms.uResolution.value.set(gl.canvas.width, gl.canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      program.uniforms.uTime.value = ((now - start) / 1000) * speed;
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      if (gl.canvas.parentNode === container) container.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [
    reduceMotion,
    isMobile,
    hueShift,
    noiseIntensity,
    scanlineIntensity,
    speed,
    warpAmount,
  ]);

  if (reduceMotion || isMobile) {
    return (
      <div
        className={cn(
          "absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(58,79,214,0.35)_0%,transparent_55%),radial-gradient(ellipse_at_20%_80%,rgba(102,117,234,0.18)_0%,transparent_50%),#0E1116]",
          className
        )}
        aria-hidden
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden", className)}
      aria-hidden
    />
  );
}
