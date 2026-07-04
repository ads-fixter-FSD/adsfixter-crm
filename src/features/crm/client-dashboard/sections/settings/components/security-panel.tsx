import { Lock } from "lucide-react";
import { SecondaryButton } from "@/components/shared-buttons";

type SecurityPanelProps = {
  onChangePassword: () => void;
};

export function SecurityPanel({ onChangePassword }: SecurityPanelProps) {
  return (
    <section className="rounded-xl border-2 border-[var(--line)] bg-[var(--white)] p-5">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--brand-navy)]">
        <Lock aria-hidden="true" size={17} strokeWidth={1.9} />
        Security
      </div>
      <p className="m-0 text-sm text-[var(--muted)]">Keep your account safe by updating your password regularly.</p>
      <SecondaryButton className="mt-4 px-4" onClick={onChangePassword} type="button">
        Change Password
      </SecondaryButton>
    </section>
  );
}
