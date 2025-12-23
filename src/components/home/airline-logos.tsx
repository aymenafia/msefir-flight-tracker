
'use client';
import { useTranslation } from '@/hooks/use-translation';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

const airlines = [
  {
    name: 'Royal Air Maroc',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/37/Royal_Air_Maroc_logo.svg',
    width: 200,
    height: 50,
  },
  {
    name: 'Air Algérie',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Air_Alg%C3%A9rie_Logo.svg/1280px-Air_Alg%C3%A9rie_Logo.svg.png',
    width: 200,
    height: 50,
  },
  {
    name: 'Tunisair',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/fr/thumb/c/c1/Logo_Tunisair.svg/1200px-Logo_Tunisair.svg.png',
    width: 180,
    height: 40,
  },
  {
    name: 'Nouvelair',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Nouvelair_logo.svg/2560px-Nouvelair_logo.svg.png',
    width: 160,
    height: 40,
  },
  {
    name: 'Air Arabia Maroc',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Air_Arabia_Maroc_logo.svg/2560px-Air_Arabia_Maroc_logo.svg.png',
    width: 200,
    height: 50,
  },
];

export function AirlineLogos() {
  const { t } = useTranslation();
  return (
    <section className="mt-16 text-center">
      <h2 className="text-2xl font-semibold tracking-tight mb-6">
        {t('home.supportedAirlines')}
      </h2>
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-center">
            {airlines.map((airline) => (
              <div key={airline.name} className="flex justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <Image
                  src={airline.logoUrl}
                  alt={airline.name}
                  width={airline.width}
                  height={airline.height}
                  className="object-contain dark:invert dark:brightness-200"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
