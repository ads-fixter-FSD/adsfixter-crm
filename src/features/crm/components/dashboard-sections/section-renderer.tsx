import { AdAccountsDatabaseSection, AutoAddFromMetaSection, CreateNewAccountSection } from "@/features/crm/ad-accounts";
import { AllBusinessManagersSection } from "@/features/crm/business-managers/components/all-business-managers-section";
import { BusinessManagerPendingRequestsSection } from "@/features/crm/business-managers/components/business-manager-pending-requests-section";
import { AllClientsSection } from "@/features/crm/clients/components/all-clients-section";
import { PendingClientApprovalsSection } from "@/features/crm/clients/components/pending-client-approvals-section";
import { ClientAdAccountsSection } from "@/features/crm/client-dashboard/components/client-ad-accounts-section";
import { ClientBalanceHistorySection } from "@/features/crm/client-dashboard/components/client-balance-history-section";
import { ClientNewPaymentSection } from "@/features/crm/client-dashboard/components/client-new-payment-section";
import { ClientNotificationsSection } from "@/features/crm/client-dashboard/components/client-notifications-section";
import { ClientPaymentHistorySection } from "@/features/crm/client-dashboard/components/client-payment-history-section";
import { ClientSettingsSection } from "@/features/crm/client-dashboard/components/client-settings-section";
import { ClientsManagementSection } from "@/features/crm/components/dashboard-sections/clients-management-section";
import { ModulePlaceholderSection } from "@/features/crm/components/dashboard-sections/module-placeholder-section";
import { RequestWorkflowSection } from "@/features/crm/components/dashboard-sections/request-workflow-section";
import { WalletManagementSection } from "@/features/crm/components/dashboard-sections/wallet-management-section";
import { CreateNotificationsSection } from "@/features/crm/notifications/components/create-notifications-section";
import { BmShareRequestsSection } from "@/features/crm/requests/components/bm-share-requests/bm-share-requests-section";
import { FailedTopUpsSection } from "@/features/crm/requests/components/failed-top-ups/failed-top-ups-section";
import { NewAccountRequestsSection } from "@/features/crm/requests/components/new-account-requests/new-account-requests-section";
import { TopUpRequestsSection } from "@/features/crm/requests/components/top-up-requests/top-up-requests-section";
import { AccountsOverviewSection } from "@/features/crm/reports/components/accounts-overview-section";
import { RevenueReportsSection } from "@/features/crm/reports/components/revenue-reports-section";
import { AdminSettingsSection } from "@/features/crm/settings/components/admin-settings-section";
import { ProfileUpdateSection } from "@/features/crm/settings/components/profile-update-section";
import type { DashboardSectionWithNavigationProps } from "@/features/crm/components/dashboard-sections/dashboard-section-types";
import type { Role } from "@/features/crm/types/crm";

type SectionRendererProps = DashboardSectionWithNavigationProps & {
  role: Role;
  section: string;
};

export function SectionRenderer({ data, dateFilterControl, dateRangeLabel, role, section, showToast, onSectionChange }: SectionRendererProps) {
  if (section === "New Account Requests") {
    return <NewAccountRequestsSection showToast={showToast} />;
  }

  if (section === "Top-Up Requests") {
    return <TopUpRequestsSection showToast={showToast} />;
  }

  if (section === "BM Share Requests") {
    return <BmShareRequestsSection showToast={showToast} />;
  }

  if (section === "Failed Top-ups") {
    return <FailedTopUpsSection showToast={showToast} />;
  }

  if (section === "Create Notifications") {
    return <CreateNotificationsSection showToast={showToast} />;
  }

  if (section === "Notifications" && role === "Super Admin") {
    return <CreateNotificationsSection showToast={showToast} />;
  }

  if ((section === "Payments" || section === "New Payment") && role === "Customer") {
    return <ClientNewPaymentSection showToast={showToast} />;
  }

  if (section === "Payment History" && role === "Customer") {
    return <ClientPaymentHistorySection />;
  }

  if (section === "Balance History" && role === "Customer") {
    return <ClientBalanceHistorySection />;
  }

  if (section === "Notifications" && role === "Customer") {
    return <ClientNotificationsSection />;
  }

  if (section === "Business Managers" || section === "All Business Managers") {
    return <AllBusinessManagersSection showToast={showToast} />;
  }

  if (section === "Pending Requests") {
    return <BusinessManagerPendingRequestsSection showToast={showToast} onSectionChange={onSectionChange} />;
  }

  if (section.includes("Request") || section === "Business Share" || section === "Payments" || section === "Top-Up Requests" || section === "BM Share Requests") {
    return <RequestWorkflowSection data={data} role={role} section={section} showToast={showToast} />;
  }

  if ((section === "Ad Accounts" || section === "My Accounts") && role === "Customer") {
    return <ClientAdAccountsSection data={data} showToast={showToast} />;
  }

  if (section === "Ad Accounts" || section === "My Accounts") {
    return <AdAccountsDatabaseSection data={data} dateFilterControl={dateFilterControl} dateRangeLabel={dateRangeLabel} showToast={showToast} onSectionChange={onSectionChange} />;
  }

  if (section === "Create New Account") {
    return <CreateNewAccountSection data={data} showToast={showToast} onSectionChange={onSectionChange} />;
  }

  if (section === "Auto Add From Meta") {
    return <AutoAddFromMetaSection data={data} showToast={showToast} />;
  }

  if (section === "Clients" || section === "All Clients") {
    return <AllClientsSection data={data} showToast={showToast} />;
  }

  if (section === "Pending Approvals") {
    return <PendingClientApprovalsSection showToast={showToast} onSectionChange={onSectionChange} />;
  }

  if (section === "Client Management") {
    return <ClientsManagementSection data={data} showToast={showToast} />;
  }

  if (section === "Settings" && role === "Customer") {
    return <ClientSettingsSection showToast={showToast} />;
  }

  if (section === "Settings") {
    return <AdminSettingsSection showToast={showToast} />;
  }

  if (section === "Profile Update") {
    return <ProfileUpdateSection showToast={showToast} />;
  }

  if (section === "Reports" || section === "Accounts Overview") {
    return <AccountsOverviewSection data={data} />;
  }

  if (section === "Revenue Reports") {
    return <RevenueReportsSection data={data} />;
  }

  if (section === "Wallet" || section === "Wallet Settings") {
    return <WalletManagementSection data={data} showToast={showToast} />;
  }

  return <ModulePlaceholderSection section={section} showToast={showToast} />;
}
