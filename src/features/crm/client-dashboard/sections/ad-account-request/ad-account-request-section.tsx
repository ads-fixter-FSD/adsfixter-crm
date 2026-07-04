"use client";

import { useMemo, useRef, useState } from "react";
import { getBusinessProfileRequests } from "@/features/crm/client-dashboard/sections/business-profile/business-profile-request-storage";
import { AdAccountFormActions } from "@/features/crm/client-dashboard/sections/ad-account-request/components/ad-account-form-actions";
import {
  AdAccountRequestFormBlock,
  createEmptyAdAccountFormValues,
  type AdAccountFormValues,
} from "@/features/crm/client-dashboard/sections/ad-account-request/components/ad-account-request-form-block";
import { AdAccountRequestHeader } from "@/features/crm/client-dashboard/sections/ad-account-request/components/ad-account-request-header";
import { saveAdAccountRequests } from "@/features/crm/client-dashboard/sections/ad-account-request/ad-account-request-storage";
import type { ToastType } from "@/features/crm/types/crm";

type AdAccountRequestSectionProps = {
  onBack: () => void;
  onContactSupport?: () => void;
  onSubmitted: () => void;
  showToast: (type: ToastType, message: string) => void;
};

type AdAccountFormEntry = {
  id: number;
  values: AdAccountFormValues;
};

export function AdAccountRequestSection({ onBack, onContactSupport, onSubmitted, showToast }: AdAccountRequestSectionProps) {
  const nextFormIdRef = useRef(1);
  const businessProfiles = useMemo(() => getBusinessProfileRequests(), []);
  const defaultBusinessProfileId = businessProfiles[0]?.id ?? "";

  const [forms, setForms] = useState<AdAccountFormEntry[]>([
    { id: 0, values: createEmptyAdAccountFormValues(defaultBusinessProfileId) },
  ]);

  const addForm = () => {
    nextFormIdRef.current += 1;
    setForms((current) => [...current, { id: nextFormIdRef.current, values: createEmptyAdAccountFormValues(defaultBusinessProfileId) }]);
  };

  const updateFormValues = (formId: number, values: AdAccountFormValues) => {
    setForms((current) => current.map((form) => (form.id === formId ? { ...form, values } : form)));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (businessProfiles.length === 0) {
      showToast("warning", "Please submit a business profile request first");
      return;
    }

    for (const form of forms) {
      if (!form.values.businessProfileId || !form.values.adAccountName.trim()) {
        showToast("warning", "Business profile and ad account name are required");
        return;
      }

      if (form.values.advertisingProducts.length === 0) {
        showToast("warning", "Please add at least one advertising product");
        return;
      }

      if (!form.values.expectedMonthlySpend.trim()) {
        showToast("warning", "Expected monthly spend is required");
        return;
      }

      if (!form.values.accessSharingDetails.trim()) {
        showToast("warning", "Access / sharing details are required");
        return;
      }
    }

    saveAdAccountRequests(
      forms.map((form) => {
        const profile = businessProfiles.find((item) => item.id === form.values.businessProfileId);

        return {
          businessProfileId: form.values.businessProfileId,
          businessProfileName: profile?.businessName ?? "Unknown business",
          productCategory: profile?.productCategory ?? "White",
          adAccountName: form.values.adAccountName.trim(),
          advertisingProducts: form.values.advertisingProducts,
          timeZone: form.values.timeZone,
          expectedMonthlySpend: form.values.expectedMonthlySpend.trim(),
          accessSharingMethod: form.values.accessSharingMethod,
          accessSharingDetails: form.values.accessSharingDetails.trim(),
        };
      }),
    );

    showToast("success", `${forms.length} ad account request(s) submitted for approval`);
    onSubmitted();
  };

  return (
    <section className="grid gap-5">
      <AdAccountRequestHeader onAddAnother={addForm} onBack={onBack} />

      <form className="grid gap-5" onSubmit={handleSubmit}>
        {forms.map((form, index) => (
          <AdAccountRequestFormBlock
            blockId={form.id}
            businessProfiles={businessProfiles}
            key={form.id}
            onChange={(values) => updateFormValues(form.id, values)}
            onContactSupport={index === 0 ? onContactSupport : undefined}
            values={form.values}
          />
        ))}

        <AdAccountFormActions onAddAnother={addForm} onCancel={onBack} />
      </form>
    </section>
  );
}

export { AdAccountRequestSection as ClientAdAccountRequestSection };
