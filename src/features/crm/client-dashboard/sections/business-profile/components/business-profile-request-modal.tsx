/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Link2, Loader2, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PrimaryButton, SecondaryButton } from "@/components/shared-buttons";
import {
  formatBusinessProfileSubmittedDateTime,
  getBusinessProfileStatusLabel,
} from "@/features/crm/client-dashboard/sections/business-profile/business-profile-request-format";
import type { BusinessProfileRequest } from "@/features/crm/client-dashboard/sections/business-profile/business-profile-request-storage";
import {
  businessProfileInputClassName,
  businessProfileLabelClassName,
} from "@/features/crm/client-dashboard/sections/business-profile/components/business-profile-form-styles";
import { StatusChip } from "@/components/ui/status-chip";

type BusinessProfileRequestModalProps = {
  mode: "view" | "edit";
  onClose: () => void;
  onSave: (request: BusinessProfileRequest) => void;
  request: BusinessProfileRequest;
};

type DocumentPreview = {
  id: string;
  label: string;
};

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1.5">
      <span className="body-xsm-medium subtext">{label}</span>
      <span className="body-sm-regular primary-text">{value || "-"}</span>
    </div>
  );
}

function FormField({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <label className="grid gap-2">
      <span className={businessProfileLabelClassName}>{label}</span>
      {children}
    </label>
  );
}

function BusinessProfileModalDocuments({
  documents,
  onAddDocuments,
  onRemoveDocument,
}: {
  documents: DocumentPreview[];
  onAddDocuments: (count: number) => void;
  onRemoveDocument: (id: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="border-t border-[var(--line)] pt-6">
      <h3 className="h6-medium m-0 primary-text">Documents (Optional)</h3>
      <p className="body-sm-regular m-0 mt-1 subtext">
        You can upload documents to help verify your business faster.
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        {documents.map((document) => (
          <div
            className="relative h-28 w-28 overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)]"
            key={document.id}
          >
            <div className="grid h-full place-content-center bg-[linear-gradient(135deg,#f8fafc,#e2e8f0)] p-2 text-center">
              <span className="body-xsm-regular line-clamp-3 subtext">
                {document.label}
              </span>
            </div>
            <button
              aria-label={`Remove ${document.label}`}
              className="absolute right-1.5 top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--white)] text-[var(--brand-navy)] shadow-sm"
              onClick={() => onRemoveDocument(document.id)}
              type="button"
            >
              <X aria-hidden="true" size={12} strokeWidth={2} />
            </button>
          </div>
        ))}

        <button
          className="grid h-28 min-w-[220px] flex-1 place-content-center gap-2 rounded-xl border-2 border-dashed border-[var(--line)] bg-[var(--surface)] px-4 py-4 text-center transition hover:border-[var(--color-adsfixter-primary)] hover:bg-[var(--white)]"
          onClick={() => fileInputRef.current?.click()}
          type="button"
        >
          <Upload
            aria-hidden="true"
            className="mx-auto text-[var(--muted)]"
            size={24}
            strokeWidth={1.6}
          />
          <span className="body-sm-medium primary-text">
            Click to upload or drag and drop
          </span>
          <span className="body-xsm-regular subtext">
            Business license, trade license or other relevant documents
          </span>
        </button>
        <input
          accept=".jpg,.jpeg,.png,.pdf"
          className="hidden"
          multiple
          onChange={(event) => {
            const files = Array.from(event.target.files ?? []);
            onAddDocuments(files.length);
            event.target.value = "";
          }}
          ref={fileInputRef}
          type="file"
        />
      </div>

      <p className="body-xsm-regular m-0 mt-3 subtext">
        Supported format: JPG, PNG, PDF (Max 5MB each)
      </p>
    </div>
  );
}

export function BusinessProfileRequestModal({
  mode,
  onClose,
  onSave,
  request,
}: BusinessProfileRequestModalProps) {
  const [draft, setDraft] = useState(request);
  const [documents, setDocuments] = useState<DocumentPreview[]>([]);
  const isViewMode = mode === "view";

  useEffect(() => {
    setDraft(request);
    setDocuments(
      Array.from({ length: request.documentCount }, (_, index) => ({
        id: `${request.id}-doc-${index}`,
        label: `Document ${index + 1}`,
      })),
    );
  }, [request]);

  const updateField = (field: keyof BusinessProfileRequest, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const handleSave = () => {
    onSave({
      ...draft,
      documentCount: documents.length,
    });
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[var(--modal-backdrop)] p-4">
      <div className="grid max-h-[92vh] w-full max-w-5xl gap-0 overflow-y-auto rounded-2xl border border-[var(--line)] bg-[var(--white)]">
        <div className="border-b border-[var(--line)] px-6 py-5">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="h5 m-0 primary-text">{draft.businessName}</h2>
            <StatusChip status={draft.status} />
          </div>
          <p className="body-sm-regular m-0 mt-2 subtext">
            Submitted on{" "}
            {formatBusinessProfileSubmittedDateTime(draft.submittedAt)}
          </p>
        </div>

        <div className="px-6 py-5">
          {isViewMode ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <DetailField label="Business Name" value={draft.businessName} />
              <DetailField label="Business Email" value={draft.businessEmail} />
              <DetailField
                label="Business Phone"
                value={`+880 ${draft.businessPhone}`}
              />
              <DetailField
                label="Business Address"
                value={draft.businessAddress}
              />
              <DetailField label="Website Link" value={draft.websiteLink} />
              <DetailField
                label="Facebook Page Link"
                value={draft.facebookLink}
              />
              <DetailField
                label="Product Category"
                value={draft.productCategory}
              />
              <DetailField
                label="Designation of User"
                value={draft.designation}
              />
              <DetailField label="Status" value={draft.status} />
              <DetailField label="Note" value={draft.note} />
            </div>
          ) : (
            <form
              className="grid gap-5"
              onSubmit={(event) => {
                event.preventDefault();
                handleSave();
              }}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <FormField label="Business Name">
                  <input
                    className={businessProfileInputClassName}
                    onChange={(event) =>
                      updateField("businessName", event.target.value)
                    }
                    value={draft.businessName}
                  />
                </FormField>
                <FormField label="Business Email">
                  <input
                    className={businessProfileInputClassName}
                    onChange={(event) =>
                      updateField("businessEmail", event.target.value)
                    }
                    type="email"
                    value={draft.businessEmail}
                  />
                </FormField>
                <FormField label="Business Phone">
                  <div className="flex overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--field-bg)] focus-within:border-[var(--color-adsfixter-primary)]">
                    <span className="inline-flex items-center gap-1 border-r border-[var(--line)] px-3 text-sm text-[var(--brand-navy)]">
                      <span aria-hidden="true">🇧🇩</span>
                      +880
                    </span>
                    <input
                      className="min-h-10 flex-1 border-0 bg-transparent px-3 text-sm text-[var(--brand-navy)] outline-none"
                      onChange={(event) =>
                        updateField("businessPhone", event.target.value)
                      }
                      value={draft.businessPhone}
                    />
                  </div>
                </FormField>
                <FormField label="Business Address">
                  <input
                    className={businessProfileInputClassName}
                    onChange={(event) =>
                      updateField("businessAddress", event.target.value)
                    }
                    value={draft.businessAddress}
                  />
                </FormField>
                <FormField label="Website Link">
                  <div className="relative">
                    <Link2
                      aria-hidden="true"
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                      size={16}
                      strokeWidth={1.8}
                    />
                    <input
                      className={`${businessProfileInputClassName} pl-9`}
                      onChange={(event) =>
                        updateField("websiteLink", event.target.value)
                      }
                      value={draft.websiteLink}
                    />
                  </div>
                </FormField>
                <FormField label="Facebook Page Link">
                  <div className="relative">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-[#1877F2]"
                    >
                      f
                    </span>
                    <input
                      className={`${businessProfileInputClassName} pl-9`}
                      onChange={(event) =>
                        updateField("facebookLink", event.target.value)
                      }
                      value={draft.facebookLink}
                    />
                  </div>
                </FormField>
                <FormField label="Product Category">
                  <select
                    className={businessProfileInputClassName}
                    onChange={(event) =>
                      updateField("productCategory", event.target.value)
                    }
                    value={draft.productCategory}
                  >
                    <option value="White">White</option>
                    <option value="Gray">Gray</option>
                    <option value="Black">Black</option>
                  </select>
                </FormField>
                <FormField label="Designation of User">
                  <select
                    className={businessProfileInputClassName}
                    onChange={(event) =>
                      updateField("designation", event.target.value)
                    }
                    value={draft.designation}
                  >
                    <option value="Moderator">Moderator</option>
                    <option value="Admin">Admin</option>
                    <option value="Owner">Owner</option>
                  </select>
                </FormField>
              </div>

              <BusinessProfileModalDocuments
                documents={documents}
                onAddDocuments={(count) => {
                  setDocuments((current) => [
                    ...current,
                    ...Array.from({ length: count }, (_, index) => ({
                      id: `${request.id}-upload-${Date.now()}-${index}`,
                      label: `Uploaded file ${current.length + index + 1}`,
                    })),
                  ]);
                }}
                onRemoveDocument={(id) => {
                  setDocuments((current) =>
                    current.filter((document) => document.id !== id),
                  );
                }}
              />
            </form>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] px-6 py-4">
          <SecondaryButton
            className="min-h-10 px-5"
            onClick={onClose}
            type="button"
          >
            Cancel
          </SecondaryButton>
          {isViewMode ? (
            <SecondaryButton
              className="min-h-10 px-5"
              onClick={onClose}
              type="button"
            >
              Close
            </SecondaryButton>
          ) : (
            <PrimaryButton
              className="min-h-10 px-6"
              onClick={handleSave}
              type="button"
            >
              Confirm Changes
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
}
