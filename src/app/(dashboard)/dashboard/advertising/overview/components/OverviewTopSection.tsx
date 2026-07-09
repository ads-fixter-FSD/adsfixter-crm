"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { getSectionHref } from "@/components/layout/app-sidebar-navigation";
import { PrimaryButton } from "@/components/shared-buttons";
import { DateRangeFilter, type DateRangeValue } from "@/components/ui/date-range-filter";
import type { OverviewStats } from "../overview-data";

type OverviewTopSectionProps = {
  stats: OverviewStats;
  dateRange: DateRangeValue;
  onDateRangeChange: (range: DateRangeValue) => void;
};

export default function OverviewTopSection({ stats, dateRange, onDateRangeChange }: OverviewTopSectionProps) {
  const router = useRouter();

  const statCards = [
    {
      id: "total",
      title: "Total Ad Accounts",
      value: String(stats.totalAdAccounts),
      subtitle: "All advertising accounts",
      iconSrc: "/advertising/Buttons1.png",
      highlight: false,
    },
    {
      id: "active",
      title: "Active Ad Accounts",
      value: String(stats.activeAdAccounts),
      subtitle: "All active ad accounts",
      iconSrc: "/advertising/Buttons2.png",
      highlight: false,
    },
    {
      id: "spend",
      title: "Total Spend",
      value: `$${stats.totalSpend.toFixed(2)}`,
      subtitle: "Advertising spend",
      iconSrc: "/advertising/Buttons4.png",
      highlight: false,
    },
    {
      id: "credit",
      title: "Ad Credit",
      value: `$${stats.adCredit.toFixed(2)}`,
      subtitle: "Available to spend",
      iconSrc: "/advertising/Buttons3.png",
      highlight: false,
    },
    {
      id: "attention",
      title: "Needs Attention",
      value: String(stats.needsAttention),
      subtitle: "Requires your attention",
      iconSrc: "/advertising/Buttons5.png",
      highlight: stats.needsAttention > 0,
    },
  ];

  return (
    <section className="flex w-full flex-col gap-5 rounded-[12px] border border-[#EDEDED] bg-white p-4">
      <div className="flex w-full flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
        <div className="flex flex-col gap-1">
          <h1 className="medium">Overview</h1>
          <p className="body-sm-regular text-subtext-500">
            Get a complete overview of your ad accounts, spending, credit, and account status.
          </p>
        </div>

        <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:w-auto">
          <PrimaryButton
            type="button"
            onClick={() => router.push(getSectionHref("Request Account"))}
            className="min-h-10 gap-2 px-4"
          >
            <Plus size={16} strokeWidth={2.5} />
            New Ad Account Request
          </PrimaryButton>

          <DateRangeFilter value={dateRange} onChange={onDateRangeChange} />
        </div>
      </div>

      <div className="flex w-full gap-3 max-[1180px]:flex-wrap">
        {statCards.map((item) => (
          <div
            key={item.id}
            className={`flex min-h-[133px] min-w-0 flex-1 basis-[209.6px] flex-col justify-between rounded-[10px] border p-4 shadow-[0px_1px_2px_0px_#E4E5E73D] ${
              item.highlight
                ? "border-[#FECACA] bg-[#FEF2F2]"
                : "border-[#E9E9E9] bg-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg "
                }`}
              >
                <Image
                  alt=""
                  className="h-6 w-6 object-contain"
                  height={26}
                  src={item.iconSrc}
                  width={26}
                />
              </div>
              <p className="m-0 truncate text-sm text-[var(--color-subtext-500,#7f8482)]">{item.title}</p>
            </div>

            <div className="flex flex-col gap-1">
              <p
                className={`m-0 text-xl font-medium leading-[120%] ${
                  item.highlight ? "text-[#DC2626]" : "text-[var(--color-primary-text-500,#0e2038)]"
                }`}
              >
                {item.value}
              </p>
              <p className="m-0 truncate text-xs text-[var(--color-subtext-400,#999d9b)]">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
