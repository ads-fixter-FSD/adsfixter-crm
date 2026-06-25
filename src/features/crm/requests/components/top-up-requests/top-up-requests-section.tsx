"use client";

import { useMemo, useState } from "react";
import { PrimaryButton, SecondaryButton } from "@/components/shared-buttons";
import type { ToastType } from "@/features/crm/types/crm";

type TopUpRequestStatus = "Pending" | "Hold" | "Approved" | "Rejected";

type TopUpRequestRow = {
  id: string;
  status: TopUpRequestStatus;
  requestTime: string;
  bankAccount: string;
  client: string;
  amount: string;
  transactionReference: string;
  paymentProof: string;
  processedBy: string;
};

type TopUpRequestsSectionProps = {
  showToast: (type: ToastType, message: string) => void;
};

const rowsPerPage = 10;

const initialTopUpRequests: TopUpRequestRow[] = [
  { id: "89596", status: "Pending", requestTime: "June 24th, 2026 2:58 PM", bankAccount: "Shahjalal Electronics And Telecom (IBD, CBP_SET) THE CITY BANK PLC - 1781320207573", client: "MediaWave", amount: "$700,000\n$4,476.36", transactionReference: "178133020758", paymentProof: "View Screenshot", processedBy: "-" },
  { id: "89586", status: "Approved", requestTime: "June 24th, 2026 2:11 PM", bankAccount: "MOW MART (IBD, CUP_MMT) The City Bank LLC - 105209999001", client: "Mojito It", amount: "$38,870\n$320", transactionReference: "454184", paymentProof: "View Screenshot", processedBy: "uzzal.adsfixter@gmail.com\nApproved" },
  { id: "89654", status: "Hold", requestTime: "June 24th, 2026 1:20 PM", bankAccount: "AdsFixter (IBD, EBP_ADF) Eastern Bank PLC - 410210000394", client: "GermanylifeCare", amount: "$60,000\n$500", transactionReference: "0026", paymentProof: "View Screenshot", processedBy: "uzzal.adsfixter@gmail.com\nHold" },
  { id: "89653", status: "Approved", requestTime: "June 24th, 2026 1:10 PM", bankAccount: "AdsFixter (IBD, EBP_ADF) Eastern Bank PLC - 410210000394", client: "CyberAds", amount: "$30,000\n$234.75", transactionReference: "0730006261700921", paymentProof: "View Screenshot", processedBy: "uzzal.adsfixter@gmail.com\nApproved" },
  { id: "89649", status: "Approved", requestTime: "June 24th, 2026 12:38 PM", bankAccount: "Personal Account - EBL, BPA_MLP Rakabul Imtiaz - 01761437754", client: "Ads limitless", amount: "$4,000\n$31.01", transactionReference: "DFOKNNKYF", paymentProof: "View Screenshot", processedBy: "uzzal.adsfixter@gmail.com\nApproved" },
  { id: "89631", status: "Approved", requestTime: "June 24th, 2026 12:35 PM", bankAccount: "ADS FIXTER (IBD, UCB_ADF) UNITED COMMERCIAL BANK LTD - 79821341000032359", client: "Delights Digital", amount: "$39,300\n$304.65", transactionReference: "Hadey Habby", paymentProof: "View Screenshot", processedBy: "uzzal.adsfixter@gmail.com\nApproved" },
  { id: "89650", status: "Approved", requestTime: "June 24th, 2026 12:12 PM", bankAccount: "MOW Fixer.com (IBD, EBP_MFX) THE CITY BANK PLC - 125410077001", client: "Strategic", amount: "$16,000\n$125.17", transactionReference: "100000437134", paymentProof: "View Screenshot", processedBy: "uzzal.adsfixter@gmail.com\nApproved" },
  { id: "89649-b", status: "Approved", requestTime: "June 24th, 2026 11:06 AM", bankAccount: "MOW MART (IBD, CUP_MMT) The City Bank LLC - 105209999001", client: "Foysal Ahmad", amount: "$2,990\n$23", transactionReference: "LFTOD6MRVVL", paymentProof: "View Screenshot", processedBy: "uzzal.adsfixter@gmail.com\nApproved" },
  { id: "89648", status: "Approved", requestTime: "June 24th, 2026 9:49 AM", bankAccount: "Milion It Center (IBD, EBL_MIC) Dutch Bangla Bank Ltd - 701710057843", client: "Fragrance", amount: "$6,500\n$50", transactionReference: "L100Y68784369", paymentProof: "View Screenshot", processedBy: "uzzal.adsfixter@gmail.com\nApproved" },
  { id: "89647", status: "Rejected", requestTime: "June 23rd, 2026 11:53 PM", bankAccount: "MOW Mart (IBS, UCB_MMT) United Commercial Bank plc - 748234100000573", client: "Halk Limited", amount: "$12,901\n$100", transactionReference: "4819", paymentProof: "View Screenshot", processedBy: "uzzal.adsfixter@gmail.com\nReject" },
  { id: "89646", status: "Pending", requestTime: "June 23rd, 2026 10:41 PM", bankAccount: "AdsFixter (IBD, EBP_ADF) Eastern Bank PLC - 410210000394", client: "NorthPeak Digital", amount: "$25,000\n$193.80", transactionReference: "TRX-89646", paymentProof: "View Screenshot", processedBy: "-" },
  { id: "89645", status: "Hold", requestTime: "June 23rd, 2026 9:22 PM", bankAccount: "Personal Account - EBL, BPA_MLP Rakabul Imtiaz - 01761437754", client: "Orbit Media", amount: "$18,500\n$143.41", transactionReference: "TRX-89645", paymentProof: "View Screenshot", processedBy: "uzzal.adsfixter@gmail.com\nHold" },
];

const topUpStatusTabs: Array<"All" | TopUpRequestStatus> = ["All", "Pending", "Hold", "Approved", "Rejected"];

function getStatusClassName(status: TopUpRequestStatus) {
  if (status === "Pending") {
    return "bg-yellow-100 text-yellow-700";
  }

  if (status === "Hold") {
    return "bg-slate-100 text-slate-700";
  }

  if (status === "Approved") {
    return "bg-green-100 text-green-700";
  }

  return "bg-red-100 text-red-700";
}

export function TopUpRequestsSection({ showToast }: TopUpRequestsSectionProps) {
  const [requests, setRequests] = useState(initialTopUpRequests);
  const [activeStatus, setActiveStatus] = useState<"All" | TopUpRequestStatus>("All");
  const [filterQuery, setFilterQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRequests = useMemo(() => {
    const normalizedQuery = filterQuery.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesStatus = activeStatus === "All" || request.status === activeStatus;
      const matchesFilter =
        !normalizedQuery ||
        request.id.toLowerCase().includes(normalizedQuery) ||
        request.bankAccount.toLowerCase().includes(normalizedQuery) ||
        request.client.toLowerCase().includes(normalizedQuery) ||
        request.amount.toLowerCase().includes(normalizedQuery) ||
        request.transactionReference.toLowerCase().includes(normalizedQuery) ||
        request.processedBy.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesFilter;
    });
  }, [activeStatus, filterQuery, requests]);

  const totalPages = Math.max(1, Math.ceil(filteredRequests.length / rowsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pageStartIndex = (safeCurrentPage - 1) * rowsPerPage;
  const visibleRequests = filteredRequests.slice(pageStartIndex, pageStartIndex + rowsPerPage);
  const shouldShowPagination = filteredRequests.length > rowsPerPage;

  const updateRequestStatus = (requestId: string, nextStatus: TopUpRequestStatus) => {
    setRequests((current) =>
      current.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status: nextStatus,
              processedBy: `uzzal.adsfixter@gmail.com\n${nextStatus === "Rejected" ? "Reject" : nextStatus}`,
            }
          : request,
      ),
    );
    showToast(nextStatus === "Rejected" ? "error" : "success", `Top-up request ${nextStatus.toLowerCase()}`);
  };

  return (
    <section className="grid gap-4 rounded-xl border border-[var(--line)] bg-[var(--white)] p-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {topUpStatusTabs.map((tab) => (
            <button
              className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition ${
                activeStatus === tab ? "border-[var(--brand-navy)] bg-[var(--brand-navy)] text-white" : "border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--brand-navy)]"
              }`}
              key={tab}
              onClick={() => {
                setActiveStatus(tab);
                setCurrentPage(1);
              }}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>

        <input
          className="min-h-9 w-64 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm text-[var(--brand-navy)] outline-none focus:border-[var(--brand-navy)] max-[720px]:w-full"
          onChange={(event) => {
            setFilterQuery(event.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search..."
          type="search"
          value={filterQuery}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1180px] border-collapse">
          <thead>
            <tr>
              {["ID", "Request Time", "Bank Account", "Client", "Amount", "Transaction Ref", "Payment Proof", "Processed By", "Actions"].map((heading) => (
                <th className="border-b border-[var(--line)] px-2.5 py-2 text-left text-xs font-semibold text-[var(--brand-navy)]" key={heading}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRequests.map((request) => (
              <tr key={request.id}>
                <td className="border-b border-[var(--line)] px-2.5 py-2 text-xs text-[var(--brand-navy)]">#{request.id}</td>
                <td className="whitespace-pre-line border-b border-[var(--line)] px-2.5 py-2 text-xs text-[var(--brand-navy)]">{request.requestTime}</td>
                <td className="max-w-[300px] border-b border-[var(--line)] px-2.5 py-2 text-xs text-[var(--brand-navy)]">{request.bankAccount}</td>
                <td className="border-b border-[var(--line)] px-2.5 py-2 text-xs font-semibold text-cyan-700">{request.client}</td>
                <td className="whitespace-pre-line border-b border-[var(--line)] px-2.5 py-2 text-xs text-[var(--brand-navy)]">{request.amount}</td>
                <td className="border-b border-[var(--line)] px-2.5 py-2 text-xs text-[var(--brand-navy)]">{request.transactionReference}</td>
                <td className="border-b border-[var(--line)] px-2.5 py-2 text-xs">
                  <button className="font-semibold text-cyan-700" type="button">
                    {request.paymentProof}
                  </button>
                </td>
                <td className="whitespace-pre-line border-b border-[var(--line)] px-2.5 py-2 text-xs text-[var(--brand-navy)]">{request.processedBy}</td>
                <td className="border-b border-[var(--line)] px-2.5 py-2 text-xs">
                  {request.status === "Pending" || request.status === "Hold" ? (
                    <div className="flex flex-wrap items-center gap-2">
                      <PrimaryButton className="min-h-0 rounded-md px-3 py-1.5 text-xs" onClick={() => updateRequestStatus(request.id, "Approved")} type="button">
                        Approve
                      </PrimaryButton>
                      <SecondaryButton className="min-h-0 rounded-md px-3 py-1.5 text-xs" onClick={() => updateRequestStatus(request.id, "Rejected")} type="button">
                        Reject
                      </SecondaryButton>
                      {request.status === "Pending" ? (
                        <SecondaryButton className="min-h-0 rounded-md px-3 py-1.5 text-xs" onClick={() => updateRequestStatus(request.id, "Hold")} type="button">
                          Hold
                        </SecondaryButton>
                      ) : null}
                    </div>
                  ) : (
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusClassName(request.status)}`}>{request.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--muted)]">
        <span>
          Showing {filteredRequests.length === 0 ? 0 : pageStartIndex + 1} to {Math.min(pageStartIndex + visibleRequests.length, filteredRequests.length)} of {filteredRequests.length} result(s)
        </span>
        {shouldShowPagination ? (
          <div className="flex items-center gap-3">
            <button className="text-[var(--muted)] disabled:opacity-40" disabled={safeCurrentPage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} type="button">
              Previous
            </button>
            <span className="font-semibold text-[var(--brand-navy)]">
              Page {safeCurrentPage} of {totalPages}
            </span>
            <button className="font-semibold text-[var(--brand-navy)] disabled:opacity-40" disabled={safeCurrentPage === totalPages} onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} type="button">
              Next
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
