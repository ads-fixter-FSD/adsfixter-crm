import Image from "next/image";

const paymentMethodIconMap: Record<string, string> = {
  "bank-transfer": "/images/bank.png",
  bkash: "/images/bkash.png",
  nagad: "/images/nagad.png",
  paypal: "/images/paypal.png",
  card: "/images/credit.png",
  stripe: "/images/stripe.png",
};

export function PaymentMethodIcon({ methodId }: { methodId: string }) {
  console.log("methodId:", methodId);

  const src = paymentMethodIconMap[methodId];
  console.log("src:", src);

  if (!src) return null;

  return (
    <Image
      src={src}
      alt={methodId}
      width={32}
      height={32}
      className="h-8 w-8 shrink-0 object-contain"
    />
  );
}
