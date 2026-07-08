import { isDateWithinRange, type DateRangeValue } from "@/components/ui/date-range-filter";

export type OverviewAccount = {
  id: string;
  platform: "meta" | "google" | "tiktok";
  active: boolean;
  spend: number;
  credit: number;
  date: string;
};

export type AttentionRow = {
  id: string;
  platform: "meta" | "google" | "tiktok";
  accountName: string;
  accountId: string;
  metaStatus: string;
  summary: string;
  updatedAgo: string;
  ticketStatus: string;
  ticketTone: "neutral" | "progress" | "working" | "waiting" | "error";
  actionLabel: string;
  date: string;
};

export type ActivityItem = {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  status: "Pending" | "Approved" | "Rejected";
  date: string;
};

export type PlatformSummary = {
  id: "meta" | "google" | "tiktok";
  name: string;
  accounts: number;
  spend: number;
};

export type OverviewStats = {
  totalAdAccounts: number;
  activeAdAccounts: number;
  totalSpend: number;
  adCredit: number;
  needsAttention: number;
};

const ACCOUNTS: OverviewAccount[] = [
  { id: "a1", platform: "meta", active: true, spend: 8.5, credit: 12, date: "2026-07-05" },
  { id: "a2", platform: "meta", active: true, spend: 4.0, credit: 6, date: "2026-07-12" },
  { id: "a3", platform: "google", active: true, spend: 3.5, credit: 5, date: "2026-06-18" },
  { id: "a4", platform: "google", active: false, spend: 1.0, credit: 2, date: "2026-06-22" },
  { id: "a5", platform: "tiktok", active: true, spend: 2.0, credit: 4, date: "2026-05-10" },
  { id: "a6", platform: "tiktok", active: false, spend: 0.5, credit: 1, date: "2026-01-15" },
];

const ATTENTION_ROWS: AttentionRow[] = [
  {
    id: "ADF1001",
    platform: "meta",
    accountName: "UrbanCart Fashion",
    accountId: "123456789012345",
    metaStatus: "Under Review",
    summary: "Credit balance is insufficient for top-up",
    updatedAgo: "5 min ago",
    ticketStatus: "N/A",
    ticketTone: "neutral",
    actionLabel: "Fix Now →",
    date: "2026-07-08",
  },
  {
    id: "ADF1002",
    platform: "google",
    accountName: "UrbanCart Fashion",
    accountId: "123456789012346",
    metaStatus: "Payment Failed",
    summary: "Credit balance is insufficient for top-up",
    updatedAgo: "1 hr ago",
    ticketStatus: "In Progress",
    ticketTone: "progress",
    actionLabel: "Top-Up →",
    date: "2026-07-07",
  },
  {
    id: "ADF1003",
    platform: "tiktok",
    accountName: "UrbanCart Fashion",
    accountId: "123456789012347",
    metaStatus: "Disable",
    summary: "Credit balance is insufficient for top-up",
    updatedAgo: "1 day ago",
    ticketStatus: "Working",
    ticketTone: "working",
    actionLabel: "Fix Now →",
    date: "2026-06-28",
  },
  {
    id: "ADF1004",
    platform: "meta",
    accountName: "Retailix Growth Co",
    accountId: "123456789012348",
    metaStatus: "Restricted",
    summary: "Account access needs renewal",
    updatedAgo: "1 day ago",
    ticketStatus: "Waiting for Update",
    ticketTone: "waiting",
    actionLabel: "Fix Now →",
    date: "2026-06-15",
  },
  {
    id: "ADF1005",
    platform: "google",
    accountName: "Retailix Growth Co",
    accountId: "123456789012349",
    metaStatus: "Verification Required",
    summary: "Business verification documents missing",
    updatedAgo: "2 days ago",
    ticketStatus: "Not Found",
    ticketTone: "error",
    actionLabel: "Top-Up →",
    date: "2026-05-20",
  },
  {
    id: "ADF1006",
    platform: "tiktok",
    accountName: "StyleHub BD",
    accountId: "123456789012350",
    metaStatus: "Funding Required",
    summary: "Minimum funding threshold not met",
    updatedAgo: "3 days ago",
    ticketStatus: "In Progress",
    ticketTone: "progress",
    actionLabel: "Fix Now →",
    date: "2026-02-10",
  },
  {
    id: "ADF1007",
    platform: "meta",
    accountName: "StyleHub BD",
    accountId: "123456789012351",
    metaStatus: "Share Expired",
    summary: "BM share link has expired",
    updatedAgo: "1 week ago",
    ticketStatus: "Working",
    ticketTone: "working",
    actionLabel: "Top-Up →",
    date: "2026-01-08",
  },
];

const ACTIVITIES: ActivityItem[] = [
  {
    id: "1",
    title: "Top-Up Completed",
    description: "$500.00 added to ADF_1102_Retailix",
    timeAgo: "10 min ago",
    status: "Pending",
    date: "2026-07-08",
  },
  {
    id: "2",
    title: "Top up Approved",
    description: "$500.00 added to ADF_1102_Retailix",
    timeAgo: "1 day",
    status: "Approved",
    date: "2026-07-06",
  },
  {
    id: "3",
    title: "Payment Received",
    description: "$320.00 added to ADF_1101_UrbanCart",
    timeAgo: "3 days",
    status: "Approved",
    date: "2026-06-20",
  },
  {
    id: "4",
    title: "Payment Failed",
    description: "$150.00 failed for ADF_1103_StyleHub",
    timeAgo: "1 week",
    status: "Rejected",
    date: "2026-05-05",
  },
  {
    id: "5",
    title: "Account Activated",
    description: "ADF_1104_GrowthCo is now active",
    timeAgo: "2 weeks",
    status: "Approved",
    date: "2026-01-20",
  },
];

const PLATFORM_NAMES: Record<PlatformSummary["id"], string> = {
  meta: "Meta",
  google: "Google",
  tiktok: "Tiktok",
};

function aggregatePlatforms(accounts: OverviewAccount[]): PlatformSummary[] {
  const platforms: PlatformSummary["id"][] = ["meta", "google", "tiktok"];

  return platforms.map((id) => {
    const platformAccounts = accounts.filter((account) => account.platform === id);
    return {
      id,
      name: PLATFORM_NAMES[id],
      accounts: platformAccounts.length,
      spend: platformAccounts.reduce((sum, account) => sum + account.spend, 0),
    };
  });
}

function computeStats(accounts: OverviewAccount[], attentionRows: AttentionRow[]): OverviewStats {
  return {
    totalAdAccounts: accounts.length,
    activeAdAccounts: accounts.filter((account) => account.active).length,
    totalSpend: accounts.reduce((sum, account) => sum + account.spend, 0),
    adCredit: accounts.reduce((sum, account) => sum + account.credit, 0),
    needsAttention: attentionRows.length,
  };
}

export function getFilteredOverviewData(range: DateRangeValue) {
  const accounts = ACCOUNTS.filter((account) => isDateWithinRange(account.date, range));
  const attentionRows = ATTENTION_ROWS.filter((row) => isDateWithinRange(row.date, range));
  const activities = ACTIVITIES.filter((activity) => isDateWithinRange(activity.date, range));

  return {
    stats: computeStats(accounts, attentionRows),
    platforms: aggregatePlatforms(accounts),
    attentionRows,
    activities,
  };
}
