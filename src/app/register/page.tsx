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
      <form className="auth-form">
        <div className="auth-two-column">
          <AuthField label="Full name" placeholder="Your name" />
          <AuthField label="Phone" placeholder="+8801..." />
        </div>
        <AuthField label="Email address" placeholder="you@company.com" type="email" />
        <AuthField label="Business name" placeholder="Your business name" />
        <AuthField label="Password" placeholder="Create password" type="password" />
        <Link className="auth-submit" href="/login">
          Submit registration
          <ArrowRight aria-hidden="true" size={16} strokeWidth={1.9} />
        </Link>
      </form>

      <p className="auth-footer-copy">
        Already approved? <Link href="/login">Login here</Link>
      </p>
    </AuthLayout>
  );
}
