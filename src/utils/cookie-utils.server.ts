import { getCookie } from "@tanstack/react-start/server";

export const REFERRAL_COOKIE = "todoalrojo_ref";
export const UTM_SOURCE_COOKIE = "todoalrojo_utm_source";
export const UTM_MEDIUM_COOKIE = "todoalrojo_utm_medium";
export const UTM_CAMPAIGN_COOKIE = "todoalrojo_utm_campaign";

/**
 * Retrieves referral and UTM data from cookies.
 */
export function getReferralAndUtmFromCookies() {
  return {
    ref: getCookie(REFERRAL_COOKIE),
    utm: {
      source: getCookie(UTM_SOURCE_COOKIE),
      medium: getCookie(UTM_MEDIUM_COOKIE),
      campaign: getCookie(UTM_CAMPAIGN_COOKIE),
      // ... get other UTM cookies
    },
  };
}
