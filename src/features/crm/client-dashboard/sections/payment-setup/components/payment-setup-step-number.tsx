export function PaymentSetupStepNumber({ number }: { number: number }) {
  return (
    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-adsfixter-primary)] text-sm font-semibold text-[var(--white)]">
      {number}
    </span>
  );
}
