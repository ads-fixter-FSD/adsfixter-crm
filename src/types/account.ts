export type MetaStatus = "Active" | "Disable" | "Inactive";

export type Platform = "meta" | "tiktok" | "google";

export interface AdAccount {
  id: string;
  accountName: string;
  accountId: string;
  platform: Platform;
  creditBalance: number;
  spendThisMonth: number;
  metaStatus: MetaStatus;
  agencyStatus: string;
  lastTopUpLabel: string;
  lastTopUpDate: string;
  updatedLabel: string;
  businessAccountName: string;
  businessAccountId: string;
  adAccountName: string;
  adAccountRefId: string;
  exchangeRate: number;
  walletBalanceBDT: number;
}

export interface TopUpHistoryEntry {
  dateTime: string;
  type: "Top-up";
  amountBDT: number;
  feeBDT: number;
  usd: number;
  description: string;
}

export interface TopUpHistorySummary {
  totalTopUps: number;
  totalAmountBDT: number;
  totalFeesBDT: number;
  currentBalanceUSD: number;
}
