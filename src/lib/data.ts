
import type { Flight, FlightRoom, RoomMessage } from "./types";

async function fetchFlightFromAPI(flightIata: string): Promise<Flight | null> {
  const apiKey = process.env.AVIATIONSTACK_API_KEY;

  if (!apiKey) {
    console.error("AviationStack API key is not configured in environment variables.");
    return null;
  }

  const airlineIata = flightIata.slice(0, 2);
  const flightNumber = flightIata.slice(2);

  const url = `https://api.aviationstack.com/v1/flights?access_key=${apiKey}&airline_iata=${airlineIata}&flight_number=${flightNumber}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(url, { 
      signal: controller.signal,
      next: { revalidate: 600 } 
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`AviationStack API error: ${response.statusText}`, errorBody);
      return null;
    }
    const data = await response.json();

    if (data.error || !data.data || data.data.length === 0) {
      if(data.error) console.error("AviationStack API returned an error:", data.error);
      return null;
    }

    const flightData = data.data[0];

    // Added a check to ensure flightData is not null before proceeding
    if (!flightData) {
      console.log("No flight data found for the given IATA.", flightIata);
      return null;
    }

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
        baggage: flightData.arrival.baggage,
      },
      flight_status: flightData.flight_status || 'scheduled',
      lastUpdated: new Date().toISOString(),
    };

    return normalized;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error("AviationStack API request timed out.");
    } else {
      console.error("Failed to fetch from AviationStack:", error);
    }
    return null;
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

    // Create a temporary mock room object.
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
