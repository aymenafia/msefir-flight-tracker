'use client';
import { useTranslation } from '@/hooks/use-translation';
import { Card, CardContent } from '@/components/ui/card';

// The list of airline names will now be fetched from the translation files.
// Example keys: home.airlineNames.0, home.airlineNames.1, etc.

export function SupportedAirlines() {
  const { t } = useTranslation();
  
  // A helper to safely get the array of airlines from translations
  const getAirlineNames = () => {
    const names = [];
    let i = 0;
    while (true) {
      const key = `home.airlineNames.${i}`;
      const name = t(key);
      // If t(key) returns the key itself, it means the translation is not found.
      if (name === key) {
        break;
      }
      names.push(name);
      i++;
    }
    return names;
  };
  
  const airlineNames = getAirlineNames();

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
