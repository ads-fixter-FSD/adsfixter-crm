import { CreditCard, Landmark, type LucideIcon } from "lucide-react";

const paymentMethodIcons: Record<string, { icon?: LucideIcon; badge?: string; badgeClassName?: string }> = {
  "bank-transfer": { icon: Landmark },
  bkash: { badge: "bK", badgeClassName: "bg-[#e2136e] text-[var(--white)]" },
  nagad: { badge: "N", badgeClassName: "bg-[#f6921e] text-[var(--white)]" },
  paypal: { badge: "P", badgeClassName: "bg-[#003087] text-[var(--white)]" },
  card: { icon: CreditCard },
  stripe: { badge: "S", badgeClassName: "bg-[#635bff] text-[var(--white)]" },
};

export function PaymentMethodIcon({ methodId }: { methodId: string }) {
  const config = paymentMethodIcons[methodId];

  if (config?.icon) {
    const Icon = config.icon;

    return (
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--surface)] text-[var(--brand-navy)]">
        <Icon aria-hidden="true" size={20} strokeWidth={1.8} />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold ${config?.badgeClassName ?? "bg-[var(--surface)] text-[var(--brand-navy)]"}`}
    >
      {config?.badge}
    </span>
  );
}
