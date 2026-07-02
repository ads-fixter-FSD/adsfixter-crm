"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AuthTabs, { AuthMode } from "@/components/auth/AuthTabs";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";

const COPY: Record<AuthMode, { title: string; subtitle: string }> = {
  signin: {
    title: "Sign in to your Account",
    subtitle: "Enter your credential to access your dashboard",
  },
  signup: {
    title: "Create your account",
    subtitle: "Fill the details below to get started",
  },
};

export default function AuthCard() {
  const [mode, setMode] = useState<AuthMode>("signin");

  return (
    <motion.div
      layout
      className="flex w-full max-w-md flex-col gap-8 overflow-hidden py-4"
    >
      <div className="text-center">
        <h1
          className="h5 font-medium text-primary-text-500"
          style={{ color: "var(--color-primary-text-500)" }}
        >
          {COPY[mode].title}
        </h1>
        <p
          className="body-sm-regular mt-1"
          style={{ color: "var(--color-subtext-500)" }}
        >
          {COPY[mode].subtitle}
        </p>
      </div>

      <AuthTabs mode={mode} onChange={setMode} />

      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={mode}
          layout
          initial={{ opacity: 0, x: mode === "signin" ? -16 : 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: mode === "signin" ? 16 : -16 }}
          transition={{
            layout: { duration: 0.35, ease: "easeInOut" },
            opacity: { duration: 0.2 },
            x: { duration: 0.22, ease: "easeInOut" },
          }}
        >
          {mode === "signin" ? (
            <SignInForm onSwitchToSignUp={() => setMode("signup")} />
          ) : (
            <SignUpForm onSwitchToSignIn={() => setMode("signin")} />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
