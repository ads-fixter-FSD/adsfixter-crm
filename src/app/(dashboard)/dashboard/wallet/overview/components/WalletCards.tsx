import React from "react";
import { Wallet, Lock, CheckCircle2, ArrowUpRight, RefreshCw, Reply } from "lucide-react";

type CardProps = {
  title: string;
  amount: string;
  subtitle: string;
  icon: React.ReactNode;
};

function MiniCard({ title, amount, subtitle, icon }: CardProps) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex flex-col justify-between min-h-[125px]">
      <div className="flex items-center gap-2 text-slate-400">
        {icon}
        <span className="text-xs font-semibold tracking-wide">{title}</span>
      </div>
      <div className="mt-2">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{amount}</h2>
        <p className="text-[11px] text-slate-400 mt-1 font-medium">{subtitle}</p>
      </div>
    </div>
  );
}

export default function WalletCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <MiniCard
        title="Current Balance"
        amount="৳53,980"
        subtitle="Available balance (BDT)"
        icon={<Wallet size={15} className="text-slate-400" />}
      />
      <MiniCard
        title="Reserved Balance"
        amount="৳0"
        subtitle="On hold / Reserved"
        icon={<Lock size={15} className="text-slate-400" />}
      />
      <MiniCard
        title="Available Balance"
        amount="৳53,980"
        subtitle="Available to spend"
        icon={<CheckCircle2 size={15} className="text-slate-400" />}
      />
      <MiniCard
        title="Lifetime Deposit"
        amount="$412,000"
        subtitle="Total deposited"
        icon={<ArrowUpRight size={15} className="text-slate-400" />}
      />
      <MiniCard
        title="Lifetime Top-up"
        amount="$348,900"
        subtitle="Total top-up"
        icon={<RefreshCw size={15} className="text-slate-400" />}
      />
      <MiniCard
        title="Total Refund"
        amount="$5,000"
        subtitle="Total refunded"
        icon={<Reply size={15} className="text-slate-400" />}
      />
    </div>
  );
}