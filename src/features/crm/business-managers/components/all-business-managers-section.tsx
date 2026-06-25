"use client";

import { Edit, Eye, MoreHorizontal, Plus, Trash2, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { PrimaryButton, SecondaryButton } from "@/components/shared-buttons";
import type { ToastType } from "@/features/crm/types/crm";
import { useClickOutside } from "@/hooks/use-click-outside";

type BusinessManagerRow = {
  id: string;
  name: string;
  created: string;
  linkedBusinesses: number;
  notes: string;
};

type AllBusinessManagersSectionProps = {
  showToast: (type: ToastType, message: string) => void;
};

const rowsPerPage = 10;

const initialBusinessManagers: BusinessManagerRow[] = [
  { name: "AdsFixter LLC 263", id: "170850472443869", created: "12 months ago", linkedBusinesses: 11, notes: "-" },
  { name: "AdsFixter LLC 41", id: "496367355984855", created: "12 months ago", linkedBusinesses: 8, notes: "-" },
  { name: "AdsFixter LLC 60", id: "1601258407003144", created: "12 months ago", linkedBusinesses: 18, notes: "-" },
  { name: "AdsFixter Agency 44", id: "328685456153961", created: "12 months ago", linkedBusinesses: 21, notes: "-" },
  { name: "AdsFixter LLC 99", id: "863616651370688", created: "12 months ago", linkedBusinesses: 9, notes: "-" },
  { name: "AdsFixter LLC 50", id: "1595971494185117", created: "12 months ago", linkedBusinesses: 10, notes: "-" },
  { name: "AdsFixter LLC 47", id: "1010397330313988", created: "12 months ago", linkedBusinesses: 22, notes: "-" },
  { name: "AdsFixter Agency 114", id: "1268171743827471", created: "12 months ago", linkedBusinesses: 5, notes: "-" },
  { name: "AdsFixter LLC 103", id: "190182207144038", created: "12 months ago", linkedBusinesses: 16, notes: "-" },
  { name: "AdsFixter LLC 31", id: "212872521146427", created: "12 months ago", linkedBusinesses: 4, notes: "-" },
  { name: "AdsFixter LLC 257", id: "1135721144531217", created: "12 months ago", linkedBusinesses: 9, notes: "-" },
  { name: "AdsFixter LLC 28", id: "217080450821583", created: "12 months ago", linkedBusinesses: 4, notes: "-" },
  { name: "Tech Zayan LLC", id: "752941246262293", created: "12 months ago", linkedBusinesses: 82, notes: "-" },
  { name: "Tech Zayan LLC 32", id: "617805676780722", created: "12 months ago", linkedBusinesses: 88, notes: "-" },
  { name: "AdsFixter LLC 79", id: "2171559336386662", created: "12 months ago", linkedBusinesses: 27, notes: "-" },
  { name: "AdsFixter LLC 08", id: "552596426762444", created: "12 months ago", linkedBusinesses: 1, notes: "-" },
];

export function AllBusinessManagersSection({ showToast }: AllBusinessManagersSectionProps) {
  const actionDropdownRef = useRef<HTMLDivElement | null>(null);
  const [businessManagers, setBusinessManagers] = useState(initialBusinessManagers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [openActionBusinessManagerId, setOpenActionBusinessManagerId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({
    name: "",
    id: "",
    accessToken: "",
    adAccountNamePrefix: "",
    notes: "",
  });

  const totalPages = Math.max(1, Math.ceil(businessManagers.length / rowsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pageStartIndex = (safeCurrentPage - 1) * rowsPerPage;
  const visibleBusinessManagers = useMemo(() => businessManagers.slice(pageStartIndex, pageStartIndex + rowsPerPage), [businessManagers, pageStartIndex]);
  const shouldShowPagination = businessManagers.length > rowsPerPage;

  const updateFormValue = (field: keyof typeof formValues, value: string) => {
    setFormValues((current) => ({ ...current, [field]: value }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormValues({ name: "", id: "", accessToken: "", adAccountNamePrefix: "", notes: "" });
  };

  const addBusinessManager = () => {
    if (!formValues.name.trim() || !formValues.id.trim()) {
      showToast("warning", "Business Manager name and ID are required");
      return;
    }

    setBusinessManagers((current) => [
      {
        name: formValues.name,
        id: formValues.id,
        created: "Just now",
        linkedBusinesses: 0,
        notes: formValues.notes || "-",
      },
      ...current,
    ]);
    setCurrentPage(1);
    closeModal();
    showToast("success", "Business Manager added");
  };

  const handleBusinessManagerAction = (businessManager: BusinessManagerRow, action: "view" | "edit" | "delete") => {
    setOpenActionBusinessManagerId(null);
    showToast(action === "delete" ? "warning" : "success", `${businessManager.name} ${action} action selected`);
  };

  useClickOutside(actionDropdownRef, () => setOpenActionBusinessManagerId(null));

  return (
    <section className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="m-0 text-xl font-semibold text-[var(--brand-navy)]">Business Managers</h2>
        <PrimaryButton onClick={() => setIsModalOpen(true)} type="button">
          <Plus aria-hidden="true" size={15} strokeWidth={1.9} />
          Add Business Manager
        </PrimaryButton>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[var(--line)] bg-[var(--white)]">
        <table className="w-full min-w-[1080px] border-collapse">
          <thead>
            <tr>
              {["Name", "Business Manager ID", "Created", "Linked Businesses", "Notes", "Actions"].map((heading) => (
                <th className="border-b border-[var(--line)] px-4 py-3 text-left text-xs font-semibold text-[var(--brand-navy)]" key={heading}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleBusinessManagers.map((businessManager) => (
              <tr key={businessManager.id}>
                <td className="border-b border-[var(--line)] px-4 py-3 text-sm text-[var(--brand-navy)]">{businessManager.name}</td>
                <td className="border-b border-[var(--line)] px-4 py-3 text-sm text-[var(--brand-navy)]">{businessManager.id}</td>
                <td className="border-b border-[var(--line)] px-4 py-3 text-sm text-[var(--brand-navy)]">{businessManager.created}</td>
                <td className="border-b border-[var(--line)] px-4 py-3 text-sm text-[var(--brand-navy)]">{businessManager.linkedBusinesses}</td>
                <td className="border-b border-[var(--line)] px-4 py-3 text-sm text-[var(--brand-navy)]">{businessManager.notes}</td>
                <td className="relative border-b border-[var(--line)] px-4 py-3 text-center text-sm">
                  <div className="relative inline-flex" ref={openActionBusinessManagerId === businessManager.id ? actionDropdownRef : null}>
                    <button
                      aria-label={`Open actions for ${businessManager.name}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--white)] text-[var(--brand-navy)] transition hover:bg-[var(--surface)]"
                      onClick={() => setOpenActionBusinessManagerId((current) => (current === businessManager.id ? null : businessManager.id))}
                      title="Actions"
                      type="button"
                    >
                      <MoreHorizontal aria-hidden="true" size={17} strokeWidth={2.1} />
                    </button>
                    {openActionBusinessManagerId === businessManager.id ? (
                      <div className="absolute right-0 top-[calc(100%+0.35rem)] z-30 grid min-w-32 gap-1 rounded-xl border border-[var(--line)] bg-[var(--white)] p-1.5 text-left">
                        <button className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-semibold text-[var(--brand-navy)] hover:bg-[var(--surface)]" onClick={() => handleBusinessManagerAction(businessManager, "view")} type="button">
                          <Eye aria-hidden="true" size={14} strokeWidth={2.1} />
                          View
                        </button>
                        <button className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-semibold text-[var(--brand-navy)] hover:bg-[var(--surface)]" onClick={() => handleBusinessManagerAction(businessManager, "edit")} type="button">
                          <Edit aria-hidden="true" size={14} strokeWidth={2.1} />
                          Edit
                        </button>
                        <button className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-semibold text-[var(--brand-orange)] hover:bg-[rgba(239,67,7,0.08)]" onClick={() => handleBusinessManagerAction(businessManager, "delete")} type="button">
                          <Trash2 aria-hidden="true" size={14} strokeWidth={2.1} />
                          Delete
                        </button>
                      </div>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--muted)]">
        <span>
          Showing {businessManagers.length === 0 ? 0 : pageStartIndex + 1} to {Math.min(pageStartIndex + visibleBusinessManagers.length, businessManagers.length)} of {businessManagers.length} result(s)
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
          <div className="w-full max-w-xl rounded-xl bg-[var(--white)] p-6">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="m-0 text-xl font-semibold text-[var(--brand-navy)]">Add Business Manager</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">Add a new Meta Business Manager to use for ad account creation</p>
              </div>
              <button className="rounded-lg p-1 text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--brand-navy)]" onClick={closeModal} type="button">
                <X aria-hidden="true" size={18} strokeWidth={1.9} />
              </button>
            </div>

            <div className="grid gap-4">
              <label className="grid gap-1.5 text-sm font-semibold text-[var(--brand-navy)]">
                Business Manager Name
                <input className="min-h-10 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 font-normal outline-none focus:border-blue-500" onChange={(event) => updateFormValue("name", event.target.value)} placeholder="My Business Manager" value={formValues.name} />
                <span className="text-xs font-normal text-[var(--muted)]">Friendly name for the Business Manager</span>
              </label>

              <label className="grid gap-1.5 text-sm font-semibold text-[var(--brand-navy)]">
                Business Manager ID
                <input className="min-h-10 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 font-normal outline-none focus:border-blue-500" onChange={(event) => updateFormValue("id", event.target.value)} placeholder="12345678" value={formValues.id} />
                <span className="text-xs font-normal text-[var(--muted)]">The Meta Business Manager ID</span>
              </label>

              <label className="grid gap-1.5 text-sm font-semibold text-[var(--brand-navy)]">
                Access Token
                <input className="min-h-10 rounded-lg border border-[var(--line)] bg-blue-50 px-3 font-normal outline-none focus:border-blue-500" onChange={(event) => updateFormValue("accessToken", event.target.value)} placeholder="Long-lived access token" type="password" value={formValues.accessToken} />
                <span className="text-xs font-normal text-[var(--muted)]">Long-lived access token for the Meta API</span>
              </label>

              <label className="grid gap-1.5 text-sm font-semibold text-[var(--brand-navy)]">
                Ad Account Name Prefix
                <input className="min-h-10 rounded-lg border border-[var(--line)] bg-blue-50 px-3 font-normal outline-none focus:border-blue-500" onChange={(event) => updateFormValue("adAccountNamePrefix", event.target.value)} placeholder="shohan.adsfixter@gmail.com" value={formValues.adAccountNamePrefix} />
                <span className="text-xs font-normal text-[var(--muted)]">This prefix will be added to all ad account names under this business manager</span>
              </label>

              <label className="grid gap-1.5 text-sm font-semibold text-[var(--brand-navy)]">
                Notes (Optional)
                <textarea className="min-h-20 resize-none rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 font-normal outline-none focus:border-blue-500" onChange={(event) => updateFormValue("notes", event.target.value)} placeholder="Additional notes about this Business Manager" value={formValues.notes} />
              </label>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <SecondaryButton onClick={closeModal} type="button">
                Cancel
              </SecondaryButton>
              <PrimaryButton onClick={addBusinessManager} type="button">
                Add Business Manager
              </PrimaryButton>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
