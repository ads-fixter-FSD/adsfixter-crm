export type ToastType = "success" | "error" | "warning";

export type Status = "Active" | "Pending" | "Approved" | "Rejected" | "Suspended" | "Disabled" | "ACTIVE" | "DISABLED" | "CLOSED";

export type MetaAdAccountStatus = "ACTIVE" | "UNSETTLED" | "DISABLED" | "PENDING_RISK_REVIEW" | "PENDING_SETTLEMENT" | "CLOSED" | "UNKNOWN";

export type Metric = {
  label: string;
  value: string;
  trend: string;
};

export type AdAccount = {
  date: string;
  name: string;
  id: string;
  client: string;
  businessManager: string;
  currency: "USD" | "BDT";
  status: MetaAdAccountStatus;
  balance: string;
  spendInfo: string;
  spend: string;
  yesterdaySpend: string;
  cardName: string;
  lastMetaUpdateAt: string;
  notes: string;
};

export type WalletLine = {
  date: string;
  item: string;
  amount: string;
  type: "neutral" | "positive" | "negative" | "warning" | "strong";
};

export type CrmActivity = {
  date: string;
  message: string;
};

export type CrmOverview = {
  customerMetrics: Metric[];
  accounts: AdAccount[];
  wallet: WalletLine[];
  activities: CrmActivity[];
};
