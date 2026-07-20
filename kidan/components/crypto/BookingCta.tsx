"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/crypto/BookingDialog";
import { trackBookingConversion } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const MAILTO_FALLBACK =
  "mailto:daniel@kidanagency.com?subject=Crypto%20launch%20call";

type BookingCtaProps = {
  location: "hero" | "closing";
  label?: string;
  className?: string;
  size?: "default" | "lg";
};

/**
 * The page's conversion primitive. If NEXT_PUBLIC_CRYPTO_BOOKING_URL is set,
 * opens the booking dialog (Cal.com embed). Otherwise falls back to mailto.
 */
export function BookingCta({
  location,
  label = "Book a launch call",
  className,
  size = "lg",
}: BookingCtaProps) {
  const bookingUrl = process.env.NEXT_PUBLIC_CRYPTO_BOOKING_URL;
  const [open, setOpen] = useState(false);

  const arrow = (
    <ArrowRight
      className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
      aria-hidden
    />
  );

  if (!bookingUrl) {
    return (
      <Button
        asChild
        size={size}
        className={cn("group", className)}
        onClick={() => trackBookingConversion(location)}
      >
        <a href={MAILTO_FALLBACK}>
          {label}
          {arrow}
        </a>
      </Button>
    );
  }

  return (
    <>
      <Button
        size={size}
        className={cn("group", className)}
        onClick={() => {
          trackBookingConversion(location);
          setOpen(true);
        }}
      >
        {label}
        {arrow}
      </Button>
      <BookingDialog open={open} onOpenChange={setOpen} bookingUrl={bookingUrl} />
    </>
  );
}
