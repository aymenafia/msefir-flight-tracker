'use client';
import { useTranslation } from '@/hooks/use-translation';
import { Card, CardContent } from '@/components/ui/card';

const airlineNames = [
  "Royal Air Maroc",
  "Air Algérie",
  "Tunisair",
  "Nouvelair",
  "Air Arabia Maroc"
];

export function SupportedAirlines() {
  const { t } = useTranslation();
  return (
    <section className="mt-16 text-center">
      <h2 className="text-2xl font-semibold tracking-tight mb-6">
        {t('home.supportedAirlines')}
      </h2>
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {airlineNames.map((name) => (
              <p key={name} className="text-muted-foreground font-medium">
                {name}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
