import { CheckCircle2 } from "lucide-react";
import { SecondaryButton } from "@/components/shared-buttons";
import type { NewPaymentMethod } from "@/features/crm/client-dashboard/sections/payments/new-payment/payment-methods.data";

type ReviewSubmitStepProps = {
  selectedMethod: NewPaymentMethod;
  amount: string;
  transactionId: string;
  paymentProof: string;
  onSubmit: () => void;
};

export function ReviewSubmitStep({ selectedMethod, amount, transactionId, paymentProof, onSubmit }: ReviewSubmitStepProps) {
  return (
    <section className="grid w-full gap-4 rounded-xl border border-[var(--line)] bg-[var(--white)] p-5">
      <h3 className="m-0 text-center text-base font-semibold text-[var(--brand-navy)]">Review & Submit</h3>
      <div className="grid gap-2 rounded-lg bg-[var(--surface)] p-4 text-sm text-[var(--brand-navy)]">
        <p className="m-0">
          <strong>Payment Method:</strong> {selectedMethod.name}
        </p>
        <p className="m-0">
          <strong>Account Number:</strong> {selectedMethod.number}
        </p>
        <p className="m-0">
          <strong>Amount:</strong> {amount || "-"} BDT
        </p>
        <p className="m-0">
          <strong>Transaction ID:</strong> {transactionId || "-"}
        </p>
        <p className="m-0">
          <strong>Payment Proof:</strong> {paymentProof || "-"}
        </p>
      </div>
      <SecondaryButton className="min-h-8 justify-self-start px-3 py-1.5 text-xs" onClick={onSubmit} type="button">
        <CheckCircle2 aria-hidden="true" size={16} strokeWidth={1.9} />
        Submit Payment
      </SecondaryButton>
    </section>
  );
}
