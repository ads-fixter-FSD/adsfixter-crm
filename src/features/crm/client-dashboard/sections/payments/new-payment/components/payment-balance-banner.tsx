export function PaymentBalanceBanner() {
  return (
    <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm font-semibold text-[var(--brand-navy)]">
      Current Balance: <span className="text-[var(--brand-orange)]">$606.04 USD</span>
      <span className="float-right text-xs text-[var(--muted)] max-[720px]:float-none max-[720px]:mt-2 max-[720px]:block">
        Your conversion rate: 127 BDT = 1 USD
      </span>
    </div>
  );
}
