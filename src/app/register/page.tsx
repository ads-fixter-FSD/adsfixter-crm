import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AuthField, AuthLayout } from "@/features/auth/components/auth-layout";

export default function RegisterPage() {
  return (
    <AuthLayout
      eyebrow="Customer registration"
      title="Create a customer account"
      description="Submit profile information for admin approval before accessing wallet and Meta ad account requests."
    >
      <form className="grid gap-3">
        <div className="grid grid-cols-2 gap-3 max-[720px]:grid-cols-1">
          <AuthField label="Full name" placeholder="Your name" />
          <AuthField label="Phone" placeholder="+8801..." />
        </div>
        <AuthField label="Email address" placeholder="you@company.com" type="email" />
        <AuthField label="Business name" placeholder="Your business name" />
        <AuthField label="Password" placeholder="Create password" type="password" />
        <Link className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[var(--brand-navy)] px-4 py-2 text-sm font-semibold text-[var(--white)] no-underline hover:bg-[var(--black)]" href="/login">
          Submit registration
          <ArrowRight aria-hidden="true" size={16} strokeWidth={1.9} />
        </Link>
      </form>

      <p className="m-0 text-center text-sm text-[var(--muted)]">
        Already approved? <Link className="font-semibold text-[var(--brand-navy)] no-underline" href="/login">Login here</Link>
      </p>
    </AuthLayout>
  );
}
