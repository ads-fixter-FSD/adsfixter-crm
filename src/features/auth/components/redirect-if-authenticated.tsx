"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAuthenticated } from "@/features/auth/auth-session";

type RedirectIfAuthenticatedProps = {
  children: React.ReactNode;
};

export function RedirectIfAuthenticated({ children }: RedirectIfAuthenticatedProps) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/");
      return;
    }

    setIsReady(true);
  }, [router]);

  if (!isReady) {
    return (
      <div className="grid min-h-screen place-content-center gap-4 text-center">
        <Image alt="AdsFixter" className="block h-10 w-10 object-contain" height={44} src="/adsfixter-logo.png" width={44} />
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
