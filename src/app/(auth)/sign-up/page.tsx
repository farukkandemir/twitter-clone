"use client";
import { SignUpFormValues, SignUpSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

type FormField = {
  name: "name" | "email" | "password";
  label: string;
  type: string;
  placeholder: string;
};

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema),
  });

  const formFields: FormField[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Your Name",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "you@example.com",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "********",
    },
  ];

  const onSubmit = async (data: SignUpFormValues) => {
    const response = await fetch("/api/register", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    });
    const responseData = await response.json();

    if (!responseData.success) {
      return setError("email", {
        type: "server",
        message: responseData.error.message,
      });
    }

    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    router.push("/");
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col gap-2 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-black">
          <h1 className="text-3xl font-semibold text-center mb-6">Sign Up</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {formFields.map((field, index) => (
              <div key={index} className="mb-4">
                <label htmlFor={field.name} className="block text-gray-600">
                  {field.label}
                </label>
                <input
                  {...register(field.name)}
                  type={field.type}
                  id={field.name}
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder={field.placeholder}
                />
                {errors[field.name] && (
                  <p className="text-red-500">{errors[field.name]?.message}</p>
                )}
              </div>
            ))}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-md "
            >
              {isSubmitting ? "Loading..." : "Sign Up"}
            </button>
          </form>
          <p className="mt-4 text-gray-600 text-center">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-500">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
