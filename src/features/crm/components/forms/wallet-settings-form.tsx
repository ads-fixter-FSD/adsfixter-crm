import type { ToastAction } from "@/features/crm/components/forms/form-types";

type WalletSettingsFormProps = {
  showToast: ToastAction;
};

export function WalletSettingsForm({ showToast }: WalletSettingsFormProps) {
  return (
    <form
      className="grid gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        showToast("success", "Wallet settings updated");
      }}
    >
      <label className="grid gap-2 text-sm font-semibold text-[var(--brand-navy)]">
        Dollar Rate
        <input className="min-h-9 w-full rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm text-[var(--brand-navy)] outline-none focus:border-[var(--brand-navy)]" defaultValue="125" />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-[var(--brand-navy)]">
        Default Credit Limit
        <input className="min-h-9 w-full rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm text-[var(--brand-navy)] outline-none focus:border-[var(--brand-navy)]" defaultValue="-50" />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-[var(--brand-navy)]">
        Default Daily Limit
        <input className="min-h-9 w-full rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm text-[var(--brand-navy)] outline-none focus:border-[var(--brand-navy)]" defaultValue="100" />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-[var(--brand-navy)]">
        Client Status
        <select className="min-h-9 w-full rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm text-[var(--brand-navy)] outline-none focus:border-[var(--brand-navy)]" defaultValue="Active">
          <option>Active</option>
          <option>Suspended</option>
          <option>Pending</option>
        </select>
      </label>
      <button className="rounded-lg border-0 bg-[var(--brand-orange)] px-3 py-2 text-sm font-semibold leading-tight text-[var(--white)] transition hover:bg-[var(--black)]" type="submit">
        Save Settings
      </button>
    </form>
  );
}
