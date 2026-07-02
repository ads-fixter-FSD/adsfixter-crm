import type { BusinessProfileRequestStatus } from "@/features/crm/client-dashboard/business-profile-request-storage";

export function formatBusinessProfileSubmittedDate(submittedAt: string) {
  return new Date(submittedAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatBusinessProfileSubmittedDateTime(submittedAt: string) {
  return new Date(submittedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function getBusinessProfileStatusLabel(status: BusinessProfileRequestStatus) {
  if (status === "Pending") {
    return "Pending review";
  }

  if (status === "Approved") {
    return "Approved";
  }

  return "Rejected";
}
