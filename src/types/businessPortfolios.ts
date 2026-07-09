export type PlatformKey = "meta" | "google" | "tiktok";

export type BMStatus =
  | "active"
  | "request-pending"
  | "access-removed"
  | "restricted";

export type AdAccountStatus =
  | "active"
  | "disabled"
  | "inactive"
  | "request-pending";

export interface AdAccountItem {
  id: string;
  name: string;
  accountId: string;
  status: AdAccountStatus;
  isPrimary?: boolean; // shows the small inline badge next to the name
}

export interface BusinessManager {
  id: string;
  name: string;
  bmId: string;
  status: BMStatus;
  adAccounts: AdAccountItem[];
}

export interface PlatformInfo {
  key: PlatformKey;
  label: string;
  accountsCount: number | null; // null => "Not Connected"
  connected: boolean;
}
