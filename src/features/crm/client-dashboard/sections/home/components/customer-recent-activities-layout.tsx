"use client";

import { ClipboardList } from "lucide-react";
import { formatBusinessProfileSubmittedDate } from "@/features/crm/client-dashboard/sections/business-profile/business-profile-request-format";
import { getBusinessProfileRequests } from "@/features/crm/client-dashboard/sections/business-profile/business-profile-request-storage";
import { hasSubmittedBusinessProfile } from "@/features/crm/client-dashboard/sections/home/customer-onboarding-storage";

export function CustomerRecentActivitiesLayout() {
  const activities = hasSubmittedBusinessProfile()
    ? getBusinessProfileRequests().map((request) => ({
        id: request.id,
        date: formatBusinessProfileSubmittedDate(request.submittedAt),
        message: `${request.businessName} business profile Submitted`,
        status: request.status === "Approved" ? ("Approved" as const) : ("Pending" as const),
      }))
    : [];

  return (
    <section className="rounded-xl border border-[var(--line)] bg-[var(--white)] p-5 max-[1180px]:p-4">
      <h2 className="h6-medium m-0 primary-text">Recent Activites</h2>

      {activities.length === 0 ? (
        <div className="mt-8 grid min-h-56 place-items-center rounded-xl border border-[var(--line)] bg-[var(--surface)] px-6 py-10 text-center">
          <div className="grid max-w-sm gap-3">
            <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--info-bg)] text-[var(--info-text)]">
              <ClipboardList aria-hidden="true" size={28} strokeWidth={1.8} />
            </span>
            <strong className="body-medium primary-text">No activity yet</strong>
            <p className="body-sm-regular m-0 subtext">Once you start submitting requests, your activity will appear here.</p>
          </div>
        </div>
      ) : (
        <div className="mt-5 grid gap-3">
          {activities.map((activity) => (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--line)] bg-[var(--white)] px-4 py-3" key={activity.id}>
              <div>
                <strong className="body-sm-medium primary-text">{activity.message}</strong>
                <p className="body-xsm-regular m-0 mt-1 subtext">{activity.date}</p>
              </div>
              <span
                className={`body-xsm-medium inline-flex rounded-full px-3 py-1 ${
                  activity.status === "Approved" ? "bg-[var(--success-bg)] text-[var(--success-text)]" : "bg-[var(--warning-bg)] text-[var(--warning-text)]"
                }`}
              >
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
