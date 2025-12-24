
'use client';
import type { Flight } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, Clock, BaggageClaim, Milestone, DoorClosed } from "lucide-react";
import { format, parseISO, isValid } from "date-fns";
import { cn } from "@/lib/utils";
import { FavoritesButton } from "./favorites-button";
import { RefreshButton } from "./refresh-button";
import { useTranslation } from "@/hooks/use-translation";

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

const formatTime = (dateString: string | null | undefined, fallbackString: string) => {
    if (!dateString) {
        const fallbackDate = parseISO(fallbackString);
        return isValid(fallbackDate) ? format(fallbackDate, "HH:mm") : "--:--";
    }
    const date = parseISO(dateString);
    return isValid(date) ? format(date, "HH:mm") : "--:--";
}

export function FlightStatusCard({ flight }: FlightStatusCardProps) {
  const { t } = useTranslation();

  const scheduledDepartureTime = flight.departure.scheduled;
  const estimatedDepartureTime = flight.departure.estimated;
  const scheduledArrivalTime = flight.arrival.scheduled;
  const estimatedArrivalTime = flight.arrival.estimated;

  const statusLabel: Record<string, string> = {
    scheduled: t('flight.statusScheduled'),
    active: t('flight.statusActive'),
    landed: t('flight.statusLanded'),
    delayed: t('flight.statusDelayed'),
    cancelled: t('flight.statusCancelled'),
    on_time: t('flight.statusOnTime'),
  }

  const flightStatus = flight.flight_status || 'scheduled';
  const lastUpdatedDate = parseISO(flight.lastUpdated);

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
                        {formatTime(estimatedDepartureTime, scheduledDepartureTime)}
                    </p>
                    <p className={cn("text-sm", flightStatus === "delayed" && "line-through text-muted-foreground")}>
                        {t('flight.scheduledTime')} {formatTime(scheduledDepartureTime, scheduledDepartureTime)}
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
                        {formatTime(estimatedArrivalTime, scheduledArrivalTime)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {t('flight.scheduledTime')} {formatTime(scheduledArrivalTime, scheduledArrivalTime)}
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
          {isValid(lastUpdatedDate) ? `${t('flight.lastUpdated')}: ${format(lastUpdatedDate, "HH:mm:ss")}` : 'Updating...'}
        </p>
      </CardFooter>
    </Card>
  );
}
