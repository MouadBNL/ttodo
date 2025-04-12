import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
  });
export type SignUpRequest = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type SignInRequest = z.infer<typeof signInSchema>;
