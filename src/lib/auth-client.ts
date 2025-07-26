import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { useEffect, useState } from "react";

export const authClient = createAuthClient({
  // baseURL: process.env.WEB_URL,
  plugins: [
    inferAdditionalFields({
      user: {
        firstName: {
          type: "string",
          required: true,
          fieldName: "first_name",
        },
        lastName: {
          type: "string",
          required: true,
          fieldName: "last_name",
        },
        emailVerifiedAt: {
          type: "string",
          required: false,
          fieldName: "email_verified_at",
        },
        chips: {
          type: "number",
          required: false,
          fieldName: "chips",
        },
        referralCode: {
          type: "string",
          required: false,
          fieldName: "referral_code",
        },
        level: {
          type: "number",
          required: false,
          fieldName: "level",
        },
        phoneNumber: {
          type: "string",
          fieldName: "phone_number",
        },
      },
    }),
  ],
});

type ErrorTypes = Partial<
  Record<
    keyof typeof authClient.$ERROR_CODES & "PHONE_NUMBER_ALREADY_EXISTS",
    {
      en: string;
      es: string;
    }
  >
>;

export const errorCodes = {
  USER_ALREADY_EXISTS: {
    en: "user already registered",
    es: "usuario ya registrado",
  },
  PHONE_NUMBER_ALREADY_EXISTS: {
    en: "phone number already registered",
    es: "numero de telefono ya registrado",
  },
} satisfies ErrorTypes;

export const getErrorMessage = (
  code: string | undefined,
  lang: "en" | "es" = "en",
) => {
  if (code && code in errorCodes) {
    return errorCodes[code as keyof typeof errorCodes][lang];
  }
  return "";
};

/**
 * This hook is a simple abstraction over the better-auth's useSession hook.
 * It adds an additional state to check if it's the first time checking for the session.
 * This is useful for example when you want to show a loading state until the session is checked.
 */
export const useSession = () => {
  const { data, isPending, error, refetch } = authClient.useSession();
  const [isInitialPending, setIsInitialPending] = useState(true);

  useEffect(() => {
    if (error || data || !isPending) {
      setIsInitialPending(false);
    }
  }, [data, error, isPending]);

  return {
    data,
    isInitialPending,
    isPending,
    error,
    refetch,
    isAuthenticated: !!data?.user,
  };
};

export type Session = typeof authClient.$Infer.Session;
export type User = typeof authClient.$Infer.Session.user;
