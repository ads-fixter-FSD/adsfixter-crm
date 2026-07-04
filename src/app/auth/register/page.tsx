import AuthPage from "@/features/auth/components/auth-page";
import { RedirectIfAuthenticated } from "@/features/auth/components/redirect-if-authenticated";

export default function RegisterPage() {
  return (
    <RedirectIfAuthenticated>
      <AuthPage defaultMode="signup" />
    </RedirectIfAuthenticated>
  );
}
