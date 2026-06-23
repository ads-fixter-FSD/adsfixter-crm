import type { ToastType, WalletLine } from "@/features/crm/types/crm";

type ToastAction = (type: ToastType, message: string) => void;

export function CustomerRequestForm({ section, showToast }: { section: string; showToast: ToastAction }) {
  const isPayment = section === "Payments";

  return (
    <form
      className="form-grid"
      onSubmit={(event) => {
        event.preventDefault();
        showToast("success", `${section} submitted for approval`);
      }}
    >
      <label>
        {isPayment ? "Payment Method" : "Account / Business Name"}
        <input placeholder={isPayment ? "bKash / Nagad / Bank Transfer" : "Example: Scale Ads Main"} />
      </label>
      <label>
        {isPayment ? "Amount in BDT" : "Ad Account or Business Manager ID"}
        <input placeholder={isPayment ? "10000" : "act_123456 or BM-1234"} />
      </label>
      <label>
        {isPayment ? "Transaction ID" : "Notes"}
        <input placeholder={isPayment ? "TXN8AB72" : "Please connect this account"} />
      </label>
      <label>
        Screenshot / Attachment
        <input type="file" />
      </label>
      <button className="primary-button" type="submit">
        Submit Request
      </button>
    </form>
  );
}

export function SettingsForm({ showToast }: { showToast: ToastAction }) {
  return (
    <form
      className="form-grid"
      onSubmit={(event) => {
        event.preventDefault();
        showToast("success", "Wallet settings updated");
      }}
    >
      <label>
        Dollar Rate
        <input defaultValue="125" />
      </label>
      <label>
        Default Credit Limit
        <input defaultValue="-50" />
      </label>
      <label>
        Default Daily Limit
        <input defaultValue="100" />
      </label>
      <label>
        Client Status
        <select defaultValue="Active">
          <option>Active</option>
          <option>Suspended</option>
          <option>Pending</option>
        </select>
      </label>
      <button className="primary-button" type="submit">
        Save Settings
      </button>
    </form>
  );
}

export function WalletStatement({ rows }: { rows: WalletLine[] }) {
  return (
    <div className="wallet-list">
      {rows.map((row) => (
        <div className={`wallet-row ${row.type}`} key={row.item}>
          <span>{row.item}</span>
          <strong>{row.amount}</strong>
        </div>
      ))}
    </div>
  );
}

export function RuleList() {
  return (
    <div className="rule-list">
      <p>Verify payment screenshot and transaction ID before top-up approval.</p>
      <p>Customer wallet updates use BDT deposit divided by current dollar rate.</p>
      <p>Approval and rejection actions require notes for audit history.</p>
      <p>Super Admin 2FA is mandatory before sensitive setting changes.</p>
    </div>
  );
}
