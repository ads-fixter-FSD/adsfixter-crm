import { AdAccountsDatabaseSection, AutoAddFromMetaSection, CreateNewAccountSection } from "@/features/crm/ad-accounts";
import { ClientsManagementSection } from "@/features/crm/components/dashboard-sections/clients-management-section";
import { ModulePlaceholderSection } from "@/features/crm/components/dashboard-sections/module-placeholder-section";
import { RequestWorkflowSection } from "@/features/crm/components/dashboard-sections/request-workflow-section";
import { WalletManagementSection } from "@/features/crm/components/dashboard-sections/wallet-management-section";
import type { DashboardSectionWithNavigationProps } from "@/features/crm/components/dashboard-sections/dashboard-section-types";
import type { Role } from "@/features/crm/types/crm";

type SectionRendererProps = DashboardSectionWithNavigationProps & {
  role: Role;
  section: string;
};

export function SectionRenderer({ data, role, section, showToast, onSectionChange }: SectionRendererProps) {
  if (section.includes("Request") || section === "Business Share" || section === "Payments") {
    return <RequestWorkflowSection data={data} role={role} section={section} showToast={showToast} />;
  }

  if (section === "Ad Accounts" || section === "My Accounts") {
    return <AdAccountsDatabaseSection data={data} showToast={showToast} onSectionChange={onSectionChange} />;
  }

  if (section === "Create New Account") {
    return <CreateNewAccountSection data={data} showToast={showToast} onSectionChange={onSectionChange} />;
  }

  if (section === "Auto Add From Meta") {
    return <AutoAddFromMetaSection data={data} showToast={showToast} />;
  }

  if (section === "Clients") {
    return <ClientsManagementSection data={data} showToast={showToast} />;
  }

  if (section === "Wallet" || section === "Wallet Settings") {
    return <WalletManagementSection data={data} showToast={showToast} />;
  }

  return <ModulePlaceholderSection section={section} showToast={showToast} />;
}
