import { ChevronDown } from "lucide-react";
import { paymentCurrencyOptions } from "@/features/crm/client-dashboard/sections/payment-setup/payment-setup-storage";
import { paymentSetupSelectClassName } from "@/features/crm/client-dashboard/sections/payment-setup/components/payment-setup-form-styles";

type CurrencySelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export function CurrencySelect({ value, onChange }: CurrencySelectProps) {
  const selectedOption = paymentCurrencyOptions.find((option) => option.value === value) ?? paymentCurrencyOptions[0];

  return (
    <label className="relative block w-full">
      <span className="sr-only">Primary currency</span>
      <div className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
        <span aria-hidden="true" className="text-base leading-none">
          {selectedOption.flag}
        </span>
      </div>
      <select
        className={`${paymentSetupSelectClassName} pl-10`}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {paymentCurrencyOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
        size={16}
        strokeWidth={2}
      />
    </label>
  );
}
