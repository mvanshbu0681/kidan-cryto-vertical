"use client";

import { useSyncExternalStore } from "react";

/** SSR-safe media query subscription (no setState-in-effect). */
function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

/** Shared reduced-motion hook for React Bits wrappers. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export function useIsMobile(breakpoint = 768): boolean {
  return useMediaQuery(`(max-width: ${breakpoint}px)`);
}
