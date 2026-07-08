import { FundingRow, SortConfig } from "@/types/dashboard/advertising/funding-history/types";

// "৳1000.00", "$49.45" এর মতো string থেকে শুধু numeric value বের করা
function parseAmount(value: string): number {
  const numeric = value.replace(/[^0-9.-]/g, "");
  return parseFloat(numeric) || 0;
}

export function sortRows(rows: FundingRow[], sortConfig: SortConfig): FundingRow[] {
  if (!sortConfig.key || !sortConfig.direction) return rows;

  const sorted = [...rows].sort((a, b) => {
    let valA: number | string;
    let valB: number | string;

    switch (sortConfig.key) {
      case "timestamp":
        valA = a.timestamp;
        valB = b.timestamp;
        break;
      case "accountName":
        valA = a.accountName.toLowerCase();
        valB = b.accountName.toLowerCase();
        break;
      case "amount":
        valA = parseAmount(a.amount);
        valB = parseAmount(b.amount);
        break;
      case "fee":
        valA = parseAmount(a.fee);
        valB = parseAmount(b.fee);
        break;
      case "usd":
        valA = parseAmount(a.usd);
        valB = parseAmount(b.usd);
        break;
      case "remainingBal":
        valA = parseAmount(a.remainingBal);
        valB = parseAmount(b.remainingBal);
        break;
      default:
        return 0;
    }

    if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  return sorted;
}