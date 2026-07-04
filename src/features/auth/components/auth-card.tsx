"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AuthTabs, { type AuthMode } from "@/features/auth/components/auth-tabs";
import SignInForm from "@/features/auth/components/sign-in-form";
import SignUpForm from "@/features/auth/components/sign-up-form";

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

type AuthCardProps = {
  defaultMode?: AuthMode;
};

export default function AuthCard({ defaultMode = "signin" }: AuthCardProps) {
  const [mode, setMode] = useState<AuthMode>(defaultMode);

  return (
    <motion.div layout className="flex w-full max-w-md flex-col gap-8 overflow-hidden py-4">
      <div className="text-center">
        <h1 className="h5 font-medium text-primary-text-500" style={{ color: "var(--color-primary-text-500)" }}>
          {COPY[mode].title}
        </h1>
        <p className="body-sm-regular mt-1" style={{ color: "var(--color-subtext-500)" }}>
          {COPY[mode].subtitle}
        </p>
      </div>

      <AuthTabs mode={mode} onChange={setMode} />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={mode}
          initial={{ opacity: 0, x: mode === "signin" ? -16 : 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: mode === "signin" ? 16 : -16 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
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
