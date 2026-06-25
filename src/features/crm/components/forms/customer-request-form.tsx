import { PrimaryButton } from "@/components/shared-buttons";
import type { ToastAction } from "@/features/crm/components/forms/form-types";

type CustomerRequestFormProps = {
  section: string;
  showToast: ToastAction;
};

export function CustomerRequestForm({ section, showToast }: CustomerRequestFormProps) {
  const isPayment = section === "Payments";

  return (
    <form
      className="grid gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        showToast("success", `${section} submitted for approval`);
      }}
    >
      <label className="grid gap-2 text-sm font-semibold text-[var(--brand-navy)]">
        {isPayment ? "Payment Method" : "Account / Business Name"}
        <input className="min-h-9 w-full rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm text-[var(--brand-navy)] outline-none focus:border-[var(--brand-navy)]" placeholder={isPayment ? "bKash / Nagad / Bank Transfer" : "Example: Scale Ads Main"} />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-[var(--brand-navy)]">
        {isPayment ? "Amount in BDT" : "Ad Account or Business Manager ID"}
        <input className="min-h-9 w-full rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm text-[var(--brand-navy)] outline-none focus:border-[var(--brand-navy)]" placeholder={isPayment ? "10000" : "act_123456 or BM-1234"} />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-[var(--brand-navy)]">
        {isPayment ? "Transaction ID" : "Notes"}
        <input className="min-h-9 w-full rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm text-[var(--brand-navy)] outline-none focus:border-[var(--brand-navy)]" placeholder={isPayment ? "TXN8AB72" : "Please connect this account"} />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-[var(--brand-navy)]">
        Screenshot / Attachment
        <input className="min-h-9 w-full rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm text-[var(--brand-navy)] outline-none focus:border-[var(--brand-navy)]" type="file" />
      </label>
      <PrimaryButton className="min-h-8 justify-self-start px-3 py-1.5 text-xs" type="submit">
        Submit Request
      </PrimaryButton>
    </form>
  );
}
