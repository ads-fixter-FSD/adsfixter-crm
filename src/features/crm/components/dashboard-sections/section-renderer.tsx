import { ClientAdAccountsSection } from "@/features/crm/client-dashboard/components/client-ad-accounts-section";
import { ClientBalanceHistorySection } from "@/features/crm/client-dashboard/components/client-balance-history-section";
import { ClientBusinessProfileRequestSection } from "@/features/crm/client-dashboard/components/client-business-profile-request-section";
import { ClientBusinessProfileRequestsListSection } from "@/features/crm/client-dashboard/components/client-business-profile-requests-list-section";
import { ClientHelpSupportSection } from "@/features/crm/client-dashboard/components/client-help-support-section";
import { ClientNewPaymentSection } from "@/features/crm/client-dashboard/components/client-new-payment-section";
import { ClientPaymentSetupSection } from "@/features/crm/client-dashboard/components/client-payment-setup-section";
import { ClientNotificationsSection } from "@/features/crm/client-dashboard/components/client-notifications-section";
import { ClientPaymentHistorySection } from "@/features/crm/client-dashboard/components/client-payment-history-section";
import { ClientSettingsSection } from "@/features/crm/client-dashboard/components/client-settings-section";
import { CustomerRequestForm } from "@/features/crm/components/forms/customer-request-form";
import type { DashboardSectionWithNavigationProps } from "@/features/crm/components/dashboard-sections/dashboard-section-types";

type SectionRendererProps = DashboardSectionWithNavigationProps & {
  section: string;
};

export function SectionRenderer({ data, section, showToast, onSectionChange }: SectionRendererProps) {
  if (section === "Help & Support") {
    return <ClientHelpSupportSection />;
  }

  if (section === "Business Profile Requests") {
    return (
      <ClientBusinessProfileRequestsListSection
        onAddNew={() => onSectionChange?.("New Business Profile Request")}
        showToast={showToast}
      />
    );
  }

  if (section === "New Business Profile Request") {
    return (
      <ClientBusinessProfileRequestSection
        onBack={() => onSectionChange?.("Business Profile Requests")}
        onContactSupport={() => onSectionChange?.("Help & Support")}
        onSubmitted={() => onSectionChange?.("Business Profile Requests")}
        showToast={showToast}
      />
    );
  }

  if (section === "Ad Accounts" || section === "My Accounts") {
    return <ClientAdAccountsSection data={data} showToast={showToast} />;
  }

  if (section === "Payment Setup") {
    return (
      <ClientPaymentSetupSection
        onCancel={() => onSectionChange?.("Dashboard")}
        onSaved={() => onSectionChange?.("Dashboard")}
        showToast={showToast}
      />
    );
  }

  if (section === "Payments" || section === "New Payment") {
    return <ClientNewPaymentSection showToast={showToast} />;
  }

  if (section === "Payment History") {
    return <ClientPaymentHistorySection />;
  }

  if (section === "Balance History") {
    return <ClientBalanceHistorySection />;
  }

  if (section === "Notifications") {
    return <ClientNotificationsSection />;
  }

  if (section === "Settings") {
    return <ClientSettingsSection showToast={showToast} />;
  }

  if (section === "Request Account" || section === "Business Share") {
    return (
      <section className="grid gap-5">
        <div>
          <h1 className="h4 m-0 primary-text">{section}</h1>
          <p className="body-regular m-0 mt-1 subtext">Submit your request details below.</p>
        </div>
        <div className="rounded-xl border border-[var(--line)] bg-[var(--white)] p-5">
          <CustomerRequestForm section={section} showToast={showToast} />
        </div>
      </section>
    );
  }

  return <ClientHelpSupportSection />;
}
