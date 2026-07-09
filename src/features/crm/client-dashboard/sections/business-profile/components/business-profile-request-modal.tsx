
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Link2, Upload, X, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import { StatusChip } from "@/components/ui/status-chip";
import { BusinessProfileRequest } from "../business-profile-request-storage";
import { businessProfileInputClassName } from "./business-profile-form-styles";
import { formatBusinessProfileSubmittedDateTime } from "../business-profile-request-format";

type BusinessProfileRequestModalProps = {
  mode: "view" | "edit";
  onClose: () => void;
  onSave: (request: BusinessProfileRequest) => void;
  request: BusinessProfileRequest;
};

type DocumentPreview = {
  id: string;
  label: string;
  url?: string;
  isPdf?: boolean;
};

// লোগো সহ প্ল্যাটফর্মের ডেটা অ্যারে
const PLATFORMS = [
  { value: "Meta", label: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { value: "Google", label: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" },
  { value: "TikTok", label: "TikTok", logo: "https://upload.wikimedia.org/wikipedia/commons/3/34/Ionicons_logo-tiktok.svg" },
];

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
    <label className="grid gap-2 w-full">
      <span className="text-sm font-medium text-slate-500">{label}</span>
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
  onAddDocuments: (files: File[]) => void;
  onRemoveDocument: (id: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="border-t border-slate-100 pt-6 mt-6">
      <h3 className="text-xl font-semibold text-[#0f172a]">Documents (Optional)</h3>
      <p className="text-xs text-slate-400 mt-1">
        You can upload documents to help verify your business faster.
      </p>

      <div className="mt-6">
        <span className="text-xs font-medium text-slate-400 block mb-3">Upload Documents</span>
        
        <div className="flex flex-wrap items-center gap-4">
          {documents.map((document) => (
            <div
              className="relative h-24 w-24 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 flex-shrink-0"
              key={document.id}
            >
              {document.url && !document.isPdf ? (
                <img 
                  src={document.url} 
                  alt={document.label} 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="grid h-full place-content-center p-2 text-center bg-slate-100">
                  <span className="text-[10px] font-medium text-slate-500 break-all line-clamp-2">
                    {document.label}
                  </span>
                </div>
              )}
              <button
                aria-label={`Remove ${document.label}`}
                className="absolute right-1.5 top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-slate-500 shadow-md border border-slate-100 hover:bg-slate-50 transition"
                onClick={() => onRemoveDocument(document.id)}
                type="button"
              >
                <X aria-hidden="true" size={10} strokeWidth={2.5} />
              </button>
            </div>
          ))}

          <button
            className="flex flex-col items-center justify-center flex-1 min-w-[280px] h-24 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-2 text-center transition hover:border-slate-400"
            onClick={() => fileInputRef.current?.click()}
            type="button"
          >
            <div className="p-1.5 bg-slate-50 rounded-lg mb-1">
              <Upload className="text-slate-500" size={16} strokeWidth={2} />
            </div>
            <span className="text-xs font-semibold text-slate-800">
              Click to upload or drag and drop
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">
              Business license, trade license or other relevant documents
            </span>
          </button>
          
          <input
            accept=".jpg,.jpeg,.png,.pdf"
            className="hidden"
            multiple
            onChange={(event) => {
              const files = Array.from(event.target.files ?? []);
              if (files.length > 0) {
                onAddDocuments(files);
              }
              event.target.value = "";
            }}
            ref={fileInputRef}
            type="file"
          />
        </div>
        
        <p className="text-[11px] text-slate-400 mt-3">
          Supported format: JPG, PNG, PDF (Max 5MB each)
        </p>
      </div>
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
  const [isPlatformDropdownOpen, setIsPlatformDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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

  // কাস্টম ড্রপডাউন বক্সের বাইরে ক্লিক করলে ড্রপডাউন বন্ধ করার লজিক
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsPlatformDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateField = (field: keyof BusinessProfileRequest, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const handleSave = () => {
    onSave({
      ...draft,
      documentCount: documents.length,
    });
  };

  const selectedPlatform = PLATFORMS.find(p => p.value === draft.productCategory) || PLATFORMS[0];

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4 backdrop-blur-xs">
      <div className="relative grid max-h-[95vh] w-full max-w-4xl gap-0 overflow-y-auto rounded-2xl border border-slate-100 bg-white shadow-xl">
        
        <button
          onClick={onClose}
          className="absolute right-6 top-6 inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          type="button"
        >
          <X size={18} strokeWidth={2} />
        </button>

        <div className="border-b border-slate-100 px-8 pt-7 pb-5">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-slate-900">{draft.businessName}</h2>
            <StatusChip status={draft.status} />
          </div>
          <p className="text-xs text-slate-400 mt-1.5">
            Submitted on {formatBusinessProfileSubmittedDateTime(draft.submittedAt)}
          </p>
        </div>

        <div className="px-8 py-6">
          {isViewMode ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <DetailField label="Business Name" value={draft.businessName} />
              <DetailField label="Business Email" value={draft.businessEmail} />
              <DetailField label="Business Phone" value={draft.businessPhone} />
              <DetailField label="Business Address" value={draft.businessAddress} />
              <DetailField label="Website Link" value={draft.websiteLink} />
              <DetailField label="Facebook Page Link" value={draft.facebookLink} />
              <DetailField label="Product Category" value={draft.productCategory} />
              <DetailField label="Designation of User" value={draft.designation} />
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
              <div className="grid gap-x-6 gap-y-5 md:grid-cols-2">
                
                {/* 🎯 লোগো সহ কাস্টম প্ল্যাটফর্ম ড্রপডাউন সিলেক্টর */}
                <FormField label="Change Platform">
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsPlatformDropdownOpen(!isPlatformDropdownOpen)}
                      className={`${businessProfileInputClassName} flex items-center justify-between text-left w-full bg-white`}
                    >
                      <div className="flex items-center gap-2.5">
                        <img src={selectedPlatform.logo} alt={selectedPlatform.label} className="w-4 h-4 object-contain" />
                        <span className="text-sm text-slate-800">{selectedPlatform.label}</span>
                      </div>
                      <ChevronDown className="text-slate-400" size={16} />
                    </button>

                    {isPlatformDropdownOpen && (
                      <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-10 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg animate-in fade-in slide-in-from-top-1 duration-150">
                        {PLATFORMS.map((platform) => (
                          <button
                            key={platform.value}
                            type="button"
                            onClick={() => {
                              updateField("productCategory", platform.value);
                              setIsPlatformDropdownOpen(false);
                            }}
                            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 text-slate-700 transition"
                          >
                            <img src={platform.logo} alt={platform.label} className="w-4 h-4 object-contain" />
                            <span>{platform.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </FormField>

                <FormField label="Business Name">
                  <input
                    className={businessProfileInputClassName}
                    onChange={(event) => updateField("businessName", event.target.value)}
                    value={draft.businessName}
                  />
                </FormField>
                
                {/* 🎯 কান্ট্রি কোড সহ ইন্টারন্যাশনাল ফোন নাম্বার ইনপুট ফিল্ড */}
                <FormField label="Business Phone">
                  <div className="phone-input-wrapper">
                    <PhoneInput
                      defaultCountry="bd"
                      value={draft.businessPhone}
                      onChange={(phone) => updateField("businessPhone", phone)}
                      className="w-full flex"
                      inputClassName="!min-h-10 !flex-1 !border !border-slate-200 focus-within:!border-slate-400 !rounded-r-lg !px-3 !text-sm !text-slate-800 !outline-none !w-full"
                      countrySelectorStyleProps={{
                        className: "!border !border-slate-200 !border-r-0 !rounded-l-lg !bg-slate-50/50 !px-2.5 hover:!bg-slate-50 transition"
                      }}
                    />
                  </div>
                </FormField>

                <FormField label="Business Email">
                  <input
                    className={businessProfileInputClassName}
                    onChange={(event) => updateField("businessEmail", event.target.value)}
                    type="email"
                    value={draft.businessEmail}
                  />
                </FormField>

                <FormField label="Business Address">
                  <input
                    className={businessProfileInputClassName}
                    onChange={(event) => updateField("businessAddress", event.target.value)}
                    value={draft.businessAddress}
                  />
                </FormField>

                <FormField label="Facebook Page Link">
                  <div className="relative">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400"
                    >
                      𝓯
                    </span>
                    <input
                      className={`${businessProfileInputClassName} pl-8`}
                      onChange={(event) => updateField("facebookLink", event.target.value)}
                      value={draft.facebookLink}
                    />
                  </div>
                </FormField>

                <FormField label="Website Link">
                  <div className="relative">
                    <Link2
                      aria-hidden="true"
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                      strokeWidth={1.8}
                    />
                    <input
                      className={`${businessProfileInputClassName} pl-9 pr-8`}
                      onChange={(event) => updateField("websiteLink", event.target.value)}
                      value={draft.websiteLink}
                    />
                    {draft.websiteLink && (
                      <button
                        type="button"
                        onClick={() => updateField("websiteLink", "")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </FormField>

                <FormField label="Designation of User">
                  <div className="relative">
                    <select
                      className={`${businessProfileInputClassName} appearance-none pr-10`}
                      onChange={(event) => updateField("designation", event.target.value)}
                      value={draft.designation}
                    >
                      <option value="Moderator">Moderator</option>
                      <option value="Admin">Admin</option>
                      <option value="Owner">Owner</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                  </div>
                </FormField>
              </div>

              <BusinessProfileModalDocuments
                documents={documents}
                onAddDocuments={(files) => {
                  const newPreviews = files.map((file, index) => {
                    const isPdf = file.type === "application/pdf" || file.name.endsWith(".pdf");
                    return {
                      id: `${request.id}-upload-${Date.now()}-${index}`,
                      label: file.name,
                      url: isPdf ? undefined : URL.createObjectURL(file),
                      isPdf,
                    };
                  });
                  setDocuments((current) => [...current, ...newPreviews]);
                }}
                onRemoveDocument={(id) => {
                  setDocuments((current) => {
                    const itemToRemove = current.find((d) => d.id === id);
                    if (itemToRemove?.url) {
                      URL.revokeObjectURL(itemToRemove.url);
                    }
                    return current.filter((document) => document.id !== id);
                  });
                }}
              />
            </form>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-8 py-5 bg-white rounded-b-2xl">
          <button
            className="min-h-10 px-6 rounded-xl border border-slate-200 text-slate-600 font-medium text-sm hover:bg-slate-50 transition"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          {!isViewMode && (
            <button
              className="min-h-10 px-8 rounded-xl bg-[#f24e1e] text-white font-medium text-sm hover:bg-[#e03d0d] transition shadow-xs"
              onClick={handleSave}
              type="button"
            >
              Confirm Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}