export type AccessSharingMethod = "business-manager-id" | "email" | "both";

export type AdAccountRequestStatus = "Pending" | "Approved" | "Rejected";

export type AdAccountRequest = {
  id: string;
  businessProfileId: string;
  businessProfileName: string;
  productCategory: "White" | "Gray" | "Black";
  adAccountName: string;
  advertisingProducts: string[];
  timeZone: string;
  expectedMonthlySpend: string;
  accessSharingMethod: AccessSharingMethod;
  accessSharingDetails: string;
  submittedAt: string;
  status: AdAccountRequestStatus;
};

const AD_ACCOUNT_REQUESTS_KEY = "adsfixter-ad-account-requests";
const AD_ACCOUNT_SUBMITTED_KEY = "adsfixter-ad-account-request-submitted";
const START_ADVERTISING_KEY = "adsfixter-start-advertising-ready";
const SETUP_COMPLETE_VIEW_KEY = "adsfixter-setup-complete-view";

export const adAccountTimeZoneOptions = [
  { value: "Asia/Dhaka", label: "BST (Bangladesh Standard Time)" },
  { value: "Asia/Kolkata", label: "IST (India Standard Time)" },
  { value: "UTC", label: "UTC (Coordinated Universal Time)" },
  { value: "America/New_York", label: "EST (Eastern Standard Time)" },
] as const;

export function getAdAccountRequests(): AdAccountRequest[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(AD_ACCOUNT_REQUESTS_KEY);

  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as AdAccountRequest[];
  } catch {
    return [];
  }
}

export function isAdAccountRequestSubmitted() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(AD_ACCOUNT_SUBMITTED_KEY) === "true";
}

export function isStartAdvertisingReady() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(START_ADVERTISING_KEY) === "true";
}

export function saveAdAccountRequests(requests: Omit<AdAccountRequest, "id" | "submittedAt" | "status">[]) {
  const now = new Date().toISOString();
  const nextRequests = requests.map((request) => ({
    ...request,
    id: crypto.randomUUID(),
    submittedAt: now,
    status: "Pending" as const,
  }));

  const existing = getAdAccountRequests();
  window.localStorage.setItem(AD_ACCOUNT_REQUESTS_KEY, JSON.stringify([...nextRequests, ...existing]));
  window.localStorage.setItem(AD_ACCOUNT_SUBMITTED_KEY, "true");
}

export function updateAdAccountRequest(id: string, updates: Partial<Omit<AdAccountRequest, "id">>) {
  const existing = getAdAccountRequests();
  window.localStorage.setItem(
    AD_ACCOUNT_REQUESTS_KEY,
    JSON.stringify(existing.map((request) => (request.id === id ? { ...request, ...updates } : request))),
  );
}

export function deleteAdAccountRequest(id: string) {
  const existing = getAdAccountRequests();
  window.localStorage.setItem(AD_ACCOUNT_REQUESTS_KEY, JSON.stringify(existing.filter((request) => request.id !== id)));
}

export function markStartAdvertisingReady() {
  window.localStorage.setItem(START_ADVERTISING_KEY, "true");
  clearSetupCompleteView();
}

export function showSetupCompleteView() {
  window.localStorage.setItem(SETUP_COMPLETE_VIEW_KEY, "true");
}

export function isSetupCompleteViewActive() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(SETUP_COMPLETE_VIEW_KEY) === "true";
}

export function clearSetupCompleteView() {
  window.localStorage.removeItem(SETUP_COMPLETE_VIEW_KEY);
}
