"use client";

import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplitText from "@/components/react-bits/SplitText";
import GradientText from "@/components/react-bits/GradientText";
import { BookingCta } from "@/components/crypto/BookingCta";
import { TerminalPanel } from "@/components/crypto/ui/TerminalPanel";
import { Reveal, REVEAL_EASE } from "@/components/crypto/ui/Reveal";
import { cryptoHero, cryptoProofStats } from "@/content/crypto";
import { track } from "@/lib/analytics";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** The three hero micro-metrics, pulled from the proof stats so they never drift. */
const HERO_METRIC_IDS = ["creators", "markets", "team"] as const;

const HEADLINE_CLASS =
  "font-grotesk text-[1.65rem] font-bold leading-[1.15] tracking-tight text-kidan-ivory sm:text-3xl md:text-4xl lg:text-[2.5rem] xl:text-5xl";

const LIVE_FEED = [
  { tag: "KOL", msg: "Creator matched · TikTok US" },
  { tag: "PAID", msg: "Ad account cleared · Meta" },
  { tag: "TRACK", msg: "Conversion linked · wallet" },
  { tag: "LIVE", msg: "Campaign live · 3 markets" },
] as const;

/** Accent phrase with a thin indigo underline that draws under the last line. */
function AccentWithUnderline({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <span className="relative inline-block">
      {reduceMotion ? (
        <span className="bg-gradient-to-r from-kidan-lightIndigo to-kidan-indigo bg-clip-text text-transparent">
          {cryptoHero.headlineAccent}
        </span>
      ) : (
        <GradientText className={HEADLINE_CLASS}>
          {cryptoHero.headlineAccent}
        </GradientText>
      )}
      <motion.span
        className="absolute -bottom-0.5 left-0 right-0 h-[2px] origin-left rounded-full bg-gradient-to-r from-kidan-indigo via-kidan-lightIndigo to-kidan-indigo/0 md:-bottom-1"
        initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.85, ease: REVEAL_EASE }}
        aria-hidden
      />
    </span>
  );
}

function OrbitRing({
  radius,
  duration,
  reverse = false,
  satellites,
}: {
  radius: number;
  duration: number;
  reverse?: boolean;
  satellites: { angle: number; r: number; fill: string; opacity?: number }[];
}) {
  const cx = 160;
  const cy = 88;
  return (
    <g
      className="animate-orbit-spin motion-reduce:animate-none"
      style={{
        transformOrigin: `${cx}px ${cy}px`,
        animationDuration: `${duration}s`,
        animationDirection: reverse ? "reverse" : "normal",
      }}
    >
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke="#1C2230"
        strokeWidth="1"
        strokeDasharray="2 6"
      />
      {satellites.map((sat, i) => {
        const rad = (sat.angle * Math.PI) / 180;
        const x = cx + radius * Math.cos(rad);
        const y = cy + radius * Math.sin(rad);
        return (
          <g key={i}>
            <line
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="#3A4FD6"
              strokeOpacity="0.22"
              strokeWidth="1"
            />
            <circle
              cx={x}
              cy={y}
              r={sat.r}
              fill={sat.fill}
              opacity={sat.opacity ?? 1}
            />
          </g>
        );
      })}
    </g>
  );
}

function LiveFeed({ reduceMotion }: { reduceMotion: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % LIVE_FEED.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const item = LIVE_FEED[index];

  return (
    <div className="flex h-8 items-center gap-2 overflow-hidden rounded-md border border-kidan-navymid bg-kidan-ink/60 px-2.5">
      <span className="shrink-0 font-mono text-[9px] font-bold uppercase tracking-widest text-kidan-lightIndigo">
        {item.tag}
      </span>
      <span className="h-3 w-px shrink-0 bg-kidan-navymid" aria-hidden />
      <div className="relative min-w-0 flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={reduceMotion ? "static" : item.msg}
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: REVEAL_EASE }}
            className="truncate font-mono text-[10px] tracking-wide text-kidan-silver"
          >
            {reduceMotion ? LIVE_FEED[0].msg : item.msg}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * Compact launch telemetry for the hero's right column.
 * CSS + SVG only — denser instrument panel, not a sparse chart.
 */
function TerminalVisual({ reduceMotion }: { reduceMotion: boolean }) {
  const chartPath =
    "M12 118 L48 108 L84 112 L120 92 L156 98 L192 74 L228 68 L264 52";
  const bars = [
    { h: 36, delay: 0.1 },
    { h: 58, delay: 0.18 },
    { h: 44, delay: 0.26 },
    { h: 72, delay: 0.34 },
    { h: 52, delay: 0.42 },
    { h: 88, delay: 0.5 },
    { h: 64, delay: 0.58 },
    { h: 78, delay: 0.66 },
  ];

  const kpis = [
    { label: "Creators", value: "60k+" },
    { label: "Markets", value: "3" },
    { label: "Team", value: "1" },
  ] as const;

  return (
    <div
      className="relative transition-transform duration-200 ease-out will-change-transform"
      style={{
        transform:
          "translate3d(calc(var(--hero-px, 0) * 5px), calc(var(--hero-py, 0) * 5px), 0)",
      }}
    >
      <div
        className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-kidan-indigo/18 blur-[72px] transition-transform duration-300 ease-out"
        style={{
          transform:
            "translate3d(calc(var(--hero-px, 0) * -4px), calc(var(--hero-py, 0) * -4px), 0)",
        }}
        aria-hidden
      />

      <TerminalPanel
        edgeGlow="always"
        lift={false}
        className="bg-kidan-obsidian/85 backdrop-blur-sm"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 border-b border-kidan-navymid px-3.5 py-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-kidan-graphite" aria-hidden />
          <span className="h-1.5 w-1.5 rounded-full bg-kidan-graphite" aria-hidden />
          <span className="h-1.5 w-1.5 rounded-full bg-kidan-indigo/80" aria-hidden />
          <span className="ml-2.5 font-mono text-[9px] uppercase tracking-[0.22em] text-kidan-slate">
            launch / live
          </span>
          <span className="ml-auto flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-kidan-lightIndigo">
            <span className="relative flex h-1.5 w-1.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-kidan-lightIndigo opacity-55 motion-reduce:animate-none" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-kidan-lightIndigo" />
            </span>
            synced
          </span>
        </div>

        <div className="space-y-3 p-3.5">
          {/* Mini KPI strip */}
          <div className="grid grid-cols-3 gap-2">
            {kpis.map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.35 + i * 0.08,
                  ease: REVEAL_EASE,
                }}
                className="rounded-md border border-kidan-navymid bg-kidan-ink/50 px-2 py-1.5"
              >
                <p className="font-mono text-[8px] uppercase tracking-widest text-kidan-slate">
                  {kpi.label}
                </p>
                <p className="mt-0.5 font-mono text-xs font-bold text-kidan-ivory">
                  {kpi.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Orbit + sparkline */}
          <div className="relative overflow-hidden rounded-md border border-kidan-navymid bg-kidan-ink/40">
            <svg
              viewBox="0 0 320 140"
              className="h-auto w-full"
              role="img"
              aria-label="Abstract launch telemetry: network orbit and rising sparkline"
            >
              <defs>
                <radialGradient id="hero-node-glow">
                  <stop offset="0%" stopColor="#6675EA" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#6675EA" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="hero-chart-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3A4FD6" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#3A4FD6" stopOpacity="0" />
                </linearGradient>
              </defs>

              <OrbitRing
                radius={42}
                duration={36}
                satellites={[
                  { angle: -40, r: 2.5, fill: "#6675EA" },
                  { angle: 120, r: 2, fill: "#3A4FD6" },
                  { angle: 210, r: 2.2, fill: "#6675EA", opacity: 0.7 },
                ]}
              />
              <OrbitRing
                radius={62}
                duration={54}
                reverse
                satellites={[
                  { angle: 25, r: 2.2, fill: "#3A4FD6" },
                  { angle: 165, r: 1.8, fill: "#6675EA", opacity: 0.75 },
                ]}
              />

              <circle cx="160" cy="88" r="12" fill="url(#hero-node-glow)" opacity="0.5" />
              <circle cx="160" cy="88" r="3.5" fill="#6675EA" />
              {reduceMotion ? (
                <circle
                  cx="160"
                  cy="88"
                  r="7"
                  fill="none"
                  stroke="#6675EA"
                  strokeOpacity="0.35"
                />
              ) : (
                <motion.circle
                  cx="160"
                  cy="88"
                  r="7"
                  fill="none"
                  stroke="#6675EA"
                  animate={{ strokeOpacity: [0.25, 0.65, 0.25], r: [7, 9, 7] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}

              {reduceMotion ? (
                <>
                  <path
                    d={`${chartPath} L264 130 L12 130 Z`}
                    fill="url(#hero-chart-fill)"
                    stroke="none"
                  />
                  <path
                    d={chartPath}
                    fill="none"
                    stroke="#6675EA"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </>
              ) : (
                <>
                  <motion.path
                    d={`${chartPath} L264 130 L12 130 Z`}
                    fill="url(#hero-chart-fill)"
                    stroke="none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 1.1, ease: REVEAL_EASE }}
                  />
                  <motion.path
                    d={chartPath}
                    fill="none"
                    stroke="#6675EA"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.1, delay: 0.55, ease: REVEAL_EASE }}
                  />
                </>
              )}
              {[
                [48, 108],
                [120, 92],
                [192, 74],
                [264, 52],
              ].map(([x, y]) => (
                <circle
                  key={`${x}-${y}`}
                  cx={x}
                  cy={y}
                  r="2"
                  fill="#F7F5EF"
                  opacity="0.85"
                />
              ))}
            </svg>
          </div>

          {/* Animated volume bars */}
          <div className="flex h-9 items-end gap-1.5" aria-hidden>
            {bars.map((bar, i) => (
              <motion.div
                key={i}
                className={cn(
                  "flex-1 rounded-[2px]",
                  i === bars.length - 2
                    ? "bg-kidan-lightIndigo/85"
                    : "bg-kidan-indigo/30"
                )}
                initial={
                  reduceMotion ? false : { scaleY: 0, opacity: 0.4 }
                }
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{
                  duration: 0.55,
                  delay: 0.7 + bar.delay,
                  ease: REVEAL_EASE,
                }}
                style={{ height: `${bar.h}%`, transformOrigin: "bottom" }}
              />
            ))}
          </div>

          <LiveFeed reduceMotion={reduceMotion} />
        </div>
      </TerminalPanel>
    </div>
  );
}

export function Hero() {
  const reduceMotion = usePrefersReducedMotion();
  const metrics = HERO_METRIC_IDS.map((id) =>
    cryptoProofStats.find((s) => s.id === id)
  ).filter((s) => s !== undefined);

  const handleParallax = useCallback((e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    e.currentTarget.style.setProperty("--hero-px", x.toFixed(3));
    e.currentTarget.style.setProperty("--hero-py", y.toFixed(3));
  }, []);

  return (
    <section
      className="relative flex flex-col justify-center overflow-hidden bg-kidan-ink"
      onMouseMove={reduceMotion ? undefined : handleParallax}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-hero-veil"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.07] [mask-image:linear-gradient(to_bottom,white_0%,transparent_80%)]"
        style={{
          backgroundImage: "url(/grid.svg)",
          backgroundRepeat: "repeat",
          backgroundSize: "56px 56px",
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute top-[-18%] right-[-8%] z-[1] h-[420px] w-[420px] rounded-full bg-kidan-indigo/18 blur-[100px]"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-6 pt-24 pb-12 md:pt-28 md:pb-16 lg:pt-32">
        <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 xl:gap-14">
          {/* Left — copy + CTAs + compact metrics */}
          <div className="lg:col-span-6 xl:col-span-7">
            {/*
              Single H1 owns the SEO terms (visible mono line) plus the
              locked brand headline — unique, keyword-targeted, no copy rewrite.
            */}
            <h1 className="mb-4 max-w-xl md:mb-5">
              <span className="mb-3 block font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-kidan-lightIndigo md:mb-4 md:text-[11px]">
                Crypto marketing agency · Web3 KOL · Token launch marketing
              </span>
              <span className={cn("block", HEADLINE_CLASS)}>
                {reduceMotion ? (
                  cryptoHero.headlineLead
                ) : (
                  <SplitText
                    text={cryptoHero.headlineLead}
                    className={HEADLINE_CLASS}
                    stagger={0.014}
                    duration={0.45}
                    tag="span"
                  />
                )}{" "}
                <AccentWithUnderline reduceMotion={reduceMotion} />
              </span>
            </h1>

            <Reveal delay={0.28}>
              <p className="mb-6 max-w-lg font-sans text-[15px] leading-relaxed text-kidan-silver md:mb-7 md:text-base md:leading-relaxed">
                {cryptoHero.subline}
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-3 md:mb-9">
                <BookingCta location="hero" size="default" />
                <a
                  href={cryptoHero.secondaryCta.href}
                  onClick={() => track("crypto_see_how_we_work")}
                  className="group inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-kidan-lightIndigo transition-colors can-hover:hover:text-kidan-ivory"
                >
                  <span className="relative">
                    {cryptoHero.secondaryCta.label}
                    <span
                      className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out-expo can-hover:group-hover:scale-x-100"
                      aria-hidden
                    />
                  </span>
                  <span
                    aria-hidden
                    className="transition-transform duration-300 ease-out-expo can-hover:group-hover:translate-y-0.5"
                  >
                    ↓
                  </span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.52}>
              <dl
                className="flex flex-wrap items-start gap-x-6 gap-y-4 border-t border-kidan-navymid pt-5 md:gap-x-8"
                aria-label="Key numbers"
              >
                {metrics.map((stat) => (
                  <div key={stat.id} className="min-w-0">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="font-mono text-xl font-bold text-kidan-ivory md:text-2xl">
                      {stat.prefix ?? ""}
                      {stat.value}
                      {stat.suffix ?? stat.displaySuffix ?? ""}
                    </dd>
                    <dd className="mt-0.5 max-w-[120px] font-mono text-[9px] uppercase leading-snug tracking-widest text-kidan-slate md:max-w-[140px] md:text-[10px]">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Right — terminal visual */}
          <div className="mt-10 lg:col-span-6 lg:mt-0 xl:col-span-5">
            <Reveal delay={0.32}>
              <TerminalVisual reduceMotion={reduceMotion} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
