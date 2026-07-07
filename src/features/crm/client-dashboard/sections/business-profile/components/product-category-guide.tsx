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
    <div className="rounded-xl border border-[var(--line)] bg-[var(--white)] p-4">

      <h3 className="body-sm-medium m-0 -mx-4 px-4 border-b border-[var(--line)] pb-3 primary-text">
        {title}
      </h3>
      
      <ul className={`body-xsm-regular m-0 mt-3 grid list-none gap-2 p-0 subtext ${twoColumns ? "md:grid-cols-2" : ""}`}>
        {items.map((item) => (
          <li className="flex items-start gap-2" key={item}>
            <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--muted)]" />
            <span className="body-sm-regular">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
type ProductCategoryGuideProps = {
  variant?: "card" | "embedded";
};

export function ProductCategoryGuide({ variant = "card" }: ProductCategoryGuideProps) {
  const containerClassName = variant === "card" ? "rounded-xl border border-[var(--line)] bg-[var(--white)] p-5 max-[720px]:p-4" : "mt-6 rounded-xl border border-[var(--line)]  p-4";

  return (
    <div className={containerClassName}>
      <h2 className="body-l-medium m-0 primary-text">Product Category Guide</h2>
      <p className="body-sm-regular m-0 mt-1 subtext">You can upload documents to help verify your business faster.</p>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <CategoryCard items={whiteCategoryItems} title="White Category"twoColumns />
        <CategoryCard items={grayCategoryItems} title="Gray Category" />
        <CategoryCard items={blackCategoryItems} title="Black Category" />
      </div>
    </div>
  );
}
