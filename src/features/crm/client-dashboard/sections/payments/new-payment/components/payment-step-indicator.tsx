import { CreditCard, FileText, Upload, type LucideIcon } from "lucide-react";

const paymentSteps = [
  { id: 1, label: "Select Method", helper: "Choose where you will send the payment.", icon: CreditCard },
  { id: 2, label: "Payment Details", helper: "Enter amount, transaction ID, and proof.", icon: Upload },
  { id: 3, label: "Review & Submit", helper: "Check everything and submit for approval.", icon: FileText },
] as const;

type PaymentStepIndicatorProps = {
  currentStep: number;
};

export function PaymentStepIndicator({ currentStep }: PaymentStepIndicatorProps) {
  return (
    <div className="mx-auto grid w-full max-w-4xl grid-cols-3 gap-3 rounded-xl border-2 border-[var(--line)] bg-[var(--white)] p-4 text-center max-[720px]:grid-cols-1">
      {paymentSteps.map((item) => {
        const Icon = item.icon as LucideIcon;

        return (
          <div
            className={`rounded-lg border px-3 py-2 ${currentStep === item.id ? "border-[var(--brand-navy)] bg-[var(--surface)]" : "border-[var(--line)] bg-[var(--white)]"}`}
            key={item.id}
          >
            <div className="flex items-center justify-center gap-2 text-sm font-semibold text-[var(--brand-navy)]">
              <Icon aria-hidden="true" size={15} strokeWidth={1.9} />
              Step {item.id}: {item.label}
            </div>
            <p className="mt-1 mb-0 text-xs leading-5 text-[var(--muted)]">{item.helper}</p>
          </div>
        );
      })}
    </div>
  );
}
