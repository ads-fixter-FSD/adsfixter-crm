import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { AuthField, AuthLayout } from "@/features/auth/components/auth-layout";

export default function TwoFactorVerifyPage() {
  return (
    <AuthLayout
      eyebrow="OTP verification"
      title="Verify your sign in"
      description="Enter the 6-digit code from your authenticator app to continue to the CRM dashboard."
    >
      <form className="auth-form">
        <AuthField label="Authenticator code" placeholder="000000" />
        <Link className="auth-submit" href="/">
          Verify and open dashboard
          <ShieldCheck aria-hidden="true" size={16} strokeWidth={1.9} />
        </Link>
      </form>

      <p className="auth-footer-copy">
        Need to setup 2FA? <Link href="/two-factor/setup">Setup authenticator</Link>
      </p>
    </AuthLayout>
  );
}
