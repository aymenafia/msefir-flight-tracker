
'use client';
import { useTranslation } from '@/hooks/use-translation';
import { Card, CardContent } from '@/components/ui/card';

export function SupportedAirlines() {
  const { t } = useTranslation();
  return (
    <section className="mt-16 text-center">
      <h2 className="text-2xl font-semibold tracking-tight mb-6">
        {t('home.supportedAirlines')}
      </h2>
      <Card>
        <CardContent className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-4 items-center justify-center">
            <div className="flex justify-center">
              <img
                src="/images/airlines/Logo_Royal_Air_Maroc.png"
                alt="Royal Air Maroc logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="flex justify-center">
              <img
                src="/images/airlines/Air_Algérie_Logo.png"
                alt="Air Algérie logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="flex justify-center">
              <img
                src="/images/airlines/TunisAir_Logo.png"
                alt="Tunisair logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="flex justify-center">
              <img
                src="/images/airlines/Nouvelair_Logo.png"
                alt="Nouvelair logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="flex justify-center">
              <img
                src="/images/airlines/Air_Arabia_Logo.png"
                alt="Air Arabia Maroc logo"
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
