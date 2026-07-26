"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type BookingDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Cal.com (or similar) embed URL from NEXT_PUBLIC_CRYPTO_BOOKING_URL. */
  bookingUrl: string;
};

/**
 * Booking modal. The iframe only mounts while the dialog is open,
 * so the Cal.com embed never costs anything on initial page load.
 */
export function BookingDialog({
  open,
  onOpenChange,
  bookingUrl,
}: BookingDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl gap-0 overflow-hidden p-0">
        <DialogHeader className="border-b border-kidan-navymid px-6 py-4">
          <DialogTitle>Book a launch call</DialogTitle>
          <DialogDescription>
            One call, no deck theatre. You leave with a real view of the first
            ninety days.
          </DialogDescription>
        </DialogHeader>
        {open ? (
          <iframe
            src={bookingUrl}
            title="Book a launch call"
            className="h-[600px] w-full bg-kidan-ink"
            loading="lazy"
            allow="payment"
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
