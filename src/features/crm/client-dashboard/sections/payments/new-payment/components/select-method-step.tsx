import { PrimaryButton } from "@/components/shared-buttons";
import type { NewPaymentMethod } from "@/features/crm/client-dashboard/sections/payments/new-payment/payment-methods.data";

type SelectMethodStepProps = {
  methods: readonly NewPaymentMethod[];
  selectedMethodId: string;
  onSelect: (methodId: string) => void;
};

export function SelectMethodStep({ methods, selectedMethodId, onSelect }: SelectMethodStepProps) {
  return (
    <section className="rounded-xl border-2 border-[var(--line)] bg-[var(--white)] p-5">
      <h3 className="m-0 text-base font-semibold text-[var(--brand-navy)]">Select Payment Method</h3>
      <p className="mt-1 text-sm text-[var(--muted)]">Choose a payment method to top up your balance</p>

      <div className="mt-5 grid grid-cols-3 gap-4 max-[1180px]:grid-cols-2 max-[720px]:grid-cols-1">
        {methods.map((method) => (
          <article
            className={`rounded-xl border p-4 ${selectedMethodId === method.id ? "border-[var(--brand-orange)] bg-[var(--brand-orange-soft)]" : "border-[var(--line)] bg-[var(--white)]"}`}
            key={method.id}
          >
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
            <PrimaryButton className="mt-4 min-h-8 px-3 py-1.5 text-xs" onClick={() => onSelect(method.id)} type="button">
              Select This Account
            </PrimaryButton>
          </article>
        ))}
      </div>
    </section>
  );
}
