"use client";

import { BusinessProfileRequestsTable } from "@/features/crm/client-dashboard/sections/business-profile/components/business-profile-requests-table";
import { hasSubmittedBusinessProfile } from "@/features/crm/client-dashboard/sections/home/customer-onboarding-storage";
import type { ToastType } from "@/features/crm/types/crm";

type CustomerBusinessProfilesSectionProps = {
  onAddNew: () => void;
  showToast: (type: ToastType, message: string) => void;
};

export function CustomerBusinessProfilesSection({ onAddNew, showToast }: CustomerBusinessProfilesSectionProps) {
  if (!hasSubmittedBusinessProfile()) {
    return null;
  }

  return (
    <section className="grid gap-4 rounded-xl border border-[var(--line)] bg-[var(--white)]">
      <BusinessProfileRequestsTable
        onAddNew={onAddNew}
        showAddButton
        showToast={showToast}
        title="Business Profiles"
        variant="home"
      />
    </section>
  );
}
