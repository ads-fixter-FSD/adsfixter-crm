"use client";

import { RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import type { ToastType } from "@/features/crm/types/crm";

type FailedTopUpAttempt = {
  id: string;
  date: string;
  client: string;
  clientEmail: string;
  adAccountName: string;
  adAccountId: string;
  amount: string;
  balanceStatus: string;
  errorMessage: string;
};

type FailedTopUpsSectionProps = {
  showToast: (type: ToastType, message: string) => void;
};

const rowsPerPage = 10;

const failedTopUpAttempts: FailedTopUpAttempt[] = [
  { id: "cnq067a", date: "June 23rd, 2026 11:09 PM", client: "Fluffy Jewels", clientEmail: "anasheikh71@gmail.com", adAccountName: "ADF_1298_Clarity_Swains", adAccountId: "5721187957641", amount: "$200.00", balanceStatus: "Balance Deducted\nCurrent: $4.81\nWas: $10.00", errorMessage: "ERR_META_TOKEN: Access token expired or invalid" },
  { id: "cnq187e", date: "June 23rd, 2026 6:47 PM", client: "HM Online", clientEmail: "hmonline@gmail.com", adAccountName: "ADF_1376_HM_Advanced_Care", adAccountId: "5810911912117", amount: "$100.00", balanceStatus: "Balance Deducted\nCurrent: $0.00\nWas: $100.00", errorMessage: "ERR_META_TOKEN: Access token expired or invalid" },
  { id: "cnt941v", date: "June 23rd, 2026 6:17 PM", client: "Thevium", clientEmail: "thevium@gmail.com", adAccountName: "ADF_1726_Tiamat_Mart_New", adAccountId: "2824921861283", amount: "$5.00", balanceStatus: "Balance Deducted\nCurrent: $41.10\nWas: $46.10", errorMessage: "ERR_META_TOKEN: Access token expired or invalid" },
  { id: "cnq0218", date: "June 23rd, 2026 5:17 PM", client: "TjmartMart", clientEmail: "tjmartmart@gmail.com", adAccountName: "ADF_1726_Tiamat_Mart_New", adAccountId: "2824921861283", amount: "$5.00", balanceStatus: "Balance Deducted\nCurrent: $40.10\nWas: $45.10", errorMessage: "ERR_META_TOKEN: Access token expired or invalid" },
  { id: "cnq0jen", date: "June 23rd, 2026 3:13 PM", client: "TjmartMart", clientEmail: "tjmartmart@gmail.com", adAccountName: "ADF_1726_Tiamat_Mart_New", adAccountId: "2824921861283", amount: "$5.00", balanceStatus: "Balance Deducted\nCurrent: $40.10\nWas: $45.10", errorMessage: "ERR_META_TOKEN: Access token expired or invalid" },
  { id: "cnq1uy3", date: "June 23rd, 2026 2:50 PM", client: "TjmartMart", clientEmail: "tjmartmart@gmail.com", adAccountName: "ADF_1726_Tiamat_Mart_New", adAccountId: "2824921861283", amount: "$5.00", balanceStatus: "Balance Deducted\nCurrent: $40.10\nWas: $45.10", errorMessage: "ERR_META_TOKEN: Access token expired or invalid" },
  { id: "cnq103t", date: "June 23rd, 2026 1:11 PM", client: "TjmartMart", clientEmail: "tjmartmart@gmail.com", adAccountName: "ADF_1726_Tiamat_Mart_New", adAccountId: "2824921861283", amount: "$5.00", balanceStatus: "Balance Deducted\nCurrent: $40.10\nWas: $45.10", errorMessage: "ERR_META_TOKEN: Access token expired or invalid" },
  { id: "cnq1g03", date: "June 23rd, 2026 12:49 PM", client: "Delights Digital", clientEmail: "fazleyrabby.com@gmail.com", adAccountName: "ADF_1299_Perpetual_Jatrabari", adAccountId: "946934136588893", amount: "$50.00", balanceStatus: "Balance Deducted\nCurrent: $23.25\nWas: $73.25", errorMessage: "ERR_META_TOKEN: Access token expired or invalid" },
  { id: "cnq0ls5", date: "June 23rd, 2026 12:35 PM", client: "Mojito It", clientEmail: "mojitoit@gmail.com", adAccountName: "ADF_1401_Mojito_Growth", adAccountId: "801234567123987", amount: "$75.00", balanceStatus: "Balance Deducted\nCurrent: $12.75\nWas: $87.75", errorMessage: "ERR_META_RATE_LIMIT: Meta API rate limit exceeded" },
  { id: "cnq1wt2", date: "June 23rd, 2026 11:55 AM", client: "CyberAds", clientEmail: "cyberads@gmail.com", adAccountName: "ADF_1508_CyberAds_New", adAccountId: "761234009812333", amount: "$25.00", balanceStatus: "Balance Deducted\nCurrent: $5.00\nWas: $30.00", errorMessage: "ERR_META_PERMISSION: Missing account permission" },
  { id: "cnq7fd4", date: "June 22nd, 2026 10:22 PM", client: "NorthPeak Digital", clientEmail: "northpeak@example.com", adAccountName: "ADF_1350_Kawsar Boosting_04", adAccountId: "1469893900558830", amount: "$120.00", balanceStatus: "Balance Deducted\nCurrent: $19.10\nWas: $139.10", errorMessage: "ERR_META_TOKEN: Access token expired or invalid" },
  { id: "cnq8mx9", date: "June 22nd, 2026 9:41 PM", client: "Orbit Media", clientEmail: "orbit@example.com", adAccountName: "ADF_1322_Retargeting Closed Account", adAccountId: "784512390087321", amount: "$15.00", balanceStatus: "Balance Deducted\nCurrent: $0.00\nWas: $15.00", errorMessage: "ERR_META_ACCOUNT_CLOSED: Ad account is closed" },
];

export function FailedTopUpsSection({ showToast }: FailedTopUpsSectionProps) {
  const [filterQuery, setFilterQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAttempts = useMemo(() => {
    const normalizedQuery = filterQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return failedTopUpAttempts;
    }

    return failedTopUpAttempts.filter((attempt) => {
      return (
        attempt.id.toLowerCase().includes(normalizedQuery) ||
        attempt.client.toLowerCase().includes(normalizedQuery) ||
        attempt.clientEmail.toLowerCase().includes(normalizedQuery) ||
        attempt.adAccountName.toLowerCase().includes(normalizedQuery) ||
        attempt.adAccountId.toLowerCase().includes(normalizedQuery) ||
        attempt.errorMessage.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [filterQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredAttempts.length / rowsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pageStartIndex = (safeCurrentPage - 1) * rowsPerPage;
  const visibleAttempts = filteredAttempts.slice(pageStartIndex, pageStartIndex + rowsPerPage);
  const shouldShowPagination = filteredAttempts.length > rowsPerPage;

  const retryMetaApi = (attempt: FailedTopUpAttempt) => {
    showToast("warning", `Retry queued for ${attempt.adAccountName}`);
  };

  return (
    <section className="grid gap-4 rounded-xl border-2 border-[var(--line)] bg-[var(--white)] p-5">
      <div>
        <h2 className="m-0 text-xl font-semibold text-[var(--brand-navy)]">Failed Top-Up Attempts</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">These top-ups have successfully deducted the user&apos;s balance but failed to increase the Meta ad account limit.</p>
      </div>

      <div className="rounded-xl border border-[var(--warning-text)] bg-[var(--warning-bg)] p-4 text-sm text-[var(--warning-text)]">
        <p className="mb-2 font-semibold">Important Information</p>
        <ul className="m-0 grid gap-1 pl-5">
          <li>Balance Status: User balance has already been deducted. The money is accounted for in the system.</li>
          <li>Action Required: Click Retry Meta API to attempt processing the Meta limit again.</li>
          <li>Before Retrying: Verify this top-up was not already processed manually to avoid duplicate top-ups.</li>
        </ul>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <input
          className="min-h-9 w-80 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm text-[var(--brand-navy)] outline-none focus:border-[var(--brand-navy)] max-[720px]:w-full"
          onChange={(event) => {
            setFilterQuery(event.target.value);
            setCurrentPage(1);
          }}
          placeholder="Filter by client name or email..."
          type="search"
          value={filterQuery}
        />
        <button className="rounded-lg border border-[var(--brand-orange)] bg-[var(--brand-orange)] px-3 py-2 text-sm font-semibold text-[var(--brand-orange-contrast)] hover:bg-[var(--brand-orange-hover)]" onClick={() => showToast("success", "Failed top-up attempts refreshed")} type="button">
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1180px] border-collapse">
          <thead>
            <tr>
              {["Attempt ID", "Failed At", "Client", "Ad Account", "Amount", "Balance Status", "Error Message", "Actions"].map((heading) => (
                <th className="border-b border-[var(--line)] px-2.5 py-2 text-left text-xs font-semibold text-[var(--brand-navy)]" key={heading}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleAttempts.map((attempt) => (
              <tr key={attempt.id}>
                <td className="border-b border-[var(--line)] px-2.5 py-2 text-xs text-[var(--brand-navy)]">{attempt.id}</td>
                <td className="border-b border-[var(--line)] px-2.5 py-2 text-xs text-[var(--brand-navy)]">{attempt.date}</td>
                <td className="border-b border-[var(--line)] px-2.5 py-2 text-xs text-[var(--brand-navy)]">
                  <div className="font-semibold text-[var(--link)]">{attempt.client}</div>
                  <div className="text-[var(--muted)]">{attempt.clientEmail}</div>
                </td>
                <td className="border-b border-[var(--line)] px-2.5 py-2 text-xs text-[var(--brand-navy)]">
                  <div className="font-semibold text-[var(--link)]">{attempt.adAccountName}</div>
                  <div className="text-[var(--muted)]">{attempt.adAccountId}</div>
                </td>
                <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm font-semibold text-[var(--brand-navy)]">{attempt.amount}</td>
                <td className="whitespace-pre-line border-b border-[var(--line)] px-2.5 py-2 text-xs text-[var(--warning-text)]">{attempt.balanceStatus}</td>
                <td className="border-b border-[var(--line)] px-2.5 py-2 text-xs text-[var(--danger-text)]">{attempt.errorMessage}</td>
                <td className="border-b border-[var(--line)] px-2.5 py-2 text-center text-xs">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button className="inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-[var(--brand-orange)] bg-[var(--brand-orange)] px-2.5 text-xs font-semibold text-[var(--brand-orange-contrast)] transition hover:bg-[var(--brand-orange-hover)]" onClick={() => retryMetaApi(attempt)} type="button">
                      <RotateCcw aria-hidden="true" size={13} strokeWidth={2.1} />
                      Retry Meta API
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--muted)]">
        <span>
          Showing {filteredAttempts.length === 0 ? 0 : pageStartIndex + 1} to {Math.min(pageStartIndex + visibleAttempts.length, filteredAttempts.length)} of {filteredAttempts.length} result(s)
        </span>
        {shouldShowPagination ? (
          <div className="flex items-center gap-3">
            <button className="text-[var(--muted)] disabled:opacity-40" disabled={safeCurrentPage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} type="button">
              Previous
            </button>
            <span className="font-semibold text-[var(--brand-navy)]">
              Page {safeCurrentPage} of {totalPages}
            </span>
            <button className="font-semibold text-[var(--brand-orange)] disabled:opacity-40" disabled={safeCurrentPage === totalPages} onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} type="button">
              Next
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
