"use client";

import { Pencil, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SecondaryButton } from "@/components/shared-buttons";
import { StatusChip } from "@/components/ui/status-chip";
import { formatBusinessProfileSubmittedDate } from "@/features/crm/client-dashboard/sections/business-profile/business-profile-request-format";
import { getBusinessProfileRequests } from "@/features/crm/client-dashboard/sections/business-profile/business-profile-request-storage";
import { AdAccountRequestEditModal } from "@/features/crm/client-dashboard/sections/ad-account-request/components/ad-account-request-edit-modal";
import {
  deleteAdAccountRequest,
  getAdAccountRequests,
  updateAdAccountRequest,
  type AdAccountRequest,
} from "@/features/crm/client-dashboard/sections/ad-account-request/ad-account-request-storage";
import type { ToastType } from "@/features/crm/types/crm";

type AdAccountRequestsTableProps = {
  onAddNew?: () => void;
  showAddButton?: boolean;
  showToast: (type: ToastType, message: string) => void;
  title?: string;
};

function getBusinessProfileMeta(request: AdAccountRequest) {
  const profile = getBusinessProfileRequests().find((item) => item.id === request.businessProfileId);
  const statusLabel = profile?.status === "Approved" ? "Approved" : "Submitted";

  return {
    statusLabel,
    dateLabel: formatBusinessProfileSubmittedDate(profile?.submittedAt ?? request.submittedAt),
  };
}

export function AdAccountRequestsTable({ onAddNew, showAddButton = false, showToast, title }: AdAccountRequestsTableProps) {
  const [requests, setRequests] = useState<AdAccountRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<AdAccountRequest | null>(null);

  const refreshRequests = () => {
    setRequests(getAdAccountRequests());
  };

  useEffect(() => {
    refreshRequests();
  }, []);

  const closeModal = () => {
    setSelectedRequest(null);
  };

  const handleDelete = (request: AdAccountRequest) => {
    deleteAdAccountRequest(request.id);
    refreshRequests();
    showToast("success", `${request.adAccountName} request deleted`);
  };

  const handleSave = (updatedRequest: AdAccountRequest) => {
    updateAdAccountRequest(updatedRequest.id, updatedRequest);
    refreshRequests();
    closeModal();
    showToast("success", `${updatedRequest.adAccountName} updated successfully`);
  };

  return (
    <>
      {title || showAddButton ? (
        <div className="flex flex-wrap items-start justify-between gap-4">
          {title ? (
            <div>
              <h2 className="h4 m-0 primary-text">{title}</h2>
              <p className="body-regular m-0 mt-1 subtext">View and manage all your ad accounts requests in one place.</p>
            </div>
          ) : (
            <div />
          )}

          {showAddButton && onAddNew ? (
            <SecondaryButton className="min-h-10 gap-2 bg-[var(--brand-navy)] px-4 text-[var(--white)] hover:bg-[var(--black)]" onClick={onAddNew} type="button">
              <Plus aria-hidden="true" size={16} strokeWidth={1.8} />
              Request Another Ad Account
            </SecondaryButton>
          ) : null}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--white)]">
        <div className="overflow-x-auto">
          <table className="min-w-[1100px] w-full border-collapse">
            <thead>
              <tr className="border-b border-[var(--line)] bg-[var(--surface)] text-left">
                <th className="body-xsm-medium px-4 py-3 primary-text">No</th>
                <th className="body-xsm-medium px-4 py-3 primary-text">Business Profile</th>
                <th className="body-xsm-medium px-4 py-3 primary-text">Category</th>
                <th className="body-xsm-medium px-4 py-3 primary-text">Ad Account</th>
                <th className="body-xsm-medium px-4 py-3 primary-text">Access ID</th>
                <th className="body-xsm-medium px-4 py-3 primary-text">Monthly Spend ($)</th>
                <th className="body-xsm-medium px-4 py-3 primary-text">Status</th>
                <th className="body-xsm-medium px-4 py-3 primary-text">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td className="body-sm-regular px-4 py-10 text-center subtext" colSpan={8}>
                    No ad account requests yet. Click &quot;Request Another Ad Account&quot; to submit your first request.
                  </td>
                </tr>
              ) : (
                requests.map((request, index) => {
                  const profileMeta = getBusinessProfileMeta(request);

                  return (
                    <tr className="border-b border-[var(--line)] last:border-b-0" key={request.id}>
                      <td className="body-sm-regular px-4 py-4 subtext">{index + 1}</td>
                      <td className="px-4 py-4">
                        <strong className="body-sm-medium block primary-text">{request.businessProfileName}</strong>
                        <span className="body-xsm-regular subtext">
                          {profileMeta.statusLabel} on {profileMeta.dateLabel}
                        </span>
                      </td>
                      <td className="body-sm-regular px-4 py-4 primary-text">{request.productCategory}</td>
                      <td className="body-sm-regular px-4 py-4 primary-text">{request.adAccountName}</td>
                      <td className="px-4 py-4">
                        <a className="body-sm-regular font-medium text-[var(--link)] underline-offset-2 hover:underline" href={`#${request.id}`}>
                          {request.accessSharingDetails}
                        </a>
                      </td>
                      <td className="body-sm-regular px-4 py-4 primary-text">{request.expectedMonthlySpend} $</td>
                      <td className="px-4 py-4">
                        <StatusChip status={request.status} />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            aria-label={`Edit ${request.adAccountName}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--line)] text-[var(--brand-navy)] hover:bg-[var(--surface)]"
                            onClick={() => setSelectedRequest(request)}
                            type="button"
                          >
                            <Pencil aria-hidden="true" size={15} strokeWidth={1.8} />
                          </button>
                          <button
                            aria-label={`Delete ${request.adAccountName}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--line)] text-[var(--danger-text)] hover:bg-[var(--danger-bg)]"
                            onClick={() => handleDelete(request)}
                            type="button"
                          >
                            <X aria-hidden="true" size={15} strokeWidth={1.8} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedRequest ? (
        <AdAccountRequestEditModal onClose={closeModal} onSave={handleSave} request={selectedRequest} showToast={showToast} />
      ) : null}
    </>
  );
}
