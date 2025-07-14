import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { useEffect, useState } from "react";

// let authClient: ReturnType<typeof createAuthClient>;

export const authClient = createAuthClient({
	// baseURL,
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
				phoneNumber: {
					type: "string",
					required: true,
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

export type Session = typeof authClient.$Infer.Session;
export type User = typeof authClient.$Infer.Session.user;
