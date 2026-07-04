import { RotateCcw } from "lucide-react";
import { SecondaryButton } from "@/components/shared-buttons";
import {
  customerDemoLogin,
  customerSetupTestSteps,
  resetCustomerSetupProgress,
} from "@/features/crm/client-dashboard/demo-progress-storage";

type DemoSetupPanelProps = {
  onReset: () => void;
};

export function DemoSetupPanel({ onReset }: DemoSetupPanelProps) {
  const handleReset = () => {
    resetCustomerSetupProgress();
    onReset();
    window.location.href = "/";
  };

  return (
    <section className="rounded-xl border-2 border-[var(--line)] bg-[var(--white)] p-5">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--brand-navy)]">
        <RotateCcw aria-hidden="true" size={17} strokeWidth={1.9} />
        Demo Setup Testing
      </div>

      <p className="m-0 text-sm text-[var(--muted)]">
        Reset all onboarding progress to test the full customer flow from the beginning. Theme and login stay saved until you log out.
      </p>

      <div className="mt-4 rounded-lg bg-[var(--surface)] p-4">
        <strong className="body-sm-medium block primary-text">Demo login</strong>
        <p className="body-sm-regular m-0 mt-1 subtext">
          {customerDemoLogin.email} / {customerDemoLogin.password}
        </p>
        <p className="body-xsm-regular m-0 mt-2 subtext">Sign in page: {customerDemoLogin.signInPath}</p>
      </div>

      <ol className="body-sm-regular m-0 mt-4 grid list-decimal gap-2 pl-5 subtext">
        {customerSetupTestSteps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <SecondaryButton className="mt-4 px-4" onClick={handleReset} type="button">
        Reset Setup Progress
      </SecondaryButton>
    </section>
  );
}
