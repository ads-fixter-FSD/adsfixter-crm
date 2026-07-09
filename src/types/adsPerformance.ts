export interface AdAccountOption {
  id: string;
  name: string;
  accountId: string;
}

export type StatIconKey = "ads" | "ctr" | "reach" | "spend";

export interface PerformanceStat {
  key: StatIconKey;
  label: string;
  value: string;
  description: string;
}

export interface GrowthTrendPoint {
  week: string;
  reach: number;
  ctr: number;
  dateRangeLabel: string;
}

export type AdStatus = "active" | "paused";

export interface AdPerformanceRow {
  id: string;
  campaignName: string;
  campaignId: string;
  adName: string;
  adId: string;
  thumbnailColor: string;
  spend: number;
  ctr: number;
  cpm: number;
  reach: number;
  reachLabel: string;
  results: string;
  isTopPerforming: boolean;
  status: AdStatus;
}
