
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

export async function generateMetadata({ params }: FlightPageProps) {
    console.log(`[FlightPage] generateMetadata for: ${params.flightNumber}`);
    const flightData = await getFlightByNumber(params.flightNumber);
    if (!flightData || !flightData.flight) {
        console.log(`[FlightPage] No flight data found for metadata: ${params.flightNumber}`);
        return {
            title: "Flight Not Found | msefir"
        }
    }
    const { flight } = flightData;
    console.log(`[FlightPage] Flight data found for metadata:`, flight);
    return {
        title: `Flight ${flight.flight.iata} Status | msefir`,
        description: `Track the status for ${flight.airline.name} flight ${flight.flight.number} from ${flight.departure.airport} to ${flight.arrival.airport}.`,
    };
}

export async function generateStaticParams() {
  return [];
}


export default async function FlightPage({ params }: FlightPageProps) {
  console.log(`[FlightPage] Rendering page for flight: ${params.flightNumber}`);
  const data = await getFlightByNumber(params.flightNumber);

  console.log('[FlightPage] Data received from getFlightByNumber:', data);

  if (!data || !data.flight) {
    console.log(`[FlightPage] No data found for flight ${params.flightNumber}, calling notFound().`);
    notFound();
  }

  const { flight, room, searchCount } = data;
  const flightId = flight.flight.iata;
  console.log(`[FlightPage] Rendering with flightId: ${flightId}`);


  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8">
      <FlightStatusCard flight={flight} />
      
      <Separator className="my-8" />
      
      <FlightRoom room={room} flightId={flightId} searchCount={searchCount} />
    </div>
  );
}
