"use client";
import { InputFieldProps, SignInFormValues, SignInSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AuthModal from "@/components/shared/AuthModal";

const SignIn = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignInFormValues>({
    resolver: zodResolver(SignInSchema),
  });

  const inputFields: InputFieldProps[] = [
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

  const onSubmit = async (data: SignInFormValues) => {
    try {
      const signInResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signInResult?.error) {
        toast.error(signInResult.error);
        return reset();
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <AuthModal
        type="login"
        inputFields={inputFields}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default SignIn;
