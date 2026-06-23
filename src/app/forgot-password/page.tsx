import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AuthField, AuthLayout } from "@/features/auth/components/auth-layout";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      eyebrow="Account recovery"
      title="Reset your password"
      description="Enter your account email. The system will send a secure reset link after validating your account status."
    >
      <form className="auth-form">
        <AuthField label="Email address" placeholder="you@company.com" type="email" />
        <Link className="auth-submit" href="/reset-password">
          Continue to reset
          <ArrowRight aria-hidden="true" size={16} strokeWidth={1.9} />
        </Link>
      </form>

      <p className="auth-footer-copy">
        Remembered password? <Link href="/login">Back to login</Link>
      </p>
    </AuthLayout>
  );
}
