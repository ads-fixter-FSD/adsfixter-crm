import { StatusChip } from "@/components/ui/status-chip";
import type { AdAccount, Client, CrmRequest, ToastType } from "@/features/crm/types/crm";

type TableAction = (type: ToastType, message: string) => void;

export function RequestTable({ requests, showToast }: { requests: CrmRequest[]; showToast: TableAction }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Request</th>
            <th>Amount</th>
            <th>Reference</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={`${request.name}-${request.type}`}>
              <td>{request.name}</td>
              <td>{request.type}</td>
              <td>{request.amount}</td>
              <td>{request.method}</td>
              <td>
                <StatusChip status={request.status} />
              </td>
              <td>
                <div className="row-actions">
                  <button onClick={() => showToast("success", `${request.type} approved`)} type="button">
                    Approve
                  </button>
                  <button onClick={() => showToast("error", `${request.type} rejected with notes`)} type="button">
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AccountTable({ accounts }: { accounts: AdAccount[] }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Account Name</th>
            <th>Ad Account ID</th>
            <th>Client</th>
            <th>Business Manager</th>
            <th>Currency</th>
            <th>Today&apos;s Spend</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.name}</td>
              <td>{account.id}</td>
              <td>{account.client}</td>
              <td>{account.businessManager}</td>
              <td>{account.currency}</td>
              <td>{account.spend}</td>
              <td>
                <StatusChip status={account.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ClientTable({ clients, showToast }: { clients: Client[]; showToast: TableAction }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Client</th>
            <th>Email</th>
            <th>Wallet</th>
            <th>Credit Limit</th>
            <th>Daily Limit</th>
            <th>Status</th>
            <th>Control</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.email}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.balance}</td>
              <td>{client.credit}</td>
              <td>{client.dailyLimit}</td>
              <td>
                <StatusChip status={client.status} />
              </td>
              <td>
                <button className="mini-button" onClick={() => showToast("warning", `${client.name} status update queued`)} type="button">
                  Manage
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
