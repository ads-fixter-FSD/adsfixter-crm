import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { AuthField, AuthLayout } from "@/components/auth/auth-layout";

export default function TwoFactorVerifyPage() {
  return (
    <AuthLayout
      eyebrow="OTP verification"
      title="Verify your sign in"
      description="Enter the 6-digit code from your authenticator app to continue to the CRM dashboard."
    >
      <form className="grid gap-3">
        <AuthField label="Authenticator code" placeholder="000000" />
        <Link className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[var(--brand-navy)] px-4 py-2 text-sm font-semibold text-[var(--white)] no-underline hover:bg-[var(--black)]" href="/">
          Verify and open dashboard
          <ShieldCheck aria-hidden="true" size={16} strokeWidth={1.9} />
        </Link>
      </form>

      <p className="m-0 text-center text-sm text-[var(--muted)]">
        Need to setup 2FA? <Link className="font-semibold text-[var(--brand-navy)] no-underline" href="/two-factor/setup">Setup authenticator</Link>
      </p>
    </AuthLayout>
  );
}
