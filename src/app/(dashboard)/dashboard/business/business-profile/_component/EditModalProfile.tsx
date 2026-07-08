import React, { useRef } from "react";
import { X, ChevronDown, Link2 } from "lucide-react";
import { PrimaryButton } from "@/components/shared-buttons";
import { SecondaryButtonWhite } from "@/components/shared-buttons/secondary-button-white";

// ---- Custom Facebook Icon (matches BusinessProfile) ----
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

export type BusinessProfileFormData = {
  platform: string;
  businessName: string;
  phoneCountryCode: string;
  phoneNumber: string;
  email: string;
  address: string;
  facebookLink: string;
  websiteLink: string;
  designation: string;
};

const defaultData: BusinessProfileFormData = {
  platform: "Meta",
  businessName: "UrbanCart Fashion",
  phoneCountryCode: "+880",
  phoneNumber: "1726512261",
  email: "urbancart@gmail.com",
  address: "Barishal Sadar Barishal, Bangladesh",
  facebookLink: "https://facebook.com/urbancart",
  websiteLink: "https://urbancart.com",
  designation: "Moderator",
};

type EditModalProfileProps = {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  onSave?: (data: Record<string, any>) => void;
  initialData?: Partial<BusinessProfileFormData>;
};

// ---- Reusable field input with direct DOM clear (X) functionality ----
const ClearableInput = ({
  icon,
  name,
  defaultValue,
  placeholder,
}: {
  icon?: React.ReactNode;
  name: string;
  defaultValue: string;
  placeholder?: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex h-11 w-full items-center gap-2 rounded-[10px] border border-[#E4E4E7] bg-white px-3.5 focus-within:border-[#F74608] transition-colors">
      {icon && <span className="shrink-0 text-[#94A3B8]">{icon}</span>}
      <input
        ref={inputRef}
        type="text"
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full min-w-0 bg-transparent text-sm font-medium text-[#1E293B] outline-none placeholder:text-[#94A3B8] placeholder:font-normal"
      />
      <button
        type="button"
        onClick={() => {
          if (inputRef.current) inputRef.current.value = "";
        }}
        aria-label="Clear field"
        className="shrink-0 text-[#94A3B8] hover:text-[#475569] transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
};

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="mb-2 block text-sm font-medium text-[#3E4D60]">
    {children}
  </label>
);

const EditModalProfile = ({
  dialogRef,
  onSave,
  initialData,
}: EditModalProfileProps) => {
  const mergedData = { ...defaultData, ...initialData };
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    dialogRef.current?.close();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Hidden বা কাস্টম ফিল্ডের ভ্যালুগুলো অবজেক্টে পুশ করা
    data.platform = mergedData.platform;
    data.phoneCountryCode = mergedData.phoneCountryCode;
    data.designation = mergedData.designation;

    onSave?.(data);
    handleClose();
  };

  return (
  <dialog
      ref={dialogRef}
      className="fixed inset-0 m-auto rounded-2xl bg-white shadow-2xl w-[92%] max-w-[1100px] max-h-[85vh] overflow-y-auto p-0 outline-none border-0 backdrop:bg-[#0E2038]/50 backdrop:backdrop-blur-sm transition-all animate-in fade-in zoom-in-95 duration-200"
    >
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-5 border-b border-[#F0F0F0] sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-[#0F172A]">
            Edit Business Profile
          </h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F4F4F5] text-[#0F172A] transition hover:bg-[#E4E4E7]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body - ৩ কলাম গ্রিড ভিউ বড় স্ক্রিনের জন্য */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-5 p-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Change Platform */}
          <div>
            <FieldLabel>Change Platform</FieldLabel>
            <div className="relative flex h-11 w-full items-center gap-2 rounded-[10px] border border-[#E4E4E7] bg-white px-3.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EDF4FF] text-[10px] font-bold text-[#0064E0]">
                ∞
              </span>
              <span className="w-full text-sm font-medium text-[#1E293B]">
                {mergedData.platform}
              </span>
              <ChevronDown size={16} className="shrink-0 text-[#94A3B8]" />
            </div>
          </div>

          {/* Business Name */}
          <div>
            <FieldLabel>Business Name</FieldLabel>
            <ClearableInput
              name="businessName"
              defaultValue={mergedData.businessName}
            />
          </div>

          {/* Business Phone */}
          <div>
            <FieldLabel>Business Phone</FieldLabel>
            <div className="flex h-11 w-full items-center gap-2 rounded-[10px] border border-[#E4E4E7] bg-white px-3.5 focus-within:border-[#F74608] transition-colors">
              <span className="flex h-4 w-6 shrink-0 overflow-hidden rounded-[2px]">
                <span className="h-full w-full bg-[#006A4E] relative flex items-center justify-center">
                  <span className="h-2 w-2 rounded-full bg-[#F42A41]" />
                </span>
              </span>
              <ChevronDown size={14} className="shrink-0 text-[#94A3B8]" />
              <span className="shrink-0 text-sm font-medium text-[#1E293B]">
                {mergedData.phoneCountryCode}
              </span>
              <span className="h-5 w-px shrink-0 bg-[#E4E4E7]" />
              <input
                ref={phoneInputRef}
                type="text"
                name="phoneNumber"
                defaultValue={mergedData.phoneNumber}
                className="w-full min-w-0 bg-transparent text-sm font-medium text-[#1E293B] outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  if (phoneInputRef.current) phoneInputRef.current.value = "";
                }}
                aria-label="Clear phone number"
                className="shrink-0 text-[#94A3B8] hover:text-[#475569] transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Business Email */}
          <div>
            <FieldLabel>Business Email</FieldLabel>
            <ClearableInput
              name="email"
              defaultValue={mergedData.email}
            />
          </div>

          {/* Business Address */}
          <div>
            <FieldLabel>Business Address</FieldLabel>
            <ClearableInput
              name="address"
              defaultValue={mergedData.address}
            />
          </div>

          {/* Facebook Page Link */}
          <div>
            <FieldLabel>Facebook Page Link</FieldLabel>
            <ClearableInput
              icon={<CustomFacebookIcon size={15} />}
              name="facebookLink"
              defaultValue={mergedData.facebookLink}
            />
          </div>

          {/* Website Link */}
          <div>
            <FieldLabel>Website Link</FieldLabel>
            <ClearableInput
              icon={<Link2 size={15} />}
              name="websiteLink"
              defaultValue={mergedData.websiteLink}
            />
          </div>

          {/* Designation of User */}
          <div>
            <FieldLabel>Designation of User</FieldLabel>
            <div className="relative flex h-11 w-full items-center gap-2 rounded-[10px] border border-[#E4E4E7] bg-white px-3.5">
              <span className="w-full text-sm font-medium text-[#1E293B]">
                {mergedData.designation}
              </span>
              <ChevronDown size={16} className="shrink-0 text-[#94A3B8]" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-[#F0F0F0] p-6 pt-5 bg-white sticky bottom-0">
          <SecondaryButtonWhite type="button" className="min-h-10 px-5" onClick={handleClose}>
            Cancel
          </SecondaryButtonWhite>
          <PrimaryButton
            type="submit"
            className="min-h-10 px-5 !bg-[#F74608] hover:!bg-[#e03d04] border-0 text-white"
          >
            Save Changes
          </PrimaryButton>
        </div>
      </form>
    </dialog>
  );
};

export default EditModalProfile;