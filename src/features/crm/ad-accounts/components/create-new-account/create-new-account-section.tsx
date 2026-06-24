import { Panel } from "@/components/ui/panel";
import { CreateAdAccountForm } from "@/features/crm/ad-accounts/components/create-new-account/create-ad-account-form";
import type { DashboardSectionWithNavigationProps } from "@/features/crm/components/dashboard-sections/dashboard-section-types";

export function CreateNewAccountSection({ data, showToast, onSectionChange }: DashboardSectionWithNavigationProps) {
  return (
    <div className="grid grid-cols-12 gap-3">
      <Panel className="col-span-12 w-full max-w-[980px] justify-self-center" title="Create New Account">
        <CreateAdAccountForm businessManagers={data.businessManagers} clients={data.clients} onBack={() => onSectionChange?.("Ad Accounts")} showToast={showToast} />
      </Panel>
    </div>
  );
}
