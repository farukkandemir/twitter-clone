"use client";
import AuthModal from "@/components/shared/AuthModal";
import { SignInFormValues, SignInSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignInFormValues>({
    resolver: zodResolver(SignInSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: SignInFormValues) => {
    try {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-black">
        <h1 className="text-xl font-semibold text-center mb-6">Log In</h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email?.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password?.message}</p>
            )}
          </div>
          <button
            type="submit"
            // disabled={isSubmitting}
            className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-md"
          >
            {isSubmitting ? "Logging In..." : "Log In"}
          </button>
        </form>
        <p className="mt-4 text-gray-600 text-center">
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </div>

      {/* <AuthModal /> */}
    </div>
  );
};

export default SignIn;
