"use client";

import { motion } from "framer-motion";

export type AuthMode = "signin" | "signup";

interface AuthTabsProps {
  mode: AuthMode;
  onChange: (mode: AuthMode) => void;
}

export default function AuthTabs({ mode, onChange }: AuthTabsProps) {
  return (
    <div
      className="relative grid grid-cols-2 rounded-full p-1"
      style={{ background: "var(--color-surface)" }}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
        className="absolute inset-y-1 w-[calc(50%-4px)] rounded-full shadow-sm"
        style={{ left: mode === "signin" ? "4px" : "calc(50% + 0px)", background: "var(--color-field)" }}
      />

      <button
        type="button"
        onClick={() => onChange("signin")}
        className="body-medium relative z-10 rounded-full py-2 transition-colors"
        style={{
          color: mode === "signin" ? "var(--color-primary-text-500)" : "var(--color-subtext-500)",
        }}
      >
        Sign In
      </button>
      <button
        type="button"
        onClick={() => onChange("signup")}
        className="body-medium relative z-10 rounded-full py-2 transition-colors"
        style={{
          color: mode === "signup" ? "var(--color-primary-text-500)" : "var(--color-subtext-500)",
        }}
      >
        Sign Up
      </button>
    </div>
  );
}
