import Link from "next/link";
import { Logo } from "@/components/icons/logo";
import { AuthButton } from "../auth/auth-button";
import { LanguageSwitcher } from "./language-switcher";

export function Header() {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto max-w-4xl flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
          <Logo className="h-8 w-8" />
          <span className="text-xl font-bold tracking-tight">
            msefir
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
