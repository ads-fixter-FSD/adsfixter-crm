import { PrimaryButton } from "@/components/shared-buttons";
import type { ToastAction } from "@/features/crm/components/forms/form-types";
import type { BusinessManager, Client } from "@/features/crm/types/crm";

type CreateAdAccountFormProps = {
  businessManagers: BusinessManager[];
  clients: Client[];
  onBack?: () => void;
  showToast: ToastAction;
};

export function CreateAdAccountForm({ businessManagers, clients, onBack, showToast }: CreateAdAccountFormProps) {
  return (
    <div className="grid gap-3">
      {onBack ? (
        <button className="inline-flex justify-self-start border-0 bg-transparent p-0 text-sm font-semibold text-[var(--brand-navy)] before:mr-2 before:content-['<']" onClick={onBack} type="button">
          Back to Ad Accounts
        </button>
      ) : null}

      <form
        className="grid grid-cols-2 gap-x-8 gap-y-4 max-[1420px]:grid-cols-1"
        onSubmit={(event) => {
          event.preventDefault();
          showToast("success", "New ad account created under selected business manager");
        }}
      >
        <div className="col-span-full">
          <h3 className="m-0 text-base font-semibold text-[var(--brand-navy)]">Create New Ad Account</h3>
          <p className="mt-1 text-xs font-normal text-[var(--muted)]">Add a new Facebook ad account to the system.</p>
        </div>

        <label className="grid gap-2 text-sm font-semibold text-[var(--brand-navy)]">
          Ad Account Name
          <input className="min-h-9 w-full rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm text-[var(--brand-navy)] outline-none focus:border-[var(--brand-navy)]" placeholder="Ad Account" />
          <span className="mt-1 text-xs font-normal text-[var(--muted)]">A descriptive name for this ad account</span>
        </label>

        <label className="grid gap-2 text-sm font-semibold text-[var(--brand-navy)]">
          Meta Account ID
          <input className="min-h-9 w-full rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm text-[var(--brand-navy)] outline-none focus:border-[var(--brand-navy)]" placeholder="123456789" />
          <span className="mt-1 text-xs font-normal text-[var(--muted)]">Enter the account ID without act_ prefix.</span>
        </label>

        <label className="grid gap-2 text-sm font-semibold text-[var(--brand-navy)]">
          Business Manager
          <select className="min-h-9 w-full rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm text-[var(--brand-navy)] outline-none focus:border-[var(--brand-navy)]" defaultValue="">
            <option value="" disabled>
              Select a Business Manager
            </option>
            {businessManagers.map((businessManager) => (
              <option key={businessManager.id} value={businessManager.id}>
                {businessManager.name} ({businessManager.id})
              </option>
            ))}
          </select>
          <span className="mt-1 text-xs font-normal text-[var(--muted)]">The Business Manager this ad account belongs to</span>
        </label>

        <label className="grid gap-2 text-sm font-semibold text-[var(--brand-navy)]">
          Assigned To Client
          <select className="min-h-9 w-full rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm text-[var(--brand-navy)] outline-none focus:border-[var(--brand-navy)]" defaultValue="">
            <option value="">Leave unassigned</option>
            {clients.map((client) => (
              <option key={client.email} value={client.email}>
                {client.name} ({client.email})
              </option>
            ))}
          </select>
          <span className="mt-1 text-xs font-normal text-[var(--muted)]">You can assign the account to a client or leave unassigned.</span>
        </label>

        <div className="col-span-full flex justify-end">
          <PrimaryButton className="px-3" type="submit">
            Create Ad Account
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}
