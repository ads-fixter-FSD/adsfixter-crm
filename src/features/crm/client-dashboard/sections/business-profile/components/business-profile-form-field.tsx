import { businessProfileLabelClassName } from "@/features/crm/client-dashboard/sections/business-profile/components/business-profile-form-styles";

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
        {required ? <span className="text-[#F74608]"> *</span> : null}
      </label>
      {children}
    </div>
  );
}
