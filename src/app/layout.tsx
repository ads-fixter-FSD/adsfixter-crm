import type { Metadata } from "next";
import { QueryProvider } from "@/providers/query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "AdsFixter CRM",
  description: "Meta Ads wallet and account management for AdsFixter customers.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/adsfixter-logo.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
