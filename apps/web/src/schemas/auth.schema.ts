import { z } from "zod";

export const signupSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters")
      .max(50),
    lastName: z
      .string()
      .trim()
      .min(2, "Last name must be at least 2 characters")
      .max(50),
    email: z.string().email(),
    phoneNumber: z
      .string()
      .trim()
      .min(10, "Phone number must be at least 10 characters")
      .max(15),
    password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password must be at most 50 characters"),
    confirmPassword: z.string(),
    termsAccepted: z.boolean().refine((value) => value, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type SignupSchema = z.infer<typeof signupSchema>;

export const SigninSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters"),
  rememberMe: z.boolean().default(false),
});

export type SigninSchema = z.infer<typeof SigninSchema>;
