import type { ReactNode } from "react";
import { AuthBrandLink } from "@/features/auth/components/auth-brand-link";
import { AuthCopy } from "@/features/auth/components/auth-copy";

type AuthLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function AuthLayout({ eyebrow, title, description, children }: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <section className="flex w-full max-w-[430px] flex-col gap-5 rounded-2xl border border-[var(--line)] bg-[var(--white)] p-5">
        <AuthBrandLink />
        <AuthCopy description={description} eyebrow={eyebrow} title={title} />
        {children}
      </section>
    </main>
  );
}

export { AuthDivider } from "@/features/auth/components/auth-divider";
export { AuthField } from "@/features/auth/components/auth-field";
