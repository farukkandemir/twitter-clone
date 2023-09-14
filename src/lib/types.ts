import { z } from "zod";

const baseSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters" }),
});

export const SignUpSchema = baseSchema.extend({
  name: z
    .string()
    .trim()
    .min(5, { message: "Name should be at least 5 characters" }),
});

export type SignUpFormValues = z.infer<typeof SignUpSchema>;
export type SignInFormValues = z.infer<typeof baseSchema>;
export const SignInSchema = baseSchema;

export type FormField = {
  name: "name" | "email" | "password";
  label: string;
  type: string;
  placeholder: string;
};
