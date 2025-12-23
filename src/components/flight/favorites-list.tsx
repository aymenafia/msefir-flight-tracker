"use client";

import { useFavorites } from "@/hooks/use-favorites";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Star, Plane } from "lucide-react";

export function FavoritesList() {
  const { favorites, isLoaded } = useFavorites();

  if (!isLoaded) {
    return null;
  }
  
  if (favorites.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center text-center p-6 border-dashed">
        <CardContent className="p-0">
          <div className="flex justify-center items-center w-12 h-12 rounded-full bg-secondary mb-4">
            <Star className="w-6 h-6 text-secondary-foreground" />
          </div>
          <h3 className="font-semibold">No favorite flights</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Star a flight to track it here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-3">
        <ul className="space-y-2">
          {favorites.map((flightNumber) => (
            <li key={flightNumber}>
              <Link href={`/flight/${flightNumber}`}>
                <div className="flex items-center p-3 rounded-md hover:bg-accent transition-colors">
                  <Plane className="w-5 h-5 mr-3 text-primary" />
                  <span className="font-mono font-semibold text-primary">
                    {flightNumber}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
