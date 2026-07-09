"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { isAuthenticated } from "@/components/auth/auth-session";

type RedirectIfAuthenticatedProps = {
  children: React.ReactNode;
};

const subscribeNoop = () => () => {};

export function RedirectIfAuthenticated({ children }: RedirectIfAuthenticatedProps) {
  const router = useRouter();
  const authed = useSyncExternalStore(
    subscribeNoop,
    () => isAuthenticated(),
    () => false,
  );

  useEffect(() => {
    if (authed) {
      router.replace("/");
    }
  }, [authed, router]);

  if (authed) {
    return (
      <div className="grid min-h-screen place-content-center gap-4 text-center">
        <Image alt="AdsFixter" className="block h-10 w-10 object-contain" height={44} src="/adsfixter-logo.png" width={44} />
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
