import { BanksMultiSelect } from "@/features/crm/client-dashboard/sections/payment-setup/components/banks-multi-select";
import { PaymentSetupInfoBox } from "@/features/crm/client-dashboard/sections/payment-setup/components/payment-setup-info-box";

type SupportedBanksSectionProps = {
  selectedBanks: string[];
  onChange: (banks: string[]) => void;
};

export function SupportedBanksSection({ selectedBanks, onChange }: SupportedBanksSectionProps) {
  return (
    <div className="border-t border-[var(--line)] pt-8">
      <div className="grid gap-4">
        <div>
          <h2 className="body-sm-medium m-0 primary-text">Supported Banks (Bank Transfer)</h2>
          <p className="body-xsm-regular m-0 mt-1 subtext">Select one or more banks you would like to use for wallet deposits.</p>
        </div>

        <BanksMultiSelect onChange={onChange} selectedBanks={selectedBanks} />

        <PaymentSetupInfoBox>You can add or update payment methods anytime from the Payment Settings.</PaymentSetupInfoBox>
      </div>
    </div>
  );
}
