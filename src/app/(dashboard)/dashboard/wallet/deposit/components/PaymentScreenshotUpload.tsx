"use client";

import React, { useRef, useState } from "react";
import { Upload, X } from "lucide-react";

type AttachedFile = {
  id: string;
  url: string;
  name: string;
};

export default function PaymentScreenshotUpload() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [attachments, setAttachments] = useState<AttachedFile[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);
    const mapped = selectedFiles.map((file) => ({
      id: `${Date.now()}-${file.name}`,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setAttachments((prev) => [...prev, ...mapped]);
    e.target.value = ""; // Input resetting
  };

  const handleRemove = (id: string) => {
    setAttachments((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target?.url) URL.revokeObjectURL(target.url);
      return prev.filter((item) => item.id !== id);
    });
  };

  return (
    <div className="space-y-5">
      {/* Title */}
      <div className="flex gap-3">
        <span className="w-6 h-6 rounded-full bg-[#f24e1e] text-white font-bold text-sm flex items-center justify-center shrink-0">4</span>
        <div className="space-y-0.5">
          <h3 className="text-base font-bold text-slate-900">Upload Payment Screenshot</h3>
          <p className="text-xs text-slate-400">Upload a screenshot or receipt of your payment.</p>
        </div>
      </div>

      {/* Dashed Drag/Drop Box */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="w-full border-2 border-dashed border-slate-200 bg-slate-50/40 rounded-2xl py-8 flex flex-col items-center justify-center text-center hover:bg-slate-50/80 transition group cursor-pointer"
      >
        <div className="p-2 bg-white rounded-xl border border-slate-100 shadow-3xs group-hover:scale-105 transition">
          <Upload size={18} className="text-[#f24e1e]" strokeWidth={2.5} />
        </div>
        <span className="mt-3 text-sm font-bold text-slate-800">Drag & drop your file here</span>
        <span className="mt-1 text-xs text-slate-400 font-medium">PNG, JPG, JPEG up to 5MB</span>
      </button>

      <input
        type="file"
        ref={fileInputRef}
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="space-y-2">
        <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
          Accepted formats: JPG, PNG, PDF (Max 10MB)
        </span>
        
        {/* Render Device Local Previews Dynamically */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-2">
            {attachments.map((file) => (
              <div key={file.id} className="relative w-16 h-16 rounded-lg border border-slate-200 overflow-hidden shadow-3xs bg-slate-100">
                <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemove(file.id)}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-rose-600 transition shadow-xs"
                >
                  <X size={10} strokeWidth={3} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}