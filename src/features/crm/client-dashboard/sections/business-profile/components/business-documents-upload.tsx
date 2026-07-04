"use client";

import { Upload } from "lucide-react";
import { useRef } from "react";
import { businessProfileLabelClassName } from "@/features/crm/client-dashboard/sections/business-profile/components/business-profile-form-styles";

type BusinessDocumentsUploadProps = {
  variant?: "card" | "embedded";
};

export function BusinessDocumentsUpload({ variant = "card" }: BusinessDocumentsUploadProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  // variant "card" বা "embedded" যাই হোক না কেন, স্ক্রিনশটের মতো বক্স বর্ডার এবং প্যাডিং নিশ্চিত করা হয়েছে
  const containerClassName = "mt-8 rounded-xl border border-[var(--line)] bg-[var(--white)] p-5 max-[720px]:p-4";

  return (
    <div className={containerClassName}>
      {/* হেডার পার্ট */}
      <h2 className="h6-medium m-0 primary-text">Documents (Optional)</h2>
      <p className="body-sm-regular m-0 mt-1 subtext">You can upload documents to help verify your business faster.</p>

      {/* বর্ডার পার্ট: কন্টেইনারের মেইন প্যাডিং (p-5 এবং p-4) কেটে একদম দুই প্রান্তের সাইড বর্ডারে মিশে যাবে */}
      <div className="-mx-5 max-[720px]:-mx-4 mt-4 border-b border-[#EDEDED]"></div>

      {/* আপলোড অংশ */}
      <div className="mt-5 grid gap-2">
        <span className={businessProfileLabelClassName}>Upload Documents</span>
        <button
          className="grid min-h-40 w-full place-content-center gap-2 rounded-xl border-2 border-dashed border-[var(--line)] px-4 py-6 text-center transition hover:border-[var(--color-adsfixter-primary)] hover:bg-[var(--white)]"
          onClick={() => fileInputRef.current?.click()}
          type="button"
        >
          <Upload aria-hidden="true" className="mx-auto text-[var(--muted)]" size={28} strokeWidth={1.6} />
          <span className="body-sm-medium primary-text">Click to upload or drag and drop</span>
          <span className="body-xsm-regular subtext">Business license, trade license or other relevant documents</span>
        </button>
        <input accept=".jpg,.jpeg,.png,.pdf" className="hidden" multiple ref={fileInputRef} type="file" />
        <p className="body-sm-regular m-0 subtext">Supported format: JPG, PNG, PDF (Max 5MB each)</p>
      </div>
    </div>
  );
}