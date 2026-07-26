"use client";

import { useEffect } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

const MARKERS: ReadonlyArray<{ ratio: number; event: AnalyticsEvent }> = [
  { ratio: 0.25, event: "crypto_scroll_25" },
  { ratio: 0.5, event: "crypto_scroll_50" },
  { ratio: 0.75, event: "crypto_scroll_75" },
  { ratio: 1, event: "crypto_scroll_100" },
];

/**
 * Fires crypto_scroll_25/50/75/100 exactly once per pageview.
 * Uses a rAF-throttled scroll listener (more reliable than sentinel
 * IntersectionObservers when section heights shift during hydration).
 */
export function useScrollDepth(): void {
  useEffect(() => {
    const fired = new Set<number>();
    let ticking = false;

    const check = () => {
      ticking = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const depth = Math.min(window.scrollY / scrollable, 1);
      for (const { ratio, event } of MARKERS) {
        if (!fired.has(ratio) && depth >= ratio) {
          fired.add(ratio);
          track(event);
        }
      }
      if (fired.size === MARKERS.length) {
        window.removeEventListener("scroll", onScroll);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(check);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    check();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}
