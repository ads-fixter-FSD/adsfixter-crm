"use client";

import { useState } from "react";
import TextField from "@/components/ui/TextField";
import PasswordField from "@/components/ui/PasswordField";
import PrimaryButton from "@/components/ui/PrimaryButton";
import GoogleButton from "@/features/auth/components/google-button";
import { demoCredentials } from "@/features/auth/data/demo-credentials";
import { setAuthSession } from "@/features/auth/auth-session";
import { useRouter } from "next/navigation";

interface SignInFormProps {
  onSwitchToSignUp: () => void;
}

export default function SignInForm({ onSwitchToSignUp }: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const matchedCredential = demoCredentials.find((credential) => credential.email === email.trim() && credential.password === password);

    if (matchedCredential) {
      setAuthSession({
        email: matchedCredential.email,
        role: matchedCredential.role,
      });
      router.push("/");
      return;
    }

    setAuthSession({
      email: email.trim(),
      role: "Customer",
    });
    router.push("/");
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="h6-semibold" style={{ color: "var(--color-primary-text-500)" }}>
          Sign in to your Account
        </h1>
        <p className="body-sm-regular mt-1" style={{ color: "var(--color-subtext-500)" }}>
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

        <div className="flex items-center justify-between">
          <label
            className="body-sm-regular flex items-center gap-2"
            style={{ color: "var(--color-subtext-500)" }}
          >
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded"
              style={{ accentColor: "var(--color-primary)" }}
            />
            Remember me
          </label>
          <a
            href="#"
            className="body-sm-medium"
            style={{ color: "var(--color-primary)" }}
          >
            Forgot password?
          </a>
        </div>

        <PrimaryButton type="submit">Sign In</PrimaryButton>
      </form>

      <div className="flex items-center gap-3" style={{ color: "var(--color-subtext-400)" }}>
        <div className="h-px flex-1" style={{ background: "var(--color-line)" }} />
        <span className="body-xsm-regular">Or continue with</span>
        <div className="h-px flex-1" style={{ background: "var(--color-line)" }} />
      </div>

      <GoogleButton />

      <p className="body-sm-regular text-center" style={{ color: "var(--color-subtext-500)" }}>
        Dont have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignUp}
          className="body-sm-medium"
          style={{ color: "var(--color-primary)" }}
        >
          Create Account
        </button>
      </p>
    </div>
  );
}
