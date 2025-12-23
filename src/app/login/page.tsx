'use client';

import { useAuth, useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { initiateGoogleSignIn } from '@/firebase/auth-mutations';
import { useTranslation } from '@/hooks/use-translation';
import { Logo } from '@/components/icons/logo';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const { t } = useTranslation();
  const router = useRouter();

  const handleSignIn = () => {
    if (auth) {
      initiateGoogleSignIn(auth);
    }
  };

  useEffect(() => {
    if (!isUserLoading && user && !user.isAnonymous) {
      router.replace('/');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || (user && !user.isAnonymous)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
            <Logo className="h-12 w-12 text-primary" />
            <h1 className="text-2xl font-semibold tracking-tight">Welcome to msefir</h1>
            <p className="text-sm text-muted-foreground">Sign in to track your flights</p>
        </div>
        <div className="w-full">
            <Button onClick={handleSignIn} size="lg" className="w-full">
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 381.7 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 21.2 174 55.9L381.2 150.2C345.4 116.7 298.6 96 248 96c-88.8 0-160.1 71.1-160.1 160s71.3 160 160.1 160c92.2 0 148.2-64.5 152.7-99.6H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                {t('auth.signInWithGoogle')}
            </Button>
        </div>
      </div>
    </div>
  );
}
