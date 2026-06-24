export type Role = "Super Admin" | "Maintainer" | "Customer";

export type ToastType = "success" | "error" | "warning";

export type MetaAdAccountStatus = "ACTIVE" | "UNSETTLED" | "DISABLED" | "PENDING_RISK_REVIEW" | "PENDING_SETTLEMENT" | "CLOSED" | "UNKNOWN";

export type Status = "Active" | "Pending" | "Approved" | "Rejected" | "Disabled" | "Suspended" | MetaAdAccountStatus;

export type Metric = {
  label: string;
  value: string;
  trend: string;
};

export type CrmRequest = {
  name: string;
  type: "Top-up" | "New Ad Account" | "Business Share";
  amount: string;
  status: Status;
  method: string;
};

export type AdAccount = {
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

export type Client = {
  name: string;
  email: string;
  balance: string;
  credit: string;
  dailyLimit: string;
  status: Status;
};

export type BusinessManager = {
  id: string;
  name: string;
};

export type WalletLine = {
  item: string;
  amount: string;
  type: "neutral" | "positive" | "negative" | "warning" | "strong";
};

export type CrmOverview = {
  adminMetrics: Metric[];
  customerMetrics: Metric[];
  requests: CrmRequest[];
  accounts: AdAccount[];
  businessManagers: BusinessManager[];
  clients: Client[];
  wallet: WalletLine[];
  activities: string[];
};
