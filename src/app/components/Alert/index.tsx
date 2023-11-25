"use client";

import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/react";
import { SerializedError } from "@reduxjs/toolkit";

//
import { errorResponseSchema } from "@/types/Http";

type RTKError = FetchBaseQueryError | SerializedError;

type AlertProps = React.HTMLAttributes<HTMLElement> & {
  error?: RTKError;
};

const getErrorMessage = (error?: RTKError) => {
  let errorMessage = "";
  try {
    if (error && "status" in error) {
      const { message } = errorResponseSchema.parse(error.data);
      errorMessage = message;
    }
  } catch (e) {}
  return errorMessage;
};

const Alert: React.FC<AlertProps> = ({
  children,
  className,
  error,
  ...rest
}) => {
  let errorMessage = getErrorMessage(error);

  if (!errorMessage) {
    return null;
  }

  return (
    <div
      className={`bg-red-500 border border-red-700 rounded text-white p-2 ${className}`}
      {...rest}
    >
      {errorMessage}
    </div>
  );
};

export default Alert;
