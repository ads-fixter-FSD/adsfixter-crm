import { Panel } from "@/components/ui/panel";
import { CustomerRequestForm } from "@/features/crm/components/forms/customer-request-form";
import { ApprovalRuleList } from "@/features/crm/components/forms/approval-rule-list";
import { RequestTable } from "@/features/crm/components/tables/request-table";
import type { DashboardSectionProps } from "@/features/crm/components/dashboard-sections/dashboard-section-types";
import type { Role } from "@/features/crm/types/crm";

type RequestWorkflowSectionProps = DashboardSectionProps & {
  role: Role;
  section: string;
};

export function RequestWorkflowSection({ data, role, section, showToast }: RequestWorkflowSectionProps) {
  return (
    <div className="grid grid-cols-12 gap-3">
      <Panel className="col-span-8 max-[1180px]:col-span-12" title={role === "Customer" ? "Submit Request" : "Request Queue"}>
        {role === "Customer" ? <CustomerRequestForm section={section} showToast={showToast} /> : <RequestTable requests={data.requests} showToast={showToast} />}
      </Panel>
      <Panel className="col-span-4 max-[1180px]:col-span-12" title="Approval Rules">
        <ApprovalRuleList />
      </Panel>
    </div>
  );
}
