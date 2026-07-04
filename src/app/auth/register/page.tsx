import AuthPage from "@/components/auth/AuthPage";
import { RedirectIfAuthenticated } from "@/components/auth/redirect-if-authenticated";

export default function RegisterPage() {
  return (
    <RedirectIfAuthenticated>
      <AuthPage defaultMode="signup" />
    </RedirectIfAuthenticated>
  );
}
