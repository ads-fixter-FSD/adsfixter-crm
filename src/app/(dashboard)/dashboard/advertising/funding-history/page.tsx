"use client";

import React, { useState, useMemo } from "react";
import SummaryCard from "./component/SummaryCard";
import FundingTabs from "./component/FundingTabs";
import SearchFilterBar from "./component/SearchFilterBar";
import FundingTable from "./component/FundingTable";
import Pagination from "./component/Pagination";
import { fundingRows, TABS } from "@/types/dashboard/advertising/funding-history/data";
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
    <div className="bg-[var(--color-white)] border border-[var(--color-line)] rounded-xl">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-[var(--color-line)]">
        <h1 className="h6-bold text-[var(--color-primary-text-500)] text-base sm:text-lg">
          Funding History for this Account
        </h1>
        <p className="body-sm-regular text-[var(--color-subtext-500)] mt-1">
          Only top-ups - for platform spend, see the spend tab.
        </p>
      </div>

      {/* Summary cards */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-3 sm:gap-4">
        <SummaryCard
          icon="/images/dashboard/sitebar/advertising.svg"
          label="Total Funded (Lifetime)"
          value="$49.45"
        />
        <SummaryCard
          icon={"/images/dashboard/advertising/clock-svgrepo-com.svg"}
          label="Last Funded"
          value="Jul 4, 11:42 AM"
        />
      </div>

      {/* Tabs + Search/Filter */}
      <div className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <FundingTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
        <SearchFilterBar search={search} onSearchChange={setSearch} />
      </div>

      {/* Table */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5">
        <FundingTable
          rows={sortedRows}
          sortConfig={sortConfig}
          onSortChange={handleSortChange}
        />
      </div>

      {/* Pagination */}
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