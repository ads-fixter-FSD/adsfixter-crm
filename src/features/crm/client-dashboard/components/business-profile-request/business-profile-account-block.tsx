import { BusinessDocumentsUpload } from "@/features/crm/client-dashboard/components/business-profile-request/business-documents-upload";
import { BusinessInformationForm } from "@/features/crm/client-dashboard/components/business-profile-request/business-information-form";
import { BusinessProfileFormActions } from "@/features/crm/client-dashboard/components/business-profile-request/business-profile-form-actions";
import { ProductCategoryGuide } from "@/features/crm/client-dashboard/components/business-profile-request/product-category-guide";

type BusinessProfileAccountBlockProps = {
  formId: number;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  onAddBusinessAccount: () => void;
  onBack: () => void;
  onContactSupport?: () => void;
  totalForms: number;
};

export function BusinessProfileAccountBlock({
  formId,
  index,
  isFirst,
  isLast,
  onAddBusinessAccount,
  onBack,
  onContactSupport,
  totalForms,
}: BusinessProfileAccountBlockProps) {
  const hasMultipleForms = totalForms > 1;
  const submitLabel = hasMultipleForms && isLast ? "Submit All" : "Submit Details";
  const submitType = hasMultipleForms && !isLast ? "button" : "submit";

  return (
    <div className="rounded-xl border border-[var(--line)] bg-[var(--white)] p-5 max-[720px]:p-4">
      <BusinessInformationForm
        formId={formId}
        index={index}
        onContactSupport={onContactSupport}
        showContactSupport={isFirst}
        variant="embedded"
      />
      <ProductCategoryGuide variant="embedded" />
      <BusinessDocumentsUpload variant="embedded" />
      <BusinessProfileFormActions
        onAddBusinessAccount={onAddBusinessAccount}
        onBack={onBack}
        showAddButton={isFirst}
        submitLabel={submitLabel}
        submitType={submitType}
        variant="embedded"
      />
    </div>
  );
}
