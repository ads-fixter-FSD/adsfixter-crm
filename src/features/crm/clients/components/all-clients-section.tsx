"use client";

import { Filter, MoreHorizontal, Plus, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { PrimaryButton, SecondaryButton } from "@/components/shared-buttons";
import type { CrmOverview, ToastType } from "@/features/crm/types/crm";
import { readApprovedClientsFromStorage, type ClientDashboardRow } from "@/features/crm/clients/components/client-storage";

type AllClientsSectionProps = {
  data: CrmOverview;
  showToast: (type: ToastType, message: string) => void;
};

type ClientStatusFilter = "All" | ClientDashboardRow["status"];

const rowsPerPage = 10;

const extraClients: ClientDashboardRow[] = [
  { id: "client-01", name: "Perfume Store", email: "perfume@example.com", date: "Jan 24, 2026\n02:25 PM", usdRate: "129.00 BDT", balance: "$0.00", dueLimit: "$1.00", status: "Active" },
  { id: "client-02", name: "Zenopointbd", email: "zenopointbd@gmail.com", date: "Jan 23, 2026\n01:13 PM", usdRate: "130.00 BDT", balance: "$0.00", dueLimit: "$0.00", status: "Active" },
  { id: "client-03", name: "Dizital Wave", email: "dizitalwave@gmail.com", date: "Jan 21, 2026\n04:32 PM", usdRate: "130.00 BDT", balance: "$0.00", dueLimit: "$1.00", status: "Active" },
  { id: "client-04", name: "Digital", email: "shahriarxyz@gmail.com", date: "Jan 16, 2026\n02:09 PM", usdRate: "130.00 BDT", balance: "$500.00", dueLimit: "$1.00", status: "Active" },
  { id: "client-05", name: "Skynet Academy", email: "academy@example.com", date: "Jan 15, 2026\n01:39 PM", usdRate: "130.00 BDT", balance: "$100.99", dueLimit: "$0.20", status: "Active" },
  { id: "client-06", name: "BD Rionsiath Computer & IT", email: "bdcomputer@example.com", date: "Jan 14, 2026\n12:46 PM", usdRate: "130.00 BDT", balance: "$20.00", dueLimit: "$0.00", status: "Active" },
  { id: "client-07", name: "Rifahz", email: "rifahz@gmail.com", date: "Jan 14, 2026\n06:45 PM", usdRate: "130.00 BDT", balance: "$1.00", dueLimit: "$0.09", status: "Active" },
  { id: "client-08", name: "Rayhan Shop", email: "rayhan@example.com", date: "Jun 02, 2026\n01:46 PM", usdRate: "129.00 BDT", balance: "$0.00", dueLimit: "$0.00", status: "Active" },
];

function createInitialClients(data: CrmOverview) {
  const crmClients = data.clients.map<ClientDashboardRow>((client, index) => ({
    id: `crm-client-${index}`,
    name: client.name,
    email: client.email,
    date: "Apr 24, 2026\n01:06 PM",
    usdRate: "131.00 BDT",
    balance: client.balance,
    dueLimit: client.credit,
    status: client.status === "Suspended" ? "Suspended" : client.status === "Pending" ? "Pending" : "Active",
  }));

  return [...readApprovedClientsFromStorage(), ...extraClients, ...crmClients];
}

export function AllClientsSection({ data, showToast }: AllClientsSectionProps) {
  const [clients, setClients] = useState<ClientDashboardRow[]>(() => createInitialClients(data));
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ClientStatusFilter>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({ name: "", email: "", usdRate: "130.00 BDT", balance: "$0.00", dueLimit: "$0.00" });

  const filteredClients = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return clients.filter((client) => {
      const matchesSearch = !normalizedQuery || client.name.toLowerCase().includes(normalizedQuery) || client.email.toLowerCase().includes(normalizedQuery);
      const matchesStatus = statusFilter === "All" || client.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [clients, searchQuery, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredClients.length / rowsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pageStartIndex = (safeCurrentPage - 1) * rowsPerPage;
  const visibleClients = filteredClients.slice(pageStartIndex, pageStartIndex + rowsPerPage);
  const shouldShowPagination = filteredClients.length > rowsPerPage;

  const updateFormValue = (field: keyof typeof formValues, value: string) => {
    setFormValues((current) => ({ ...current, [field]: value }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormValues({ name: "", email: "", usdRate: "130.00 BDT", balance: "$0.00", dueLimit: "$0.00" });
  };

  const createClient = () => {
    if (!formValues.name.trim() || !formValues.email.trim()) {
      showToast("warning", "Client name and email are required");
      return;
    }

    setClients((current) => [
      {
        id: `client-${Date.now()}`,
        name: formValues.name,
        email: formValues.email,
        date: "Just now",
        usdRate: formValues.usdRate,
        balance: formValues.balance,
        dueLimit: formValues.dueLimit,
        status: "Active",
      },
      ...current,
    ]);
    setCurrentPage(1);
    closeModal();
    showToast("success", "Client created");
  };

  return (
    <section className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="m-0 text-xl font-semibold text-[var(--brand-navy)]">Clients</h2>
        <div className="flex flex-wrap items-center gap-2 max-[720px]:w-full">
          <label className="flex min-h-9 w-64 items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 text-[var(--muted)] max-[720px]:w-full">
            <Search aria-hidden="true" size={15} strokeWidth={1.9} />
            <input
              className="min-w-0 flex-1 bg-transparent text-sm text-[var(--brand-navy)] outline-none"
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search clients"
              type="search"
              value={searchQuery}
            />
          </label>
          <PrimaryButton onClick={() => setIsModalOpen(true)} type="button">
            <Plus aria-hidden="true" size={15} strokeWidth={1.9} />
            Create Client
          </PrimaryButton>
          <select
            className="min-h-9 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 text-sm font-semibold text-[var(--brand-navy)] outline-none"
            onChange={(event) => {
              setStatusFilter(event.target.value as ClientStatusFilter);
              setCurrentPage(1);
            }}
            value={statusFilter}
          >
            <option value="All">Filters</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Suspended">Suspended</option>
          </select>
          <Filter aria-hidden="true" className="text-[var(--muted)]" size={16} strokeWidth={1.9} />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[var(--line)] bg-[var(--white)]">
        <table className="w-full min-w-[1080px] border-collapse">
          <thead>
            <tr>
              {["Name/Client", "Date", "USD Rate", "Balance", "Due Limit", "Status", "Action"].map((heading) => (
                <th className="border-b border-[var(--line)] px-4 py-3 text-left text-xs font-semibold uppercase text-[var(--muted)]" key={heading}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleClients.map((client) => (
              <tr key={client.id}>
                <td className="border-b border-[var(--line)] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand-orange)] text-xs font-bold text-white">{client.name.slice(0, 2).toUpperCase()}</span>
                    <span>
                      <span className="block text-sm font-semibold text-[var(--brand-navy)]">{client.name}</span>
                      <span className="block text-xs text-[var(--muted)]">{client.email}</span>
                    </span>
                  </div>
                </td>
                <td className="whitespace-pre-line border-b border-[var(--line)] px-4 py-3 text-sm text-[var(--brand-navy)]">{client.date}</td>
                <td className="border-b border-[var(--line)] px-4 py-3 text-sm text-[var(--brand-navy)]">{client.usdRate}</td>
                <td className="border-b border-[var(--line)] px-4 py-3 text-sm text-[var(--brand-navy)]">{client.balance}</td>
                <td className="border-b border-[var(--line)] px-4 py-3 text-sm text-[var(--brand-navy)]">{client.dueLimit}</td>
                <td className="border-b border-[var(--line)] px-4 py-3 text-sm">
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${client.status === "Active" ? "bg-green-50 text-green-600" : client.status === "Pending" ? "bg-yellow-50 text-yellow-700" : "bg-red-50 text-red-600"}`}>{client.status}</span>
                </td>
                <td className="border-b border-[var(--line)] px-4 py-3 text-sm">
                  <button className="rounded-lg p-1.5 text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--brand-navy)]" type="button">
                    <MoreHorizontal aria-hidden="true" size={16} strokeWidth={1.9} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--muted)]">
        <span>
          Showing {filteredClients.length === 0 ? 0 : pageStartIndex + 1} to {Math.min(pageStartIndex + visibleClients.length, filteredClients.length)} of {filteredClients.length} result(s)
        </span>
        {shouldShowPagination ? (
          <div className="flex items-center gap-3">
            <button className="text-[var(--muted)] disabled:opacity-40" disabled={safeCurrentPage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} type="button">
              Previous
            </button>
            <span className="font-semibold text-[var(--brand-navy)]">
              Page {safeCurrentPage} of {totalPages}
            </span>
            <button className="font-semibold text-[var(--brand-navy)] disabled:opacity-40" disabled={safeCurrentPage === totalPages} onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} type="button">
              Next
            </button>
          </div>
        ) : null}
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4">
          <div className="w-full max-w-lg rounded-xl bg-[var(--white)] p-6 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="m-0 text-xl font-semibold text-[var(--brand-navy)]">Create Client</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">Add a new client to the CRM dashboard</p>
              </div>
              <button className="rounded-lg p-1 text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--brand-navy)]" onClick={closeModal} type="button">
                <X aria-hidden="true" size={18} strokeWidth={1.9} />
              </button>
            </div>

            <div className="grid gap-3">
              <label className="grid gap-1.5 text-sm font-semibold text-[var(--brand-navy)]">
                Client Name
                <input className="min-h-10 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 font-normal outline-none focus:border-green-500" onChange={(event) => updateFormValue("name", event.target.value)} placeholder="Client name" value={formValues.name} />
              </label>
              <label className="grid gap-1.5 text-sm font-semibold text-[var(--brand-navy)]">
                Email
                <input className="min-h-10 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 font-normal outline-none focus:border-green-500" onChange={(event) => updateFormValue("email", event.target.value)} placeholder="client@example.com" type="email" value={formValues.email} />
              </label>
              <div className="grid grid-cols-3 gap-3 max-[720px]:grid-cols-1">
                <label className="grid gap-1.5 text-sm font-semibold text-[var(--brand-navy)]">
                  USD Rate
                  <input className="min-h-10 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 font-normal outline-none focus:border-green-500" onChange={(event) => updateFormValue("usdRate", event.target.value)} value={formValues.usdRate} />
                </label>
                <label className="grid gap-1.5 text-sm font-semibold text-[var(--brand-navy)]">
                  Balance
                  <input className="min-h-10 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 font-normal outline-none focus:border-green-500" onChange={(event) => updateFormValue("balance", event.target.value)} value={formValues.balance} />
                </label>
                <label className="grid gap-1.5 text-sm font-semibold text-[var(--brand-navy)]">
                  Due Limit
                  <input className="min-h-10 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 font-normal outline-none focus:border-green-500" onChange={(event) => updateFormValue("dueLimit", event.target.value)} value={formValues.dueLimit} />
                </label>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <SecondaryButton onClick={closeModal} type="button">
                Cancel
              </SecondaryButton>
              <PrimaryButton onClick={createClient} type="button">
                Create Client
              </PrimaryButton>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
