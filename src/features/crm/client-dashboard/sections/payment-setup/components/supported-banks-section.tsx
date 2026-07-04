import { BanksMultiSelect } from "@/features/crm/client-dashboard/sections/payment-setup/components/banks-multi-select";
import { PaymentSetupInfoBox } from "@/features/crm/client-dashboard/sections/payment-setup/components/payment-setup-info-box";

type SupportedBanksSectionProps = {
  selectedBanks: string[];
  onChange: (banks: string[]) => void;
};

export function SupportedBanksSection({ selectedBanks, onChange }: SupportedBanksSectionProps) {
  return (
    <div className="">
      <div className="grid p-4 gap-4">
        <div>
          <h2 className="title-medium m-0 primary-text">Supported Banks (Bank Transfer)</h2>
          <p className="body-regular m-0 mt-1 subtext-400">Select one or more banks you would like to use for wallet deposits.</p>
        </div>

        <BanksMultiSelect onChange={onChange} selectedBanks={selectedBanks} />

        <PaymentSetupInfoBox>You can add or update payment methods anytime from the Payment Settings.</PaymentSetupInfoBox>
      </div>
    </div>
  );
}
