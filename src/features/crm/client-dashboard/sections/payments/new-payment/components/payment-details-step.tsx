import { PrimaryButton } from "@/components/shared-buttons";
import type { NewPaymentMethod } from "@/features/crm/client-dashboard/sections/payments/new-payment/payment-methods.data";

type PaymentDetailsStepProps = {
  selectedMethod: NewPaymentMethod;
  amount: string;
  transactionId: string;
  paymentProof: string;
  onAmountChange: (value: string) => void;
  onTransactionIdChange: (value: string) => void;
  onPaymentProofChange: (value: string) => void;
  onContinue: () => void;
};

export function PaymentDetailsStep({
  selectedMethod,
  amount,
  transactionId,
  paymentProof,
  onAmountChange,
  onTransactionIdChange,
  onPaymentProofChange,
  onContinue,
}: PaymentDetailsStepProps) {
  return (
    <section className="grid w-full gap-4 rounded-xl border border-[var(--line)] bg-[var(--white)] p-5">
      <h3 className="m-0 text-center text-base font-semibold text-[var(--brand-navy)]">Payment Details</h3>
      <p className="m-0 rounded-lg bg-[var(--surface)] p-3 text-sm text-[var(--brand-navy)]">
        Selected method: <strong>{selectedMethod.name}</strong>
      </p>
      <label className="grid gap-1 text-sm font-semibold text-[var(--brand-navy)]">
        Amount (BDT)
        <input
          className="min-h-10 rounded-lg border border-[var(--line)] bg-[var(--field-bg)] px-3 font-normal text-[var(--brand-navy)] outline-none focus:border-[var(--brand-orange)]"
          onChange={(event) => onAmountChange(event.target.value)}
          placeholder="Enter amount"
          value={amount}
        />
      </label>
      <label className="grid gap-1 text-sm font-semibold text-[var(--brand-navy)]">
        Transaction ID
        <input
          className="min-h-10 rounded-lg border border-[var(--line)] bg-[var(--field-bg)] px-3 font-normal text-[var(--brand-navy)] outline-none focus:border-[var(--brand-orange)]"
          onChange={(event) => onTransactionIdChange(event.target.value)}
          placeholder="Enter transaction reference"
          value={transactionId}
        />
      </label>
      <label className="grid gap-1 text-sm font-semibold text-[var(--brand-navy)]">
        Payment Proof
        <input
          className="min-h-10 rounded-lg border border-[var(--line)] bg-[var(--field-bg)] px-3 font-normal text-[var(--brand-navy)] outline-none focus:border-[var(--brand-orange)]"
          onChange={(event) => onPaymentProofChange(event.target.value)}
          placeholder="Screenshot URL or note"
          value={paymentProof}
        />
      </label>
      <PrimaryButton className="min-h-8 justify-self-start px-3 py-1.5 text-xs" onClick={onContinue} type="button">
        Continue to Review
      </PrimaryButton>
    </section>
  );
}
