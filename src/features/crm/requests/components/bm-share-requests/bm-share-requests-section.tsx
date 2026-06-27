"use client";

import { Check, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { ToastType } from "@/features/crm/types/crm";

type BmShareRequestStatus = "Pending" | "Approved" | "Rejected";

type BmShareRequestRow = {
  id: string;
  status: BmShareRequestStatus;
  client: string;
  clientEmail: string;
  adAccountName: string;
  adAccountId: string;
  businessManagerName: string;
  businessManagerId: string;
  requestedAt: string;
  processedBy: string;
};

type BmShareRequestsSectionProps = {
  showToast: (type: ToastType, message: string) => void;
};

const rowsPerPage = 10;

const initialBmShareRequests: BmShareRequestRow[] = [
  { id: "bm-share-1", status: "Pending", client: "Salaf Food", clientEmail: "habib.diploma@gmail.com", adAccountName: "ADF_1017_Vidmax", adAccountId: "533642099533418", businessManagerName: "NA", businessManagerId: "942046120931068", requestedAt: "13 days ago", processedBy: "-" },
  { id: "bm-share-2", status: "Pending", client: "Eggshopbd.com", clientEmail: "mdrahathossen557@gmail.com", adAccountName: "ADF_1765_Rahat_Shop_BD", adAccountId: "270342534397071", businessManagerName: "ADF_Rafiya mart bd", businessManagerId: "1168740006887035", requestedAt: "about 1 month ago", processedBy: "-" },
  { id: "bm-share-3", status: "Pending", client: "soft it", clientEmail: "softigtlobalbd@gmail.com", adAccountName: "ADF_1759_Soft_IT_Global", adAccountId: "387823797293769", businessManagerName: "Rimi New Shop", businessManagerId: "1728344285201742", requestedAt: "3 months ago", processedBy: "-" },
  { id: "bm-share-4", status: "Pending", client: "Delights Digital", clientEmail: "fazleyrabby.com@gmail.com", adAccountName: "ADF_1249_Perpetual_Jatrabari", adAccountId: "946934136588893", businessManagerName: "The Asian Time", businessManagerId: "523703394859611", requestedAt: "4 months ago", processedBy: "-" },
  { id: "bm-share-5", status: "Pending", client: "Delights Digital", clientEmail: "fazleyrabby.com@gmail.com", adAccountName: "ADF_1163_PD_Skill_Uttara_02", adAccountId: "3376760422632100", businessManagerName: "Delights Digital", businessManagerId: "369142887956757", requestedAt: "5 months ago", processedBy: "-" },
  { id: "bm-share-6", status: "Approved", client: "NorthPeak Digital", clientEmail: "northpeak@example.com", adAccountName: "ADF_1350_Kawsar Boosting_04", adAccountId: "1469893900558830", businessManagerName: "Orbit Media BM", businessManagerId: "512800000394", requestedAt: "6 months ago", processedBy: "uzzal.adsfixter@gmail.com" },
  { id: "bm-share-7", status: "Rejected", client: "Apex Retail", clientEmail: "apex@example.com", adAccountName: "ADF_1281_Boostiful Products_V3", adAccountId: "238918273645129", businessManagerName: "Apex Retail BM", businessManagerId: "442100000884", requestedAt: "7 months ago", processedBy: "uzzal.adsfixter@gmail.com" },
];

const bmShareStatusTabs: Array<"All" | BmShareRequestStatus> = ["All", "Pending", "Approved", "Rejected"];

function getStatusClassName(status: BmShareRequestStatus) {
  if (status === "Pending") {
    return "bg-[var(--warning-bg)] text-[var(--warning-text)]";
  }

  if (status === "Approved") {
    return "bg-[var(--success-bg)] text-[var(--success-text)]";
  }

  return "bg-[var(--danger-bg)] text-[var(--danger-text)]";
}

export function BmShareRequestsSection({ showToast }: BmShareRequestsSectionProps) {
  const [requests, setRequests] = useState(initialBmShareRequests);
  const [activeStatus, setActiveStatus] = useState<"All" | BmShareRequestStatus>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const pendingCount = requests.filter((request) => request.status === "Pending").length;

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => activeStatus === "All" || request.status === activeStatus);
  }, [activeStatus, requests]);

  const totalPages = Math.max(1, Math.ceil(filteredRequests.length / rowsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pageStartIndex = (safeCurrentPage - 1) * rowsPerPage;
  const visibleRequests = filteredRequests.slice(pageStartIndex, pageStartIndex + rowsPerPage);
  const shouldShowPagination = filteredRequests.length > rowsPerPage;

  const updateRequestStatus = (requestId: string, nextStatus: BmShareRequestStatus) => {
    setRequests((current) =>
      current.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status: nextStatus,
              processedBy: "uzzal.adsfixter@gmail.com",
            }
          : request,
      ),
    );
    showToast(nextStatus === "Approved" ? "success" : "error", `BM share request ${nextStatus.toLowerCase()}`);
  };

  return (
    <section className="grid gap-5 rounded-xl border-2 border-[var(--line)] bg-[var(--white)] p-5">
      <h2 className="m-0 text-xl font-semibold text-[var(--brand-navy)]">BM Share Requests</h2>

      <div className="flex flex-wrap items-center gap-5 border-b border-[var(--line)]">
        {bmShareStatusTabs.map((tab) => (
          <button
            className={`border-0 bg-transparent px-0 py-2 text-sm font-semibold ${activeStatus === tab ? "border-b-2 border-[var(--brand-orange)] text-[var(--brand-orange)]" : "text-[var(--muted)]"}`}
            key={tab}
            onClick={() => {
              setActiveStatus(tab);
              setCurrentPage(1);
            }}
            type="button"
          >
            {tab === "Pending" ? `Pending (${pendingCount})` : tab}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1080px] border-collapse">
          <thead>
            <tr>
              {["Client", "Ad Account", "BM Details", "Status", "Requested", "Processed By", "Actions"].map((heading) => (
                <th className="border-b border-[var(--line)] px-2.5 py-2 text-left text-xs font-semibold text-[var(--brand-navy)]" key={heading}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRequests.map((request) => (
              <tr key={request.id}>
                <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm text-[var(--brand-navy)]">
                  <div className="font-semibold">{request.client}</div>
                  <div className="text-xs text-[var(--muted)]">{request.clientEmail}</div>
                </td>
                <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm text-[var(--brand-navy)]">
                  <div className="font-semibold">{request.adAccountName}</div>
                  <div className="text-xs text-[var(--muted)]">{request.adAccountId}</div>
                </td>
                <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm text-[var(--brand-navy)]">
                  <div className="font-semibold">{request.businessManagerName}</div>
                  <div className="text-xs text-[var(--muted)]">{request.businessManagerId}</div>
                </td>
                <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm">
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusClassName(request.status)}`}>{request.status}</span>
                </td>
                <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm text-[var(--brand-navy)]">{request.requestedAt}</td>
                <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm text-[var(--brand-navy)]">{request.processedBy}</td>
                <td className="border-b border-[var(--line)] px-2.5 py-2 text-center text-sm">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button className="inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-[var(--brand-orange)] bg-[var(--brand-orange)] px-2.5 text-xs font-semibold text-[var(--brand-orange-contrast)] transition hover:bg-[var(--brand-orange-hover)]" onClick={() => updateRequestStatus(request.id, "Approved")} type="button">
                      <Check aria-hidden="true" size={13} strokeWidth={2.1} />
                      Approve
                    </button>
                    <button className="inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-[var(--brand-orange)] bg-[var(--white)] px-2.5 text-xs font-semibold text-[var(--brand-orange)] transition hover:bg-[var(--brand-orange-soft)]" onClick={() => updateRequestStatus(request.id, "Rejected")} type="button">
                      <X aria-hidden="true" size={13} strokeWidth={2.1} />
                      Reject
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
            <button className="font-semibold text-[var(--brand-orange)] disabled:opacity-40" disabled={safeCurrentPage === totalPages} onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} type="button">
              Next
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
