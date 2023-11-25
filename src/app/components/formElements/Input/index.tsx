"use client";

import { useFormContext } from "react-hook-form";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
};

const Input: React.FC<InputProps> = ({ id, label, className, ...rest }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[id]?.message?.toString();

  return (
    <div>
      <label className="block" htmlFor={id}>
        {label}:{" "}
      </label>
      <input
        className={`border border-gray-400 h-8 px-2 ${className}`}
        {...rest}
        {...register(id)}
      />
      {errorMessage && <p className="mt-1 text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default Input;
