"use client";

import React, { useState, useMemo } from "react";
import { Clock } from "lucide-react";
import SummaryCard from "./SummaryCard";
import FundingTabs from "./FundingTabs";
import SearchFilterBar from "./SearchFilterBar";
import FundingTable from "./FundingTable";
import Pagination from "./Pagination";
import { TABS, fundingRows } from "@/types/dashboard/advertising/funding-history/data";
import { SortConfig, SortKey } from "@/types/dashboard/advertising/funding-history/types";
import { sortRows } from "@/hooks/sortUtils";

export default function FundingHistoryPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null,
  });

  const totalPages = 5;

  const handleSortChange = (key: SortKey, direction: "asc" | "desc") => {
    setSortConfig({ key, direction });
  };

  const sortedRows = useMemo(
    () => sortRows(fundingRows, sortConfig),
    [sortConfig]
  );

  return (
    <div className="bg-[var(--color-white)] border border-[var(--color-line)] rounded-2xl">
      <div className="px-6 py-6 border-b border-[var(--color-line)]">
        <h1 className="h6-bold text-[var(--color-primary-text-500)]">
          Funding History for this Account
        </h1>
        <p className="body-sm-regular text-[var(--color-subtext-500)] mt-1">
          Only top-ups - for platform spend, see the spend tab.
        </p>
      </div>

      <div className="px-6 pt-6 flex flex-col sm:flex-row gap-4">
        <SummaryCard icon="∞" label="Total Funded (Lifetime)" value="$49.45" />
        <SummaryCard
          icon={<Clock size={16} />}
          label="Last Funded"
          value="Jul 4, 11:42 AM"
        />
      </div>

      <div className="px-6 pt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <FundingTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
        <SearchFilterBar search={search} onSearchChange={setSearch} />
      </div>

      <div className="px-6 mt-6">
        <FundingTable
          rows={sortedRows}
          sortConfig={sortConfig}
          onSortChange={handleSortChange}
        />
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        perPage={perPage}
        onPageChange={setCurrentPage}
        onPerPageChange={setPerPage}
      />
    </div>
  );
}