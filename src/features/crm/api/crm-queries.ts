import { crmOverview } from "@/features/crm/data/mock-crm-data";

export const crmQueryKeys = {
  overview: ["crm", "overview"] as const,
};

export async function getCrmOverview() {
  return crmOverview;
}
