import { authClient } from "@/src/lib/auth-client";
import { mutationOptions } from "@/src/lib/mutationOptions";
import type { SigninSchema, SignupSchema } from "@/schemas/auth.schema";

export const signupMutationOptions = () =>
	mutationOptions({
		mutationKey: ["signup"],
		mutationFn: async (data: SignupSchema) => {
			const response = await authClient.signUp.email(
				{
					email: data.email,
					password: data.password,
					firstName: data.firstName,
					lastName: data.lastName,
					name: `${data.firstName} ${data.lastName}`,
					phoneNumber: data.phoneNumber,
					image: "",
					fetchOptions: {
						query: {
							// ref: "randomRef",
							// affliate: "randomAffiliate",
						},
					},
				},
				{
					//   onSuccess: (user) => {
					//     console.log("User signed up:", user);
					//   },
					//   onError: (error) => {
					//     console.error("Signup failed:", error);
					//   },
				},
			);
			return response;
		},
	});

export const signinMutationOptions = () =>
	mutationOptions({
		mutationKey: ["login"],
		mutationFn: async (data: SigninSchema) => {
			const response = await authClient.signIn.email(data, {});
			return response;
		},
	});

export const logoutMutationOptions = () =>
	mutationOptions({
		mutationKey: ["logout"],
		mutationFn: async () => {
			const response = await authClient.signOut();
			return response;
		},
	});

export const requestPasswordResetMutationOptions = () =>
	mutationOptions({
		mutationKey: ["requestPasswordReset"],
		mutationFn: async (email: string) => {
			const response = await authClient.requestPasswordReset({
				email,
				redirectTo: `${window.location.origin}/reset-password`,
			});
			return response;
		},
	});

export const resetPasswordMutationOptions = () =>
	mutationOptions({
		mutationKey: ["resetPassword"],
		mutationFn: async (data: { token: string; newPassword: string }) => {
			const response = await authClient.resetPassword(data);
			return response;
		},
	});

export const googleSigninMutationOptions = () =>
	mutationOptions({
		mutationKey: ["googleSignin"],
		mutationFn: async () => {
			const response = await authClient.signIn.social({
				provider: "google",
				callbackURL: `${window.location.origin}/dashboard`,
				errorCallbackURL: `${window.location.origin}/signin?error=google-signin-failed`,
			});
			return response;
		},
	});
