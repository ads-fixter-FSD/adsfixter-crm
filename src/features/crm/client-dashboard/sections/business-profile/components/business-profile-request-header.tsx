"use client";

import { Plus } from "lucide-react";
import { FlatButton } from "@/components/shared-buttons/flat-button";

type BusinessProfileRequestHeaderProps = {
  onAddNew: () => void;
  title?: string;
  subtitle?: string;
};

export function BusinessProfileRequestHeader({
  onAddNew,
  title = "My Business Account Requests",
  subtitle = "Review and manage business profile requests",
}: BusinessProfileRequestHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 p-4">
      <div>
        <h2 className="h4 m-0 primary-text">{title}</h2>
        <p className="body-regular m-0 subtext">{subtitle}</p>
      </div>

      <FlatButton
        className="min-h-10 gap-2 px-4 "
        onClick={onAddNew}
        type="button"
      >
        <Plus aria-hidden="true" size={16} strokeWidth={1.8} />
        Add New Business Request 
      </FlatButton>
    </div>
  );
}