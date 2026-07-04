"use client";

import { AuthGate } from "@/components/auth/auth-gate";
import { CrmDashboardShell } from "@/features/crm/components/crm-dashboard-shell";

export function HomePageClient() {
  return (
    <AuthGate>
      <CrmDashboardShell />
    </AuthGate>
  );
}
