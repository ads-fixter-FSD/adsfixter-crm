import { PaymentMethodGrid } from "@/features/crm/client-dashboard/sections/payment-setup/components/payment-method-grid";
import { PaymentSetupStepNumber } from "@/features/crm/client-dashboard/sections/payment-setup/components/payment-setup-step-number";

type PaymentMethodsSectionProps = {
  selectedMethods: string[];
  onToggle: (methodId: string) => void;
};

export function PaymentMethodsSection({ selectedMethods, onToggle }: PaymentMethodsSectionProps) {
  return (
    <div className="border-t border-[var(--line)] pt-8">
      <div className="flex items-start gap-3">
        <PaymentSetupStepNumber number={2} />
        <div className="grid min-w-0 flex-1 gap-5">
          <div>
            <h2 className="body-sm-medium m-0 primary-text">Select Payment Method(s)</h2>
            <p className="body-xsm-regular m-0 mt-1 subtext">You can select multiple payment methods.</p>
          </div>

          <PaymentMethodGrid onToggle={onToggle} selectedMethods={selectedMethods} />
        </div>
      </div>
    </div>
  );
}
