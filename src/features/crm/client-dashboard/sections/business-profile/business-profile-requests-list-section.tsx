"use client";

import { BusinessProfileRequestsTable } from "@/features/crm/client-dashboard/sections/business-profile/components/business-profile-requests-table";
import type { ToastType } from "@/features/crm/types/crm";

type ClientBusinessProfileRequestsListSectionProps = {
  onAddNew: () => void;
  showToast: (type: ToastType, message: string) => void;
};

export function ClientBusinessProfileRequestsListSection({ onAddNew, showToast }: ClientBusinessProfileRequestsListSectionProps) {
  return (
    <section className="grid gap-5">
      <BusinessProfileRequestsTable
        onAddNew={onAddNew}
        showAddButton
        showToast={showToast}
        title="My Business Account Requests"
        variant="page"
      />
    </section>
  );
}
