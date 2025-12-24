'use client';

import { Button } from '@/components/ui/button';
import { LanguageProvider } from '@/hooks/use-language';
import { useTranslation } from '@/hooks/use-translation';
import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

function GlobalErrorContent({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useTranslation();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="container mx-auto flex h-screen max-w-4xl flex-col items-center justify-center p-4 text-center md:p-8">
          <AlertTriangle className="mx-auto h-16 w-16 text-destructive" />
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-destructive">
            {t('page.globalError')}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {t('page.globalErrorMessage')}
          </p>
          <Button onClick={() => reset()} className="mt-8">
            {t('page.tryAgain')}
          </Button>
        </div>
      </body>
    </html>
  );
}

export default function GlobalError(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <LanguageProvider>
      <GlobalErrorContent {...props} />
    </LanguageProvider>
  );
}
