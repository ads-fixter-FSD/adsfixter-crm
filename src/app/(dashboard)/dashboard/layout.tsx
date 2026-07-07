// app/(dashboard)/dashboard/layout.tsx
import React from "react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden font-sans">
      
      {/* ─── LEFT SIDEBAR ─── */}
      <aside className="w-72 bg-white border-r border-gray-100 flex flex-col justify-between p-6 hidden lg:flex">
        <div>
          {/* Logo / Brand Info */}
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">M</div>
            <div>
              <h2 className="text-sm font-bold text-gray-800">Meta Bari</h2>
              <p className="text-xs text-gray-400">Meta Ads CRM Platform</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-3 px-2">Main</div>
          <nav className="space-y-1">
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl bg-orange-50 text-orange-600 transition-colors">
              <span>🏠</span> Home
            </Link>
            <Link href="/dashboard/advertising" className="flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-colors">
              <div className="flex items-center gap-3"><span>📊</span> Advertising</div>
              <span className="text-xs text-gray-400">❯</span>
            </Link>
            <Link href="/dashboard/wallet" className="flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-colors">
              <div className="flex items-center gap-3"><span>💳</span> Wallet</div>
              <span className="text-xs text-gray-400">❯</span>
            </Link>
            {/* আপনার অন্যান্য রুটগুলো এখানে একইভাবে যুক্ত করতে পারেন */}
          </nav>
        </div>

        {/* User Profile Info (Bottom of Sidebar) */}
        <div className="border-t border-gray-100 pt-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
            <img src="/avatar-placeholder.png" alt="Abdullah" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">Abdullah</p>
            <p className="text-xs text-gray-400 truncate">abdullah@gmail.com</p>
          </div>
        </div>
      </aside>

      {/* ─── RIGHT CONTENT AREA ─── */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* TOP NAVBAR */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 z-10">
          <div className="text-sm font-medium text-gray-500">
            Dashboard / <span className="text-gray-800 font-semibold">Home</span>
          </div>
          
          {/* Right Header Controls */}
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-gray-600">🔍</button>
            <button className="text-gray-400 hover:text-gray-600 relative">🔔</button>
            
            {/* Client Consultant Info */}
            <div className="flex items-center gap-3 border-l pl-6 border-gray-200">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">Sarah Jenkins</p>
                <p className="text-xs text-gray-400">Senior Consultant</p>
              </div>
              <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* DYNAMIC CONTENT CONTAINER */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
          {children}
        </main>

      </div>
    </div>
  );
}