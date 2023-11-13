"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

// app/add-product/page.tsx

type FormSubmitBtnProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

export default function FormSubmitBtn({
  children,
  className,
  ...props
}: FormSubmitBtnProps) {
  const pending: boolean = false;
  // const { pending } = useFormStatus();

  return (
    <button
      {...props}
      type="submit"
      className={` btn btn-primary ${className}`}
      disabled={pending}
    >
      {pending && <span className=" loading loading-spinner " />}
      {children}
    </button>
  );
}
