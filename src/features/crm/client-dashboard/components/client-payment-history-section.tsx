"use client";

import { ExternalLink } from "lucide-react";

const paymentHistory = [
  { date: "6/19/2026", account: "Account Balance", amountBdt: "1,490 BDT", creditedUsd: "$10.02", transactionId: "DLN310897983", method: "Dutch Bangla Bank Ltd.", status: "Approved", reason: "-", receiptId: "RCPT-61901" },
  { date: "6/17/2026", account: "Account Balance", amountBdt: "650 BDT", creditedUsd: "$4.72", transactionId: "DFB90EDLP", method: "Bkash Limited", status: "Approved", reason: "-", receiptId: "RCPT-61701" },
  { date: "6/14/2026", account: "Account Balance", amountBdt: "2,500 BDT", creditedUsd: "$22.60", transactionId: "DH490N57R", method: "Bkash Limited", status: "Approved", reason: "-", receiptId: "RCPT-61401" },
  { date: "6/12/2026", account: "Account Balance", amountBdt: "1,490 BDT", creditedUsd: "$11.02", transactionId: "RFF4NV43A", method: "Bkash Limited", status: "Approved", reason: "-", receiptId: "RCPT-61201" },
  { date: "6/10/2026", account: "Account Balance", amountBdt: "1,490 BDT", creditedUsd: "$11.02", transactionId: "SDAFSD21A", method: "Bkash Limited", status: "Approved", reason: "-", receiptId: "RCPT-61001" },
  { date: "6/7/2026", account: "Account Balance", amountBdt: "2,000 BDT", creditedUsd: "$17.75", transactionId: "DF909923A", method: "Bkash Limited", status: "Approved", reason: "-", receiptId: "RCPT-60701" },
  { date: "6/4/2026", account: "Account Balance", amountBdt: "4,500 BDT", creditedUsd: "$37.75", transactionId: "JCNDR89A", method: "Bkash Limited", status: "Approved", reason: "-", receiptId: "RCPT-60401" },
  { date: "5/30/2026", account: "Account Balance", amountBdt: "1,000 BDT", creditedUsd: "$8.23", transactionId: "JY3290CNM", method: "Bkash Limited", status: "Approved", reason: "-", receiptId: "RCPT-53001" },
  { date: "5/1/2026", account: "Account Balance", amountBdt: "1,425 BDT", creditedUsd: "$10.02", transactionId: "BE12165", method: "Dutch Bangla Bank Ltd.", status: "Approved", reason: "-", receiptId: "RCPT-50101" },
  { date: "3/17/2026", account: "Account Balance", amountBdt: "2,000 BDT", creditedUsd: "$27.76", transactionId: "DE8987S", method: "Bkash Limited", status: "Approved", reason: "-", receiptId: "RCPT-31701" },
  { date: "3/17/2026", account: "Account Balance", amountBdt: "2,000 BDT", creditedUsd: "$18.75", transactionId: "DR889LLB", method: "Bkash Limited", status: "Rejected", reason: "Transaction fee not internal", receiptId: "RCPT-31702" },
  { date: "3/10/2026", account: "Account Balance", amountBdt: "2,000 BDT", creditedUsd: "$22.05", transactionId: "DG775HR", method: "Bkash Limited", status: "Approved", reason: "-", receiptId: "RCPT-31001" },
];

type PaymentHistoryRow = (typeof paymentHistory)[number];

function openReceiptWindow(payment: PaymentHistoryRow) {
  const receiptHtml = `
    <!doctype html>
    <html>
      <head>
        <title>${payment.receiptId}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 32px; background: #f8fafc; color: #0f172a; }
          .receipt { max-width: 680px; margin: 0 auto; background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 28px; }
          h1 { margin: 0 0 8px; font-size: 24px; }
          p { color: #64748b; }
          dl { display: grid; grid-template-columns: 180px 1fr; gap: 12px; margin-top: 24px; }
          dt { color: #64748b; font-weight: 700; }
          dd { margin: 0; font-weight: 700; }
          .status { display: inline-block; padding: 6px 10px; border-radius: 999px; color: ${payment.status === "Approved" ? "#15803d" : "#dc2626"}; background: ${payment.status === "Approved" ? "#dcfce7" : "#fee2e2"}; }
        </style>
      </head>
      <body>
        <main class="receipt">
          <h1>Payment Receipt</h1>
          <p>Transaction details for ${payment.receiptId}</p>
          <dl>
            <dt>Date</dt><dd>${payment.date}</dd>
            <dt>Account</dt><dd>${payment.account}</dd>
            <dt>Amount</dt><dd>${payment.amountBdt}</dd>
            <dt>Credited USD</dt><dd>${payment.creditedUsd}</dd>
            <dt>Transaction ID</dt><dd>${payment.transactionId}</dd>
            <dt>Payment Method</dt><dd>${payment.method}</dd>
            <dt>Status</dt><dd><span class="status">${payment.status}</span></dd>
            <dt>Rejection Reason</dt><dd>${payment.reason}</dd>
          </dl>
        </main>
      </body>
    </html>
  `;
  const receiptUrl = URL.createObjectURL(new Blob([receiptHtml], { type: "text/html" }));
  window.open(receiptUrl, "_blank", "noopener,noreferrer");
  window.setTimeout(() => URL.revokeObjectURL(receiptUrl), 10000);
}

export function ClientPaymentHistorySection() {
  return (
    <section className="grid gap-5">
      <div>
        <h2 className="m-0 text-xl font-semibold text-[var(--brand-navy)]">Payment History</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">View your account top-up history and transaction status</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[var(--line)] bg-[var(--white)] p-3">
        <table className="w-full min-w-[1180px] border-collapse">
          <thead>
            <tr>
              {["Date", "Account", "Amount (BDT)", "Credited USD", "Transaction Ref", "Payment Method", "Status", "Rejection Reason", "Receipt"].map((heading) => (
                <th className="border-b border-[var(--line)] px-3 py-2 text-left text-xs font-semibold text-[var(--muted)]" key={heading}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((payment) => (
              <tr key={payment.receiptId}>
                <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">{payment.date}</td>
                <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">{payment.account}</td>
                <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">{payment.amountBdt}</td>
                <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">{payment.creditedUsd}</td>
                <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">{payment.transactionId}</td>
                <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">{payment.method}</td>
                <td className="border-b border-[var(--line)] px-3 py-2 text-sm">
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${payment.status === "Approved" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>{payment.status}</span>
                </td>
                <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--muted)]">{payment.reason}</td>
                <td className="border-b border-[var(--line)] px-3 py-2 text-sm">
                  <button className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:underline" onClick={() => openReceiptWindow(payment)} type="button">
                    <ExternalLink aria-hidden="true" size={14} strokeWidth={1.9} />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
