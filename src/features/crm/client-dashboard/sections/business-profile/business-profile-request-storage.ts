export type BusinessProfileRequestStatus = "Pending" | "Approved" | "Rejected";

export type BusinessProfileRequest = {
  id: string;
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  websiteLink: string;
  facebookLink: string;
  productCategory: "White" | "Gray" | "Black";
  designation: string;
  documentCount: number;
  status: BusinessProfileRequestStatus;
  note: string;
  submittedAt: string;
};

const NAV_STORAGE_KEY = "adsfixter-business-profile-requests-enabled";
const REQUESTS_STORAGE_KEY = "adsfixter-business-profile-requests";

export function isBusinessProfileRequestsNavEnabled() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(NAV_STORAGE_KEY) === "true";
}

export function enableBusinessProfileRequestsNav() {
  window.localStorage.setItem(NAV_STORAGE_KEY, "true");
}

export function getBusinessProfileRequests(): BusinessProfileRequest[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(REQUESTS_STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as BusinessProfileRequest[];
  } catch {
    return [];
  }
}

export function saveBusinessProfileRequests(requests: BusinessProfileRequest[]) {
  window.localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(requests));
}

export function addBusinessProfileRequests(requests: Omit<BusinessProfileRequest, "id" | "status" | "note" | "submittedAt">[]) {
  const existing = getBusinessProfileRequests();
  const now = new Date().toISOString();
  const nextRequests = requests.map((request) => ({
    ...request,
    id: crypto.randomUUID(),
    status: "Pending" as const,
    note: "Your business profile is under review",
    submittedAt: now,
  }));

  saveBusinessProfileRequests([...nextRequests, ...existing]);
}

export function updateBusinessProfileRequest(id: string, updates: Partial<BusinessProfileRequest>) {
  const existing = getBusinessProfileRequests();
  saveBusinessProfileRequests(existing.map((request) => (request.id === id ? { ...request, ...updates } : request)));
}

export function deleteBusinessProfileRequest(id: string) {
  const existing = getBusinessProfileRequests();
  saveBusinessProfileRequests(existing.filter((request) => request.id !== id));
}

export function extractBusinessProfilesFromForm(formElement: HTMLFormElement, formIds: number[]) {
  return formIds.map((formId) => {
    const getValue = (field: string) => formElement.querySelector<HTMLInputElement | HTMLSelectElement>(`#business-${field}-${formId}`)?.value.trim() ?? "";

    return {
      businessName: getValue("name") || "Untitled Business",
      businessEmail: getValue("email"),
      businessPhone: getValue("phone"),
      businessAddress: getValue("address"),
      websiteLink: getValue("website"),
      facebookLink: getValue("facebook"),
      productCategory: (getValue("category") || "White") as BusinessProfileRequest["productCategory"],
      designation: getValue("designation") || "Moderator",
      documentCount: 0,
    };
  });
}
