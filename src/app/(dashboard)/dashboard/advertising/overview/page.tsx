"use client";

import { useMemo, useState } from "react";
import { createDefaultDateRange, type DateRangeValue } from "@/components/ui/date-range-filter";
import OverviewTopSection from "./components/OverviewTopSection";
import Platform from "./components/platform";
import NeedAttention from "./components/needAttention";
import RecentActivity from "./components/recentActivity";
import { getFilteredOverviewData } from "./overview-data";

export default function AdvertisingOverviewPage() {
  const [dateRange, setDateRange] = useState<DateRangeValue>(() => createDefaultDateRange());

  const filteredData = useMemo(() => getFilteredOverviewData(dateRange), [dateRange]);

  return (
    <div className="flex w-full flex-col gap-5 pb-10">
      <OverviewTopSection
        stats={filteredData.stats}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />
      <Platform platforms={filteredData.platforms} />
      <NeedAttention rows={filteredData.attentionRows} />
      <RecentActivity activities={filteredData.activities} />
    </div>
  );
}
