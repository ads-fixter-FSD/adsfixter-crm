"use client";

import { useState } from "react";
import { PaymentBalanceBanner } from "@/features/crm/client-dashboard/sections/payments/new-payment/components/payment-balance-banner";
import { PaymentDetailsStep } from "@/features/crm/client-dashboard/sections/payments/new-payment/components/payment-details-step";
import { PaymentStepIndicator } from "@/features/crm/client-dashboard/sections/payments/new-payment/components/payment-step-indicator";
import { ReviewSubmitStep } from "@/features/crm/client-dashboard/sections/payments/new-payment/components/review-submit-step";
import { SelectMethodStep } from "@/features/crm/client-dashboard/sections/payments/new-payment/components/select-method-step";
import { newPaymentMethods } from "@/features/crm/client-dashboard/sections/payments/new-payment/payment-methods.data";
import type { ToastType } from "@/features/crm/types/crm";

type NewPaymentSectionProps = {
  showToast: (type: ToastType, message: string) => void;
};

export function NewPaymentSection({ showToast }: NewPaymentSectionProps) {
  const [step, setStep] = useState(1);
  const [selectedMethodId, setSelectedMethodId] = useState<string>(newPaymentMethods[0].id);
  const [amount, setAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentProof, setPaymentProof] = useState("");

  const selectedMethod = newPaymentMethods.find((method) => method.id === selectedMethodId) ?? newPaymentMethods[0];

  const handleSelectMethod = (methodId: string) => {
    setSelectedMethodId(methodId);
    setStep(2);
  };

  const handleContinueToReview = () => {
    if (!amount.trim() || !transactionId.trim()) {
      showToast("warning", "Amount and transaction ID are required");
      return;
    }

    setStep(3);
  };

  const handleSubmit = () => {
    showToast("success", "Payment submitted for approval");
    setStep(1);
    setAmount("");
    setTransactionId("");
    setPaymentProof("");
  };

  return (
    <section className="grid gap-5">
      <div>
        <h2 className="m-0 text-xl font-semibold text-[var(--brand-navy)]">Make Payments</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">This balance can be used across all your ad accounts.</p>
      </div>

      <PaymentStepIndicator currentStep={step} />
      <PaymentBalanceBanner />

      {step === 1 ? (
        <SelectMethodStep methods={newPaymentMethods} onSelect={handleSelectMethod} selectedMethodId={selectedMethodId} />
      ) : null}

      {step === 2 ? (
        <PaymentDetailsStep
          amount={amount}
          onAmountChange={setAmount}
          onContinue={handleContinueToReview}
          onPaymentProofChange={setPaymentProof}
          onTransactionIdChange={setTransactionId}
          paymentProof={paymentProof}
          selectedMethod={selectedMethod}
          transactionId={transactionId}
        />
      ) : null}

      {step === 3 ? (
        <ReviewSubmitStep
          amount={amount}
          onSubmit={handleSubmit}
          paymentProof={paymentProof}
          selectedMethod={selectedMethod}
          transactionId={transactionId}
        />
      ) : null}
    </section>
  );
}

export { NewPaymentSection as ClientNewPaymentSection };
