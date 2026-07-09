// types/campaign.types.ts
export interface Campaign {
  id: string;
  name: string;
  campaignId: string;
  status: 'Active' | 'Learning' | 'Paused' | 'Draft';
  budget: number;
  currency: string;
  budgetType: 'daily' | 'lifetime';
  totalSpend: number;
  results: {
    type: 'purchase' | 'leads' | 'link_clicks' | 'impressions';
    count: number;
  };
  adAccountId: string;
  startDate: string;
  endDate?: string;
}

export interface CampaignStats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalSpend: number;
  currency: string;
}

export interface CampaignOverviewProps {
  title?: string;
  subtitle?: string;
  campaigns: Campaign[];
  totalCampaigns?: number;
}