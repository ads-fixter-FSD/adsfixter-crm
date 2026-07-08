import React from "react";
import {
  ChevronDown,
  Smartphone,
  Store,
  Phone,
  Mail,
  Globe,
  UserCircle2,
  Camera,
  Copy,
  Calendar,
  Clock,
  Upload,
  ExternalLink,
  MessageSquare,
} from "lucide-react";

// ---- Custom Edit icon (exact SVG provided) ----
const EditIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.1704 6.49855L6.94129 15.7277L2.5 17.5003L4.27267 13.059L13.5018 3.82993L14.3304 3.00131C15.0673 2.26438 16.2621 2.26438 16.999 3.00131C17.7359 3.73823 17.7359 4.93301 16.999 5.66993L16.1704 6.49855ZM6.94129 15.7277L6.58623 13.4136L4.27267 13.059M16.1704 6.49855L13.5018 3.82993M9.16667 17.5003H17.5"
      stroke="white"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ---- Shared button (typed, no more implicit-any on children) ----
type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children: React.ReactNode;
};

const PrimaryButton = ({
  className = "",
  children,
  ...props
}: PrimaryButtonProps) => (
  <button
    type="button"
    className={`inline-flex items-center justify-center rounded-lg bg-[#D9622B] text-white text-sm font-medium hover:bg-[#c2551f] transition-colors ${className}`}
    {...props}
  >
    {children}
  </button>
);

// ---- Small presentational helpers ----
type InfoRowProps = {
  icon: React.ElementType;
  label: string;
  value: string;
  link?: string;
};

const InfoRow = ({ icon: Icon, label, value, link }: InfoRowProps) => (
  <div
    className="flex items-start gap-3 py-4 border-b last:border-b-0"
    style={{ borderColor: "var(--Color-Stroke, #E9E9E9)" }}
  >
    <Icon
      size={18}
      className="text-gray-400 mt-0.5 shrink-0"
      strokeWidth={1.6}
    />
    <div className="min-w-0">
      <div className="text-xs text-gray-400">{label}</div>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-[#D9622B]"
        >
          {value}
          <ExternalLink size={13} className="text-gray-400" />
        </a>
      ) : (
        <div className="text-sm font-medium text-gray-900">{value}</div>
      )}
    </div>
  </div>
);

const BusinessProfile = () => {
  return (
    <div className="min-h-screen  p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex w-[588px] flex-col gap-2">
          {/* Label */}
          <label className="text-sm font-normal text-[#3E4D60]">
            Select Business Profile
          </label>

          {/* Dropdown Button */}
          <button
            type="button"
            className="flex h-16 w-full items-center justify-between rounded-[10px] bg-white px-4 py-3 border border-[#F0F0F0]"
            style={{ boxShadow: "0px 1px 2px 0px rgba(13, 13, 18, 0.06)" }}
          >
            {/* Profile Details */}
            <div className="flex flex-col text-left justify-center">
              <div className="body-sm-medium font-semibold text-[#0E2038]">
                UrbanCart Fashion
              </div>
              <div className="text-sm font-normal text-gray-400 mt-0.5">
                ID: 91827364518273
              </div>
            </div>

            {/* Exact Custom SVG Arrow */}
            <svg
              width="9"
              height="5"
              viewBox="0 0 9 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path
                d="M7.39323 0.729492L4.0599 4.06283L0.726562 0.729492"
                stroke="#0E2038"
                strokeWidth="1.45833"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div
          className="rounded-xl bg-white p-6 shadow-sm"
          style={{ border: "1px solid var(--Color-Stroke, #E9E9E9)" }}
        >
          <h2 className="text-lg font-semibold text-gray-900">
            Business Information
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Manage your business information and profile details
          </p>

     <div
      className="flex items-center justify-between rounded-xl bg-white p-5 max-[990px]:flex-col max-[990px]:items-start max-[990px]:gap-4 max-[720px]:p-4"
      style={{ border: "1px solid #EDEDED" }}
    >
      <div className="flex items-center gap-4 max-[550px]:flex-col max-[550px]:items-start">
        {/* Avatar Section */}
        <div className="relative shrink-0">
          <div className="flex h-[76px] w-[76px] items-center justify-center rounded-xl bg-[#FFECE6] text-[32px] font-semibold text-[#C3521E]">
            U
          </div>
          <button
            type="button"
            className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.06)] transition hover:scale-105"
            style={{ border: "1px solid #EDEDED" }}
            aria-label="Change photo"
          >
            <Camera size={14} className="text-[#C3521E]" />
          </button>
        </div>

        {/* Info Section */}
        <div>
          <h2 className="m-0 text-2xl font-semibold tracking-[-0.02em] text-[#0F172A] max-[720px]:text-xl">
            UrbanCart Fashion
          </h2>
          
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#64748B]">
            {/* Status Badge */}
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#E8F5E9] px-2.5 py-1 text-xs font-medium text-[#2E7D32]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4CAF50]" />
              Active
            </span>

            {/* Business ID */}
            <span className="flex items-center gap-1 font-medium text-[#475569]">
              Business ID : <span className="text-[#0F172A]">91827364518273</span>
              <button type="button" className="ml-0.5 text-[#94A3B8] hover:text-[#475569]">
                <Copy size={14} />
              </button>
            </span>
          </div>

          {/* Meta Details */}
          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-[#64748B]">
            <span className="flex items-center gap-1.5">
              <UserCircle2 size={15} className="text-[#94A3B8]" /> Moderator
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={15} className="text-[#94A3B8]" /> Joined : May 11, 2026
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={15} className="text-[#94A3B8]" /> Last Updated : 2 min ago
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        type="button"
        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-[#334155] transition hover:bg-[#F8FAFC] max-[990px]:w-full"
        style={{ border: "1px solid #EDEDED" }}
      >
        <Upload size={16} strokeWidth={2} className="text-[#475569]" />
        Upload an Image
      </button>
    </div>
          <div
            className="rounded-xl bg-white p-6 shadow-sm"
            style={{ border: "1px solid var(--Color-Stroke, #E9E9E9)" }}
          >
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Business Profile Information
              </h2>

              <PrimaryButton className="min-h-9 gap-2 px-5">
                <EditIcon size={16} />
                Edit Business Profile
              </PrimaryButton>
            </div>

            <div className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
              <div>
                <InfoRow icon={Smartphone} label="Platform" value="Meta" />
                <InfoRow
                  icon={Phone}
                  label="Business Phone Number"
                  value="+880 1726512261"
                />
                <InfoRow
                  icon={UserCircle2}
                  label="Business Address"
                  value="+880 1726512261"
                />
                <InfoRow
                  icon={Globe}
                  label="Website Link"
                  value="https://urbancart.com"
                  link="https://urbancart.com"
                />
              </div>
              <div>
                <InfoRow
                  icon={Store}
                  label="Business Name"
                  value="Urban Cart"
                />
                <InfoRow
                  icon={Mail}
                  label="Business Email"
                  value="urbancartllc@gmail.com"
                />
                <InfoRow
                  icon={Globe}
                  label="Facebook Page Link"
                  value="https://facebook.com/urbancart"
                  link="https://facebook.com/urbancart"
                />
                <InfoRow
                  icon={UserCircle2}
                  label="Designation of User"
                  value="Moderator"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Business Profile Information card */}
      </div>

      {/* Floating chat button */}
      <button
        type="button"
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#D9622B] text-white shadow-lg hover:bg-[#c2551f]"
        aria-label="Open chat"
      >
        <MessageSquare size={22} />
      </button>
    </div>
  );
};

export default BusinessProfile;
