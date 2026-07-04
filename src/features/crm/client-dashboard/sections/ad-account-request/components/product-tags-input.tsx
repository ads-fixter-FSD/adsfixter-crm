"use client";

import { X } from "lucide-react";
import { useRef, useState } from "react";

type ProductTagsInputProps = {
  id: string;
  onChange: (products: string[]) => void;
  products: string[];
};

export function ProductTagsInput({ id, onChange, products }: ProductTagsInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  const addProduct = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) {
      return;
    }

    const alreadyExists = products.some((item) => item.toLowerCase() === trimmed.toLowerCase());

    if (alreadyExists) {
      setInputValue("");
      return;
    }

    onChange([...products, trimmed]);
    setInputValue("");
  };

  const removeProduct = (product: string) => {
    onChange(products.filter((item) => item !== product));
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      addProduct(inputValue);
      return;
    }

    if (event.key === "Backspace" && !inputValue && products.length > 0) {
      event.preventDefault();
      onChange(products.slice(0, -1));
    }
  };

  return (
    <div className="grid gap-2">
      <div
        className="flex min-h-11 cursor-text flex-wrap items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--field-bg)] px-3 py-2"
        onClick={() => inputRef.current?.focus()}
        role="presentation"
      >
        {products.map((product) => (
          <span
            className="body-sm-regular inline-flex items-center gap-1.5 rounded-md border border-[var(--line)] bg-[var(--line)] px-2.5 py-1.5 primary-text"
            key={product}
          >
            {product}
            <button
              aria-label={`Remove ${product}`}
              className="inline-flex h-4 w-4 items-center justify-center rounded-sm border-0 bg-transparent p-0 text-[var(--muted)] transition hover:bg-[var(--surface)] hover:text-[var(--brand-navy)]"
              onClick={(event) => {
                event.stopPropagation();
                removeProduct(product);
              }}
              type="button"
            >
              <X aria-hidden="true" size={12} strokeWidth={2.2} />
            </button>
          </span>
        ))}

        <input
          className="min-w-[220px] flex-1 border-0 bg-transparent py-1 body-sm-regular text-[var(--brand-navy)] outline-none placeholder:text-[var(--muted)]"
          id={id}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type and press Enter to add more advertise."
          ref={inputRef}
          value={inputValue}
        />
      </div>

      <p className="body-regular m-0 subtext">
        After selecting the category, describe every product that will be advertise under this ad account.
      </p>
    </div>
  );
}
