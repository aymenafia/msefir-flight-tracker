import { LoginForm } from "@/components/auth/login-form";
import { LanguageProvider } from "@/hooks/use-language";

export default function LoginPage() {
  return (
    <LanguageProvider>
      <LoginForm />
    </LanguageProvider>
  )
}
