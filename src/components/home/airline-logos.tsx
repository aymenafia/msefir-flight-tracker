
'use client';
import { useTranslation } from '@/hooks/use-translation';
import { Card, CardContent } from '@/components/ui/card';

const airlines = [
  { name: 'Royal Air Maroc', logo: '/images/airlines/Logo_Royal_Air_Maroc.png' },
  { name: 'Air Algérie', logo: '/images/airlines/Air_Algérie_Logo.png' },
  { name: 'Tunisair', logo: '/images/airlines/TunisAir_Logo.png' },
  { name: 'Nouvelair', logo: '/images/airlines/Nouvelair_Logo.png' },
  { name: 'Air Arabia Maroc', logo: '/images/airlines/Air_Arabia_Logo.png' },
];

export function AirlineLogos() {
  const { t } = useTranslation();
  return (
    <section className="mt-16 text-center">
      <h2 className="text-2xl font-semibold tracking-tight mb-6">
        {t('home.supportedAirlines')}
      </h2>
      <Card>
        <CardContent className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-4 items-center justify-center">
            {airlines.map((airline) => (
              <div key={airline.name} className="flex justify-center">
                <img
                  src={airline.logo}
                  alt={`${airline.name} logo`}
                  className="h-10 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
