import AuthPage from "@/components/auth/AuthPage";
import { RedirectIfAuthenticated } from "@/components/auth/redirect-if-authenticated";

export default function SignInPage() {
  return (
    <RedirectIfAuthenticated>
      <AuthPage defaultMode="signin" />
    </RedirectIfAuthenticated>
  );
}
