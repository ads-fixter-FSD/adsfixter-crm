import { ADLaM_Display } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";

const adlamDisplay = ADLaM_Display({
  subsets: ["latin"],
  weight: "400",
});

export default function Logo() {
  return (
    <div>
      <Link href={"/"}>
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded"
            style={{
              background: "linear-gradient(270deg, #F74608 0%, #FF9F7E 111.6%)",
              padding: "10px",
            }}
          >
            <span
              className={adlamDisplay.className}
              style={{
                fontSize: "24px",
                fontWeight: 400,
                lineHeight: "135%",
                color: "#FFFFFF",
              }}
            >
              M
            </span>
          </div>
          <span
            className={adlamDisplay.className}
            style={{
              fontSize: "24px",
              fontWeight: 400,
              lineHeight: "135%",
              color: "var(--Color-Primary-Text, #0E2038)",
            }}
          >
            MetaBari
          </span>
        </div>
      </Link>
    </div>
  );
}
