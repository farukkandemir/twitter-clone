"use client";
import { InputFieldProps, SignUpFormValues, SignUpSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import AuthModal from "@/components/shared/AuthModal";

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

  const inputFields: InputFieldProps[] = [
    {
      type: "name",
      placeholder: "Name",
      register: register("name"),
      error: errors.name?.message,
    },
    {
      type: "email",
      placeholder: "Email",
      register: register("email"),
      error: errors.email?.message,
    },
    {
      type: "password",
      placeholder: "Password",
      register: register("password"),
      error: errors.password?.message,
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
    router.push("/onboarding");
  };

  return (
    <div className="h-full flex items-center justify-center">
      <AuthModal
        type="signup"
        inputFields={inputFields}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default SignUp;
