/**
 * Stub for the crypto booking CTA.
 * Wire NEXT_PUBLIC_CRYPTO_BOOKING_URL and track("crypto_booking_conversion")
 * when the booking flow is approved. Do not mount until then.
 */

"use client";

import { track } from "@/lib/analytics";

type BookingCtaProps = {
  href?: string;
  label?: string;
  className?: string;
};

export function BookingCta({
  href = process.env.NEXT_PUBLIC_CRYPTO_BOOKING_URL ?? "#",
  label = "Book a launch call",
  className,
}: BookingCtaProps) {
  return (
    <a
      href={href}
      onClick={() => track("crypto_booking_conversion", { source: "closing" })}
      className={className}
    >
      {label}
    </a>
  );
}
