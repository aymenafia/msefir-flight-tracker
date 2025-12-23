
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8 text-center">
      <div className="py-20">
        <AlertTriangle className="mx-auto h-16 w-16 text-warning" />
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-primary">{t('flight.notFound')}</h2>
        <p className="mt-2 text-lg text-muted-foreground">
          {t('flight.notFoundMessage')}
        </p>
        <Button asChild className="mt-8">
          <Link href="/">{t('flight.backToHome')}</Link>
        </Button>
      </div>
    </div>
  );
}
