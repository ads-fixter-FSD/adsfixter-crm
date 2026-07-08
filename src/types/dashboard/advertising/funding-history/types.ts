export type Platform = "meta" | "google" | "tiktok";

export type FundingRow = {
  id: string;
  date: string;
  time: string;
  timestamp: number; // sort করার জন্য আসল epoch time
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

export type SortKey =
  | "timestamp"
  | "accountName"
  | "amount"
  | "fee"
  | "usd"
  | "remainingBal";

export type SortDirection = "asc" | "desc" | null;

export type SortConfig = {
  key: SortKey | null;
  direction: SortDirection;
};