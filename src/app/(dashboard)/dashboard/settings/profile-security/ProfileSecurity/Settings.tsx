"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Camera, Calendar, ChevronDown, AlertCircle } from "lucide-react";

const COUNTRY_CODES: Record<string, string> = {
  Bangladesh: "+880",
  India: "+91",
  Pakistan: "+92",
  "United States": "+1",
};

const PHONE_ALLOWED_REGEX = /^[0-9+\-\s]*$/;

export default function Settings() {
  const [dob, setDob] = useState("2002-03-12");
  const [country, setCountry] = useState("Bangladesh");
  const [phone, setPhone] = useState("+880 1712 345 678");
  const [phoneError, setPhoneError] = useState("");

  const dateInputRef = useRef<HTMLInputElement>(null);

  const formattedDob = dob
    ? new Date(dob).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  const handleCalendarIconClick = () => {
    if (dateInputRef.current) {
      if (typeof dateInputRef.current.showPicker === "function") {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.focus();
        dateInputRef.current.click();
      }
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value;
    setCountry(newCountry);

    const newCode = COUNTRY_CODES[newCountry] ?? "";

    setPhone((prevPhone) => {
      const existingCode = Object.values(COUNTRY_CODES).find((code) =>
        prevPhone.trim().startsWith(code),
      );
      const localPart = existingCode
        ? prevPhone.trim().slice(existingCode.length).trim()
        : prevPhone.trim();

      return newCode ? `${newCode} ${localPart}`.trim() : localPart;
    });
    setPhoneError("");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!PHONE_ALLOWED_REGEX.test(value)) {
      setPhoneError("Only numbers are allowed in phone number.");
      const sanitized = value.replace(/[^0-9+\-\s]/g, "");
      setPhone(sanitized);
      return;
    }

    setPhoneError("");
    setPhone(value);
  };

  return (
    <div className="bg-[var(--color-white)] border border-[var(--color-line)] rounded-xl p-4 sm:p-5">
      {/* ── Header ── */}
      <div className="border-b border-[var(--color-line)] pb-4 sm:pb-5 space-y-1.5 sm:space-y-2">
        <h1 className="h6-medium text-[var(--color-primary-text-500)] text-base sm:text-lg">
          Settings
        </h1>
        <p className="body-sm-regular text-[var(--color-subtext-500)]">
          Manage your account, security and preferences.
        </p>
      </div>

      {/* ── Profile & Account Section ── */}
      <div className="mt-4 sm:mt-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
          <div>
            <h2 className="body-l-medium text-[var(--color-primary-text-500)]">
              Profile &amp; Account
            </h2>
            <p className="body-sm-regular text-[var(--color-subtext-500)] mt-1">
              Update your basic profile and account information.
            </p>
          </div>

          <button
            type="button"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-[var(--color-line)] text-[var(--color-adsfixter-primary)] body-sm-medium hover:bg-[var(--color-primary-soft)] transition-colors shrink-0"
          >
            <Image
              src={"/images/dashboard/settings/edit.svg"}
              width={16}
              height={16}
              alt="profile edit"
            ></Image>
            Edit Profile
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
          {/* Avatar */}
          <div className="relative w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[162px] md:h-[162px] shrink-0 mx-auto md:mx-0">
            <div className="w-full h-full rounded-full overflow-hidden bg-[var(--color-surface)] relative">
              <Image
                src="/images/dashboard/settings/faruk.webp"
                alt="Profile photo"
                fill
                className="object-cover"
              />
            </div>
            <button
              type="button"
              aria-label="Change photo"
              className="absolute bottom-1 right-1 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-[var(--color-white)] border border-[var(--color-line)] flex items-center justify-center shadow-sm hover:bg-[var(--color-surface)] transition-colors"
            >
              <Camera
                size={16}
                className="text-[var(--color-primary-text-500)] sm:w-[18px] sm:h-[18px]"
              />
            </button>
          </div>

          {/* Fields */}
          <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4">
            <Field label="Full Name">
              <input
                type="text"
                defaultValue="Omar Faruk"
                className="w-full h-11 px-4 rounded-lg border border-[var(--color-line)] body-sm-regular text-[var(--color-primary-text-500)] bg-[var(--color-field)] outline-none focus:border-[var(--color-adsfixter-primary)] transition-colors"
              />
            </Field>

            <Field label="Email Address">
              <div className="relative">
                <input
                  type="email"
                  defaultValue="faruk@gmail.com"
                  readOnly
                  className="w-full h-11 pl-4 pr-20 sm:pr-24 rounded-lg border border-[var(--color-line)] body-sm-regular text-[var(--color-primary-text-500)] bg-[var(--color-field)] outline-none truncate"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-md bg-[#23CA5B1A] text-[#23CA5B] text-[10px] sm:text-xs font-medium whitespace-nowrap">
                  Verified
                </span>
              </div>
            </Field>

            <Field label="Phone Number">
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  className={`w-full h-11 px-4 rounded-lg border body-sm-regular text-[var(--color-primary-text-500)] bg-[var(--color-field)] outline-none transition-colors ${
                    phoneError
                      ? "border-[var(--color-danger-text)] focus:border-[var(--color-danger-text)]"
                      : "border-[var(--color-line)] focus:border-[var(--color-adsfixter-primary)]"
                  }`}
                />
              </div>
              {phoneError && (
                <p className="flex items-center gap-1 mt-1 text-xs text-[var(--color-danger-text)]">
                  <AlertCircle size={12} className="shrink-0" />
                  {phoneError}
                </p>
              )}
            </Field>

            <Field label="Date of Birth">
              <div className="relative">
                <input
                  type="text"
                  value={formattedDob}
                  readOnly
                  onClick={handleCalendarIconClick}
                  className="w-full h-11 pl-4 pr-10 rounded-lg border border-[var(--color-line)] body-sm-regular text-[var(--color-primary-text-500)] bg-[var(--color-field)] outline-none cursor-pointer"
                />
                <button
                  type="button"
                  aria-label="Open date picker"
                  onClick={handleCalendarIconClick}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-subtext-500)]"
                >
                  <Calendar size={16} />
                </button>
                <input
                  ref={dateInputRef}
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
                  tabIndex={-1}
                />
              </div>
            </Field>

            <Field label="Gender">
              <div className="relative">
                <select
                  defaultValue="Male"
                  className="w-full h-11 pl-4 pr-10 rounded-lg border border-[var(--color-line)] body-sm-regular text-[var(--color-primary-text-500)] bg-[var(--color-field)] outline-none appearance-none cursor-pointer focus:border-[var(--color-adsfixter-primary)] transition-colors"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-subtext-500)] pointer-events-none"
                />
              </div>
            </Field>

            <Field label="Country">
              <div className="relative">
                <select
                  value={country}
                  onChange={handleCountryChange}
                  className="w-full h-11 pl-4 pr-10 rounded-lg border border-[var(--color-line)] body-sm-regular text-[var(--color-primary-text-500)] bg-[var(--color-field)] outline-none appearance-none cursor-pointer focus:border-[var(--color-adsfixter-primary)] transition-colors"
                >
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="India">India</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="United States">United States</option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-subtext-500)] pointer-events-none"
                />
              </div>
            </Field>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Reusable field wrapper (label + input) ──
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="body-sm-medium text-[var(--color-primary-text-500)] block">
        {label}
      </label>
      {children}
    </div>
  );
}