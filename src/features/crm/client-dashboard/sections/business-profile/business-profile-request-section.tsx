"use client";

import { useRef, useState } from "react";
import {
  addBusinessProfileRequests,
  enableBusinessProfileRequestsNav,
  extractBusinessProfilesFromForm,
} from "@/features/crm/client-dashboard/sections/business-profile/business-profile-request-storage";
import { BusinessProfileAccountBlock, BusinessProfileRequestHeader } from "@/features/crm/client-dashboard/sections/business-profile/components";
import type { ToastType } from "@/features/crm/types/crm";

type BusinessFormEntry = {
  id: number;
};

type ClientBusinessProfileRequestSectionProps = {
  onBack: () => void;
  onContactSupport?: () => void;
  onSubmitted: () => void;
  showToast: (type: ToastType, message: string) => void;
};

export function ClientBusinessProfileRequestSection({ onBack, onContactSupport, onSubmitted, showToast }: ClientBusinessProfileRequestSectionProps) {
  const nextFormIdRef = useRef(1);
  const [businessForms, setBusinessForms] = useState<BusinessFormEntry[]>([{ id: 0 }]);

  const addBusinessForm = () => {
    nextFormIdRef.current += 1;
    setBusinessForms((current) => [...current, { id: nextFormIdRef.current }]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formIds = businessForms.map((form) => form.id);
    const profiles = extractBusinessProfilesFromForm(event.currentTarget, formIds);

    addBusinessProfileRequests(profiles);
    enableBusinessProfileRequestsNav();
    showToast("success", `${profiles.length} business profile request(s) submitted for review`);
    onSubmitted();
  };

  return (
    <section className="grid gap-5">
      <BusinessProfileRequestHeader onAddNew={addBusinessForm} />

      <form className="grid gap-5" onSubmit={handleSubmit}>
        {businessForms.map((form, index) => (
          <BusinessProfileAccountBlock
            formId={form.id}
            index={index}
            isFirst={index === 0}
            isLast={index === businessForms.length - 1}
            key={form.id}
            onAddBusinessAccount={addBusinessForm}
            onBack={onBack}
            onContactSupport={onContactSupport}
            totalForms={businessForms.length}
          />
        ))}
      </form>
    </section>
  );
}