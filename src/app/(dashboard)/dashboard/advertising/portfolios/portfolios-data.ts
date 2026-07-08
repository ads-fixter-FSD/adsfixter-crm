export type PlatformId = "meta" | "google" | "tiktok";

export type BusinessManagerStatus = "Active" | "Request Pending" | "Access Removed" | "Restricted";

export type PortfolioAdAccountStatus = "Active" | "Inactive" | "Pending";

export type BusinessManager = {
  id: string;
  name: string;
  managerId: string;
  platform: PlatformId;
  status: BusinessManagerStatus;
};

export type PortfolioAdAccount = {
  id: string;
  businessManagerId: string;
  name: string;
  accountId: string;
  status: PortfolioAdAccountStatus;
};

export type PlatformTab = {
  id: PlatformId;
  name: string;
  accountsLabel: string;
  connected: boolean;
};

export const PLATFORM_TABS: PlatformTab[] = [
  { id: "meta", name: "Meta", accountsLabel: "4 accounts", connected: true },
  { id: "google", name: "Google", accountsLabel: "4 accounts", connected: true },
  { id: "tiktok", name: "Tiktok", accountsLabel: "Not Connected", connected: false },
];

export const PLATFORM_IMAGES: Record<PlatformId, string> = {
  meta: "/advertising/meta.png",
  google: "/advertising/google.png",
  tiktok: "/advertising/tiktok.png",
};

export const BUSINESS_MANAGERS: BusinessManager[] = [
  {
    id: "bm-1",
    name: "Retallix Business Manager",
    managerId: "223456789012346",
    platform: "meta",
    status: "Active",
  },
  {
    id: "bm-2",
    name: "Abcryl store BM",
    managerId: "123456789012345",
    platform: "meta",
    status: "Request Pending",
  },
  {
    id: "bm-3",
    name: "GlobMarket Trading",
    managerId: "123456789012345",
    platform: "meta",
    status: "Access Removed",
  },
  {
    id: "bm-4",
    name: "LifeStore LLC",
    managerId: "123456789012345",
    platform: "meta",
    status: "Restricted",
  },
  {
    id: "bm-5",
    name: "UrbanCart Growth BM",
    managerId: "334567890123457",
    platform: "google",
    status: "Active",
  },
  {
    id: "bm-6",
    name: "Retailix Ads Manager",
    managerId: "445678901234568",
    platform: "google",
    status: "Request Pending",
  },
  {
    id: "bm-7",
    name: "StyleHub Performance",
    managerId: "556789012345679",
    platform: "google",
    status: "Active",
  },
  {
    id: "bm-8",
    name: "TrendWave Commerce",
    managerId: "667890123456780",
    platform: "tiktok",
    status: "Request Pending",
  },
  {
    id: "bm-9",
    name: "NovaReach BM",
    managerId: "778901234567891",
    platform: "tiktok",
    status: "Restricted",
  },
];

export const PORTFOLIO_AD_ACCOUNTS: PortfolioAdAccount[] = [
  {
    id: "ad-1",
    businessManagerId: "bm-2",
    name: "Abcryl Store Ads",
    accountId: "act_98234190183475",
    status: "Active",
  },
  {
    id: "ad-2",
    businessManagerId: "bm-2",
    name: "Abcryl Retargeting",
    accountId: "act_98234190183476",
    status: "Pending",
  },
  {
    id: "ad-3",
    businessManagerId: "bm-5",
    name: "UrbanCart Growth Ads",
    accountId: "act_11223344556677",
    status: "Active",
  },
  {
    id: "ad-4",
    businessManagerId: "bm-7",
    name: "StyleHub Performance Ads",
    accountId: "act_22334455667788",
    status: "Active",
  },
  {
    id: "ad-5",
    businessManagerId: "bm-7",
    name: "StyleHub Catalog Ads",
    accountId: "act_22334455667789",
    status: "Inactive",
  },
  {
    id: "ad-6",
    businessManagerId: "bm-8",
    name: "TrendWave Commerce Ads",
    accountId: "act_33445566778899",
    status: "Active",
  },
];

export function getBusinessManagersByPlatform(platform: PlatformId) {
  return BUSINESS_MANAGERS.filter((manager) => manager.platform === platform);
}

export function getAdAccountsByBusinessManager(businessManagerId: string) {
  return PORTFOLIO_AD_ACCOUNTS.filter((account) => account.businessManagerId === businessManagerId);
}
