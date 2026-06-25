"use client";

import { CheckCircle2, CreditCard, FileText, Upload } from "lucide-react";
import { useState } from "react";
import { PrimaryButton, SecondaryButton } from "@/components/shared-buttons";
import type { ToastType } from "@/features/crm/types/crm";

type ClientNewPaymentSectionProps = {
  showToast: (type: ToastType, message: string) => void;
};

const paymentMethods = [
  { id: "dbbl", name: "Dutch Bangla Bank Ltd.", account: "Milon It Center #01, DBBL_MFC", holder: "Milon It Center LTD", number: "701710057843", branch: "Savar, Dhaka" },
  { id: "ebl", name: "Eastern Bank PLC", account: "AdsFixter EBL_EBP_ADF", holder: "AdsFixter", number: "410210000394", branch: "Jatrabari" },
  { id: "city", name: "The City Bank LLC", account: "MOW MART, CBL_MMT", holder: "MOW MART", number: "105209999001", branch: "Dhaka Avenue" },
  { id: "ucb", name: "UNITED COMMERCIAL BANK LTD", account: "ADF FIXTER UCB_ADF", holder: "ADS FIXTER", number: "79821341000032359", branch: "UCBL" },
  { id: "islamic", name: "Islami Bank PLC", account: "ADF_IBBL", holder: "Ads Fixter", number: "207846100400680", branch: "Jatrabari" },
  { id: "bkash", name: "Bkash Limited", account: "Personal Account", holder: "Rakabul Imtiaz", number: "01761437754", branch: "N/A" },
];

export function ClientNewPaymentSection({ showToast }: ClientNewPaymentSectionProps) {
  const [step, setStep] = useState(1);
  const [selectedMethodId, setSelectedMethodId] = useState(paymentMethods[0].id);
  const [amount, setAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentProof, setPaymentProof] = useState("");

  const selectedMethod = paymentMethods.find((method) => method.id === selectedMethodId) ?? paymentMethods[0];

  const goToDetails = () => {
    setStep(2);
  };

  const goToReview = () => {
    if (!amount.trim() || !transactionId.trim()) {
      showToast("warning", "Amount and transaction ID are required");
      return;
    }

    setStep(3);
  };

  const submitPayment = () => {
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

      <div className="mx-auto grid w-full max-w-4xl grid-cols-3 gap-3 rounded-xl border border-[var(--line)] bg-[var(--white)] p-3 text-center max-[720px]:grid-cols-1">
        {[
          { id: 1, label: "Select Method", helper: "Choose where you will send the payment.", icon: CreditCard },
          { id: 2, label: "Payment Details", helper: "Enter amount, transaction ID, and proof.", icon: Upload },
          { id: 3, label: "Review & Submit", helper: "Check everything and submit for approval.", icon: FileText },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div className={`rounded-lg border px-3 py-2 ${step === item.id ? "border-[var(--brand-navy)] bg-[var(--surface)]" : "border-[var(--line)] bg-[var(--white)]"}`} key={item.id}>
              <div className="flex items-center justify-center gap-2 text-sm font-semibold text-[var(--brand-navy)]">
                <Icon aria-hidden="true" size={15} strokeWidth={1.9} />
                Step {item.id}: {item.label}
              </div>
              <p className="mt-1 mb-0 text-xs leading-5 text-[var(--muted)]">{item.helper}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm font-semibold text-[var(--brand-navy)]">
        Current Balance: <span className="text-[var(--brand-orange)]">$606.04 USD</span>
        <span className="float-right text-xs text-[var(--muted)] max-[720px]:float-none max-[720px]:mt-2 max-[720px]:block">Your conversion rate: 127 BDT = 1 USD</span>
      </div>

      {step === 1 ? (
        <section className="rounded-xl border border-[var(--line)] bg-[var(--white)] p-4">
          <h3 className="m-0 text-base font-semibold text-[var(--brand-navy)]">Select Payment Method</h3>
          <p className="mt-1 text-sm text-[var(--muted)]">Choose a payment method to top up your balance</p>

          <div className="mt-5 grid grid-cols-3 gap-4 max-[1180px]:grid-cols-2 max-[720px]:grid-cols-1">
            {paymentMethods.map((method) => (
              <article className={`rounded-xl border p-4 ${selectedMethodId === method.id ? "border-blue-500 bg-blue-50" : "border-[var(--line)] bg-[var(--white)]"}`} key={method.id}>
                <h4 className="m-0 text-sm font-semibold text-[var(--brand-navy)]">{method.name}</h4>
                <p className="mt-1 text-xs text-[var(--muted)]">{method.account}</p>
                <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-[var(--brand-navy)]">
                  <dt className="text-[var(--muted)]">Account Name</dt>
                  <dd className="m-0 text-right">{method.holder}</dd>
                  <dt className="text-[var(--muted)]">Account Number</dt>
                  <dd className="m-0 text-right">{method.number}</dd>
                  <dt className="text-[var(--muted)]">Branch</dt>
                  <dd className="m-0 text-right">{method.branch}</dd>
                </dl>
                <PrimaryButton className="mt-4 min-h-8 px-3 py-1.5 text-xs" onClick={() => { setSelectedMethodId(method.id); goToDetails(); }} type="button">
                  Select This Account
                </PrimaryButton>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {step === 2 ? (
        <section className="grid w-full gap-4 rounded-xl border border-[var(--line)] bg-[var(--white)] p-5">
          <h3 className="m-0 text-center text-base font-semibold text-[var(--brand-navy)]">Payment Details</h3>
          <p className="m-0 rounded-lg bg-[var(--surface)] p-3 text-sm text-[var(--brand-navy)]">Selected method: <strong>{selectedMethod.name}</strong></p>
          <label className="grid gap-1 text-sm font-semibold text-[var(--brand-navy)]">
            Amount (BDT)
            <input className="min-h-10 rounded-lg border border-[var(--line)] px-3 font-normal outline-none focus:border-blue-500" onChange={(event) => setAmount(event.target.value)} placeholder="Enter amount" value={amount} />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-[var(--brand-navy)]">
            Transaction ID
            <input className="min-h-10 rounded-lg border border-[var(--line)] px-3 font-normal outline-none focus:border-blue-500" onChange={(event) => setTransactionId(event.target.value)} placeholder="Enter transaction reference" value={transactionId} />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-[var(--brand-navy)]">
            Payment Proof
            <input className="min-h-10 rounded-lg border border-[var(--line)] px-3 font-normal outline-none focus:border-blue-500" onChange={(event) => setPaymentProof(event.target.value)} placeholder="Screenshot URL or note" value={paymentProof} />
          </label>
          <PrimaryButton className="min-h-8 justify-self-start px-3 py-1.5 text-xs" onClick={goToReview} type="button">
            Continue to Review
          </PrimaryButton>
        </section>
      ) : null}

      {step === 3 ? (
        <section className="grid w-full gap-4 rounded-xl border border-[var(--line)] bg-[var(--white)] p-5">
          <h3 className="m-0 text-center text-base font-semibold text-[var(--brand-navy)]">Review & Submit</h3>
          <div className="grid gap-2 rounded-lg bg-[var(--surface)] p-4 text-sm text-[var(--brand-navy)]">
            <p className="m-0"><strong>Payment Method:</strong> {selectedMethod.name}</p>
            <p className="m-0"><strong>Account Number:</strong> {selectedMethod.number}</p>
            <p className="m-0"><strong>Amount:</strong> {amount || "-"} BDT</p>
            <p className="m-0"><strong>Transaction ID:</strong> {transactionId || "-"}</p>
            <p className="m-0"><strong>Payment Proof:</strong> {paymentProof || "-"}</p>
          </div>
          <SecondaryButton className="min-h-8 justify-self-start px-3 py-1.5 text-xs" onClick={submitPayment} type="button">
            <CheckCircle2 aria-hidden="true" size={16} strokeWidth={1.9} />
            Submit Payment
          </SecondaryButton>
        </section>
      ) : null}
    </section>
  );
}
