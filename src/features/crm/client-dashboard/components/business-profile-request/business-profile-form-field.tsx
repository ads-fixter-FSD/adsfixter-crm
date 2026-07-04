import { businessProfileLabelClassName } from "@/features/crm/client-dashboard/components/business-profile-request/business-profile-form-styles";

type BusinessProfileFormFieldProps = {
  children: React.ReactNode;
  htmlFor?: string;
  label: string;
  required?: boolean;
};

export function BusinessProfileFormField({ children, htmlFor, label, required = false }: BusinessProfileFormFieldProps) {
  return (
    <div className="grid gap-2">
      <label className={businessProfileLabelClassName} htmlFor={htmlFor}>
        {label}
        {required ? <span className="text-[var(--danger-text)]"> *</span> : null}
      </label>
      {children}
    </div>
  );
}
