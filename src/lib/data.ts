
import type { Flight, FlightRoom, RoomMessage } from "./types";
import { format } from "date-fns";

async function fetchFlightFromAPI(flightIata: string): Promise<Flight | null> {
  const apiKey = process.env.AVIATIONSTACK_API_KEY;

  if (!apiKey || apiKey === "YOUR_KEY_HERE") {
    console.error("AviationStack API key is not configured in environment variables.");
    return null;
  }
  
  const protocol = "http";
  const airlineIata = flightIata.slice(0, 2);
  const flightNumber = flightIata.slice(2);
  const url = `${protocol}://api.aviationstack.com/v1/flights?access_key=${apiKey}&airline_iata=${airlineIata}&flight_number=${flightNumber}`;
  
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

    const flightData = data.data.find((f: any) => f.flight_status !== 'cancelled' && f.flight_status !== 'landed');
    
    if (!flightData) {
      console.log("No active or scheduled flight data found for the given IATA.", flightIata);
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
      flight_status: flightData.flight_status,
      lastUpdated: new Date().toISOString(),
    };

    return normalized;
  } catch (error) {
    if (error instanceof Error) {
        if (error.name === 'AbortError') {
            console.error("AviationStack API request timed out.");
        } else {
            console.error("Failed to fetch from AviationStack:", error.message);
        }
    } else {
        console.error("An unknown error occurred while fetching from AviationStack:", error);
    }
    return null;
  }
}

function createSystemMessages(flight: Flight): RoomMessage[] {
    const depTime = format(new Date(flight.departure.scheduled), 'HH:mm');
    const arrTime = format(new Date(flight.arrival.scheduled), 'HH:mm');

    const statusMap: Record<string, string> = {
        scheduled: "Scheduled",
        active: "Active",
        landed: "Landed",
        delayed: "Delayed",
        cancelled: "Cancelled"
    };
    const flightStatus = statusMap[flight.flight_status] || "On Time";

    const now = new Date().toISOString();

    return [
        {
            id: `sys_welcome_${flight.flight.iata}`,
            flightId: flight.flight.iata,
            type: 'system',
            text: "✈️ Welcome aboard! This room is open until 3 hours after arrival. Passengers can share updates to help each other.",
            userId: 'system',
            userDisplayName: 'msefir assistant',
            userPhotoURL: null,
            createdAt: now,
            helpfulCount: 0,
            unhelpfulCount: 0,
        },
        {
            id: `sys_status_${flight.flight.iata}`,
            flightId: flight.flight.iata,
            type: 'system',
            text: `📡 Current status: ${flightStatus} • Scheduled ${depTime} → ${arrTime}`,
            userId: 'system',
            userDisplayName: 'msefir assistant',
            userPhotoURL: null,
            createdAt: now,
            helpfulCount: 0,
            unhelpfulCount: 0,
        },
        {
            id: `sys_instructions_${flight.flight.iata}`,
            flightId: flight.flight.iata,
            type: 'system',
            text: `💬 Useful updates to share:\n• Boarding started\n• Gate changed (e.g., B12, C3)\n• Delay reason (weather/technical)\n• Check-in counters (e.g., 7, 14)`,
            userId: 'system',
            userDisplayName: 'msefir assistant',
            userPhotoURL: null,
            createdAt: now,
            helpfulCount: 0,
            unhelpfulCount: 0,
        },
        {
            id: `sys_cta_${flight.flight.iata}`,
            flightId: flight.flight.iata,
            type: 'system',
            text: "👇 Start by choosing a quick update below or ask a question.",
            userId: 'system',
            userDisplayName: 'msefir assistant',
            userPhotoURL: null,
            createdAt: now,
            helpfulCount: 0,
            unhelpfulCount: 0,
        }
    ];
}


export const getFlightByNumber = async (
  flightNumber: string
): Promise<{ flight: Flight; room: FlightRoom; searchCount: number } | null> => {
  const upperCaseFlightNumber = flightNumber.toUpperCase();

  try {
    const flight = await fetchFlightFromAPI(upperCaseFlightNumber);

    if (!flight) {
      return null;
    }

    // This is a placeholder for real backend logic.
    // In a real app, you would fetch/create the room and its messages
    // from Firestore, and also fetch the search count.
    const searchCount = Math.floor(Math.random() * 50) + 1; // Mock search count
    
    const systemMessages = createSystemMessages(flight);

    const room: FlightRoom = {
      flightNumber: upperCaseFlightNumber,
      status: "OPEN",
      activePassengers: 0, // This would come from a real-time presence system
      messages: systemMessages,
    };

    return { flight, room, searchCount };

  } catch (error: any) {
    console.error(`Error fetching flight ${upperCaseFlightNumber}: ${error.message || 'Unknown error'}`);
    return null;
  }
};
