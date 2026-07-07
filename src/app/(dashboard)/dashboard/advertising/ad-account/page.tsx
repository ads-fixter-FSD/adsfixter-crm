
import type {
  AdAccount,
  TopUpHistoryEntry,
  TopUpHistorySummary,
} from "@/types/account";
import accountsData from "../../../../../../public/data/accounts.json";
import topUpHistoryData from "../../../../../../public/data/topuphistory.json";
import AccountOverview from "@/components/dashboard/ad-account/AdAccountOverview";

export default function AccountOverviewPage() {
  const accounts = accountsData as AdAccount[];
  const summary = topUpHistoryData.summary as TopUpHistorySummary;
  const entries = topUpHistoryData.entries as TopUpHistoryEntry[];

  return (
    <main className="min-h-screen bg-[var(--color-surface)] py-8">
      <div className="">
        <AccountOverview
          accounts={accounts}
          topUpHistorySummary={summary}
          topUpHistoryEntries={entries}
        />
      </div>
    </main>
  );
}
