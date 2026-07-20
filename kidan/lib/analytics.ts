/**
 * No-op analytics stub. Wire a real provider later.
 * Booking conversion events stay distinct from main-site events so this
 * vertical can be measured on its own.
 */
export type AnalyticsEvent =
  | "crypto_book_call_clicked"
  | "crypto_hero_book_call"
  | "crypto_closing_book_call"
  | "crypto_see_how_we_work"
  | "crypto_service_card_view"
  | "crypto_scroll_25"
  | "crypto_scroll_50"
  | "crypto_scroll_75"
  | "crypto_scroll_100"
  | "crypto_cta_click"
  | "crypto_scroll_depth"
  | "crypto_booking_conversion";

export function track(
  event: AnalyticsEvent,
  payload?: Record<string, string | number | boolean>
): void {
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, payload ?? {});
  }
}

/**
 * Distinct conversion event for this vertical. Fired alongside the per-location
 * named event (crypto_hero_book_call / crypto_closing_book_call).
 */
export function trackBookingConversion(location: "hero" | "closing"): void {
  track(`crypto_${location}_book_call`);
  track("crypto_book_call_clicked", { location });
}
