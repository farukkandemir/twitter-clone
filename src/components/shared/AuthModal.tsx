import React from "react";
import InputField from "./Input";
import { InputFieldProps } from "@/lib/types";
import { BsTwitter } from "react-icons/bs";
import Link from "next/link";

const AuthModal = ({
  type,
  inputFields,
  onSubmit,
  isSubmitting,
}: {
  type: "login" | "signup";
  inputFields: InputFieldProps[];
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}) => {
  const isSignInPage = type === "login";

  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-black p-8 rounded-lg shadow-lg w-96 text-white">
        <div className="flex flex-col items-center justify-center gap-2">
          <BsTwitter />
          <h1 className="text-md font-semibold pb-6">
            {isSignInPage ? "Welcome Back" : "Create An Account"}
          </h1>
        </div>
        <form
          className="flex flex-col gap-2"
          onSubmit={onSubmit}
          autoComplete="off"
        >
          {inputFields.map((inputField: InputFieldProps, index: number) => (
            <InputField key={index} {...inputField} />
          ))}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-white text-black font-semibold py-1 rounded-lg ${
                isSubmitting && "animate-pulse"
              }`}
            >
              {isSignInPage
                ? isSubmitting
                  ? "Logging In..."
                  : "Log In"
                : isSubmitting
                ? "Creating an Account..."
                : "Sign Up"}
            </button>
          </div>
        </form>
        <p className="pt-2 text-center text-sm text-neutral-400">
          {isSignInPage ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link
            href={isSignInPage ? "/sign-up" : "/sign-in"}
            className="text-blue-500"
          >
            {isSignInPage ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
