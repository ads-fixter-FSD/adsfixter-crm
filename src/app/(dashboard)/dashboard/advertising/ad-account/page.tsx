"use client";

import { useEffect, useState } from "react";
import type {
  AdAccount,
  TopUpHistoryEntry,
  TopUpHistorySummary,
} from "@/types/account";
import AccountOverview from "@/components/dashboard/ad-account/AdAccountOverview";

export default function AccountOverviewPage() {
  const [accounts, setAccounts] = useState<AdAccount[]>([]);
  const [summary, setSummary] = useState<TopUpHistorySummary | null>(null);
  const [entries, setEntries] = useState<TopUpHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        const [accountsRes, historyRes] = await Promise.all([
          fetch("/data/accounts.json"),
          fetch("/data/topuphistory.json"),
        ]);

        const accountsJson = (await accountsRes.json()) as AdAccount[];
        const historyJson = await historyRes.json();

        if (!cancelled) {
          setAccounts(accountsJson);
          setSummary(historyJson.summary as TopUpHistorySummary);
          setEntries(historyJson.entries as TopUpHistoryEntry[]);
        }
      } catch (error) {
        console.error("Failed to load account overview data:", error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadData();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className=" py-8">
      <div className="">
        <AccountOverview
          accounts={accounts}
          // summary is only read once the user opens a top-up history modal,
          // by which point loading has finished — safe to fall back while null.
          topUpHistorySummary={summary ?? ({} as TopUpHistorySummary)}
          topUpHistoryEntries={entries}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
}
