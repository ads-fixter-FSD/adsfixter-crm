export type Platform = "meta" | "google" | "tiktok";

export type FundingRow = {
  id: string;
  date: string;
  time: string;
  accountName: string;
  accountId: string;
  platform: Platform;
  amount: string;
  fee: string;
  usd: string;
  remainingBal: string;
  description: string;
};

export type TabItem = {
  key: string;
  label: string;
  count: number;
};