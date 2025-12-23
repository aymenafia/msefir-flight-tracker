'use client';
import { useTranslation } from '@/hooks/use-translation';
import { Card, CardContent } from '@/components/ui/card';
import { RoyalAirMarocLogo } from '../icons/airlines/RoyalAirMarocLogo';
import { AirAlgerieLogo } from '../icons/airlines/AirAlgerieLogo';
import { TunisairLogo } from '../icons/airlines/TunisairLogo';
import { NouvelairLogo } from '../icons/airlines/NouvelairLogo';
import { AirArabiaMarocLogo } from '../icons/airlines/AirArabiaMarocLogo';

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
            <RoyalAirMarocLogo className="h-10 w-auto mx-auto" />
            <AirAlgerieLogo className="h-12 w-auto mx-auto" />
            <TunisairLogo className="h-10 w-auto mx-auto" />
            <NouvelairLogo className="h-8 w-auto mx-auto" />
            <AirArabiaMarocLogo className="h-12 w-auto mx-auto" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
