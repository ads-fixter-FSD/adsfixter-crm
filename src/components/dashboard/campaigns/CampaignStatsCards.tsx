
'use client';

export interface StatCardData {
  id: string;
  icon: React.ReactNode;
  title: string;
  value: number | string;
  subtitle: string;
}

export interface CampaignStatsCardsProps {
  title?: string;
  subtitle?: string;
  stats: StatCardData[];
}



export default function CampaignStatsCards({
  title = "Campaigns Overview",
  subtitle,
  stats,
}: CampaignStatsCardsProps) {
  return (
    <section className="flex w-full flex-col gap-5 rounded-xl border border-[#EDEDED] bg-white p-4">
      {/* Header */}
      <div className="flex w-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-col">
          <h1 className="m-0 font-sans text-[22px] font-medium leading-tight text-[#0e2038]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm text-[#7f8482]">
              {subtitle}
            </p>
          )}
        </div>

        <button className="min-h-10 flex items-center justify-center gap-2 rounded-lg bg-[#F74608] px-4 py-2 text-white hover:bg-[#e03d04] border-0 transition-colors max-[640px]:w-full">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 1V13M1 7H13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Create Campaign
        </button>
      </div>

      {/* Stats Grid - 4 columns */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between rounded-[10px] border border-[#E9E9E9] bg-white p-4 shadow-[0px_1px_2px_0px_#E4E5E73D]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F6F6F6]">
              {item.icon}
            </div>

            <p className="mt-3 text-sm text-[#7f8482]">{item.title}</p>
            <p className="mt-1 text-2xl font-medium text-[#0e2038]">
              {item.value}
            </p>
            <p className="mt-1 text-sm text-[#999d9b]">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}