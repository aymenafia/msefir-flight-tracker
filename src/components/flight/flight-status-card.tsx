import type { Flight } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, Clock, RefreshCw } from "lucide-react";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { FavoritesButton } from "./favorites-button";
import { RefreshButton } from "./refresh-button";

type FlightStatusCardProps = {
  flight: Flight;
};

const getStatusVariant = (status: Flight["status"]) => {
  switch (status) {
    case "On Time":
      return "success";
    case "Delayed":
      return "warning";
    case "Cancelled":
      return "destructive";
    default:
      return "default";
  }
};

export function FlightStatusCard({ flight }: FlightStatusCardProps) {
  const scheduledDepartureTime = parseISO(flight.scheduledDeparture);
  const estimatedDepartureTime = parseISO(flight.estimatedDeparture);

  return (
    <Card className="shadow-lg overflow-hidden">
      <CardHeader className="bg-muted/30">
        <div className="flex justify-between items-start">
          <div>
            <CardDescription className="font-medium text-primary">{flight.airline}</CardDescription>
            <CardTitle className="text-4xl font-bold tracking-wider font-mono">{flight.flightNumber}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <FavoritesButton flightNumber={flight.flightNumber} />
            <RefreshButton />
            <Badge variant={getStatusVariant(flight.status)} className="text-base px-3 py-1">
              {flight.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="text-center w-2/5">
            <p className="text-2xl md:text-4xl font-bold">{flight.departure.iata}</p>
            <p className="text-sm text-muted-foreground truncate">{flight.departure.city}</p>
          </div>
          <div className="flex-shrink-0 text-muted-foreground">
            <Plane className="w-8 h-8" />
          </div>
          <div className="text-center w-2/5">
            <p className="text-2xl md:text-4xl font-bold">{flight.arrival.iata}</p>
            <p className="text-sm text-muted-foreground truncate">{flight.arrival.city}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="bg-muted/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">Departure</p>
                <p className={cn(
                    "text-2xl font-semibold",
                    flight.status === "Delayed" && "text-warning"
                )}>
                    {format(estimatedDepartureTime, "HH:mm")}
                </p>
                <p className={cn("text-sm", flight.status === "Delayed" && "line-through text-muted-foreground")}>
                    Scheduled {format(scheduledDepartureTime, "HH:mm")}
                </p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">Arrival</p>
                <p className="text-2xl font-semibold">
                    {format(parseISO(flight.estimatedArrival), "HH:mm")}
                </p>
                <p className="text-sm text-muted-foreground">
                    Scheduled {format(parseISO(flight.scheduledArrival), "HH:mm")}
                </p>
            </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 p-3 text-center">
        <p className="w-full text-xs text-muted-foreground flex items-center justify-center gap-1">
          <Clock className="w-3 h-3" />
          Last updated: {format(parseISO(flight.lastUpdated), "HH:mm:ss")}
        </p>
      </CardFooter>
    </Card>
  );
}

// Custom variants for Badge
declare module "@/components/ui/badge" {
    interface BadgeProps {
        variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning";
    }
}
import { cva } from "class-variance-authority";
import { badgeVariants } from "@/components/ui/badge";

(badgeVariants as any).defaults.variant = "default";
(badgeVariants as any).variants.variant.success = "border-transparent bg-success text-success-foreground";
(badgeVariants as any).variants.variant.warning = "border-transparent bg-warning text-warning-foreground";
