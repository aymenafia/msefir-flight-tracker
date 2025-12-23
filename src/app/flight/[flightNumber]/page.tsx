import { getFlightByNumber } from "@/lib/data";
import { notFound } from "next/navigation";
import { FlightStatusCard } from "@/components/flight/flight-status-card";
import { FlightRoom } from "@/components/room/flight-room";
import { Separator } from "@/components/ui/separator";

type FlightPageProps = {
  params: {
    flightNumber: string;
  };
};

export async function generateMetadata({ params: { flightNumber } }: FlightPageProps) {
    const flightData = await getFlightByNumber(flightNumber);
    if (!flightData) {
        return {
            title: "Flight Not Found | msefir"
        }
    }
    const { flight } = flightData;
    return {
        title: `Flight ${flight.flight.iata} Status | msefir`,
        description: `Track the status for ${flight.airline.name} flight ${flight.flight.number} from ${flight.departure.airport} to ${flight.arrival.airport}.`,
    };
}

export async function generateStaticParams() {
  return [];
}


export default async function FlightPage({ params: { flightNumber } }: FlightPageProps) {
  const data = await getFlightByNumber(flightNumber);

  if (!data) {
    notFound();
  }

  const { flight, room } = data;

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8">
      <FlightStatusCard flight={flight} />
      
      <Separator className="my-8" />
      
      <FlightRoom room={room} />
    </div>
  );
}
