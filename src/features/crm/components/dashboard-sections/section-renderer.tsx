"use client";

import { useRouter } from "next/navigation";
import {
  ClientAdAccountsSection,
  ClientBalanceHistorySection,
  ClientAdAccountRequestsListSection,
  ClientBusinessProfileRequestSection,
  ClientBusinessProfileRequestsListSection,
  ClientHelpSupportSection,
  ClientNewPaymentSection,
  ClientNotificationsSection,
  ClientPaymentHistorySection,
  ClientPaymentSetupSection,
  ClientSettingsSection,
} from "@/features/crm/client-dashboard/sections";
import { ClientAdAccountRequestSection } from "@/features/crm/client-dashboard/sections/ad-account-request/ad-account-request-section";
import { isAdAccountRequestSubmitted } from "@/features/crm/client-dashboard/sections/ad-account-request/ad-account-request-storage";
import { CustomerSetupCompleteSection } from "@/features/crm/client-dashboard/sections/home";
import { markStartAdvertisingReady } from "@/features/crm/client-dashboard/sections/home/customer-onboarding-storage";
import { CustomerRequestForm } from "@/features/crm/components/forms/customer-request-form";
import type { DashboardSectionWithNavigationProps } from "@/features/crm/components/dashboard-sections/dashboard-section-types";

type SectionRendererProps = DashboardSectionWithNavigationProps & {
  section: string;
};

export function SectionRenderer({ data, section, showToast, onSectionChange }: SectionRendererProps) {
  const router = useRouter();

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

  if (section === "Ad Account Requests") {
    return (
      <ClientAdAccountRequestsListSection
        onAddNew={() => onSectionChange?.("Request Account")}
        showToast={showToast}
      />
    );
  }

  if (section === "Request Account") {
    return (
      <ClientAdAccountRequestSection
        onBack={() => onSectionChange?.(isAdAccountRequestSubmitted() ? "Ad Account Requests" : "Dashboard")}
        onContactSupport={() => onSectionChange?.("Help & Support")}
        onSubmitted={() => onSectionChange?.("Ad Account Requests")}
        showToast={showToast}
      />
    );
  }

  if (section === "Setup Complete") {
    if (!isAdAccountRequestSubmitted()) {
      onSectionChange?.("Dashboard");
      return null;
    }

    return (
      <CustomerSetupCompleteSection
        onGrow={() => {
          markStartAdvertisingReady();
          window.localStorage.setItem("adsfixter-theme", "light");
          document.documentElement.dataset.theme = "light";
          router.push("/dashboard");
        }}
      />
    );
  }

  if (section === "Business Share") {
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
