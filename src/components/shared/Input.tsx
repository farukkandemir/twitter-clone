import { InputFieldProps, SignUpFormValues } from "@/lib/types";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

const InputField = ({
  register,
  error,
  label,
  type,
  placeholder,
}: InputFieldProps) => {
  return (
    <div>
      {label && (
        <label htmlFor={type} className="block">
          {label}
        </label>
      )}
      <div>
        <input
          {...register}
          type={type}
          id={type}
          placeholder={placeholder}
          className="
              w-full 
              py-1
              px-2
            bg-black  
              border-2
            border-neutral-800 
              rounded-md
              outline-none
            text-white
            text-sm
            focus:border-mainBlue
              focus:border-2
              transition
              placeholder:text-sm
            disabled:bg-neutral-900
              disabled:opacity-70
              disabled:cursor-not-allowed "
        />
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default InputField;
