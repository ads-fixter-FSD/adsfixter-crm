export type Role = "Super Admin" | "Maintainer" | "Customer";

export type ToastType = "success" | "error" | "warning";

export type Status = "Active" | "Pending" | "Approved" | "Rejected" | "Disabled" | "Suspended";

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
  status: Status;
  spend: string;
};

export type Client = {
  name: string;
  email: string;
  balance: string;
  credit: string;
  dailyLimit: string;
  status: Status;
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
  clients: Client[];
  wallet: WalletLine[];
  activities: string[];
};
