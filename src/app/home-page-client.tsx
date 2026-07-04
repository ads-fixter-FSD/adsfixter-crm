"use client";

import { AuthGate } from "@/features/auth/components/auth-gate";
import { CrmDashboardShell } from "@/features/crm/components/crm-dashboard-shell";

export function HomePageClient() {
  return (
    <AuthGate>
      <CrmDashboardShell />
    </AuthGate>
  );
}
