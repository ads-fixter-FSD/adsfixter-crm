import { CurrencySelect } from "@/features/crm/client-dashboard/sections/payment-setup/components/currency-select";
import { PaymentSetupInfoBox } from "@/features/crm/client-dashboard/sections/payment-setup/components/payment-setup-info-box";
import { PaymentSetupStepNumber } from "@/features/crm/client-dashboard/sections/payment-setup/components/payment-setup-step-number";

type PrimaryCurrencySectionProps = {
  currency: string;
  onChange: (currency: string) => void;
};

export function PrimaryCurrencySection({ currency, onChange }: PrimaryCurrencySectionProps) {
  return (
    <div className="flex items-start gap-3">
      <PaymentSetupStepNumber number={1} />
      <div className="grid min-w-0 flex-1 gap-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-8">
        <div className="grid gap-4">
          <div>
            <h2 className="body-sm-medium m-0 primary-text">Select Primary Currency</h2>
            <p className="body-xsm-regular m-0 mt-1 subtext">This currency will be used as your wallet balance and for all transactions.</p>
          </div>

          <PaymentSetupInfoBox className="max-[1023px]:hidden">
            This currency will be used for your Wallet Balance. It cannot be changed after setup without assistance from our Support Team.
          </PaymentSetupInfoBox>
        </div>

        <div className="grid gap-4">
          <CurrencySelect onChange={onChange} value={currency} />

          <PaymentSetupInfoBox className="min-[1024px]:hidden">
            This currency will be used for your Wallet Balance. It cannot be changed after setup without assistance from our Support Team.
          </PaymentSetupInfoBox>
        </div>
      </div>
    </div>
  );
}
