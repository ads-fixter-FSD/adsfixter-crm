"use client";

import { ClipboardList } from "lucide-react";
import { formatBusinessProfileSubmittedDate } from "@/features/crm/client-dashboard/sections/business-profile/business-profile-request-format";
import { getBusinessProfileRequests } from "@/features/crm/client-dashboard/sections/business-profile/business-profile-request-storage";
import { getAdAccountRequests } from "@/features/crm/client-dashboard/sections/ad-account-request/ad-account-request-storage";
import { isPaymentSetupSubmitted } from "@/features/crm/client-dashboard/sections/home/customer-onboarding-storage";
import { getPaymentSetupData } from "@/features/crm/client-dashboard/sections/payment-setup/payment-setup-storage";
import { StatusChip } from "@/components/ui/status-chip";
import Image from "next/image";

export function CustomerRecentActivitiesLayout() {
  const activities = [
    ...getBusinessProfileRequests().map((request) => ({
      id: request.id,
      date: formatBusinessProfileSubmittedDate(request.submittedAt),
      message:
        request.status === "Approved"
          ? `${request.businessName} business profile approved`
          : `${request.businessName} business profile Submitted`,
      description:
        request.status === "Approved"
          ? "You can now request ad accounts"
          : "Your business profile is under review",
      status:
        request.status === "Approved"
          ? ("Approved" as const)
          : ("Pending" as const),
    })),
    ...(isPaymentSetupSubmitted() && getPaymentSetupData()
      ? [
          {
            id: "payment-setup",
            date: formatBusinessProfileSubmittedDate(new Date().toISOString()),
            message: "Payment setup completed",
            description: "Your payment method is now verified",
            status: "Approved" as const,
          },
        ]
      : []),
    ...getAdAccountRequests().map((request) => ({
      id: request.id,
      date: formatBusinessProfileSubmittedDate(request.submittedAt),
      message: `${request.adAccountName} ad account request submitted`,
      description: "Your request is being reviewed",
      status: "Pending" as const,
    })),
  ];

  return (
    <section className="rounded-[12px] border border-[var(--line)] bg-[var(--white)]">
      <h2 className="body-medium m-0 p-4 primary-text">Recent Activites</h2>

      <hr className="border-0 border-t border-[var(--line)]" />

      {activities.length === 0 ? (
        <div className="mt-8 grid min-h-56 place-items-center px-6 py-10 text-center">
          <div className="grid max-w-sm justify-items-center gap-4">
            <Image
              src="/activity.png"
              alt="No activity"
              width={283}
              height={212}
              className="h-auto w-full max-w-[283px] object-contain"
              priority
            />

            <strong className="h6-medium primary-text">No activity yet</strong>

            <p className="body-regular m-0 subtext">
              Once you start submitting requests, your activity will appear
              here.
            </p>
          </div>
        </div>
      ) : (
        <div>
          {activities.map((activity, index) => (
            <div
              className={`flex flex-wrap items-center justify-between gap-3 px-4 py-3 ${
                index !== activities.length - 1
                  ? "border-b border-[var(--line)]"
                  : ""
              }`}
              key={activity.id}
            >
              <div>
                <strong className="body-regular primary-text-400">
                  {activity.message}
                </strong>
                <p className="body-sm-regular m-0 mt-1 subtext-400">
                  {activity.description}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="body-sm-regular subtext whitespace-nowrap">
                  {activity.date}
                </span>
                <StatusChip status={activity.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
