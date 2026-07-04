/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Eye, FileText, Pencil, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SecondaryButton } from "@/components/shared-buttons";
import { StatusChip } from "@/components/ui/status-chip";
import { formatBusinessProfileSubmittedDate } from "@/features/crm/client-dashboard/sections/business-profile/business-profile-request-format";
import {
  deleteBusinessProfileRequest,
  getBusinessProfileRequests,
  type BusinessProfileRequest,
  updateBusinessProfileRequest,
} from "@/features/crm/client-dashboard/sections/business-profile/business-profile-request-storage";
import { BusinessProfileRequestModal } from "@/features/crm/client-dashboard/sections/business-profile/components/business-profile-request-modal";
import type { ToastType } from "@/features/crm/types/crm";
import { FlatButton } from "@/components/shared-buttons/flat-button";

type BusinessProfileRequestsTableProps = {
  emptyMessage?: string;
  onAddNew?: () => void;
  showAddButton?: boolean;
  showToast: (type: ToastType, message: string) => void;
  title?: string;
  variant?: "page" | "home";
};

const tableHeaders = [
  "No",
  "Business Profile",
  "Category",
  "Contact Info",
  "Documents",
  "Status",
  "Note",
  "Action",
];

export function BusinessProfileRequestsTable({
  emptyMessage = 'No business profile requests yet. Click "Add New Business Request" to submit your first request.',
  onAddNew,
  showAddButton = false,
  showToast,
  title,
  variant = "page",
}: BusinessProfileRequestsTableProps) {
  const [requests, setRequests] = useState<BusinessProfileRequest[]>([]);
  const [modalMode, setModalMode] = useState<"view" | "edit" | null>(null);
  const [selectedRequest, setSelectedRequest] =
    useState<BusinessProfileRequest | null>(null);

  const refreshRequests = () => {
    setRequests(getBusinessProfileRequests());
  };

  useEffect(() => {
    refreshRequests();
  }, []);

  const openModal = (
    request: BusinessProfileRequest,
    mode: "view" | "edit",
  ) => {
    setSelectedRequest(request);
    setModalMode(mode);
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedRequest(null);
  };

  const handleDelete = (request: BusinessProfileRequest) => {
    deleteBusinessProfileRequest(request.id);
    refreshRequests();
    showToast("success", `${request.businessName} request deleted`);
  };

  const handleSave = (updatedRequest: BusinessProfileRequest) => {
    updateBusinessProfileRequest(updatedRequest.id, updatedRequest);
    refreshRequests();
    closeModal();
    showToast("success", `${updatedRequest.businessName} updated successfully`);
  };

  return (
    <>
      {title || showAddButton ? (
        <div className="flex flex-wrap items-start p-4 justify-between gap-4">
          {title ? (
            <div>
              <h2
                className={`${variant === "page" ? "h4" : "h6-medium"} m-0 primary-text`}
              >
                {title}
              </h2>
              {variant === "page" ? (
                <p className="body-regular m-0 subtext">
                  Review and manage business profile requests
                </p>
              ) : null}
            </div>
          ) : (
            <div />
          )}

          {showAddButton && onAddNew ? (
            <FlatButton
              className="min-h-10 gap-2 px-4"
              onClick={onAddNew}
              type="button"
            >
              <Plus aria-hidden="true" size={16} strokeWidth={1.8} />
              {variant === "home"
                ? "Add another business accounts"
                : "Add New Business Request"}
            </FlatButton>
          ) : null}
        </div>
      ) : null}

      <hr className="text-[var(--line)]" />

      <div className="p-4">
        <div className="overflow-hidden  rounded-xl border border-[var(--line)] bg-[var(--white)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] border-collapse">
              <thead>
                <tr className="bg-[var(--table-header-bg)] text-left">
                  {tableHeaders.map((header, i) => (
                    <th
                      className={`body-sm-regular subtext-500 px-4 py-3 align-middle ${
                        i !== tableHeaders.length - 1
                          ? "border-r border-[var(--table-header-border)]"
                          : ""
                      }`}
                      key={header}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {requests.length === 0 ? (
                  <tr>
                    <td
                      className="body-sm-regular px-4  text-center subtext"
                      colSpan={tableHeaders.length}
                    >
                      {emptyMessage}
                    </td>
                  </tr>
                ) : (
                  requests.map((request, index) => (
                    <tr
                      className="border-b border-[var(--line)] last:border-b-0"
                      key={request.id}
                    >
                      <td className="body-regular border-r border-[var(--line)] px-4 py-4 subtext">
                        {index + 1}
                      </td>
                      <td className="border-r border-[var(--line)] px-4 py-4">
                        <strong className="body-regular block primary-text">
                          {request.businessName}
                        </strong>
                        <span className="body-xsm-regular subtext">
                          Submitted on{" "}
                          {formatBusinessProfileSubmittedDate(
                            request.submittedAt,
                          )}
                        </span>
                      </td>
                      <td className="body-regular border-r border-[var(--line)] px-4 py-4 primary-text-400">
                        {request.productCategory}
                      </td>
                      <td className="border-r border-[var(--line)] px-4 py-4">
                        <span className="body-sm-regular block primary-text-400">
                          {request.businessEmail}
                        </span>
                        <span className="body-xsm-regular subtext">
                          {request.businessPhone}
                        </span>
                      </td>
                      <td className="border-r border-[var(--line)] px-4 py-4">
                        {request.documentCount > 0 ? (
                          <span className="body-sm-regular inline-flex items-center gap-1.5 primary-text">
                            <FileText
                              aria-hidden="true"
                              size={15}
                              strokeWidth={1.8}
                            />
                            {request.documentCount} files
                          </span>
                        ) : (
                          <span className="body-xsm-regular primary-text">
                            No Documents
                          </span>
                        )}
                      </td>
                      <td className="border-r border-[var(--line)] px-4 py-4">
                        <StatusChip status={request.status} />
                      </td>
                      <td className="body-sm-regular max-w-48 border-r border-[var(--line)] px-4 py-4 subtext">
                        {request.note}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            aria-label={`View ${request.businessName}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--line)] text-[var(--brand-navy)] hover:bg-[var(--surface)]"
                            onClick={() => openModal(request, "view")}
                            type="button"
                          >
                            <Eye
                              aria-hidden="true"
                              size={15}
                              strokeWidth={1.8}
                            />
                          </button>
                          <button
                            aria-label={`Edit ${request.businessName}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--line)] text-[var(--brand-navy)] hover:bg-[var(--surface)]"
                            onClick={() => openModal(request, "edit")}
                            type="button"
                          >
                            <Pencil
                              aria-hidden="true"
                              size={15}
                              strokeWidth={1.8}
                            />
                          </button>
                          <button
                            aria-label={`Delete ${request.businessName}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--line)] text-[var(--danger-text)] hover:bg-[var(--danger-bg)]"
                            onClick={() => handleDelete(request)}
                            type="button"
                          >
                            <X aria-hidden="true" size={15} strokeWidth={1.8} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedRequest && modalMode ? (
        <BusinessProfileRequestModal
          mode={modalMode}
          onClose={closeModal}
          onSave={handleSave}
          request={selectedRequest}
        />
      ) : null}
    </>
  );
}
