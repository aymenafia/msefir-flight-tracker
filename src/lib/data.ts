
import type { Flight, FlightRoom, RoomMessage } from "./types";

async function fetchFlightFromAPI(flightIata: string): Promise<Flight | null> {
  const airlineIata = flightIata.slice(0, 2);
  const flightNumber = flightIata.slice(2);

  const url = `http://api.aviationstack.com/v1/flights?access_key=${process.env.AVIATIONSTACK_API_KEY}&airline_iata=${airlineIata}&flight_number=${flightNumber}`;

  try {
    const response = await fetch(url, { next: { revalidate: 600 } });
    if (!response.ok) {
      throw new Error(`AviationStack API error: ${response.statusText}`);
    }
    const data = await response.json();
    if (!data.data || data.data.length === 0) {
      return null;
    }
    const flightData = data.data[0];

    const normalized: Flight = {
      airline: {
        name: flightData.airline.name,
        iata: flightData.airline.iata,
        icao: flightData.airline.icao,
      },
      flight: {
        number: flightData.flight.number,
        iata: flightData.flight.iata,
        icao: flightData.flight.icao,
      },
      departure: {
        airport: flightData.departure.airport,
        iata: flightData.departure.iata,
        scheduled: flightData.departure.scheduled,
        estimated: flightData.departure.estimated,
        actual: flightData.departure.actual,
        terminal: flightData.departure.terminal,
        gate: flightData.departure.gate,
      },
      arrival: {
        airport: flightData.arrival.airport,
        iata: flightData.arrival.iata,
        scheduled: flightData.arrival.scheduled,
        estimated: flightData.arrival.estimated,
        actual: flightData.arrival.actual,
        terminal: flightData.arrival.terminal,
        gate: flightData.arrival.gate,
      },
      flight_status: flightData.flight_status,
      lastUpdated: new Date().toISOString(),
    };

    return normalized;
  } catch (error) {
    console.error("Failed to fetch from AviationStack:", error);
    throw error;
  }
}

export const getFlightByNumber = async (
  flightNumber: string
): Promise<{ flight: Flight; room: FlightRoom } | null> => {
  const upperCaseFlightNumber = flightNumber.toUpperCase();

  try {
    const flight = await fetchFlightFromAPI(upperCaseFlightNumber);

    if (!flight) {
      return null;
    }

    // Create a temporary mock room object since server-side fetch is disabled.
    const room: FlightRoom = {
      flightNumber: upperCaseFlightNumber,
      status: "OPEN", // Default to open for client-side handling
      activePassengers: 0,
      messages: [],
    };

    return { flight, room };

  } catch (error: any) {
    console.error(`Error fetching flight ${upperCaseFlightNumber}: ${error.message || 'Unknown error'}`);
    return null;
  }
};
