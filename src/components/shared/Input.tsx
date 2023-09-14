// import { FormField, SignUpFormValues } from "@/lib/types";
// import React from "react";
// import { FieldErrors, UseFormRegister } from "react-hook-form";

// type InputProps = {
//   field: FormField;
//   register: UseFormRegister<SignUpFormValues>;
//   errors: FieldErrors<SignUpFormValues>;
// };

// const InputField = ({ field, register, errors }: InputProps) => {
//   return (
//     <div>
//       <label htmlFor={field.name} className="block">
//         {field.label}
//       </label>
//       <input
//         {...register(field.name)}
//         type={field.type}
//         id={field.name}
//         className="w-full px-4 py-2 border rounded-md"
//         placeholder={field.placeholder}
//       />
//       {errors[field.name] && (
//         <p className="text-red-500">{errors[field.name]?.message}</p>
//       )}
//     </div>
//   );
// };

// export default InputField;
