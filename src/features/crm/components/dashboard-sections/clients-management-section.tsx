import { Panel } from "@/components/ui/panel";
import { ClientTable } from "@/features/crm/components/tables/client-table";
import type { DashboardSectionProps } from "@/features/crm/components/dashboard-sections/dashboard-section-types";

export function ClientsManagementSection({ data, showToast }: DashboardSectionProps) {
  return (
    <div className="grid grid-cols-12 gap-3">
      <Panel className="col-span-12" title="Client Management" action="Adjust wallet" onAction={() => showToast("success", "Wallet adjustment saved")}>
        <ClientTable clients={data.clients} showToast={showToast} />
      </Panel>
    </div>
  );
}
