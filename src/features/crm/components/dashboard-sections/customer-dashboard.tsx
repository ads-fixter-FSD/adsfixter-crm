"use client";

import { useState } from "react";
import { CustomerBusinessProfilesSection } from "@/features/crm/client-dashboard/components/home/customer-business-profiles-section";
import { CustomerHomeWelcome } from "@/features/crm/client-dashboard/components/home/customer-home-sections";
import { CustomerOnboardingSteps } from "@/features/crm/client-dashboard/components/home/customer-onboarding-steps";
import { CustomerRecentActivitiesLayout } from "@/features/crm/client-dashboard/components/home/customer-recent-activities-layout";
import { CustomerSupportChat } from "@/features/crm/client-dashboard/components/home/customer-support-chat";
import type { DashboardSectionWithNavigationProps } from "@/features/crm/components/dashboard-sections/dashboard-section-types";

type CustomerDashboardProps = DashboardSectionWithNavigationProps & {
  onRequestBusinessProfile?: () => void;
};

export function CustomerDashboard({ onSectionChange, onRequestBusinessProfile, showToast }: CustomerDashboardProps) {
  const [isSupportLauncherVisible, setIsSupportLauncherVisible] = useState(false);

  return (
    <>
      <div className="grid gap-5">
        <CustomerHomeWelcome />
        <CustomerOnboardingSteps
          onContactSupport={() => setIsSupportLauncherVisible(true)}
          onPaymentSetup={() => onSectionChange?.("Payment Setup")}
          onRequestBusinessProfile={() => onRequestBusinessProfile?.()}
        />
        <CustomerBusinessProfilesSection onAddNew={() => onSectionChange?.("New Business Profile Request")} showToast={showToast} />
        <CustomerRecentActivitiesLayout />
      </div>

      <CustomerSupportChat isLauncherVisible={isSupportLauncherVisible} onCloseLauncher={() => setIsSupportLauncherVisible(false)} />
    </>
  );
}
