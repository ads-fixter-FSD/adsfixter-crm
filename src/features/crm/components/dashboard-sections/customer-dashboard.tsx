"use client";

import { useState } from "react";
import {
  CustomerBusinessProfilesSection,
  CustomerHomeWelcome,
  CustomerOnboardingSteps,
  CustomerRecentActivitiesLayout,
  CustomerSupportChat,
} from "@/features/crm/client-dashboard/sections/home";
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
