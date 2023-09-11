import { z } from "zod";

export const SignUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name should be at least 5 characters" }),
  email: z.string().trim().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters" }),
});

export type SignUpFormValues = z.infer<typeof SignUpSchema>;
