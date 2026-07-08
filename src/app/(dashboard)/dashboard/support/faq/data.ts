export interface FAQItem {
  id: number;
  category: "Meta API" | "Billing & Wallet" | "Integration";
  title: string;
  description: string;
  updatedDate?: string;
  readTime?: string;
}

export const MOCK_FAQS: FAQItem[] = [
  { 
    id: 1, 
    category: "Meta API", 
    title: "How to Connect Your Meta Business Manager", 
    description: "Learn how to securely connect your Meta Business Manager and start managing ad accounts.",
    updatedDate: "July 28, 2026",
    readTime: "5 min read"
  },
  { id: 2, category: "Meta API", title: "Why Is My Ad Account Under Review?", description: "Understand the common reasons for account reviews and what happens during the approval process." },
  { id: 3, category: "Billing & Wallet", title: "How Does Wallet Top-Up Work?", description: "See how USD requests are converted from your wallet balance and processed for funding." },
  { id: 4, category: "Billing & Wallet", title: "Top-Up Request Still Pending", description: "Find out why your funding request is pending and when it will be approved." },
  { id: 5, category: "Integration", title: "How to Add a New Ad Account", description: "Request and connect a new Meta, Google, or TikTok ad account in just a few steps." },
  { id: 6, category: "Meta API", title: "Business Manager Share Request Guide", description: "Learn how Business Manager sharing works and how to request access securely." },
  { id: 7, category: "Meta API", title: "Why Was My Top-Up Rejected?", description: "Review common funding issues and learn how to submit a successful top-up request." },
];