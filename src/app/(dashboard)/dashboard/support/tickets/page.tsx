
import TecketSupportCards from "@/components/dashboard/support/TecketSupportCards";
import TecketOverview from "@/components/dashboard/support/TecketOverview";
import overviewData from "@/components/dashboard/support/data/data.json";


const icon1 = <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.82292 0.5H2.56468C2.51421 0.5 2.48897 0.5 2.47325 0.500247C0.794172 0.526648 -0.10678 2.48552 0.965903 3.77755C0.975946 3.78965 0.99237 3.80881 1.02522 3.84713C1.03972 3.86405 1.04697 3.87251 1.05326 3.87999C1.67837 4.62389 1.67837 5.70945 1.05326 6.45334C1.04697 6.46083 1.03972 6.46929 1.02522 6.4862C0.99237 6.52453 0.975946 6.54369 0.965903 6.55578C-0.10678 7.84782 0.794172 9.80668 2.47325 9.83309C2.48897 9.83333 2.5142 9.83333 2.56468 9.83333H3.82292M3.82292 0.5H9.08115C9.13163 0.5 9.15686 0.5 9.17258 0.500247C10.8517 0.526648 11.7526 2.48552 10.6799 3.77755C10.6699 3.78965 10.6535 3.80881 10.6206 3.84713C10.6061 3.86405 10.5989 3.87251 10.5926 3.87999C9.96746 4.62389 9.96746 5.70945 10.5926 6.45334C10.5989 6.46083 10.6061 6.46929 10.6206 6.4862C10.6535 6.52453 10.6699 6.54369 10.6799 6.55578C11.7526 7.84782 10.8517 9.80668 9.17258 9.83309C9.15686 9.83333 9.13163 9.83333 9.08115 9.83333H3.82292M3.82292 0.5V2.16667M3.82292 4.16667V5.16667M3.82292 9.83333V7.16667" stroke="#0E2038" stroke-linecap="round" stroke-linejoin="round"/></svg>;
const icon2 = <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.91771 6.94362C1.08436 6.81395 0.667688 6.74912 0.552412 6.51783C0.516777 6.44634 0.498792 6.36734 0.499962 6.28747C0.503746 6.02908 0.851281 5.79025 1.54635 5.31258L7.12658 1.47775C8.17609 0.756504 8.70085 0.395881 8.96407 0.526444C9.04386 0.566024 9.11163 0.6262 9.16038 0.700751C9.32116 0.946673 9.02516 1.51041 8.43314 2.63788L7.61446 4.19705C7.39501 4.61499 7.28528 4.82397 7.33187 5.00923C7.34675 5.06838 7.37232 5.12431 7.40732 5.17425C7.51696 5.33068 7.7468 5.3844 8.20647 5.49183L9.54735 5.80522C10.345 5.99164 10.7438 6.08485 10.8425 6.32049C10.873 6.39344 10.8858 6.4726 10.8798 6.55147C10.8605 6.80619 10.5114 7.02037 9.81317 7.44873L4.14195 10.9282C3.09605 11.5698 2.5731 11.8907 2.3182 11.75C2.24081 11.7073 2.17613 11.6449 2.13074 11.569C1.98123 11.3192 2.28353 10.7853 2.88813 9.71758L3.61174 8.43962C3.86857 7.98604 3.99699 7.75925 3.94521 7.56256C3.92876 7.5001 3.90037 7.44142 3.8616 7.38976C3.73953 7.22709 3.482 7.18701 2.96695 7.10687L1.91771 6.94362Z" stroke="#0E2038" stroke-linejoin="round"/></svg>;
const icon3 = <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.16667 0.5H8.16667M2.16667 0.5V3.5C2.16667 3.80956 2.16667 3.96434 2.17951 4.09471C2.3042 5.36078 3.30588 6.36246 4.57195 6.48716C4.70233 6.5 4.85711 6.5 5.16667 6.5M2.16667 0.5H0.5M8.16667 0.5V3.5C8.16667 3.80956 8.16667 3.96434 8.15383 4.09471C8.02913 5.36078 7.02745 6.36246 5.76138 6.48716C5.631 6.5 5.47623 6.5 5.16667 6.5M8.16667 0.5H9.83333M5.16667 6.5C5.47623 6.5 5.63101 6.5 5.76138 6.51284C7.02745 6.63754 8.02913 7.63922 8.15383 8.90529C8.16667 9.03566 8.16667 9.19044 8.16667 9.5V12.5M5.16667 6.5C4.85711 6.5 4.70233 6.5 4.57195 6.51284C3.30588 6.63754 2.3042 7.63921 2.17951 8.90529C2.16667 9.03566 2.16667 9.19044 2.16667 9.5L2.16667 12.5M9.83333 12.5H8.16667L2.16667 12.5M2.16667 12.5H0.5" stroke="#0E2038" stroke-linecap="round" stroke-linejoin="round"/></svg>;
const icon4 = <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.16667 0.5L2.23333 4.5L0.5 2.5M11.1665 1.16667L5.56654 5.83333L4.69987 4.83333" stroke="#0E2038" stroke-linecap="round" stroke-linejoin="round"/></svg>;

export type StatusColor = "orange" | "blue" | "green";

export interface TicketData {
  ticketId: string;
  date: string;
  assetType: string;
  account: string;
  accountId: string;
  subject: string;
  description: string;
  status: string;
  statusColor: StatusColor;
  lastUpdate: string;
}

export default function OverviewPage() {
  const supportStats = [
    { id: "total-opened", icon: icon1, title: "Total Opened Ticket", value: overviewData.overview.totalOpened, subtitle: "All support tickets submitted" },
    { id: "active", icon: icon2, title: "Active Ticket", value: overviewData.overview.active, subtitle: "Currently being handled" },
    { id: "in-progress", icon: icon3, title: "In Progress Ticket", value: overviewData.overview.inProgress, subtitle: "Support team is working on it" },
    { id: "resolved", icon: icon4, title: "Resolved Ticket", value: overviewData.overview.resolved, subtitle: "Successfully completed requests" },
  ];

  return (
    <div className="flex w-full flex-col gap-5 pb-10">
      <TecketSupportCards
        title={overviewData.pageTitle}
        todayDate="Wednesday - July 08, 2026"
        dateRangeLabel="May 2026"
        stats={supportStats}
      />

      <TecketOverview
        title="Tickets"
        subtitle="Track your support activity and get the help you need."
        tickets={overviewData.tickets.data as TicketData[]}
        totalTickets={overviewData.tickets.totalTickets}
      />
    </div>
  );
}
