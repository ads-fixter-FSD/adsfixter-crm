import AuthCard from "@/components/auth/AuthCard";
import AuthFooter from "@/components/auth/AuthFooter";
import Logo from "@/components/auth/Logo";

export default function AuthPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100 p-4">
      <div className="relative mx-auto flex w-full max-w-5xl flex-col rounded-3xl bg-white shadow-sm">
        <div className="absolute left-10 top-10">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center p-10">
          <AuthCard />
        </div>
        <div className="mt-6 hidden p-6 lg:block">
          <AuthFooter />
        </div>
      </div>
    </main>
  );
}
