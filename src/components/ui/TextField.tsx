interface TextFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
}

export default function TextField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  autoComplete,
}: TextFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="body-regular text-[#3E4D60]"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="body-sm-regular w-full rounded-lg px-4 py-3 outline-none transition-colors placeholder:text-[var(--color-subtext-400)] "
        style={{
          border: "1px solid var(--color-line)",
          background: "var(--color-field)",
          color: "var(--color-primary-text-500)",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--color-primary)";
          e.currentTarget.style.boxShadow = "0 0 0 3px var(--color-primary-soft)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--color-line)";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
    </div>
  );
}
