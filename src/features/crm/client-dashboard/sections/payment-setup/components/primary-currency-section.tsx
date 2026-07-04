import { CurrencySelect } from "@/features/crm/client-dashboard/sections/payment-setup/components/currency-select";
import { PaymentSetupInfoBox } from "@/features/crm/client-dashboard/sections/payment-setup/components/payment-setup-info-box";
import { PaymentSetupStepNumber } from "@/features/crm/client-dashboard/sections/payment-setup/components/payment-setup-step-number";

type PrimaryCurrencySectionProps = {
  currency: string;
  onChange: (currency: string) => void;
};

export function PrimaryCurrencySection({
  currency,
  onChange,
}: PrimaryCurrencySectionProps) {
  return (
    <div className="flex items-start p-4 gap-3">
      <PaymentSetupStepNumber number={1} />
      <div className="grid min-w-0 flex-1 gap-4">
        <div className="flex flex-wrap items-center  gap-5">
          <div className="min-w-0 w-[49%]">
            <h2 className="title-medium m-0 primary-text">
              Select Primary Currency
            </h2>
            <p className="body-regular m-0 mt-1 subtext-400">
              This currency will be used as your wallet balance and for all
              transactions.
            </p>
          </div>

          <div className="min-w-0 w-[49%]">
            <CurrencySelect onChange={onChange} value={currency} />
          </div>
        </div>

        <PaymentSetupInfoBox>
          This currency will be used for your Wallet Balance. It cannot be
          changed after setup without assistance from our Support Team.
        </PaymentSetupInfoBox>
      </div>
    </div>
  );
}
