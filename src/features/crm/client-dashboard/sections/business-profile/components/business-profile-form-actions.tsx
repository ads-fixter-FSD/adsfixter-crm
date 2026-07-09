import { PrimaryButton, SecondaryButton } from "@/components/shared-buttons";
import { SecondaryButtonWhite } from "@/components/shared-buttons/secondary-button-white";
import { AddAnotherBusinessAccountButton } from "@/features/crm/client-dashboard/sections/business-profile/components/add-another-business-account-button";
import { Plus } from "lucide-react";

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
    <div
      className={
        variant === "embedded" ? "border-t border-[var(--line)] pt-6" : ""
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SecondaryButtonWhite
          className="min-h-10 px-5"
          onClick={onBack}
          type="button"
        >
          Cancel
        </SecondaryButtonWhite>


        <div className="flex flex-wrap items-center gap-3">
          <SecondaryButton
            className="min-h-10 gap-2 px-4"
            onClick={onAddBusinessAccount}
            type="button"
          >
            <Plus aria-hidden="true" size={16} strokeWidth={1.8} />
            Add Multiple business account
          </SecondaryButton>
          <PrimaryButton className="min-h-10 px-6" type={submitType}>
            {submitLabel}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
