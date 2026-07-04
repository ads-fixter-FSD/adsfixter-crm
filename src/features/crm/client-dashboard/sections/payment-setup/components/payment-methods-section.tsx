import { PaymentMethodGrid } from "@/features/crm/client-dashboard/sections/payment-setup/components/payment-method-grid";
import { PaymentSetupStepNumber } from "@/features/crm/client-dashboard/sections/payment-setup/components/payment-setup-step-number";

type PaymentMethodsSectionProps = {
  selectedMethods: string[];
  onToggle: (methodId: string) => void;
};

export function PaymentMethodsSection({ selectedMethods, onToggle }: PaymentMethodsSectionProps) {
  return (
    <div className="">
      <div className="flex items-start p-4 gap-3">
        <PaymentSetupStepNumber number={2} />
        <div className="grid min-w-0 flex-1 gap-5">
          <div>
            <h2 className="title-medium m-0 primary-text">Select Payment Method(s)</h2>
            <p className="body-regular m-0 mt-1 subtext-400">You can select multiple payment methods.</p>
          </div>

          <PaymentMethodGrid onToggle={onToggle} selectedMethods={selectedMethods} />
        </div>
      </div>
    </div>
  );
}
