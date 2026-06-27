import { CreateAdAccountForm } from "@/features/crm/ad-accounts/components/create-new-account/create-ad-account-form";
import type { DashboardSectionWithNavigationProps } from "@/features/crm/components/dashboard-sections/dashboard-section-types";

export function CreateNewAccountSection({ data, showToast, onSectionChange }: DashboardSectionWithNavigationProps) {
  return (
    <div className="grid grid-cols-12 gap-3">
      <section className="col-span-12 w-full rounded-xl border-2 border-[var(--line)] bg-[var(--white)] p-4">
        <CreateAdAccountForm businessManagers={data.businessManagers} clients={data.clients} onBack={() => onSectionChange?.("Ad Accounts")} showToast={showToast} />
      </section>
    </div>
  );
}
