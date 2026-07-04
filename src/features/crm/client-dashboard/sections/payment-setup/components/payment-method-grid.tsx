import { Check } from "lucide-react";
import { paymentMethodOptions } from "@/features/crm/client-dashboard/sections/payment-setup/payment-setup-storage";
import { PaymentMethodIcon } from "@/features/crm/client-dashboard/sections/payment-setup/components/payment-method-icon";

type PaymentMethodGridProps = {
  selectedMethods: string[];
  onToggle: (methodId: string) => void;
};

export function PaymentMethodGrid({ selectedMethods, onToggle }: PaymentMethodGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {paymentMethodOptions.map((method) => {
        const isSelected = selectedMethods.includes(method.id);

        return (
          <button
            className={`relative flex min-h-[88px] items-center gap-3 rounded-xl border-2 px-4 py-4 text-left transition ${
              isSelected
                ? "border-[var(--color-adsfixter-primary)] bg-[var(--brand-orange-soft)]"
                : "border-[var(--line)] bg-[var(--white)] hover:bg-[var(--surface)]"
            }`}
            key={method.id}
            onClick={() => onToggle(method.id)}
            type="button"
          >
            <PaymentMethodIcon methodId={method.id} />
            <strong className="body-sm-medium flex-1 primary-text">{method.label}</strong>
            <span
              className={`absolute right-3 top-3 inline-flex h-5 w-5 items-center justify-center rounded border ${
                isSelected
                  ? "border-[var(--color-adsfixter-primary)] bg-[var(--color-adsfixter-primary)] text-[var(--white)]"
                  : "border-[var(--line)] bg-[var(--white)]"
              }`}
            >
              {isSelected ? <Check aria-hidden="true" size={12} strokeWidth={2.5} /> : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}
