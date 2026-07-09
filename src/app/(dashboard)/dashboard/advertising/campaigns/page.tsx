
"use client";

import CampaignStatsCards from "@/components/dashboard/campaigns/CampaignStatsCards";
import CampaignOverview from "@/components/dashboard/campaigns/CampaignOverview";
import campaignData from "@/components/dashboard/campaigns/data/campaigns.json";
import { Campaign } from "@/types/campaign.types";

const totalIcon = (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.4459 2.6408C5.33645 3.23476 5.23262 4.37133 5.23262 4.97539C5.23262 5.57944 5.26006 6.7355 5.4459 7.30997M5.4459 2.6408C5.18035 2.62222 3.98743 2.62185 2.83977 2.62631C2.51387 2.62757 2.35093 2.6282 2.21109 2.64862C1.33601 2.77636 0.644222 3.47084 0.519871 4.34641C0.5 4.48632 0.5 4.65112 0.5 4.98072C0.5 5.312 0.5 5.47764 0.519995 5.61798C0.645176 6.4966 1.34116 7.19188 2.21992 7.31617C2.36028 7.33602 2.52417 7.33586 2.85196 7.33552C3.99587 7.33436 5.18129 7.32848 5.4459 7.30997M5.4459 2.6408C7.03207 1.25102 7.82515 0.556131 8.49084 0.505986C9.17101 0.454748 9.83039 0.75369 10.2401 1.29904C10.6411 1.83277 10.6411 2.88265 10.6411 4.98243C10.6411 7.20243 10.6411 8.31244 10.2223 8.85316C9.80713 9.38915 9.08973 9.69206 8.41607 9.6158C7.73647 9.53885 6.97295 8.79589 5.4459 7.30997M1.85234 7.33279L1.83764 10.7529C1.83527 11.3058 2.28303 11.7553 2.836 11.755C3.3869 11.7547 3.83333 11.3081 3.83333 10.7572V7.33313M11.9932 2.25828C12.6692 4.29611 12.6692 5.65466 11.9932 7.69249" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const activeIcon = (
  <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.91771 6.94362C1.08436 6.81395 0.667688 6.74912 0.552412 6.51783C0.516777 6.44634 0.498792 6.36734 0.499962 6.28747C0.503746 6.02908 0.851281 5.79025 1.54635 5.31258L7.12658 1.47775C8.17609 0.756504 8.70085 0.395881 8.96407 0.526444C9.04386 0.566024 9.11163 0.6262 9.16038 0.700751C9.32116 0.946673 9.02516 1.51041 8.43314 2.63788L7.61446 4.19705C7.39501 4.61499 7.28528 4.82397 7.33187 5.00923C7.34675 5.06838 7.37232 5.12431 7.40732 5.17425C7.51696 5.33068 7.7468 5.3844 8.20647 5.49183L9.54735 5.80522C10.345 5.99164 10.7438 6.08485 10.8425 6.32049C10.873 6.39344 10.8858 6.4726 10.8798 6.55147C10.8605 6.80619 10.5114 7.02037 9.81317 7.44873L4.14195 10.9282C3.09605 11.5698 2.5731 11.8907 2.3182 11.75C2.24081 11.7073 2.17613 11.6449 2.13074 11.569C1.98123 11.3192 2.28353 10.7853 2.88813 9.71758L3.61174 8.43962C3.86857 7.98604 3.99699 7.75925 3.94521 7.56256C3.92876 7.5001 3.90037 7.44142 3.8616 7.38976C3.73953 7.22709 3.482 7.18701 2.96695 7.10687L1.91771 6.94362Z" stroke="currentColor" strokeLinejoin="round"/>
  </svg>
);

const averageROASIcon = (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 12.5C9.81371 12.5 12.5 9.81371 12.5 6.5C12.5 3.18629 9.81371 0.5 6.5 0.5C3.18629 0.5 0.5 3.18629 0.5 6.5C0.5 9.81371 3.18629 12.5 6.5 12.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.5 4.5C5.03333 3.5 6.16667 3.5 6.5 3.5C6.83333 3.5 7.96667 3.5 8.5 4.5C8.5 5 8.5 5.5 8.16667 6.16667C7.83333 6.83333 7.5 6.83333 7.5 7.5M7.5 9.5H7.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const spendIcon = (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.16667 5.16667C8.16667 4.43029 7.56971 3.83333 6.83333 3.83333H6.5M6.5 3.83333H6.16667C5.43029 3.83333 4.83333 4.43029 4.83333 5.16667C4.83333 5.90305 5.43029 6.5 6.16667 6.5H6.5M6.5 3.83333V2.83333M6.5 3.83333V6.5M6.5 6.5H6.83333C7.56971 6.5 8.16667 7.09695 8.16667 7.83333C8.16667 8.56971 7.56971 9.16667 6.83333 9.16667H6.5M6.5 6.5V9.16667M6.5 9.16667H6.16667C5.43029 9.16667 4.83333 8.56971 4.83333 7.83333M6.5 9.16667V10.1667M12.5 6.5C12.5 9.81371 9.81371 12.5 6.5 12.5C3.18629 12.5 0.5 9.81371 0.5 6.5C0.5 3.18629 3.18629 0.5 6.5 0.5C9.81371 0.5 12.5 3.18629 12.5 6.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function CampaignsPage() {
  const campaignStats = [
    { 
      id: "total-campaigns", 
      icon: totalIcon, 
      title: "Total Campaigns", 
      value: campaignData.overview.totalCampaigns, 
      subtitle: "All assigned campaigns" 
    },
    { 
      id: "active-campaigns", 
      icon: activeIcon, 
      title: "Active Campaigns", 
      value: campaignData.overview.activeCampaigns, 
      subtitle: "Running campaigns" 
    },
    { 
      id: "average-roas", 
      icon: averageROASIcon, 
      title: "Average ROAS", 
      value: "3.4x", 
      subtitle: "Average return on ad spend" 
    },
    { 
      id: "total-spend", 
      icon: spendIcon, 
      title: "Total Spend", 
      value: `${campaignData.overview.currency}${campaignData.overview.totalSpend.toFixed(2)}`, 
      subtitle: "Across selected period" 
    },
  ];

  return (
    <div className="flex w-full flex-col gap-5 pb-10">
      <CampaignStatsCards
        title="Campaigns Overview"
        subtitle="All campaigns across your assigned ad accounts, in one place."
        stats={campaignStats}
      />

      <CampaignOverview
        title="All Campaigns"
        subtitle="Track your campaign performance and manage your ad spend."
        campaigns={campaignData.campaigns.data as Campaign[]}
        totalCampaigns={campaignData.campaigns.totalCampaigns}
      />
    </div>
  );
}