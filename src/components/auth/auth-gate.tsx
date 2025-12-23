'use client';

import { useUser } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Header } from '../layout/header';
import { Footer } from '../layout/footer';


export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isUserLoading) return;

    const isLoginPage = pathname === '/login';

    if (!user || user.isAnonymous) {
        if (!isLoginPage) {
            router.replace('/login');
        }
    } else {
      if (isLoginPage) {
        router.replace('/');
      }
    }
  }, [user, isUserLoading, router, pathname]);

  const isLoginPage = pathname === '/login';

  if (isUserLoading || (!user && !isLoginPage) || (user?.isAnonymous && !isLoginPage)) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isLoginPage) {
    if (user && !user.isAnonymous) {
        // While redirecting, show a loader
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }
      return <>{children}</>
  }


  return (
    <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
    </div>
  );
}
