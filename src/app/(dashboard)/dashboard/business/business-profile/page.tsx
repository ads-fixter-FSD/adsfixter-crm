"use client";
import React, { useRef } from "react";
import {
  Smartphone,
  Store,
  Phone,
  Mail,
  Globe,
  MapPin,
  UserCircle2,
  Camera,
  Copy,
  Calendar,
  Clock,
  Upload,
  ExternalLink,
  MessageSquare,
  Search,
} from "lucide-react";
import { PrimaryButton } from "@/components/shared-buttons";
import EditModalProfile from "./_component/EditModalProfile";

// ---- Custom Edit icon ----
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

// ---- Custom Facebook Icon ----
const CustomFacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const BusinessProfile = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  return (
    <div className="min-h-screen  p-6 max-[640px]:p-4">
      <div className="mx-auto  space-y-6">
        {/* Dropdown Section */}
        <div className="flex w-full max-w-[588px] flex-col gap-2">
          <label className="text-sm font-normal text-[#3E4D60]">
            Select Business Profile
          </label>

          <details className="group relative w-full">
            <summary
              className="flex h-16 w-full list-none items-center justify-between rounded-[10px] bg-white px-4 py-3 border border-[#F0F0F0] cursor-pointer select-none [&::-webkit-details-marker]:hidden"
              style={{ boxShadow: "0px 1px 2px 0px rgba(13, 13, 18, 0.06)" }}
            >
              <div className="flex flex-col text-left justify-center">
                <div className="body-sm-medium font-semibold text-[#0E2038]">
                  UrbanCart Fashion
                </div>
                <div className="body-xsm-regular font-normal text-gray-400 mt-0.5">
                  ID: 91827364518273
                </div>
              </div>
              <svg
                width="9"
                height="5"
                viewBox="0 0 9 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 transition-transform duration-200 group-open:rotate-180"
              >
                <path
                  d="M7.39323 0.729492L4.0599 4.06283L0.726562 0.729492"
                  stroke="#0E2038"
                  strokeWidth="1.45833"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </summary>

            {/* Dropdown Menu List */}
            <div className="absolute top-[72px] left-0 z-50 w-full rounded-xl bg-white border border-[#EDEDED] p-2 ">
              {/* Search Bar Input */}
              <div className="relative mb-2 flex items-center border-b border-[#F4F4F5] px-3 pb-2 pt-1">
                <Search size={18} className="text-[#94A3B8] mr-2" />
                <input
                  type="text"
                  placeholder="Search your business profile"
                  className="w-full text-sm font-normal text-[#1E293B] outline-none placeholder:text-[#94A3B8]"
                />
              </div>

              {/* Profiles List */}
              <div className="max-h-[240px] overflow-y-auto space-y-1">
                {/* Profile Item 1 (Selected Style) */}
                <div className="flex w-full items-center gap-3 rounded-lg p-2.5 text-left transition hover:bg-[#F8FAFC] cursor-pointer">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border bg-[#F74608] border-[#F74608]">
                    <svg
                      width="10"
                      height="8"
                      viewBox="0 0 10 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 1L3.5 6.5L1 4"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#0F172A]">
                      UrbanCart Fashion
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      ID: 91827364518273
                    </div>
                  </div>
                </div>

                {/* Profile Item 2 */}
                <div className="flex w-full items-center gap-3 rounded-lg p-2.5 text-left transition hover:bg-[#F8FAFC] cursor-pointer">
                  <div className="h-5 w-5 shrink-0 rounded-md border border-[#E4E4E7] bg-white" />
                  <div>
                    <div className="text-sm font-semibold text-[#0F172A]">
                      UrbanCart Men
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      ID: 91827364518273
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </details>
        </div>

        {/* Outer Wrapper Box */}
        <div className="overflow-hidden rounded-xl border border-[#F0F0F0] ">
          {/* Main Card Header */}
          <div className="border-b border-[#F0F0F0] p-6">
            <h2 className="title-medium font-semibold text-gray-900">
              Business Information
            </h2>
            <p className="mt-1 body-sm-regular text-gray-400">
              Manage your business information and profile details
            </p>

            {/* Profile Avatar & Header Card */}
            <div className="mt-5 flex items-center justify-between rounded-xl bg-white p-5 max-[990px]:flex-col max-[990px]:items-start max-[990px]:gap-4 max-[720px]:p-4 border border-[#F0F0F0]">
              <div className="flex items-center gap-4 max-[550px]:flex-col max-[550px]:items-start">
                <div className="relative shrink-0">
                  <div className="flex h-[76px] w-[76px] items-center justify-center rounded-xl bg-[#FFECE6] text-[32px] font-semibold text-[#F74608]">
                    U
                  </div>
                  <button
                    type="button"
                    className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-white  transition hover:scale-105 border border-[#F0F0F0]"
                    aria-label="Change photo"
                  >
                    <Camera size={14} className="text-[#F74608]" />
                  </button>
                </div>

                <div>
                  <h2 className="m-0 text-xl font-semibold tracking-[-0.02em] text-[#0F172A]">
                    UrbanCart Fashion
                  </h2>

                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#64748B]">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#E8F5E9] px-2.5 py-1 text-xs font-medium text-[#2E7D32]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#4CAF50]" />
                      Active
                    </span>

                    <span className="flex items-center gap-1 font-medium text-[#475569]">
                      Business ID :{" "}
                      <span className="text-[#0F172A]">91827364518273</span>
                      <button
                        type="button"
                        className="ml-0.5 text-[#94A3B8] hover:text-[#475569]"
                      >
                        <Copy size={14} />
                      </button>
                    </span>
                  </div>

                  <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-[#64748B]">
                    <span className="flex items-center gap-1.5">
                      <UserCircle2 size={15} className="text-[#94A3B8]" />{" "}
                      Moderator
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={15} className="text-[#94A3B8]" /> Joined :
                      May 11, 2026
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={15} className="text-[#94A3B8]" /> Last
                      Updated : 2 min ago
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="border border-[#F0F0F0] inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-[#334155] transition hover:bg-[#F8FAFC] max-[990px]:w-full"
                // style={{ border: "1px solid #EDEDED" }}
              >
                <Upload size={16} className="text-[#475569]" />
                Upload an Image
              </button>
            </div>
          </div>

          {/* Business Profile Information Grid Section */}
          <div>
            <div className="flex items-center justify-between border-b  border-[#F0F0F0] p-6 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-3">
              <h2 className="title-medium font-semibold tracking-[-0.01em] text-[#0F172A]">
                Business Profile Information
              </h2>

              <PrimaryButton
                onClick={() => modalRef.current?.showModal()}
                className="min-h-9 gap-2 px-4 py-2 !bg-[#F74608] hover:!bg-[#e03d04] border-0 text-white"
              >
                <EditIcon size={16} />
                Edit Business Profile
              </PrimaryButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 [&>div]:border-[#F0F0F0]">
              <div className="border-b p-5 md:border-r">
                <div className="flex items-center gap-2 text-sm text-[#71717A]">
                  <Smartphone
                    size={16}
                    strokeWidth={1.5}
                    className="text-[#71717A] "
                  />
                  <span className="body-sm-regular text-[#7F8482]">
                    Platform
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-base font-semibold text-[#1E293B]">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EDF4FF] text-[10px] font-bold text-[#0064E0]">
                    ∞
                  </span>
                  <span className="body-medium">Meta</span>
                </div>
              </div>

              <div className="border-b p-5">
                <div className="flex items-center gap-2 text-sm text-[#71717A]">
                  <Store
                    size={16}
                    strokeWidth={1.5}
                    className="text-[#71717A]"
                  />
                  <span className="body-sm-regular text-[#7F8482]">
                    Business Name
                  </span>
                </div>
                <div className="mt-2 text-base font-semibold text-[#1E293B]">
                  <span className="body-medium">Urban Cart</span>
                </div>
              </div>

              <div className="border-b p-5 md:border-r">
                <div className="flex items-center gap-2 text-sm text-[#71717A]">
                  <Phone
                    size={16}
                    strokeWidth={1.5}
                    className="text-[#71717A]"
                  />
                  <span className="body-sm-regular text-[#7F8482]">
                    Business Phone Number
                  </span>
                </div>
                <div className="mt-2 text-base font-semibold text-[#1E293B]">
                  <span className="body-medium"> +880 1726512261</span>
                </div>
              </div>

              <div className="border-b p-5">
                <div className="flex items-center gap-2 text-sm text-[#71717A]">
                  <Mail
                    size={16}
                    strokeWidth={1.5}
                    className="text-[#71717A]"
                  />
                  <span className="body-sm-regular text-[#7F8482]">
                    Business Email
                  </span>
                </div>
                <div className="mt-2 text-base font-semibold text-[#1E293B]">
                  <span className="body-medium"> urbancartllc@gmail.com</span>
                </div>
              </div>

              <div className="border-b p-5 md:border-b-0 md:border-r">
                <div className="flex items-center gap-2 text-sm text-[#71717A]">
                  <MapPin
                    size={16}
                    strokeWidth={1.5}
                    className="text-[#71717A]"
                  />
                  <span className="body-sm-regular text-[#7F8482]">
                    Business Address
                  </span>
                </div>
                <div className="mt-2 text-base font-semibold text-[#1E293B]">
                  <span className="body-medium"> +880 1726512261</span>
                </div>
              </div>

              <div className="border-b p-5 md:border-b-0">
                <div className="flex items-center gap-2 text-sm text-[#71717A]">
                  <CustomFacebookIcon size={16} />
                  <span className="body-sm-regular text-[#7F8482]">
                    Facebook Page Link
                  </span>
                </div>
                <a
                  href="https://facebook.com/urbancart"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex body-medium items-center gap-1.5 text-base font-semibold text-[#1E293B] hover:underline"
                >
                  https://facebook.com/urbancart
                  <ExternalLink size={15} className="text-[#94A3B8]" />
                </a>
              </div>

              <div className="border-b p-5 md:border-b-0 md:border-r md:border-t">
                <div className="flex items-center gap-2 text-sm text-[#71717A]">
                  <Globe
                    size={16}
                    strokeWidth={1.5}
                    className="text-[#71717A]"
                  />
                  <span className="body-sm-regular text-[#7F8482]">
                    Website Link
                  </span>
                </div>
                <a
                  href="https://urbancart.com"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 body-medium inline-flex items-center gap-1.5 text-base font-semibold text-[#1E293B] hover:underline"
                >
                  https://urbancart.com
                  <ExternalLink size={15} className="text-[#94A3B8]" />
                </a>
              </div>

              <div className="p-5 md:border-t">
                <div className="flex items-center gap-2 text-sm text-[#71717A]">
                  <UserCircle2
                    size={16}
                    strokeWidth={1.5}
                    className="text-[#71717A]"
                  />
                  <span className="body-sm-regular text-[#7F8482]">
                    Designation of User
                  </span>
                </div>
                <div className="mt-2 text-base font-semibold text-[#1E293B]">
                  <span className="body-medium">Moderator</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating chat button */}
      <button
        type="button"
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#F74608] text-white shadow-lg hover:bg-[#e03d04] transition-transform hover:scale-105"
        aria-label="Open chat"
      >
        <MessageSquare size={22} />
      </button>
      <EditModalProfile dialogRef={modalRef} />
    </div>
  );
};

export default BusinessProfile;
