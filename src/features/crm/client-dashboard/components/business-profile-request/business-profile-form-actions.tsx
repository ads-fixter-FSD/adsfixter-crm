import { PrimaryButton, SecondaryButton } from "@/components/shared-buttons";
import { AddAnotherBusinessAccountButton } from "@/features/crm/client-dashboard/components/business-profile-request/add-another-business-account-button";

type BusinessProfileFormActionsProps = {
  onAddBusinessAccount?: () => void;
  onBack: () => void;
  showAddButton?: boolean;
  submitLabel?: string;
  submitType?: "button" | "submit";
  variant?: "card" | "embedded";
};

export function BusinessProfileFormActions({
  onAddBusinessAccount,
  onBack,
  showAddButton = false,
  submitLabel = "Submit Details",
  submitType = "submit",
  variant = "card",
}: BusinessProfileFormActionsProps) {
  return (
    <div className={variant === "embedded" ? "border-t border-[var(--line)] pt-6" : ""}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SecondaryButton className="min-h-10 px-5" onClick={onBack} type="button">
          Cancel
        </SecondaryButton>

        <div className="flex flex-wrap items-center gap-3">
          {showAddButton && onAddBusinessAccount ? <AddAnotherBusinessAccountButton onClick={onAddBusinessAccount} /> : null}
          <PrimaryButton className="min-h-10 px-6" type={submitType}>
            {submitLabel}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
