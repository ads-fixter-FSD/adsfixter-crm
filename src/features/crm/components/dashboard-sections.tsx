import { MetricCard } from "@/components/ui/metric-card";
import { Panel } from "@/components/ui/panel";
import { CustomerRequestForm, RuleList, SettingsForm, WalletStatement } from "@/features/crm/components/crm-forms";
import { AccountTable, ClientTable, RequestTable } from "@/features/crm/components/crm-tables";
import type { CrmOverview, Role, ToastType } from "@/features/crm/types/crm";

type DashboardProps = {
  data: CrmOverview;
  role: Role;
  showToast: (type: ToastType, message: string) => void;
};

export function AdminDashboard({ data, role, showToast }: DashboardProps) {
  return (
    <div className="content-grid">
      <section className="metric-grid span-12">
        {data.adminMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <Panel className="span-8" title="Pending Workflow" action="Review all" onAction={() => showToast("warning", "37 pending requests need review")}>
        <RequestTable requests={data.requests} showToast={showToast} />
      </Panel>

      <Panel className="span-4" title="Recent Activities">
        <div className="activity-list">
          {data.activities.map((activity) => (
            <div className="activity-item" key={activity}>
              <span />
              <p>{activity}</p>
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="span-7" title="Dollar Rate Management">
        <div className="rate-card">
          <div>
            <span>Current Exchange Rate</span>
            <strong>1 USD = 125 BDT</strong>
            <p>10,000 BDT deposit will add 80 USD to customer wallet.</p>
          </div>
          <div className="segmented-buttons">
            {[125, 126, 127].map((rate) => (
              <button key={rate} onClick={() => showToast("success", `Dollar rate set to ${rate} BDT`)} type="button">
                {rate} BDT
              </button>
            ))}
          </div>
        </div>
      </Panel>

      <Panel className="span-5" title={`${role} Controls`}>
        <div className="control-stack">
          {["Top-up Approval", "Credit Limit Change", "Client Suspend/Activate", "Business Manager Approve"].map((control) => (
            <button className="control-button" key={control} onClick={() => showToast("success", `${control} action completed`)} type="button">
              {control}
            </button>
          ))}
        </div>
      </Panel>
    </div>
  );
}

export function MaintainerDashboard({ data, showToast }: DashboardProps) {
  const maintainerMetrics = [
    { label: "Pending Top-ups", value: "18", trend: "Verify payment first" },
    { label: "Account Requests", value: "11", trend: "Needs review" },
    { label: "Business Share", value: "8", trend: "Approval queue" },
    { label: "Failed Attempts", value: "5", trend: "Retry status pending" },
  ];

  return (
    <div className="content-grid">
      <section className="metric-grid span-12 compact">
        {maintainerMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <Panel className="span-8" title="Approval Queue" action="Review pending" onAction={() => showToast("warning", "Maintainer approval queue opened")}>
        <RequestTable requests={data.requests.filter((request) => request.status === "Pending")} showToast={showToast} />
      </Panel>

      <Panel className="span-4" title="Maintainer Tasks">
        <div className="control-stack">
          {["Verify Payment", "Approve Ad Account", "Approve Business Share", "Add Rejection Notes"].map((control) => (
            <button className="control-button" key={control} onClick={() => showToast("success", `${control} completed`)} type="button">
              {control}
            </button>
          ))}
        </div>
      </Panel>

      <Panel className="span-12" title="Client Request Snapshot">
        <ClientTable clients={data.clients} showToast={showToast} />
      </Panel>
    </div>
  );
}

export function CustomerDashboard({ data, showToast }: DashboardProps) {
  return (
    <div className="content-grid">
      <section className="metric-grid span-12 compact">
        {data.customerMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <Panel className="span-7" title="Wallet Statement">
        <WalletStatement rows={data.wallet} />
      </Panel>

      <Panel className="span-5" title="New Payment">
        <div className="payment-flow">
          {["Select bKash, Nagad, or Bank", "Enter amount and transaction ID", "Upload screenshot", "Submit for approval"].map((step, index) => (
            <div className="flow-step" key={step}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
        <button className="primary-button full-width" onClick={() => showToast("success", "Payment submitted for admin approval")} type="button">
          Submit Demo Payment
        </button>
      </Panel>

      <Panel className="span-12" title="My Ad Accounts" action="Request account" onAction={() => showToast("warning", "New ad account request saved as pending")}>
        <AccountTable accounts={data.accounts} />
      </Panel>
    </div>
  );
}

export function SectionRenderer({ data, section, role, showToast }: DashboardProps & { section: string }) {
  if (section.includes("Request") || section === "Business Share" || section === "Payments") {
    return (
      <div className="content-grid">
        <Panel className="span-8" title={role === "Customer" ? "Submit Request" : "Request Queue"}>
          {role === "Customer" ? <CustomerRequestForm section={section} showToast={showToast} /> : <RequestTable requests={data.requests} showToast={showToast} />}
        </Panel>
        <Panel className="span-4" title="Approval Rules">
          <RuleList />
        </Panel>
      </div>
    );
  }

  if (section === "Ad Accounts" || section === "My Accounts") {
    return (
      <div className="content-grid">
        <Panel className="span-12" title="Ad Accounts Management" action="Add account" onAction={() => showToast("success", "Ad account added to demo list")}>
          <AccountTable accounts={data.accounts} />
        </Panel>
      </div>
    );
  }

  if (section === "Clients") {
    return (
      <div className="content-grid">
        <Panel className="span-12" title="Client Management" action="Adjust wallet" onAction={() => showToast("success", "Wallet adjustment saved")}>
          <ClientTable clients={data.clients} showToast={showToast} />
        </Panel>
      </div>
    );
  }

  if (section === "Wallet" || section === "Wallet Settings") {
    return (
      <div className="content-grid">
        <Panel className="span-6" title="Wallet & Credit Settings">
          <SettingsForm showToast={showToast} />
        </Panel>
        <Panel className="span-6" title="Balance History">
          <WalletStatement rows={data.wallet} />
        </Panel>
      </div>
    );
  }

  return (
    <div className="content-grid">
      <section className="panel span-12 empty-state">
        <p className="eyebrow">{section}</p>
        <h2>{section} module ready</h2>
        <p>
          This screen follows the same CRM design system with black and white surfaces, brand orange actions, navy structure,
          filters, status chips, and toast feedback for success, warning, and error states.
        </p>
        <button className="primary-button" onClick={() => showToast("error", `${section} validation demo error`)} type="button">
          Show Error Toast
        </button>
      </section>
    </div>
  );
}
