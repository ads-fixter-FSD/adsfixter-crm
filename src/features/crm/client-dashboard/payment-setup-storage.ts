export type PaymentSetupData = {
  currency: string;
  paymentMethods: string[];
  selectedBanks: string[];
};

const PAYMENT_SETUP_DATA_KEY = "adsfixter-payment-setup-data";
const PAYMENT_SETUP_SUBMITTED_KEY = "adsfixter-payment-setup-submitted";

export const paymentCurrencyOptions = [
  { value: "BDT", label: "BDT (৳)", flag: "🇧🇩" },
  { value: "USD", label: "USD ($)", flag: "🇺🇸" },
] as const;

export const paymentMethodOptions = [
  { id: "bank-transfer", label: "Bank Transfer" },
  { id: "bkash", label: "Bkash" },
  { id: "nagad", label: "Nagad" },
  { id: "paypal", label: "Paypal" },
  { id: "card", label: "Credit/Debit Card" },
  { id: "stripe", label: "Stripe" },
] as const;

export const supportedBankOptions = [
  "Islami Bank Bangladesh PLC",
  "Prime Bank PLC",
  "Brac Bank PLC",
  "Bank Asia PLC",
  "Dutch-Bangla Bank PLC",
  "Pubali Bank PLC",
  "City Bank PLC",
  "Dhaka Bank PLC",
  "Eastern Bank PLC",
  "UNITED COMMERCIAL BANK LTD",
] as const;

export function getPaymentSetupData(): PaymentSetupData | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(PAYMENT_SETUP_DATA_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as PaymentSetupData;
  } catch {
    return null;
  }
}

export function isPaymentSetupSubmitted() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(PAYMENT_SETUP_SUBMITTED_KEY) === "true";
}

export function savePaymentSetup(data: PaymentSetupData) {
  window.localStorage.setItem(PAYMENT_SETUP_DATA_KEY, JSON.stringify(data));
  window.localStorage.setItem(PAYMENT_SETUP_SUBMITTED_KEY, "true");
}
