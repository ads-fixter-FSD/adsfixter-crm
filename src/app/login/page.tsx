"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { demoCredentials } from "@/features/auth/data/demo-credentials";

export default function LoginPage() {
  const router = useRouter();
  const [selectedCredential, setSelectedCredential] = useState<(typeof demoCredentials)[number]>(demoCredentials[0]);

  const handleLogin = () => {
    window.localStorage.setItem("adsfixter-role", selectedCredential.role);
    router.push("/");
  };

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Login to your CRM workspace"
      description="Use any demo credential below to preview the role-based dashboard. This frontend demo redirects directly to the dashboard."
    >
      <form className="grid gap-3">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-[var(--brand-navy)]">Email address</span>
          <input className="min-h-9 w-full rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm text-[var(--brand-navy)] outline-none focus:border-[var(--brand-navy)]" readOnly value={selectedCredential.email} type="email" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-[var(--brand-navy)]">Password</span>
          <input className="min-h-9 w-full rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm text-[var(--brand-navy)] outline-none focus:border-[var(--brand-navy)]" readOnly value={selectedCredential.password} type="text" />
        </label>

        <div className="flex items-center justify-between gap-3 text-sm">
          <label className="flex items-center gap-2 text-[var(--muted)]">
            <input defaultChecked type="checkbox" />
            Remember me
          </label>
          <Link className="font-semibold text-[var(--brand-navy)] no-underline" href="/forgot-password">Forgot password?</Link>
        </div>

        <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[var(--brand-navy)] px-4 py-2 text-sm font-semibold text-[var(--white)] no-underline hover:bg-[var(--black)]" onClick={handleLogin} type="button">
          Login and open dashboard
          <ArrowRight aria-hidden="true" size={16} strokeWidth={1.9} />
        </button>
      </form>

      <div className="grid gap-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3">
        <div className="grid gap-1">
          <strong className="text-sm font-semibold text-[var(--brand-navy)]">Demo credentials</strong>
          <span className="text-sm text-[var(--muted)]">Use any credential below, then click login.</span>
        </div>
        {demoCredentials.map((credential) => (
          <button
            className={`grid gap-1 rounded-lg border p-3 text-left hover:border-[var(--brand-navy)] ${
              selectedCredential.role === credential.role ? "border-[var(--brand-navy)] bg-[var(--brand-navy)] text-[var(--white)]" : "border-[var(--line)] bg-[var(--white)] text-[var(--brand-navy)]"
            }`}
            key={credential.email}
            onClick={() => setSelectedCredential(credential)}
            type="button"
          >
            <strong className="text-sm font-semibold">{credential.role}</strong>
            <span className={selectedCredential.role === credential.role ? "text-sm text-[var(--white)]" : "text-sm text-[var(--muted)]"}>{credential.email}</span>
            <code className={selectedCredential.role === credential.role ? "font-sans text-xs text-[var(--white)]" : "font-sans text-xs text-[var(--muted)]"}>{credential.password}</code>
          </button>
        ))}
      </div>

      <p className="m-0 text-center text-sm text-[var(--muted)]">
        New client? <Link className="font-semibold text-[var(--brand-navy)] no-underline" href="/register">Create customer account</Link>
      </p>
    </AuthLayout>
  );
}
