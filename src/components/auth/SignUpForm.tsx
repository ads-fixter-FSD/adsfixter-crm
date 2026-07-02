"use client";

import { useState } from "react";
import TextField from "@/components/ui/TextField";
import PasswordField from "@/components/ui/PasswordField";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { setAuthSession } from "@/features/auth/auth-session";
import { useRouter } from "next/navigation";

interface SignUpFormProps {
  onSwitchToSignIn: () => void;
}

export default function SignUpForm({ onSwitchToSignIn }: SignUpFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!agreed) {
      return;
    }

    if (password !== confirmPassword) {
      return;
    }

    setAuthSession({
      email: email.trim(),
      role: "Customer",
      name: fullName.trim(),
    });
    router.push("/");

    // TODO: wire up to auth endpoint
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1
          className="h6-semibold"
          style={{ color: "var(--color-primary-text-500)" }}
        >
          Create your account
        </h1>
        <p
          className="body-sm-regular mt-1"
          style={{ color: "var(--color-subtext-500)" }}
        >
          Fill the details below to get started
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          id="fullName"
          label="Enter your full name"
          placeholder="Enter your full name"
          value={fullName}
          onChange={setFullName}
          autoComplete="name"
        />

        <TextField
          id="email"
          label="Email address"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={setEmail}
          autoComplete="email"
        />

        <TextField
          id="phone"
          label="Phone Number"
          type="tel"
          placeholder="Enter your phone number"
          value={phone}
          onChange={setPhone}
          autoComplete="tel"
        />

        <PasswordField
          id="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
        />

        <PasswordField
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm you password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          autoComplete="new-password"
        />

        <label
          className="body-sm-regular flex items-start gap-2"
          style={{ color: "var(--color-subtext-500)" }}
        >
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded"
            style={{ accentColor: "var(--color-primary)" }}
          />
          <span>
            I agree to the{" "}
            <a
              href="#"
              className="body-sm-medium"
              style={{ color: "var(--color-primary)" }}
            >
              Terms of service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="body-sm-medium"
              style={{ color: "var(--color-primary)" }}
            >
              Privacy Policy
            </a>
          </span>
        </label>

        <PrimaryButton type="submit">Create Account</PrimaryButton>
      </form>

      <p
        className="body-sm-regular text-center"
        style={{ color: "var(--color-subtext-500)" }}
      >
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignIn}
          className="body-sm-medium"
          style={{ color: "var(--color-primary)" }}
        >
          Sign In
        </button>
      </p>
    </div>
  );
}
