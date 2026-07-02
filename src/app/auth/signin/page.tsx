import AuthCard from "@/components/auth/AuthCard";
import DashboardPreview from "@/components/auth/DashboardPreview";
import AuthFooter from "@/components/auth/AuthFooter";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100 p-4">
      <div className="flex w-full max-w-5xl flex-col rounded-3xl bg-white p-6 shadow-sm lg:p-10">
        <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:gap-8">
          <div className="flex flex-1 items-center justify-center">
            <AuthCard />
          </div>
          <DashboardPreview />
        </div>
        <div className="mt-6 hidden lg:block">
          <AuthFooter />
        </div>
      </div>
    </main>
  );
}
