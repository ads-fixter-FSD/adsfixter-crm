interface StatCardProps {
  label: string;
  value: string;
  sublabel: string;
}

export default function StatCard({ label, value, sublabel }: StatCardProps) {
  return (
    <div className="flex-1 rounded-xl border border-neutral-100 bg-white p-3">
      <p className="text-[10px] text-neutral-400">{label}</p>
      <p className="mt-1 text-base font-semibold text-neutral-900">{value}</p>
      <p className="text-[10px] text-neutral-400">{sublabel}</p>
    </div>
  );
}
