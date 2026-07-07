import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { AuthField, AuthLayout } from "@/components/auth/auth-layout";

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      eyebrow="Secure reset"
      title="Create a new password"
      description="Use a strong password with at least 8 characters, including numbers and symbols."
    >
      <form className="grid gap-3">
        <AuthField label="New password" placeholder="Enter new password" type="password" />
        <AuthField label="Confirm password" placeholder="Confirm new password" type="password" />
        <Link className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[var(--brand-navy)] px-4 py-2 text-sm font-semibold text-[var(--white)] no-underline hover:bg-[var(--black)]" href="/auth/signin">
          Save new password
          <CheckCircle2 aria-hidden="true" size={16} strokeWidth={1.9} />
        </Link>
      </form>
    </AuthLayout>
  );
}
