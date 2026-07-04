import {
  blackCategoryItems,
  grayCategoryItems,
  whiteCategoryItems,
} from "@/features/crm/client-dashboard/sections/business-profile/components/business-profile-form-styles";

type CategoryCardProps = {
  items: string[];
  title: string;
  twoColumns?: boolean;
};

function CategoryCard({ items, title, twoColumns = false }: CategoryCardProps) {
  return (
    <div className="rounded-xl border border-[var(--line)] bg-[var(--white)]">
      <h3 className="body-medium m-0 border-b border-[var(--line)] p-3 pb-3 primary-text">
        {title}
      </h3>
      <ul
        className={`body-sm-regular m-0 grid list-none gap-2 p-2 subtext ${twoColumns ? "md:grid-cols-2" : ""}`}
      >
        {items.map((item) => (
          <li className="flex items-start gap-2" key={item}>
            <span
              aria-hidden="true"
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--muted)]"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

type ProductCategoryGuideProps = {
  variant?: "card" | "embedded";
};

export function ProductCategoryGuide({
  variant = "card",
}: ProductCategoryGuideProps) {
  const containerClassName =
    variant === "card"
      ? "rounded-xl border border-[var(--line)] bg-[var(--white)]"
      : "rounded-xl border border-[var(--line)] ";

  return (
    <div className="p-5 max-[720px]:p-4">
      <div className={containerClassName}>
        <div className="p-5 max-[720px]:p-4">
          <h2 className="body-l-medium m-0 primary-text">
            Product Category Guide
          </h2>
          <p className="body-sm-regular m-0 mt-1 subtext">
            You can upload documents to help verify your business faster.
          </p>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            <CategoryCard
              items={whiteCategoryItems}
              title="White Category"
              twoColumns
            />
            <CategoryCard items={grayCategoryItems} title="Gray Category" />
            <CategoryCard items={blackCategoryItems} title="Black Category" />
          </div>
        </div>
      </div>
    </div>
  );
}
