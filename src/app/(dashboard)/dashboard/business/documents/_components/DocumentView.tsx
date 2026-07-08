"use client";

import React from "react";
import { X } from "lucide-react";

type DocumentViewProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  imageUrl: string;
};

const DocumentView = ({ open, onClose, title, imageUrl }: DocumentViewProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0E2038]/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[900px] max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#F0F0F0] shrink-0">
          <h2 className="text-xl font-semibold text-[#0F172A]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close document preview"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F4F4F5] text-[#0F172A] transition hover:bg-[#E4E4E7]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Document Preview */}
        <div className="p-6 overflow-y-auto">
          <div className="overflow-hidden rounded-xl border border-[#EDEDED] bg-[#F2F3F3]">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-auto max-h-[65vh] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentView;