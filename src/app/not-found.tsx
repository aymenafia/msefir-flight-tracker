
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8 text-center">
      <div className="py-20">
        <AlertTriangle className="mx-auto h-16 w-16 text-primary" />
        <h2 className="mt-6 text-4xl font-bold tracking-tight text-primary">Page Not Found</h2>
        <p className="mt-2 text-lg text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button asChild className="mt-8" size="lg">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
