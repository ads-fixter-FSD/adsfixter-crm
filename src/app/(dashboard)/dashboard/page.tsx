// // app/(dashboard)/dashboard/page.tsx
// import React from "react";



// export default function DashboardHomePage() {
//   return (
//     <div className="space-y-6">
      
//       {/* Overview Title and Date Picker */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Overview</h1>
//           <p className="text-sm text-gray-500">Today is <span className="text-orange-500 font-medium">Tuesday - June 30, 2026</span></p>
//         </div>
//         <div className="bg-white border rounded-lg px-4 py-2 text-sm text-gray-600 shadow-sm cursor-pointer">
//           📅 Jan 2025 - Jun 2025
//         </div>
//       </div>

//       {/* ─── 1. TOP CARDS GRID ─── */}
//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
//         {/* Card 1 */}
//         <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
//           <p className="text-xs text-gray-400 font-medium mb-2">👛 Wallet Balance</p>
//           <h3 className="text-xl font-bold text-gray-800">৳০.০০</h3>
//           <p className="text-[10px] text-gray-400 mt-1">Available balance (BDT)</p>
//         </div>
//         {/* Card 2 */}
//         <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
//           <p className="text-xs text-gray-400 font-medium mb-2">📥 Total Top Up</p>
//           <h3 className="text-xl font-bold text-gray-800">$0.00</h3>
//           <p className="text-[10px] text-gray-400 mt-1">This month</p>
//         </div>
//         {/* বাকি কার্ডগুলো (Total Ad Spend, Credit Balance ইত্যাদি) এখানে বসবে */}
//       </div>

//       {/* ─── 2. CHART & QUICK ACTIONS MIDDLE SECTION ─── */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Spending Overview Chart Placeholder */}
//         <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[300px]">
//           <h3 className="text-base font-bold text-gray-800 mb-4">Spending Overview</h3>
//           <div className="flex items-center justify-center h-48 text-gray-400 bg-gray-50 rounded-xl border border-dashed">
//             [ এখানে আপনার রিঅ্যাক্ট চার্ট বা গ্রাফ কম্পোনেন্ট বসবে ]
//           </div>
//         </div>

//         {/* Quick Actions Panel */}
//         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
//           <h3 className="text-base font-bold text-gray-800 mb-4">Quick Action</h3>
//           <div className="space-y-3">
//             <button className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-orange-50/50 transition-all text-left">
//               <div className="flex items-center gap-3">
//                 <span className="p-2 bg-blue-50 text-blue-500 rounded-lg">💵</span>
//                 <div>
//                   <p className="text-xs font-bold text-gray-800">Add Money</p>
//                   <p className="text-[10px] text-gray-400">Top up your wallet instantly</p>
//                 </div>
//               </div>
//               <span className="text-gray-400">❯</span>
//             </button>
//             {/* অন্য কুইক অ্যাকশন বাটনগুলো... */}
//           </div>
//         </div>
//       </div>

//       {/* ─── 3. ACCOUNT OVERVIEW TABLE ─── */}
//       <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//         <div className="p-6 border-b border-gray-100">
//           <h3 className="text-base font-bold text-gray-800">Account Overview</h3>
//           <p className="text-xs text-gray-400">Manage and monitor all your Meta ad accounts</p>
//         </div>
        
//         {/* Table Content */}
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse text-sm">
//             <thead>
//               <tr className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
//                 <th className="p-4">ID</th>
//                 <th className="p-4">Account Details</th>
//                 <th className="p-4">Credit Bal</th>
//                 <th className="p-4">Meta Status</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50">
//               <tr className="hover:bg-gray-50/50 transition-colors">
//                 <td className="p-4 font-medium text-gray-700">ADF1001</td>
//                 <td className="p-4">
//                   <p className="font-semibold text-gray-800">UrbanCart Fashion</p>
//                   <p className="text-xs text-gray-400">ID: 91827364518273</p>
//                 </td>
//                 <td className="p-4 text-gray-700">$190.00</td>
//                 <td className="p-4"><span className="px-2.5 py-1 text-xs font-medium text-green-600 bg-green-50 rounded-full">● Active</span></td>
//               </tr>
//               {/* অন্যান্য টেবিল ডাটাগুলো লুপিং এর মাধ্যমে এখানে বসবে */}
//             </tbody>
//           </table>
//         </div>
//       </div>

//     </div>
//   );
// }

import AccountOverview from "@/components/dashboard/overview/Accountoverview";
import OverviewTopSection from "@/components/dashboard/overview/Overviewtopsection";
import QuickActions from "@/components/dashboard/overview/Quickactions";
import SpendingOverview from "@/components/dashboard/overview/SpendingOverview";
import overviewData from "@/data/Overviewpagedata.json";


export default function OverviewPage() {
  return (
 
     <div className="flex w-full flex-col gap-5  pb-10">
      {/* Header + Stats Cards */}
      <OverviewTopSection
        title={overviewData.header.title}
        todayDate={overviewData.header.todayDateFormatted}
        dateRangeLabel={overviewData.header.dateRangeFilter.displayLabel}
        stats={overviewData.statsCards as any}
      />
 
      {/* Row: Spending Overview (left, wider) + Quick Action (right, narrower) */}
      <div className="flex w-full gap-5">
        {/* Spending Overview — PLACEHOLDER, waiting on style */}
        <section className="flex min-h-[320px] min-w-0 flex-[2_1_0] items-center justify-center rounded-xl border border-dashed border-[#E9E9E9] p-4">
          {/* <p className="body-sm-regular subtext-500 m-0">
            Spending Overview chart goes here (Weekly / Monthly filter) — style pending
          </p> */}
          <SpendingOverview />
        </section>
 
        {/* Quick Actions */}
        <div className="flex min-w-0 flex-[1_1_0]">
          <QuickActions title="Quick Action" actions={overviewData.quickActions as any} />
        </div>
      </div>
 
      {/* Account Overview */}
      <AccountOverview
        title={overviewData.accountOverview.title}
        subtitle={overviewData.accountOverview.subtitle}
        rows={overviewData.accountOverview.rows as any}
      />
    </div>
  );
}