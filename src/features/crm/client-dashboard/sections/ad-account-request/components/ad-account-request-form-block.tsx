"use client";

import { Headset, Info } from "lucide-react";
import { SecondaryButton } from "@/components/shared-buttons";
import { BusinessProfileFormField } from "@/features/crm/client-dashboard/sections/business-profile/components/business-profile-form-field";
import { businessProfileInputClassName } from "@/features/crm/client-dashboard/sections/business-profile/components/business-profile-form-styles";
import { ProductCategoryGuide } from "@/features/crm/client-dashboard/sections/business-profile/components/product-category-guide";
import type { BusinessProfileRequest } from "@/features/crm/client-dashboard/sections/business-profile/business-profile-request-storage";
import { ProductTagsInput } from "@/features/crm/client-dashboard/sections/ad-account-request/components/product-tags-input";
import type {
  AccessSharingMethod,
  AdAccountRequest,
} from "@/features/crm/client-dashboard/sections/ad-account-request/ad-account-request-storage";
import { adAccountTimeZoneOptions } from "@/features/crm/client-dashboard/sections/ad-account-request/ad-account-request-storage";

export type AdAccountFormValues = {
  businessProfileId: string;
  adAccountName: string;
  advertisingProducts: string[];
  timeZone: string;
  expectedMonthlySpend: string;
  accessSharingMethod: AccessSharingMethod;
  accessSharingDetails: string;
};

type AdAccountRequestFormBlockProps = {
  blockId: number;
  businessProfiles: BusinessProfileRequest[];
  onContactSupport?: () => void;
  values: AdAccountFormValues;
  onChange: (values: AdAccountFormValues) => void;
};

const accessSharingOptions: { id: AccessSharingMethod; label: string }[] = [
  { id: "business-manager-id", label: "Business Manager ID" },
  { id: "email", label: "Email Address" },
  { id: "both", label: "Both (Manager ID + Email)" },
];

export function AdAccountRequestFormBlock({
  blockId,
  businessProfiles,
  onContactSupport,
  values,
  onChange,
}: AdAccountRequestFormBlockProps) {
  const updateValue = <K extends keyof AdAccountFormValues>(
    field: K,
    value: AdAccountFormValues[K],
  ) => {
    onChange({ ...values, [field]: value });
  };

  return (
    <div className="grid gap-6 rounded-[12px] border border-[var(--line)] bg-[var(--white)] ">
      <div className="flex flex-wrap items-start p-4 justify-between gap-3 border-b border-[var(--line)] pb-5">
        <div>
          <h2 className="h6-medium m-0 primary-text">Ads Details</h2>
          <p className="body-sm-regular m-0 mt-1 subtext">
            Tell us about the products or services you want to advertise.
          </p>
        </div>

        {onContactSupport ? (
          <SecondaryButton
            className="min-h-10 gap-2 bg-[var(--brand-navy)] px-4 text-[var(--white)] hover:bg-[var(--black)]"
            onClick={onContactSupport}
            type="button"
          >
            <Headset aria-hidden="true" size={16} strokeWidth={1.8} />
            Contact Support
          </SecondaryButton>
        ) : null}
      </div>

      <div className="grid gap-4 p-4 md:grid-cols-2">
        <BusinessProfileFormField
          htmlFor={`business-profile-${blockId}`}
          label="Select Business Profile"
          required
        >
          <select
            className={businessProfileInputClassName}
            id={`business-profile-${blockId}`}
            onChange={(event) =>
              updateValue("businessProfileId", event.target.value)
            }
            value={values.businessProfileId}
          >
            <option value="">Select business profile</option>
            {businessProfiles.map((profile) => (
              <option key={profile.id} value={profile.id}>
                {profile.businessName}
              </option>
            ))}
          </select>
        </BusinessProfileFormField>

        <BusinessProfileFormField
          htmlFor={`ad-account-name-${blockId}`}
          label="Ad Account Name"
          required
        >
          <input
            className={businessProfileInputClassName}
            id={`ad-account-name-${blockId}`}
            onChange={(event) =>
              updateValue("adAccountName", event.target.value)
            }
            placeholder="Enter an ad account name"
            value={values.adAccountName}
          />
        </BusinessProfileFormField>
      </div>

      <div className="p-4">
        <BusinessProfileFormField
          htmlFor={`advertising-products-${blockId}`}
          label="Advertising Product Details"
          required
        >
          <ProductTagsInput
            id={`advertising-products-${blockId}`}
            onChange={(products) =>
              updateValue("advertisingProducts", products)
            }
            products={values.advertisingProducts}
          />
        </BusinessProfileFormField>
      </div>

      <ProductCategoryGuide variant="embedded" />

      <div className="grid gap-4 px-4 md:grid-cols-2">
        <BusinessProfileFormField
          htmlFor={`time-zone-${blockId}`}
          label="Time Zone"
          required
        >
          <select
            className={businessProfileInputClassName}
            id={`time-zone-${blockId}`}
            onChange={(event) => updateValue("timeZone", event.target.value)}
            value={values.timeZone}
          >
            {adAccountTimeZoneOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </BusinessProfileFormField>

        <BusinessProfileFormField
          htmlFor={`monthly-spend-${blockId}`}
          label="Expected Monthly Spend (USD)"
          required
        >
          <div className="relative">
            <span className="body-sm-regular pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 subtext">
              $
            </span>
            <input
              className={`${businessProfileInputClassName} pl-7`}
              id={`monthly-spend-${blockId}`}
              inputMode="decimal"
              onChange={(event) =>
                updateValue("expectedMonthlySpend", event.target.value)
              }
              placeholder="e.g. 100"
              value={values.expectedMonthlySpend}
            />
          </div>
        </BusinessProfileFormField>
      </div>

      <div className="grid gap-4 px-4">
        <div>
          <h3 className="body-regular m-0 primary-text">
            Access / Sharing Method
          </h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {accessSharingOptions.map((option) => {
            const isSelected = values.accessSharingMethod === option.id;

            return (
              <label
                className={`body-sm-regular flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 ${
                  isSelected
                    ? "border-[var(--color-adsfixter-primary)] bg-[var(--brand-orange-soft)]"
                    : "border-[var(--line)] bg-[var(--white)]"
                }`}
                key={option.id}
              >
                <input
                  checked={isSelected}
                  className="h-4 w-4 accent-[var(--color-adsfixter-primary)]"
                  name={`access-sharing-${blockId}`}
                  onChange={() => updateValue("accessSharingMethod", option.id)}
                  type="radio"
                />
                <span className="primary-text">{option.label}</span>
              </label>
            );
          })}
        </div>
        <p className="body-regular m-0 subtext">
          You can add multiple IDs or emails separated by commas.
        </p>

        <textarea
          className="min-h-[100px] mt-6 w-full rounded-[10px] border border-[#F0F0F0] bg-[var(--white)] px-4 py-3 text-sm text-[var(--brand-navy)] outline-none shadow-[0px_1px_2px_0px_#0D0D120F] focus:border-[var(--color-adsfixter-primary)] placeholder:body-regular "
          onChange={(event) =>
            updateValue("accessSharingDetails", event.target.value)
          }
          placeholder="Enter Business Manager ID(s) or email address(es)"
          value={values.accessSharingDetails}
        />
        <p className="body-regular m-0 subtext">
          e.g. 123456789912, 9875247148504
        </p>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-3 rounded-[8px] bg-[var(--brand-orange-soft)]/50 px-4 py-3">
          <div className="p-2 bg-[var(--brand-orange-soft)] rounded-[8px]">
            <Info
              aria-hidden="true"
              className="shrink-0 text-[var(--color-adsfixter-primary)]"
              size={20}
              strokeWidth={1.8}
            />
          </div>

          <p className=" m-0 flex-1 subtext">
            <strong className="body-l-medium ">Important Note:</strong>
            <br />
            <span className="body-sm-regular">
              Please make sure all information is accurate. Wrong or incomplete
              information may delay the approval process.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export function createFormValuesFromRequest(
  request: AdAccountRequest,
): AdAccountFormValues {
  return {
    businessProfileId: request.businessProfileId,
    adAccountName: request.adAccountName,
    advertisingProducts: request.advertisingProducts,
    timeZone: request.timeZone,
    expectedMonthlySpend: request.expectedMonthlySpend,
    accessSharingMethod: request.accessSharingMethod,
    accessSharingDetails: request.accessSharingDetails,
  };
}

export function createEmptyAdAccountFormValues(
  businessProfileId = "",
): AdAccountFormValues {
  return {
    businessProfileId,
    adAccountName: "",
    advertisingProducts: [],
    timeZone: adAccountTimeZoneOptions[0].value,
    expectedMonthlySpend: "",
    accessSharingMethod: "business-manager-id",
    accessSharingDetails: "",
  };
}
