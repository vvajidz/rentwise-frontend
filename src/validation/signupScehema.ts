import { z } from "zod";

export const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "Full name must be at least 3 characters"),
      
    email: z
      .string()
      .email("Invalid email address"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),

    agreedToTerms: z
      .boolean()
      .refine((val) => val === true, {
        message: "You must agree to the terms",
      }),

    role: z.enum(["owner", "tenant"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // this attaches error to confirmPassword
  });

export type SignupSchemaType = z.infer<typeof signupSchema>;
