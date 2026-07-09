"use client";

import React, { useState } from "react";
import { Upload, Eye, MessageSquare } from "lucide-react";
import { PrimaryButton } from "@/components/shared-buttons";
import DocumentView from "./_components/DocumentView";

type DocumentStatus = "verified" | "not_verified" | "pending";

type BusinessDocument = {
  id: string;
  type: string;
  fileName: string;
  fileSize: string;
  uploadedOnDate: string;
  uploadedOnTime: string;
  expiryDate: string;
  status: DocumentStatus;
  imageUrl: string;
};

const documents: BusinessDocument[] = [
  {
    id: "1",
    type: "Trade License",
    fileName: "trade_license_2026.pdf",
    fileSize: "2.4 MB",
    uploadedOnDate: "July 5, 2026",
    uploadedOnTime: "10:30 am",
    expiryDate: "July 5, 2027",
    status: "verified",
    imageUrl: "https://placehold.co/800x600/png?text=Trade+License+Preview", // <--- এইরকম ইমেজ ইউআরএল
  },
  {
    id: "2",
    type: "Passport",
    fileName: "passport_urban_2026.jpg",
    fileSize: "1.8 MB",
    uploadedOnDate: "July 5, 2026",
    uploadedOnTime: "10:30 am",
    expiryDate: "July 5, 2027",
    status: "verified",
    imageUrl: "https://placehold.co/800x600/png?text=Passport+Preview", // <--- এইরকম ইমেজ ইউআরএল
  },
  {
    id: "3",
    type: "Tax Document",
    fileName: "tax_certificate_2026.pdf",
    fileSize: "1.2 MB",
    uploadedOnDate: "July 5, 2026",
    uploadedOnTime: "10:30 am",
    expiryDate: "July 5, 2027",
    status: "not_verified",
    imageUrl: "https://placehold.co/800x600/png?text=Trade+License+Preview", // <--- এইরকম ইমেজ ইউআরএল
  },
  {
    id: "4",
    type: "Bank Statement",
    fileName: "bank_statement_may2026.pdf",
    fileSize: "1.2 MB",
    uploadedOnDate: "July 5, 2026",
    uploadedOnTime: "10:30 am",
    expiryDate: "July 5, 2027",
    status: "pending",
    imageUrl: "https://placehold.co/800x600/png?text=Trade+License+Preview", // <--- এইরকম ইমেজ ইউআরএল
  },
];

const statusConfig: Record<
  DocumentStatus,
  { label: string; bg: string; dot: string; text: string }
> = {
  verified: {
    label: "Verified",
    bg: "bg-[#E8F5E9]",
    dot: "bg-[#4CAF50]",
    text: "text-[#2E7D32]",
  },
  not_verified: {
    label: "Not Verified",
    bg: "bg-[#F4F4F5]",
    dot: "bg-[#94A3B8]",
    text: "text-[#71717A]",
  },
  pending: {
    label: "Pending",
    bg: "bg-[#FFECE6]",
    dot: "bg-[#F74608]",
    text: "text-[#F74608]",
  },
};

const StatusBadge = ({ status }: { status: DocumentStatus }) => {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium ${config.bg} ${config.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
};

const BusinessDocuments = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState({ title: "", imageUrl: "" });
  const handleViewDocument = (title: string, imageUrl: string) => {
    setSelectedDoc({ title, imageUrl });
    setIsPreviewOpen(true);
  };
  return (
    <div className="min-h-screen p-6 max-[640px]:p-4">
      <div className="mx-auto space-y-6">
        {/* Outer Wrapper Box */}
        <div className="overflow-hidden rounded-xl border border-[#F0F0F0]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#F0F0F0] p-6 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-4">
            <div>
              <h2 className="text-lg font-semibold text-[#0F172A]">
                Business Documents
              </h2>
              <p className="mt-1 text-sm text-gray-400">
                Upload and manage documents to verify your business identity
              </p>
            </div>

            <PrimaryButton className="min-h-10 gap-2 px-4 py-2 !bg-[#F74608] hover:!bg-[#e03d04] border-0 text-white max-[640px]:w-full">
              <Upload size={16} />
              Upload Document
            </PrimaryButton>
          </div>

          {/* Documents Card */}
          <div className="p-6">
            <div className="overflow-hidden rounded-xl border border-[#F0F0F0]">
              <div className="border-b border-[#F0F0F0] p-5">
                <h3 className="text-base font-semibold text-[#0F172A]">
                  Documents
                </h3>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse text-left">
                  <thead>
                    <tr className="bg-[#F2F3F3]">
                      <th className="border-b border-r border-[#EDEDED] px-6 py-3 text-xs font-medium text-[#71717A]">
                        Document Type
                      </th>
                      <th className="border-b border-r border-[#EDEDED] px-6 py-3 text-xs font-medium text-[#71717A]">
                        File Name
                      </th>
                      <th className="border-b border-r border-[#EDEDED] px-6 py-3 text-xs font-medium text-[#71717A]">
                        Uploaded On
                      </th>
                      <th className="border-b border-r border-[#EDEDED] px-6 py-3 text-xs font-medium text-[#71717A]">
                        Expiry Date
                      </th>
                      <th className="border-b border-r border-[#EDEDED] px-6 py-3 text-xs font-medium text-[#71717A]">
                        Status
                      </th>
                      <th className="border-b border-[#EDEDED] px-6 py-3 text-xs font-medium text-[#71717A]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc, index) => (
                      <tr
                        key={doc.id}
                        className={
                          index !== documents.length - 1
                            ? "border-b border-[#EDEDED]"
                            : ""
                        }
                      >
                        <td className="border-r border-[#EDEDED] px-6 py-4 text-sm font-semibold text-[#0F172A]">
                          {doc.type}
                        </td>
                        <td className="border-r border-[#EDEDED] px-6 py-4">
                          <div className="text-sm font-semibold text-[#1E293B]">
                            {doc.fileName}
                          </div>
                          <div className="mt-0.5 text-xs text-[#94A3B8]">
                            ({doc.fileSize})
                          </div>
                        </td>
                        <td className="border-r border-[#EDEDED] px-6 py-4">
                          <div className="text-sm font-semibold text-[#1E293B]">
                            {doc.uploadedOnDate}
                          </div>
                          <div className="mt-0.5 text-xs text-[#94A3B8]">
                            {doc.uploadedOnTime}
                          </div>
                        </td>
                        <td className="border-r border-[#EDEDED] px-6 py-4 text-sm font-semibold text-[#1E293B]">
                          {doc.expiryDate}
                        </td>
                        <td className="border-r border-[#EDEDED] px-6 py-4">
                          <StatusBadge status={doc.status} />
                        </td>
                        <td className="px-6 py-4">
                          <button
                            type="button"
                            // ---- ৪. এই onClick লাইনটি যুক্ত করুন ----
                            onClick={() =>
                              handleViewDocument(
                                doc.type,
                                doc.imageUrl || "https://placehold.co/800x600",
                              )
                            }
                            aria-label={`View ${doc.type}`}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#EDEDED] text-[#94A3B8] transition hover:bg-[#F8FAFC] hover:text-[#475569]"
                          >
                            <Eye size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating chat button */}
      <button
        type="button"
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#F74608] text-white shadow-lg hover:bg-[#e03d04] transition-transform hover:scale-105"
        aria-label="Open chat"
      >
        <MessageSquare size={22} />
      </button>
      <DocumentView
        open={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title={selectedDoc.title}
        imageUrl={selectedDoc.imageUrl}
      />
    </div>
  );
};

export default BusinessDocuments;
