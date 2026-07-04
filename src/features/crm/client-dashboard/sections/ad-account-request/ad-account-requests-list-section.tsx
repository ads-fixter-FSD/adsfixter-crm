"use client";

import { AdAccountRequestsTable } from "@/features/crm/client-dashboard/sections/ad-account-request/components/ad-account-requests-table";
import type { ToastType } from "@/features/crm/types/crm";

type AdAccountRequestsListSectionProps = {
  onAddNew: () => void;
  showToast: (type: ToastType, message: string) => void;
};

export function AdAccountRequestsListSection({ onAddNew, showToast }: AdAccountRequestsListSectionProps) {
  return (
    <section className="grid gap-5">
      <AdAccountRequestsTable onAddNew={onAddNew} showAddButton showToast={showToast} title="My Ad Account Requests" />
    </section>
  );
}

export { AdAccountRequestsListSection as ClientAdAccountRequestsListSection };
