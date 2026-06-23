export const demoCredentials = [
  {
    role: "Super Admin",
    email: "superadmin@adsfixter.com",
    password: "Super@12345",
    note: "Full dashboard, system settings, wallet and maintainer access.",
  },
  {
    role: "Maintainer",
    email: "maintainer@adsfixter.com",
    password: "Maintainer@12345",
    note: "Approval workflow for top-up, ad account, and business share requests.",
  },
  {
    role: "Customer",
    email: "customer@adsfixter.com",
    password: "Customer@12345",
    note: "Wallet, payments, account requests, and notifications.",
  },
] as const;
