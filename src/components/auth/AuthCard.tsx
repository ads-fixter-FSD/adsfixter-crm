"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/auth/Logo";
import AuthTabs, { AuthMode } from "@/components/auth/AuthTabs";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";

export default function AuthCard() {
  const [mode, setMode] = useState<AuthMode>("signin");

  return (
    <motion.div
      layout
      className="flex w-full max-w-md flex-col gap-8 overflow-hidden py-4"
    >
      <Logo />
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
