'use client';
import { useTranslation } from '@/hooks/use-translation';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

const airlines = [
  { name: 'Royal Air Maroc', logo: '/images/airlines/royal-air-maroc.png' },
  { name: 'Air Algérie', logo: '/images/airlines/air-algerie.png' },
  { name: 'Tunisair', logo: '/images/airlines/tunisair.png' },
  { name: 'Nouvelair', logo: '/images/airlines/nouvelair.png' },
  { name: 'Air Arabia Maroc', logo: '/images/airlines/air-arabia-maroc.png' },
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
                <Image
                  src={airline.logo}
                  alt={`${airline.name} logo`}
                  width={160}
                  height={40}
                  className="h-10 w-auto object-contain"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
