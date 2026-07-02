import { Headset, Link2 } from "lucide-react";
import { BusinessProfileFormField } from "@/features/crm/client-dashboard/components/business-profile-request/business-profile-form-field";
import { businessProfileInputClassName } from "@/features/crm/client-dashboard/components/business-profile-request/business-profile-form-styles";

type BusinessInformationFormProps = {
  formId: number;
  index: number;
  onContactSupport?: () => void;
  showContactSupport?: boolean;
  variant?: "card" | "embedded";
};

export function BusinessInformationForm({ formId, index, onContactSupport, showContactSupport = false, variant = "card" }: BusinessInformationFormProps) {
  const fieldId = (name: string) => `business-${name}-${formId}`;
  const containerClassName = variant === "card" ? "rounded-xl border border-[var(--line)] bg-[var(--white)] p-5 max-[720px]:p-4" : "";

  return (
    <div className={containerClassName}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="h6-medium m-0 primary-text">{index === 0 ? "Business Information" : `Business Information ${index + 1}`}</h2>
          <p className="body-sm-regular m-0 mt-1 subtext">Please provide accurate information about your business.</p>
        </div>

        {showContactSupport ? (
          <button
            className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-[var(--brand-navy)] px-4 text-sm font-medium text-[var(--white)] transition hover:opacity-90"
            onClick={onContactSupport}
            type="button"
          >
            <Headset aria-hidden="true" size={16} strokeWidth={1.8} />
            Contact Support
          </button>
        ) : null}
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <BusinessProfileFormField htmlFor={fieldId("name")} label="Business Name" required>
          <input className={businessProfileInputClassName} id={fieldId("name")} name={fieldId("name")} placeholder="Enter business name" type="text" />
        </BusinessProfileFormField>

        <BusinessProfileFormField htmlFor={fieldId("email")} label="Business Email" required>
          <input className={businessProfileInputClassName} id={fieldId("email")} name={fieldId("email")} placeholder="Enter business email" type="email" />
        </BusinessProfileFormField>

        <BusinessProfileFormField htmlFor={fieldId("phone")} label="Business Phone" required>
          <div className="flex overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--field-bg)] focus-within:border-[var(--color-adsfixter-primary)]">
            <span className="inline-flex items-center gap-1 border-r border-[var(--line)] px-3 text-sm text-[var(--brand-navy)]">
              <span aria-hidden="true">🇧🇩</span>
              +880
            </span>
            <input className="min-h-10 flex-1 border-0 bg-transparent px-3 text-sm text-[var(--brand-navy)] outline-none" id={fieldId("phone")} name={fieldId("phone")} placeholder="Enter phone number" type="tel" />
          </div>
        </BusinessProfileFormField>

        <BusinessProfileFormField htmlFor={fieldId("address")} label="Business Address" required>
          <input className={businessProfileInputClassName} id={fieldId("address")} name={fieldId("address")} placeholder="Enter business address" type="text" />
        </BusinessProfileFormField>

        <BusinessProfileFormField htmlFor={fieldId("website")} label="Website Link" required>
          <div className="relative">
            <Link2 aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={16} strokeWidth={1.8} />
            <input className={`${businessProfileInputClassName} pl-9`} id={fieldId("website")} name={fieldId("website")} placeholder="https://yourwebsite.com" type="url" />
          </div>
        </BusinessProfileFormField>

        <BusinessProfileFormField htmlFor={fieldId("facebook")} label="Facebook Page Link" required>
          <div className="relative">
            <span aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-[#1877F2]">
              f
            </span>
            <input className={`${businessProfileInputClassName} pl-9`} id={fieldId("facebook")} name={fieldId("facebook")} placeholder="https://facebook.com/yourpage" type="url" />
          </div>
        </BusinessProfileFormField>

        <BusinessProfileFormField htmlFor={fieldId("category")} label="Product Category" required>
          <select className={businessProfileInputClassName} defaultValue="White" id={fieldId("category")} name={fieldId("category")}>
            <option value="White">White</option>
            <option value="Gray">Gray</option>
            <option value="Black">Black</option>
          </select>
        </BusinessProfileFormField>

        <BusinessProfileFormField htmlFor={fieldId("designation")} label="Designation of User" required>
          <select className={businessProfileInputClassName} defaultValue="Moderator" id={fieldId("designation")} name={fieldId("designation")}>
            <option value="Moderator">Moderator</option>
            <option value="Admin">Admin</option>
            <option value="Owner">Owner</option>
          </select>
        </BusinessProfileFormField>
      </div>
    </div>
  );
}
