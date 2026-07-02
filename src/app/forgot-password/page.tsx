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
      <form className="grid gap-3">
        <AuthField label="Email address" placeholder="you@company.com" type="email" />
        <Link className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[var(--brand-navy)] px-4 py-2 text-sm font-semibold text-[var(--white)] no-underline hover:bg-[var(--black)]" href="/reset-password">
          Continue to reset
          <ArrowRight aria-hidden="true" size={16} strokeWidth={1.9} />
        </Link>
      </form>

      <p className="m-0 text-center text-sm text-[var(--muted)]">
        Remembered password? <Link className="font-semibold text-[var(--brand-navy)] no-underline" href="/auth/signin">Back to login</Link>
      </p>
    </AuthLayout>
  );
}
