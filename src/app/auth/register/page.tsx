import AuthPage from "@/components/auth/AuthPage";
import { RedirectIfAuthenticated } from "@/features/auth/components/redirect-if-authenticated";

export default function RegisterPage() {
  return (
    <RedirectIfAuthenticated>
      <AuthPage defaultMode="signup" />
    </RedirectIfAuthenticated>
  );
}
