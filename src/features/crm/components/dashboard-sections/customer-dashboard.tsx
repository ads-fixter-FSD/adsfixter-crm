"use client";

import { useState } from "react";
import {
  CustomerBusinessProfilesSection,
  CustomerHomeWelcome,
  CustomerOnboardingSteps,
  CustomerRecentActivitiesLayout,
  CustomerSupportChat,
} from "@/features/crm/client-dashboard/sections/home";
import { CustomerPaymentSetupSummary } from "@/features/crm/client-dashboard/sections/home/components/customer-payment-setup-summary";
import type { DashboardSectionWithNavigationProps } from "@/features/crm/components/dashboard-sections/dashboard-section-types";

type CustomerDashboardProps = DashboardSectionWithNavigationProps & {
  onRequestBusinessProfile?: () => void;
};

export function CustomerDashboard({ onSectionChange, onRequestBusinessProfile, showToast }: CustomerDashboardProps) {
  const [isSupportLauncherVisible, setIsSupportLauncherVisible] = useState(false);

  const handleNavigate = (section: string) => {
    onSectionChange?.(section);
  };

  return (
    <>
      <div className="grid gap-5">
        <CustomerHomeWelcome />
        <CustomerOnboardingSteps
          onContactSupport={() => setIsSupportLauncherVisible(true)}
          onNavigate={handleNavigate}
          onRequestBusinessProfile={() => onRequestBusinessProfile?.()}
        />
        <CustomerBusinessProfilesSection onAddNew={() => onSectionChange?.("New Business Profile Request")} showToast={showToast} />
        <CustomerPaymentSetupSummary onEdit={() => onSectionChange?.("Payment Setup")} />
        <CustomerRecentActivitiesLayout />
      </div>

      <CustomerSupportChat isLauncherVisible={isSupportLauncherVisible} onCloseLauncher={() => setIsSupportLauncherVisible(false)} />
    </>
  );
}
