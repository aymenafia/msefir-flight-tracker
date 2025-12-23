import { FlightSearch } from "@/components/flight/flight-search";
import { FavoritesList } from "@/components/flight/favorites-list";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-primary">
          Track Your Flight Status
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          msefir — Suivez votre vol sans stress
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Find Your Flight
          </h2>
          <FlightSearch />
        </div>
        <aside className="md:col-span-2">
           <h2 className="text-2xl font-semibold tracking-tight mb-4">
            My Flights
          </h2>
          <Suspense fallback={<FavoritesSkeleton />}>
            <FavoritesList />
          </Suspense>
        </aside>
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
