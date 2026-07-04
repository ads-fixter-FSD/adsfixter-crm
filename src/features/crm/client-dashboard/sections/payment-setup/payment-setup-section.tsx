"use client";

import { useEffect, useState } from "react";
import { PrimaryButton, SecondaryButton } from "@/components/shared-buttons";
import { PrimaryCurrencySection } from "@/features/crm/client-dashboard/sections/payment-setup/components/primary-currency-section";
import { PaymentMethodsSection } from "@/features/crm/client-dashboard/sections/payment-setup/components/payment-methods-section";
import { SupportedBanksSection } from "@/features/crm/client-dashboard/sections/payment-setup/components/supported-banks-section";
import {
  getPaymentSetupData,
  savePaymentSetup,
} from "@/features/crm/client-dashboard/sections/payment-setup/payment-setup-storage";
import type { ToastType } from "@/features/crm/types/crm";

type PaymentSetupSectionProps = {
  onCancel: () => void;
  onSaved: () => void;
  showToast: (type: ToastType, message: string) => void;
};

export function PaymentSetupSection({ onCancel, onSaved, showToast }: PaymentSetupSectionProps) {
  const [currency, setCurrency] = useState("BDT");
  const [paymentMethods, setPaymentMethods] = useState<string[]>(["bank-transfer", "bkash"]);
  const [selectedBanks, setSelectedBanks] = useState<string[]>([]);

  useEffect(() => {
    const saved = getPaymentSetupData();

    if (saved) {
      setCurrency(saved.currency);
      setPaymentMethods(saved.paymentMethods);
      setSelectedBanks(saved.selectedBanks);
    }
  }, []);

  const hasBankTransfer = paymentMethods.includes("bank-transfer");

  const togglePaymentMethod = (methodId: string) => {
    setPaymentMethods((current) => {
      if (current.includes(methodId)) {
        const next = current.filter((item) => item !== methodId);

        if (methodId === "bank-transfer") {
          setSelectedBanks([]);
        }

        return next;
      }

      return [...current, methodId];
    });
  };

  const handleSave = () => {
    if (paymentMethods.length === 0) {
      showToast("warning", "Please select at least one payment method");
      return;
    }

    if (hasBankTransfer && selectedBanks.length === 0) {
      showToast("warning", "Please select at least one supported bank");
      return;
    }

    savePaymentSetup({
      currency,
      paymentMethods,
      selectedBanks: hasBankTransfer ? selectedBanks : [],
    });

    showToast("success", "Payment setup saved successfully");
    onSaved();
  };

  return (
    <section className="grid gap-6">
      <div>
        <h1 className="h4 m-0 primary-text">Payment Setup</h1>
        <p className="body-regular m-0 mt-1 subtext">Please select your preferred payment method(s) and choose your primary currency.</p>
      </div>

      <div className="grid gap-8 rounded-xl border border-[var(--line)] bg-[var(--white)] p-5 max-[720px]:p-4">
        <PrimaryCurrencySection currency={currency} onChange={setCurrency} />
        <PaymentMethodsSection onToggle={togglePaymentMethod} selectedMethods={paymentMethods} />
        {hasBankTransfer ? <SupportedBanksSection onChange={setSelectedBanks} selectedBanks={selectedBanks} /> : null}

        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[var(--line)] pt-6">
          <SecondaryButton className="min-h-10 px-6" onClick={onCancel} type="button">
            Cancel
          </SecondaryButton>
          <PrimaryButton className="min-h-10 px-6" onClick={handleSave} type="button">
            Save &amp; Continue
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}

export { PaymentSetupSection as ClientPaymentSetupSection };
