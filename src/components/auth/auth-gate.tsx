"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAuthenticated } from "@/components/auth/auth-session";

type AuthGateProps = {
  children: React.ReactNode;
};

export function AuthGate({ children }: AuthGateProps) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/auth/signin");
      return;
    }

    setIsReady(true);
  }, [router]);

  if (!isReady) {
    return (
      <div className="grid min-h-screen place-content-center gap-4 text-center">
        <Image alt="AdsFixter" className="block h-10 w-10 object-contain" height={44} src="/adsfixter-logo.png" width={44} />
        <p>Checking your session...</p>
      </div>
    );
  }

  return <>{children}</>;
}
