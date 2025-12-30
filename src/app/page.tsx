'use client';
import { FlightSearch } from "@/components/flight/flight-search";
import { FavoritesList } from "@/components/flight/favorites-list";
import { Suspense, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/hooks/use-translation";
import { SupportedAirlines } from "@/components/home/supported-airlines";
import { HolidayTravelSection } from "@/components/home/holiday-travel-section";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const { t } = useTranslation();
  const [selectedFlight, setSelectedFlight] = useState<string | undefined>();

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-primary">
          {t('home.title')}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {t('home.subtitle')}
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            {t('home.findFlight')}
          </h2>
          <FlightSearch key={selectedFlight} initialFlightNumber={selectedFlight} />
        </div>
        <aside className="md:col-span-2">
           <h2 className="text-2xl font-semibold tracking-tight mb-4">
            {t('home.myFlights')}
          </h2>
          <Suspense fallback={<FavoritesSkeleton />}>
            <FavoritesList />
          </Suspense>
        </aside>
      </div>

      <Separator className="my-12" />

      <HolidayTravelSection onFlightSelect={setSelectedFlight} />
      
      <div className="mt-16">
        <SupportedAirlines />
      </div>
    </div>
  );
}

function FavoritesSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-16 w-full" />
    </div>
  )
}
