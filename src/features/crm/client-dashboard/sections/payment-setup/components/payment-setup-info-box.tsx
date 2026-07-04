import { Info } from "lucide-react";

export function PaymentSetupInfoBox({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex gap-2 rounded-lg bg-[var(--brand-orange-soft)] px-4 py-3 ${className}`}>
      <Info aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--color-adsfixter-primary)]" size={16} strokeWidth={1.8} />
      <p className="body-xsm-regular m-0 text-[var(--brand-navy)]">{children}</p>
    </div>
  );
}
