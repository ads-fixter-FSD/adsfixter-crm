"use client";

import { Check, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { ToastType } from "@/features/crm/types/crm";

type NewAccountRequestStatus = "Pending" | "Approved" | "Rejected";

type NewAccountRequestRow = {
  id: string;
  status: NewAccountRequestStatus;
  clientName: string;
  requestedName: string;
  businessManagerId: string;
  email: string;
  assignedAccount: string;
};

type NewAccountRequestsSectionProps = {
  showToast: (type: ToastType, message: string) => void;
};

const initialNewAccountRequests: NewAccountRequestRow[] = [
  { id: "req-1", status: "Pending", clientName: "Style Vein", requestedName: "Kurtology", businessManagerId: "282450576621618", email: "-", assignedAccount: "-" },
  { id: "req-2", status: "Pending", clientName: "Demagnetischetas", requestedName: "Seraphine Bangladesh", businessManagerId: "1424545629132298", email: "-", assignedAccount: "-" },
  { id: "req-3", status: "Pending", clientName: "Alfazri", requestedName: "Alfazri Lungi", businessManagerId: "374357224999543", email: "-", assignedAccount: "-" },
  { id: "req-4", status: "Pending", clientName: "Ads limitless", requestedName: "Mannan2026", businessManagerId: "448532861585687", email: "techinpunitshuttle@gmail.com", assignedAccount: "-" },
  { id: "req-5", status: "Rejected", clientName: "Delights Digital", requestedName: "PD_like-World-Standard", businessManagerId: "916771342011416", email: "-", assignedAccount: "-" },
  { id: "req-6", status: "Rejected", clientName: "Boostfixter", requestedName: "Urmi Mart BD", businessManagerId: "1519547885519283", email: "-", assignedAccount: "-" },
  { id: "req-7", status: "Rejected", clientName: "Boostiful", requestedName: "BoostFull", businessManagerId: "778497251325195", email: "arshadabdullah1997@gmail.com", assignedAccount: "-" },
  { id: "req-8", status: "Approved", clientName: "Halal Heaven", requestedName: "Halal Heaven", businessManagerId: "802021824653430", email: "-", assignedAccount: "ADF_1017_Vidmax 63534209856348" },
  { id: "req-9", status: "Approved", clientName: "Utpol", requestedName: "School and College", businessManagerId: "BM ID: 1314313418699622", email: "-", assignedAccount: "AMW_1263_School_and_College 2668774817637482" },
];

const rowsPerPage = 10;
const requestStatusTabs: Array<"All" | NewAccountRequestStatus> = ["All", "Pending", "Approved", "Rejected"];

export function NewAccountRequestsSection({ showToast }: NewAccountRequestsSectionProps) {
  const [requests, setRequests] = useState(initialNewAccountRequests);
  const [activeStatus, setActiveStatus] = useState<"All" | NewAccountRequestStatus>("All");
  const [filterQuery, setFilterQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const pendingCount = requests.filter((request) => request.status === "Pending").length;

  const filteredRequests = useMemo(() => {
    const normalizedQuery = filterQuery.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesStatus = activeStatus === "All" || request.status === activeStatus;
      const matchesFilter =
        !normalizedQuery ||
        request.clientName.toLowerCase().includes(normalizedQuery) ||
        request.requestedName.toLowerCase().includes(normalizedQuery) ||
        request.businessManagerId.toLowerCase().includes(normalizedQuery) ||
        request.email.toLowerCase().includes(normalizedQuery) ||
        request.assignedAccount.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesFilter;
    });
  }, [activeStatus, filterQuery, requests]);

  const totalPages = Math.max(1, Math.ceil(filteredRequests.length / rowsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pageStartIndex = (safeCurrentPage - 1) * rowsPerPage;
  const visibleRequests = filteredRequests.slice(pageStartIndex, pageStartIndex + rowsPerPage);
  const shouldShowPagination = filteredRequests.length > rowsPerPage;

  const updateRequestStatus = (requestId: string, nextStatus: NewAccountRequestStatus) => {
    setRequests((current) => current.map((request) => (request.id === requestId ? { ...request, status: nextStatus } : request)));
    showToast(nextStatus === "Approved" ? "success" : "error", `New account request ${nextStatus.toLowerCase()}`);
  };

  return (
    <section className="grid gap-4 rounded-xl border-2 border-[var(--line)] bg-[var(--white)] p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-5">
          {requestStatusTabs.map((tab) => (
            <button
              className={`border-0 bg-transparent px-0 py-2 text-sm font-semibold ${activeStatus === tab ? "border-b-2 border-[var(--brand-navy)] text-[var(--brand-navy)]" : "text-[var(--muted)]"}`}
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

        <input
          className="min-h-9 w-64 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm text-[var(--brand-navy)] outline-none focus:border-[var(--brand-navy)] max-[720px]:w-full"
          onChange={(event) => {
            setFilterQuery(event.target.value);
            setCurrentPage(1);
          }}
          placeholder="Filter..."
          type="search"
          value={filterQuery}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] border-collapse">
          <thead>
            <tr>
              {["Status", "Client Name", "Requested Name", "BM ID", "Email", "Assigned Account", "Actions"].map((heading) => (
                <th className="border-b border-[var(--line)] px-2.5 py-2 text-left text-xs font-semibold text-[var(--brand-navy)]" key={heading}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRequests.map((request) => (
              <tr key={request.id}>
                <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      request.status === "Pending" ? "bg-[var(--warning-bg)] text-[var(--warning-text)]" : request.status === "Approved" ? "bg-[var(--success-bg)] text-[var(--success-text)]" : "bg-[var(--danger-bg)] text-[var(--danger-text)]"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm text-[var(--brand-navy)]">{request.clientName}</td>
                <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm text-[var(--brand-navy)]">{request.requestedName}</td>
                <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm text-[var(--brand-navy)]">{request.businessManagerId}</td>
                <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm text-[var(--brand-navy)]">{request.email}</td>
                <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm text-[var(--brand-navy)]">{request.assignedAccount}</td>
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
