/**
 * No-op analytics stub. Wire a real provider later.
 * Booking conversion events should stay distinct from main-site events.
 */
export type AnalyticsEvent =
  | "crypto_cta_click"
  | "crypto_scroll_depth"
  | "crypto_booking_conversion"
  | "crypto_see_how_we_work";

export function track(
  event: AnalyticsEvent,
  payload?: Record<string, string | number | boolean>
): void {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, payload ?? {});
  }
}
