import Link from "next/link";
import { ArrowRight, KeyRound, QrCode } from "lucide-react";
import { AuthField, AuthLayout } from "@/components/auth/auth-layout";

export default function TwoFactorSetupPage() {
  return (
    <AuthLayout
      eyebrow="Two factor authentication"
      title="Setup authenticator app"
      description="Scan the QR code using Google Authenticator, Microsoft Authenticator, Authy, or 1Password."
    >
      <div className="grid grid-cols-2 gap-3 max-[720px]:grid-cols-1">
        <div className="grid min-h-36 place-content-center rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 text-center text-[var(--brand-navy)]">
          <QrCode aria-hidden="true" size={74} strokeWidth={1.4} />
        </div>
        <div className="grid min-h-36 place-content-center rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 text-center text-[var(--brand-navy)]">
          <KeyRound aria-hidden="true" size={17} strokeWidth={1.8} />
          <span className="text-sm text-[var(--muted)]">Manual setup key</span>
          <strong className="text-base font-semibold text-[var(--brand-orange)]">ADSFIXTER-CRM-2026</strong>
        </div>
      </div>

      <form className="grid gap-3">
        <AuthField label="6-digit OTP" placeholder="123456" />
        <Link className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[var(--brand-navy)] px-4 py-2 text-sm font-semibold text-[var(--white)] no-underline hover:bg-[var(--black)]" href="/two-factor/verify">
          Verify setup
          <ArrowRight aria-hidden="true" size={16} strokeWidth={1.9} />
        </Link>
      </form>
    </AuthLayout>
  );
}
