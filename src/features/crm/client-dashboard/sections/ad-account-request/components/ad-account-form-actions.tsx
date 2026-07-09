import { Plus } from "lucide-react";
import { PrimaryButton, SecondaryButton } from "@/components/shared-buttons";

type AdAccountFormActionsProps = {
  onAddAnother: () => void;
  onCancel: () => void;
  showAddAnother?: boolean;
};

export function AdAccountFormActions({ onAddAnother, onCancel, showAddAnother = true }: AdAccountFormActionsProps) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      <SecondaryButton className="min-h-10 px-6" onClick={onCancel} type="button">
        Cancel
      </SecondaryButton>
      {showAddAnother ? (
        <SecondaryButton className="min-h-10 gap-2 bg-[var(--brand-navy)] px-6 text-[var(--white)] hover:bg-[var(--black)]" onClick={onAddAnother} type="button">
          <Plus aria-hidden="true" size={16} strokeWidth={1.8} />
          Request another Ad Account
        </SecondaryButton>
      ) : null}
      <PrimaryButton className="min-h-10 px-6" type="submit">
        Submit Details 
      </PrimaryButton>
    </div>
  );
}
