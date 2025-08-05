import { createServerFn } from "@tanstack/react-start";
import { setCookie } from "@tanstack/react-start/server";
import z from "zod";

export const REFERRAL_COOKIE = "todoalrojo_ref";
export const UTM_SOURCE_COOKIE = "todoalrojo_utm_source";
export const UTM_MEDIUM_COOKIE = "todoalrojo_utm_medium";
export const UTM_CAMPAIGN_COOKIE = "todoalrojo_utm_campaign";

const COOKIE_OPTIONS = {
  maxAge: 7 * 24 * 60 * 60, // 7 days
  httpOnly: false, // Set to true if storing sensitive data
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

const searchSchema = z
  .object({
    ref: z.string().optional(),
    utm_source: z.string().optional(),
    utm_medium: z.string().optional(),
    utm_campaign: z.string().optional(),
    utm_term: z.string().optional(),
  })
  .optional();
export const captureReferralAndUtm = createServerFn({ method: "POST" })
  .validator(searchSchema)
  .handler(async (context) => {
    const ref = context.data?.ref;
    const utmSource = context.data?.utm_source;
    const utmMedium = context.data?.utm_medium;
    const utmCampaign = context.data?.utm_campaign;
    const utmTerm = context.data?.utm_term;

    // If we have a referral code, store it in a cookie
    if (ref) {
      setCookie(REFERRAL_COOKIE, ref, COOKIE_OPTIONS);
    }

    // If we have UTM params, store them in cookies
    if (utmSource) setCookie(UTM_SOURCE_COOKIE, utmSource, COOKIE_OPTIONS);
    if (utmMedium) setCookie(UTM_MEDIUM_COOKIE, utmMedium, COOKIE_OPTIONS);
    if (utmCampaign)
      setCookie(UTM_CAMPAIGN_COOKIE, utmCampaign, COOKIE_OPTIONS);

    return {
      ref,
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
    };
  });
