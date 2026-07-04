import AuthPage from "@/components/auth/AuthPage";
import { RedirectIfAuthenticated } from "@/features/auth/components/redirect-if-authenticated";

export default function SignInPage() {
  return (
    <RedirectIfAuthenticated>
      <AuthPage defaultMode="signin" />
    </RedirectIfAuthenticated>
  );
}
