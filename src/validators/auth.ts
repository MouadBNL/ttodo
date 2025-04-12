import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(4, "Name must be at least 4 characters")
      .trim(),
    email: z.string().email().trim(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type SignUpRequest = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type SignInRequest = z.infer<typeof signInSchema>;
