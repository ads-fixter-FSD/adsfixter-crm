import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { AuthField, AuthLayout } from "@/features/auth/components/auth-layout";

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      eyebrow="Secure reset"
      title="Create a new password"
      description="Use a strong password. Super Admin and Maintainer accounts should complete 2FA verification after password reset."
    >
      <form className="auth-form">
        <AuthField label="New password" placeholder="Enter new password" type="password" />
        <AuthField label="Confirm password" placeholder="Confirm new password" type="password" />
        <Link className="auth-submit" href="/login">
          Save new password
          <CheckCircle2 aria-hidden="true" size={16} strokeWidth={1.9} />
        </Link>
      </form>
    </AuthLayout>
  );
}
