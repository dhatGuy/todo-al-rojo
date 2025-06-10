import type { SigninSchema, SignupSchema } from "src/schemas/auth.schema";
import { authClient } from "src/utils/auth-client";
import { mutationOptions } from "src/utils/mutationOptions";

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
          name: data.firstName + " " + data.lastName,
          phoneNumber: data.phoneNumber,
          image: "",
        },
        // {
        //   onSuccess: (user) => {
        //     console.log("User signed up:", user);
        //   },
        //   onError: (error) => {
        //     console.error("Signup failed:", error);
        //   },
        // },
      );
      return response;
    },
  });

export const signinMutationOptions = () =>
  mutationOptions({
    mutationKey: ["login"],
    mutationFn: async (data: SigninSchema) => {
      const response = await authClient.signIn.email(data);
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
