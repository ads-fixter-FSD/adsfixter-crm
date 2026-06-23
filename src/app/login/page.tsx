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
      <form className="auth-form">
        <label className="auth-field">
          <span>Email address</span>
          <input readOnly value={selectedCredential.email} type="email" />
        </label>
        <label className="auth-field">
          <span>Password</span>
          <input readOnly value={selectedCredential.password} type="text" />
        </label>

        <div className="auth-row">
          <label className="auth-check">
            <input defaultChecked type="checkbox" />
            Remember me
          </label>
          <Link href="/forgot-password">Forgot password?</Link>
        </div>

        <button className="auth-submit" onClick={handleLogin} type="button">
          Login and open dashboard
          <ArrowRight aria-hidden="true" size={16} strokeWidth={1.9} />
        </button>
      </form>

      <div className="credentials-panel">
        <div className="credentials-heading">
          <strong>Demo credentials</strong>
          <span>Use any credential below, then click login.</span>
        </div>
        {demoCredentials.map((credential) => (
          <button
            className={selectedCredential.role === credential.role ? "credential-card active" : "credential-card"}
            key={credential.email}
            onClick={() => setSelectedCredential(credential)}
            type="button"
          >
            <strong>{credential.role}</strong>
            <span>{credential.email}</span>
            <code>{credential.password}</code>
          </button>
        ))}
      </div>

      <p className="auth-footer-copy">
        New client? <Link href="/register">Create customer account</Link>
      </p>
    </AuthLayout>
  );
}
