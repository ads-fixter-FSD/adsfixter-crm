
"use client";

import { Pencil } from "lucide-react";
import Image from "next/image";
import {
  getPaymentSetupData,
  paymentCurrencyOptions,
  paymentMethodOptions,
} from "@/features/crm/client-dashboard/sections/payment-setup/payment-setup-storage";
import { isPaymentSetupSubmitted } from "@/features/crm/client-dashboard/sections/home/customer-onboarding-storage";

const paymentMethodLogoMap: Record<string, string> = {
  "bank-transfer": "/images/bank.png",
  bkash: "/images/bkash.png",
  nagad: "/images/nagad.png",
  paypal: "/images/paypal.png",
  card: "/images/credit.png",
  stripe: "/images/stripe.png",
};

type CustomerPaymentSetupSummaryProps = {
  onEdit: () => void;
};

export function CustomerPaymentSetupSummary({
  onEdit,
}: CustomerPaymentSetupSummaryProps) {
  if (!isPaymentSetupSubmitted()) {
    return null;
  }

  const paymentData = getPaymentSetupData();

  if (!paymentData) {
    return null;
  }

  const currency =
    paymentCurrencyOptions.find(
      (option) => option.value === paymentData.currency,
    ) ?? paymentCurrencyOptions[0];
  const selectedMethods = paymentMethodOptions.filter((method) =>
    paymentData.paymentMethods.includes(method.id),
  );

  return (
    <section className="rounded-[12px] border border-[var(--line)] bg-[var(--white)]">
      <div className="p-5 max-[720px]:p-4">
        <h2 className="h6-medium m-0 primary-text">Payment Setup</h2>
      </div>

      <hr className="border-0 border-t border-[var(--line)]" />

      <div className="grid gap-4 p-5 max-[720px]:p-4 md:grid-cols-2">
        <article className="rounded-lg border border-[var(--line)] bg-[var(--white)] p-4">
          <p className="body-sm-medium m-0 primary-text">Primary Currency</p>
          <div className="mt-3 flex items-center gap-2">
            <span aria-hidden="true" className="text-base leading-none">
              {currency.flag}
            </span>
            <span className="body-sm-regular primary-text">
              {currency.label}
            </span>
          </div>
        </article>

        <article className="flex items-center justify-between gap-3 rounded-lg border border-[var(--line)] bg-[var(--white)] p-4">
          <div>
            <p className="body-sm-medium m-0 primary-text">Payment Method</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {selectedMethods.map((method) => {
                const logoSrc = paymentMethodLogoMap[method.id];

                return logoSrc ? (
                  <span
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full"
                    key={method.id}
                    title={method.label}
                  >
                    <Image
                      alt={method.label}
                      className="h-full w-full object-cover"
                      height={32}
                      src={logoSrc}
                      width={32}
                    />
                  </span>
                ) : null;
              })}
            </div>
          </div>

          <button
            className="body-sm-medium inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[var(--line)] px-3 py-2 text-[var(--brand-navy)] transition hover:bg-[var(--surface)]"
            onClick={onEdit}
            type="button"
          >
            Edit
          </button>
        </article>
      </div>
    </section>
  );
}
