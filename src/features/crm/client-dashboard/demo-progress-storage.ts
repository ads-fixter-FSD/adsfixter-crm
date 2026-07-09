const DEMO_PROGRESS_STORAGE_KEYS = [
  "adsfixter-business-profile-requests-enabled",
  "adsfixter-business-profile-requests",
  "adsfixter-payment-setup-data",
  "adsfixter-payment-setup-submitted",
  "adsfixter-ad-account-requests",
  "adsfixter-ad-account-request-submitted",
  "adsfixter-start-advertising-ready",
  "adsfixter-setup-complete-view",
] as const;

export function resetCustomerSetupProgress() {
  if (typeof window === "undefined") {
    return;
  }

  for (const key of DEMO_PROGRESS_STORAGE_KEYS) {
    window.localStorage.removeItem(key);
  }
}

export const customerDemoLogin = {
  email: "customer@adsfixter.com",
  password: "Customer@12345",
  signInPath: "/auth/signin",,
} as const;

export const customerSetupTestSteps = [
  "Login with the demo customer account.",
  "Home → Request Business Profile → submit business details.",
  "Home → Payment Setup → choose currency, payment method, and save.",
  "Home → Request Ad Account → fill the form and submit.",
  "Home → Continue → view the Setup Complete page at /?section=setup-complete.",
  "Setup Complete → Grow With AdsFixter → open Ad Accounts.",
  "Sidebar Home → return to the normal home dashboard.",
] as const;
