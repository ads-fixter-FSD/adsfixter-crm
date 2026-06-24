import { Panel } from "@/components/ui/panel";
import { MetaAutoAddPanel } from "@/features/crm/ad-accounts/components/auto-add-from-meta/meta-auto-add-panel";
import type { DashboardSectionProps } from "@/features/crm/components/dashboard-sections/dashboard-section-types";

export function AutoAddFromMetaSection({ data, showToast }: DashboardSectionProps) {
  return (
    <div className="grid grid-cols-12 gap-3">
      <Panel className="col-span-12" title="Auto Add From Meta">
        <MetaAutoAddPanel businessManagers={data.businessManagers} showToast={showToast} />
      </Panel>
    </div>
  );
}
