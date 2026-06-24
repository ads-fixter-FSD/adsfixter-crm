import { Panel } from "@/components/ui/panel";
import { WalletSettingsForm } from "@/features/crm/components/forms/wallet-settings-form";
import { WalletStatement } from "@/features/crm/components/forms/wallet-statement";
import type { DashboardSectionProps } from "@/features/crm/components/dashboard-sections/dashboard-section-types";

export function WalletManagementSection({ data, showToast }: DashboardSectionProps) {
  return (
    <div className="grid grid-cols-12 gap-3">
      <Panel className="col-span-6 max-[1180px]:col-span-12" title="Wallet & Credit Settings">
        <WalletSettingsForm showToast={showToast} />
      </Panel>
      <Panel className="col-span-6 max-[1180px]:col-span-12" title="Balance History">
        <WalletStatement rows={data.wallet} />
      </Panel>
    </div>
  );
}
