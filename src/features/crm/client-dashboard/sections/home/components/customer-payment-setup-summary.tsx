"use client";

import { CreditCard, Landmark, Pencil } from "lucide-react";
import { getPaymentSetupData, paymentCurrencyOptions, paymentMethodOptions } from "@/features/crm/client-dashboard/sections/payment-setup/payment-setup-storage";
import { isPaymentSetupSubmitted } from "@/features/crm/client-dashboard/sections/home/customer-onboarding-storage";

type CustomerPaymentSetupSummaryProps = {
  onEdit: () => void;
};

export function CustomerPaymentSetupSummary({ onEdit }: CustomerPaymentSetupSummaryProps) {
  if (!isPaymentSetupSubmitted()) {
    return null;
  }

  const paymentData = getPaymentSetupData();

  if (!paymentData) {
    return null;
  }

  const currency =
    paymentCurrencyOptions.find((option) => option.value === paymentData.currency) ?? paymentCurrencyOptions[0];
  const selectedMethods = paymentMethodOptions.filter((method) => paymentData.paymentMethods.includes(method.id));

  return (
    <section className="rounded-xl border border-[var(--line)] bg-[var(--white)] p-5 max-[1180px]:p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="h6-medium m-0 primary-text">Payment Setup</h2>
        <button
          className="body-sm-medium inline-flex items-center gap-1.5 rounded-lg border border-[var(--line)] px-3 py-2 text-[var(--brand-navy)] transition hover:bg-[var(--surface)]"
          onClick={onEdit}
          type="button"
        >
          <Pencil aria-hidden="true" size={14} strokeWidth={1.8} />
          Edit
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
          <p className="body-xsm-regular m-0 subtext">Primary Currency</p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2">
            <span aria-hidden="true">{currency.flag}</span>
            <strong className="body-sm-medium primary-text">{currency.label}</strong>
          </div>
        </article>

        <article className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
          <p className="body-xsm-regular m-0 subtext">Payment Method</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedMethods.map((method) => (
              <span
                className="body-sm-regular inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 primary-text"
                key={method.id}
              >
                {method.id === "bank-transfer" ? <Landmark aria-hidden="true" size={16} /> : <CreditCard aria-hidden="true" size={16} />}
                {method.label}
              </span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
