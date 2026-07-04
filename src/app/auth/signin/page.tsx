import AuthPage from "@/features/auth/components/auth-page";
import { RedirectIfAuthenticated } from "@/features/auth/components/redirect-if-authenticated";

export default function SignInPage() {
  return (
    <RedirectIfAuthenticated>
      <AuthPage defaultMode="signin" />
    </RedirectIfAuthenticated>
  );
}
