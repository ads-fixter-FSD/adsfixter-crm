"use client";

import { useState } from "react";
import TextField from "@/components/ui/TextField";
import PasswordField from "@/components/ui/PasswordField";
import PrimaryButton from "@/components/ui/PrimaryButton";
import GoogleButton from "@/components/auth/GoogleButton";

interface SignInFormProps {
  onSwitchToSignUp: () => void;
}

export default function SignInForm({ onSwitchToSignUp }: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire up to auth endpoint
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">
          Sign in to your Account
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Enter your credential to access your dashboard
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          id="email"
          label="Email address"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={setEmail}
          autoComplete="email"
        />

        <PasswordField
          id="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={setPassword}
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-neutral-600">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-neutral-300 text-orange-600 focus:ring-orange-500"
            />
            Remember me
          </label>
          <a href="#" className="font-medium text-orange-600 hover:text-orange-700">
            Forgot password?
          </a>
        </div>

        <PrimaryButton type="submit">Sign In</PrimaryButton>
      </form>

      <div className="flex items-center gap-3 text-xs text-neutral-400">
        <div className="h-px flex-1 bg-neutral-200" />
        Or continue with
        <div className="h-px flex-1 bg-neutral-200" />
      </div>

      <GoogleButton />

      <p className="text-center text-sm text-neutral-500">
        Dont have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignUp}
          className="font-medium text-orange-600 hover:text-orange-700"
        >
          Create Account
        </button>
      </p>
    </div>
  );
}
