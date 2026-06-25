import { PrimaryButton } from "@/components/shared-buttons";
import type { ToastType } from "@/features/crm/types/crm";

type ModulePlaceholderSectionProps = {
  section: string;
  showToast: (type: ToastType, message: string) => void;
};

export function ModulePlaceholderSection({ section, showToast }: ModulePlaceholderSectionProps) {
  return (
    <div className="grid grid-cols-12 gap-3">
      <section className="col-span-12 rounded-xl border border-[var(--line)] bg-[var(--white)] p-8">
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[var(--brand-orange)]">{section}</p>
        <h2 className="m-0 text-base font-semibold text-[var(--brand-navy)]">{section} module ready</h2>
        <p className="mt-2 text-xs text-[var(--muted)]">
          This screen follows the same CRM design system with black and white surfaces, brand orange actions, navy structure,
          filters, status chips, and toast feedback for success, warning, and error states.
        </p>
        <PrimaryButton className="mt-4 px-3" onClick={() => showToast("error", `${section} validation demo error`)} type="button">
          Show Error Toast
        </PrimaryButton>
      </section>
    </div>
  );
}
