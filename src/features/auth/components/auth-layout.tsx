import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

type AuthLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function AuthLayout({ eyebrow, title, description, children }: AuthLayoutProps) {
  return (
    <main className="auth-shell">
      <section className="auth-card">
        <div className="auth-brand">
          <Link className="auth-brand-link" href="/">
            <Image alt="AdsFixter" className="brand-logo" height={28} src="/adsfixter-logo.png" width={28} />
            <span>
              <strong>AdsFixter</strong>
              <small>Meta Wallet CRM</small>
            </span>
          </Link>
        </div>

        <div className="auth-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <span>{description}</span>
        </div>

        {children}
      </section>
    </main>
  );
}

type AuthFieldProps = {
  label: string;
  placeholder: string;
  type?: string;
  defaultValue?: string;
};

export function AuthField({ label, placeholder, type = "text", defaultValue }: AuthFieldProps) {
  return (
    <label className="auth-field">
      <span>{label}</span>
      <input defaultValue={defaultValue} placeholder={placeholder} type={type} />
    </label>
  );
}

export function AuthDivider() {
  return (
    <div className="auth-divider">
      <span />
      <p>or</p>
      <span />
    </div>
  );
}
