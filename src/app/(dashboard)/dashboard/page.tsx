import AccountOverview from "@/components/dashboard/overview/Accountoverview";
import OverviewTopSection from "@/components/dashboard/overview/Overviewtopsection";
import QuickActions from "@/components/dashboard/overview/Quickactions";
import SpendingOverview from "@/components/dashboard/overview/SpendingOverview";
import overviewData from "@/data/Overviewpagedata.json";

export default function OverviewPage() {
  return (
    <div className="flex w-full flex-col gap-5  pb-10">
      {/* Header + Stats Cards */}
      <OverviewTopSection
        title={overviewData.header.title}
        todayDate={overviewData.header.todayDateFormatted}
        dateRangeLabel={overviewData.header.dateRangeFilter.displayLabel}
        stats={overviewData.statsCards as any}
      />

      <div className="flex w-full flex-col gap-5 md:flex-row md:items-stretch">
        <section className="flex w-full min-w-0 flex-[2]">
          <SpendingOverview />
        </section>

        <div className="flex w-full min-w-0 flex-[1]">
          <QuickActions
            title="Quick Action"
            actions={overviewData.quickActions as any}
          />
        </div>
      </div>

      {/* Account Overview */}
      <AccountOverview
        title={overviewData.accountOverview.title}
        subtitle={overviewData.accountOverview.subtitle}
        rows={overviewData.accountOverview.rows as any}
      />
    </div>
  );
}
