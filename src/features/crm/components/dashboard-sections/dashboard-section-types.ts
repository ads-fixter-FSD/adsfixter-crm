import type { ReactNode } from "react";
import type { CrmOverview, ToastType } from "@/features/crm/types/crm";

export type DashboardSectionProps = {
  data: CrmOverview;
  dateFilterControl?: ReactNode;
  dateRangeKey?: string;
  dateRangeLabel?: string;
  showToast: (type: ToastType, message: string) => void;
};

export type DashboardSectionWithNavigationProps = DashboardSectionProps & {
  onSectionChange?: (section: string) => void;
};
