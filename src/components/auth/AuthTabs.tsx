"use client";

import { motion } from "framer-motion";

export type AuthMode = "signin" | "signup";

interface AuthTabsProps {
  mode: AuthMode;
  onChange: (mode: AuthMode) => void;
}

export default function AuthTabs({ mode, onChange }: AuthTabsProps) {
  return (
    <div className="relative grid grid-cols-2 rounded-full bg-neutral-100 p-1 text-sm font-medium">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
        className="absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-white shadow-sm"
        style={{ left: mode === "signin" ? "4px" : "calc(50% + 0px)" }}
      />

      <button
        type="button"
        onClick={() => onChange("signin")}
        className={`relative z-10 rounded-full py-2 transition-colors ${
          mode === "signin"
            ? "text-neutral-900"
            : "text-neutral-500 hover:text-neutral-700"
        }`}
      >
        Sign In
      </button>
      <button
        type="button"
        onClick={() => onChange("signup")}
        className={`relative z-10 rounded-full py-2 transition-colors ${
          mode === "signup"
            ? "text-neutral-900"
            : "text-neutral-500 hover:text-neutral-700"
        }`}
      >
        Sign Up
      </button>
    </div>
  );
}
