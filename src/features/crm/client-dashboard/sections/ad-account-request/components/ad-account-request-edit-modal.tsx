"use client";

import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { PrimaryButton, SecondaryButton } from "@/components/shared-buttons";
import { formatBusinessProfileSubmittedDateTime } from "@/features/crm/client-dashboard/sections/business-profile/business-profile-request-format";
import { getBusinessProfileRequests } from "@/features/crm/client-dashboard/sections/business-profile/business-profile-request-storage";
import {
  AdAccountRequestFormBlock,
  createFormValuesFromRequest,
  type AdAccountFormValues,
} from "@/features/crm/client-dashboard/sections/ad-account-request/components/ad-account-request-form-block";
import type { AdAccountRequest } from "@/features/crm/client-dashboard/sections/ad-account-request/ad-account-request-storage";
import type { ToastType } from "@/features/crm/types/crm";

type AdAccountRequestEditModalProps = {
  onClose: () => void;
  onSave: (request: AdAccountRequest) => void;
  request: AdAccountRequest;
  showToast: (type: ToastType, message: string) => void;
};

export function AdAccountRequestEditModal({ onClose, onSave, request, showToast }: AdAccountRequestEditModalProps) {
  const businessProfiles = useMemo(() => getBusinessProfileRequests(), []);
  const [values, setValues] = useState<AdAccountFormValues>(() => createFormValuesFromRequest(request));
  const [syncedRequestId, setSyncedRequestId] = useState(request.id);

  if (request.id !== syncedRequestId) {
    setSyncedRequestId(request.id);
    setValues(createFormValuesFromRequest(request));
  }

  const handleSave = () => {
    if (!values.businessProfileId || !values.adAccountName.trim()) {
      showToast("warning", "Business profile and ad account name are required");
      return;
    }

    if (values.advertisingProducts.length === 0) {
      showToast("warning", "Please add at least one advertising product");
      return;
    }

    if (!values.expectedMonthlySpend.trim()) {
      showToast("warning", "Expected monthly spend is required");
      return;
    }

    if (!values.accessSharingDetails.trim()) {
      showToast("warning", "Access / sharing details are required");
      return;
    }

    const profile = businessProfiles.find((item) => item.id === values.businessProfileId);

    onSave({
      ...request,
      businessProfileId: values.businessProfileId,
      businessProfileName: profile?.businessName ?? request.businessProfileName,
      productCategory: profile?.productCategory ?? request.productCategory,
      adAccountName: values.adAccountName.trim(),
      advertisingProducts: values.advertisingProducts,
      timeZone: values.timeZone,
      expectedMonthlySpend: values.expectedMonthlySpend.trim(),
      accessSharingMethod: values.accessSharingMethod,
      accessSharingDetails: values.accessSharingDetails.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[var(--modal-backdrop)] p-4">
      <div className="grid max-h-[92vh] w-full max-w-5xl gap-0 overflow-y-auto rounded-2xl border border-[var(--line)] bg-[var(--white)]">
        <div className="border-b border-[var(--line)] px-6 py-5">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="h5 m-0 primary-text">{request.adAccountName}</h2>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--brand-orange-soft)] px-3 py-1 text-xs font-medium text-[var(--color-adsfixter-primary)]">
              {request.status === "Pending" ? <Loader2 aria-hidden="true" className="animate-spin" size={12} strokeWidth={2} /> : null}
              {request.status}
            </span>
          </div>
          <p className="body-sm-regular m-0 mt-2 subtext">Submitted on {formatBusinessProfileSubmittedDateTime(request.submittedAt)}</p>
        </div>

        <div className="px-6 py-5">
          <AdAccountRequestFormBlock
            blockId={0}
            businessProfiles={businessProfiles}
            onChange={setValues}
            values={values}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] px-6 py-4">
          <SecondaryButton className="min-h-10 px-5" onClick={onClose} type="button">
            Cancel
          </SecondaryButton>
          <PrimaryButton className="min-h-10 px-6" onClick={handleSave} type="button">
            Update Request
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
