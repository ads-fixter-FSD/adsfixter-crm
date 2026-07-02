import { ButtonHTMLAttributes } from "react";

export default function PrimaryButton({
  children,
  className = "",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={`w-full rounded-xl bg-orange-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700 active:bg-orange-800 ${className}`}
    >
      {children}
    </button>
  );
}
