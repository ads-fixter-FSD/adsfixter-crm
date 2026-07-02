"use client";

import { useState } from "react";
import TextField from "@/components/ui/TextField";
import PasswordField from "@/components/ui/PasswordField";
import PrimaryButton from "@/components/ui/PrimaryButton";

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire up to auth endpoint
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
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

        <label className="flex items-start gap-2 text-sm text-neutral-600">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-orange-600 focus:ring-orange-500"
          />
          <span>
            I agree to the{" "}
            <a href="#" className="font-medium text-orange-600 hover:text-orange-700">
              Terms of service
            </a>{" "}
            and{" "}
            <a href="#" className="font-medium text-orange-600 hover:text-orange-700">
              Privacy Policy
            </a>
          </span>
        </label>

        <PrimaryButton type="submit">Create Account</PrimaryButton>
      </form>

      <p className="text-center text-sm text-neutral-500">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignIn}
          className="font-medium text-orange-600 hover:text-orange-700"
        >
          Sign In
        </button>
      </p>
    </div>
  );
}
