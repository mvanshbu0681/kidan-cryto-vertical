"use client";

import { useScrollDepth } from "@/lib/useScrollDepth";

/** Client island that wires scroll-depth analytics into the page shell. */
export function ScrollDepthTracker() {
  useScrollDepth();
  return null;
}
