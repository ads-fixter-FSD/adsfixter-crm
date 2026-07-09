import { Link2 } from "lucide-react";
import { BusinessProfileFormField } from "@/features/crm/client-dashboard/sections/business-profile/components/business-profile-form-field";
import { businessProfileInputClassName } from "@/features/crm/client-dashboard/sections/business-profile/components/business-profile-form-styles";

// ১. এখানে নতুন প্রোপস দুটি টাইপস্ক্রিপ্টে যোগ করা হয়েছে
type BusinessInformationFormProps = {
  formId: number;
  index: number;
  variant?: "card" | "embedded";
  onContactSupport?: () => void; // 👈 নতুন যোগ করা হলো
  showContactSupport?: boolean;   // 👈 নতুন যোগ করা হলো
};

export function BusinessInformationForm({
  formId,
  index,
  variant = "card",
  onContactSupport,     // 👈 ডিস্ট্রাকচার করা হলো
  showContactSupport,   // 👈 ডিস্ট্রাকচার করা হলো
}: BusinessInformationFormProps) {
  const fieldId = (name: string) => `business-${name}-${formId}`;
  const containerClassName =
    variant === "card"
      ? "rounded-xl border border-[var(--line)] bg-[var(--white)] p-5 max-[720px]:p-4"
      : "";

  return (
    <div className={containerClassName}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="h6-medium m-0 primary-text">
            {index === 0
              ? "Business Information"
              : `Business Information ${index + 1}`}
          </h2>
          <p className="body-sm-regular m-0 mt-1 subtext">
            Please provide accurate information about your business.
          </p>
        </div>

        {/* উদাহরণস্বরূপ: আপনি যদি UI-তে সাপোর্ট বাটন দেখাতে চান, তাহলে এভাবে ব্যবহার করতে পারেন */}
        {showContactSupport && onContactSupport && (
          <button 
            type="button" 
            onClick={onContactSupport}
            className="text-sm text-[var(--color-adsfixter-primary)] underline"
          >
            Contact Support
          </button>
        )}
      </div>

      <div className="-mx-5 max-[720px]:-mx-4 mt-4 border-b border-[#EDEDED]"></div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <BusinessProfileFormField
          htmlFor={fieldId("name")}
          label="Business Name"
          required
        >
          <input
            className={businessProfileInputClassName}
            id={fieldId("name")}
            name={fieldId("name")}
            placeholder="Enter business name"
            type="text"
          />
        </BusinessProfileFormField>

        <BusinessProfileFormField
          htmlFor={fieldId("email")}
          label="Business Email"
          required
        >
          <input
            className={businessProfileInputClassName}
            id={fieldId("email")}
            name={fieldId("email")}
            placeholder="Enter business email"
            type="email"
          />
        </BusinessProfileFormField>

        <BusinessProfileFormField
          htmlFor={fieldId("phone")}
          label="Business Phone"
          required
        >
          <div className="flex overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--field-bg)] focus-within:border-[var(--color-adsfixter-primary)]">
            <span className="inline-flex items-center gap-1 border-r border-[var(--line)] px-3 text-sm text-[var(--brand-navy)]">
              <span aria-hidden="true">🇧🇩</span>
              +880
            </span>
            <input
              className="min-h-10 flex-1 border-0 bg-transparent px-3 text-sm text-[var(--brand-navy)] outline-none"
              id={fieldId("phone")}
              name={fieldId("phone")}
              placeholder="Enter phone number"
              type="tel"
            />
          </div>
        </BusinessProfileFormField>

        <BusinessProfileFormField
          htmlFor={fieldId("address")}
          label="Business Address"
          required
        >
          <input
            className={businessProfileInputClassName}
            id={fieldId("address")}
            name={fieldId("address")}
            placeholder="Enter business address"
            type="text"
          />
        </BusinessProfileFormField>

        <BusinessProfileFormField
          htmlFor={fieldId("website")}
          label="Website Link"
          required
        >
          <div className="relative">
            <Link2
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
              size={16}
              strokeWidth={1.8}
            />
            <input
              className={`${businessProfileInputClassName} pl-9`}
              id={fieldId("website")}
              name={fieldId("website")}
              placeholder="https://yourwebsite.com"
              type="url"
            />
          </div>
        </BusinessProfileFormField>

        <BusinessProfileFormField
          htmlFor={fieldId("facebook")}
          label="Facebook Page Link"
          required
        >
          <div className="relative">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-[#1877F2]"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="20" height="20" rx="4" fill="#F8F8F8" />
                <path
                  d="M12.5 6.27778V6.5C12.5 6.6394 12.5 6.70909 12.4885 6.76705C12.4411 7.00507 12.2551 7.19113 12.0171 7.23847C11.9591 7.25 11.8894 7.25 11.75 7.25C11.6106 7.25 11.5409 7.25 11.4829 7.26153C11.2449 7.30887 11.0589 7.49493 11.0115 7.73295C11 7.79091 11 7.8606 11 8V9H11.625C11.8811 9 12.0092 9 12.1114 9.03846C12.2731 9.09932 12.4007 9.22694 12.4615 9.38865C12.5 9.49083 12.5 9.61888 12.5 9.875C12.5 10.1311 12.5 10.2592 12.4615 10.3614C12.4007 10.5231 12.2731 10.6507 12.1114 10.7115C12.0092 10.75 11.8811 10.75 11.625 10.75H11V13.5C11 13.8738 11 14.0608 10.9196 14.2C10.867 14.2912 10.7912 14.367 10.7 14.4196C10.5608 14.5 10.3738 14.5 10 14.5C9.62615 14.5 9.43923 14.5 9.3 14.4196C9.20879 14.367 9.13305 14.2912 9.08038 14.2C9 14.0608 9 13.8738 9 13.5V10.75H8.375C8.11888 10.75 7.99083 10.75 7.88865 10.7115C7.72694 10.6507 7.59932 10.5231 7.53846 10.3614C7.5 10.2592 7.5 10.1311 7.5 9.875C7.5 9.61888 7.5 9.49083 7.53846 9.38865C7.59932 9.22694 7.72694 9.09932 7.88865 9.03846C7.99083 9 8.11888 9 8.375 9H9V8.22222C9 7.64377 9 7.35455 9.05661 7.11571C9.23973 6.34303 9.84303 5.73973 10.6157 5.55661C10.8545 5.5 11.1438 5.5 11.7222 5.5C11.8875 5.5 11.9701 5.5 12.0384 5.51617C12.2591 5.5685 12.4315 5.74087 12.4838 5.96163C12.5 6.02987 12.5 6.11251 12.5 6.27778Z"
                  stroke="#999D9B"
                  strokeWidth="0.875"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <input
              className={`${businessProfileInputClassName} pl-9`}
              id={fieldId("facebook")}
              name={fieldId("facebook")}
              placeholder="https://facebook.com/yourpage"
              type="url"
            />
          </div>
        </BusinessProfileFormField>

        <BusinessProfileFormField
          htmlFor={fieldId("category")}
          label="Product Category"
          required
        >
          <select
            className={businessProfileInputClassName}
            defaultValue="White"
            id={fieldId("category")}
            name={fieldId("category")}
          >
            <option value="White">White</option>
            <option value="Gray">Gray</option>
            <option value="Black">Black</option>
          </select>
        </BusinessProfileFormField>

        <BusinessProfileFormField
          htmlFor={fieldId("designation")}
          label="Designation of User"
          required
        >
          <select
            className={businessProfileInputClassName}
            defaultValue="Moderator"
            id={fieldId("designation")}
            name={fieldId("designation")}
          >
            <option value="Moderator">Moderator</option>
            <option value="Admin">Admin</option>
            <option value="Owner">Owner</option>
          </select>
        </BusinessProfileFormField>
      </div>
    </div>
  );
}