import Link from "next/link";
import { ArrowRight, KeyRound, QrCode } from "lucide-react";
import { AuthField, AuthLayout } from "@/features/auth/components/auth-layout";

export default function TwoFactorSetupPage() {
  return (
    <AuthLayout
      eyebrow="Two factor authentication"
      title="Setup authenticator app"
      description="Scan the QR code using Google Authenticator, Microsoft Authenticator, Authy, or 1Password."
    >
      <div className="two-factor-layout">
        <div className="qr-box">
          <QrCode aria-hidden="true" size={74} strokeWidth={1.4} />
        </div>
        <div className="secret-box">
          <KeyRound aria-hidden="true" size={17} strokeWidth={1.8} />
          <span>Manual setup key</span>
          <strong>ADSFIXTER-CRM-2026</strong>
        </div>
      </div>

      <form className="auth-form">
        <AuthField label="6-digit OTP" placeholder="123456" />
        <Link className="auth-submit" href="/two-factor/verify">
          Verify setup
          <ArrowRight aria-hidden="true" size={16} strokeWidth={1.9} />
        </Link>
      </form>
    </AuthLayout>
  );
}
