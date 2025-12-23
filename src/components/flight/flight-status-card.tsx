
'use client';
import type { Flight } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, Clock, BaggageClaim, Milestone, DoorClosed } from "lucide-react";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { FavoritesButton } from "./favorites-button";
import { RefreshButton } from "./refresh-button";
import { useTranslation } from "@/hooks/use-translation";
import { useEffect, useState } from "react";

type FlightStatusCardProps = {
  flight: Flight;
};

const getStatusVariant = (status: Flight["flight_status"]) => {
  switch (status) {
    case "scheduled":
      return "default";
    case "active":
    case "landed":
      return "success";
    case "delayed":
      return "warning";
    case "cancelled":
      return "destructive";
    default:
      return "default";
  }
};

export function FlightStatusCard({ flight }: FlightStatusCardProps) {
  const { t } = useTranslation();
  const [formattedTimes, setFormattedTimes] = useState({
    departure: '',
    scheduledDeparture: '',
    arrival: '',
    scheduledArrival: '',
    lastUpdated: ''
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const scheduledDepartureTime = parseISO(flight.departure.scheduled);
      const estimatedDepartureTime = parseISO(flight.departure.estimated ?? flight.departure.scheduled);
      const scheduledArrivalTime = parseISO(flight.arrival.scheduled);
      const estimatedArrivalTime = parseISO(flight.arrival.estimated ?? flight.arrival.scheduled);
      
      setFormattedTimes({
        departure: format(estimatedDepartureTime, "HH:mm"),
        scheduledDeparture: format(scheduledDepartureTime, "HH:mm"),
        arrival: format(estimatedArrivalTime, "HH:mm"),
        scheduledArrival: format(scheduledArrivalTime, "HH:mm"),
        lastUpdated: format(parseISO(flight.lastUpdated), "HH:mm:ss"),
      });
    } catch (error) {
      console.error("Failed to format flight dates", error);
    }
  }, [flight]);

  const statusLabel: Record<string, string> = {
    scheduled: t('flight.statusScheduled'),
    active: t('flight.statusActive'),
    landed: t('flight.statusLanded'),
    delayed: t('flight.statusDelayed'),
    cancelled: t('flight.statusCancelled'),
    on_time: t('flight.statusOnTime'),
  }

  const flightStatus = flight.flight_status || 'scheduled';

  return (
    <Card className="shadow-lg overflow-hidden">
      <CardHeader className="bg-muted/30">
        <div className="flex justify-between items-start">
          <div>
            <CardDescription className="font-medium text-primary">{flight.airline.name}</CardDescription>
            <CardTitle className="text-4xl font-bold tracking-wider font-mono">{flight.flight.iata}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <FavoritesButton flightNumber={flight.flight.iata} />
            <RefreshButton lastUpdated={flight.lastUpdated} />
            <Badge variant={getStatusVariant(flightStatus)} className="text-base px-3 py-1">
              {statusLabel[flightStatus] || t('flight.statusOnTime')}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="text-center w-2/5">
            <p className="text-2xl md:text-4xl font-bold">{flight.departure.iata}</p>
            <p className="text-sm text-muted-foreground truncate">{flight.departure.airport}</p>
          </div>
          <div className="flex-shrink-0 text-muted-foreground">
            <Plane className="w-8 h-8" />
          </div>
          <div className="text-center w-2/5">
            <p className="text-2xl md:text-4xl font-bold">{flight.arrival.iata}</p>
            <p className="text-sm text-muted-foreground truncate">{flight.arrival.airport}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
            {/* Departure Info */}
            <div className="space-y-4">
                <div className="bg-muted/30 p-4 rounded-lg text-center">
                    <p className="text-sm font-medium text-muted-foreground">{t('flight.departure')}</p>
                    <p className={cn(
                        "text-2xl font-semibold",
                        flightStatus === "delayed" && "text-warning-foreground bg-warning/10 rounded-md py-1"
                    )}>
                        {isClient ? formattedTimes.departure : '...'}
                    </p>
                    <p className={cn("text-sm", flightStatus === "delayed" && "line-through text-muted-foreground")}>
                        {t('flight.scheduledTime')} {isClient ? formattedTimes.scheduledDeparture : '...'}
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-center">
                    <div className="bg-muted/30 p-2 rounded-md">
                        <Milestone className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                        <span className="font-semibold">{flight.departure.terminal || "-"}</span>
                        <p className="text-xs">{t('flight.terminal')}</p>
                    </div>
                     <div className="bg-muted/30 p-2 rounded-md">
                        <DoorClosed className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                        <span className="font-semibold">{flight.departure.gate || "-"}</span>
                        <p className="text-xs">{t('flight.gate')}</p>
                    </div>
                </div>
            </div>

            {/* Arrival Info */}
            <div className="space-y-4">
                 <div className="bg-muted/30 p-4 rounded-lg text-center">
                    <p className="text-sm font-medium text-muted-foreground">{t('flight.arrival')}</p>
                    <p className="text-2xl font-semibold">
                        {isClient ? formattedTimes.arrival : '...'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {t('flight.scheduledTime')} {isClient ? formattedTimes.scheduledArrival : '...'}
                    </p>
                </div>
                 <div className="grid grid-cols-3 gap-2 text-sm text-center">
                    <div className="bg-muted/30 p-2 rounded-md">
                        <Milestone className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                        <span className="font-semibold">{flight.arrival.terminal || "-"}</span>
                        <p className="text-xs">{t('flight.terminal')}</p>
                    </div>
                     <div className="bg-muted/30 p-2 rounded-md">
                        <DoorClosed className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                        <span className="font-semibold">{flight.arrival.gate || "-"}</span>
                        <p className="text-xs">{t('flight.gate')}</p>
                    </div>
                    <div className="bg-muted/30 p-2 rounded-md">
                        <BaggageClaim className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                        <span className="font-semibold">{flight.arrival.baggage || "-"}</span>
                        <p className="text-xs">{t('flight.baggage')}</p>
                    </div>
                </div>
            </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 p-3 text-center">
        <p className="w-full text-xs text-muted-foreground flex items-center justify-center gap-1">
          <Clock className="w-3 h-3" />
          {t('flight.lastUpdated')}: {isClient ? formattedTimes.lastUpdated : '...'}
        </p>
      </CardFooter>
    </Card>
  );
}

    