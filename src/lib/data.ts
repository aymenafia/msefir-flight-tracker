
import { generateHelpfulRoomStarter } from "@/ai/flows/helpful-room-starter";
import type { Flight, FlightRoom, RoomMessage } from "./types";
import { add, formatISO, isBefore, parseISO } from "date-fns";
import { firestoreAdmin } from "./firebase-admin";

const flightsCollection = "flights";
const roomsCollection = "rooms";

async function fetchFlightFromAPI(flightIata: string) {
  const airlineIata = flightIata.slice(0, 2);
  const flightNumber = flightIata.slice(2);

  const url = `http://api.aviationstack.com/v1/flights?access_key=${process.env.AVIATIONSTACK_API_KEY}&airline_iata=${airlineIata}&flight_number=${flightNumber}`;

  try {
    const response = await fetch(url, { cache: 'no-store' });
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
  const now = new Date();

  const flightDocRef = firestoreAdmin.collection(flightsCollection).doc(upperCaseFlightNumber);

  try {
    const flightDoc = await flightDocRef.get();

    if (flightDoc.exists) {
      const cachedFlight = flightDoc.data() as Flight;
      if (cachedFlight.lastUpdated) {
          const cacheTime = parseISO(cachedFlight.lastUpdated);
          const cacheExpiry = add(cacheTime, { minutes: 15 });
          if (isBefore(now, cacheExpiry)) {
            console.log(`Returning cached data for ${upperCaseFlightNumber}`);
            const room = await getOrCreateRoom(upperCaseFlightNumber);
            return { flight: cachedFlight, room };
          }
      }
    }

    console.log(`Fetching fresh data for ${upperCaseFlightNumber}`);
    const flight = await fetchFlightFromAPI(upperCaseFlightNumber);

    if (!flight) {
      return null;
    }

    await flightDocRef.set(flight);

    const room = await getOrCreateRoom(upperCaseFlightNumber);

    return { flight, room };

  } catch (error: any) {
    console.error(`Error fetching flight ${upperCaseFlightNumber}: ${error.message || 'Unknown error'}`);
    // In case of API/DB error, don't crash the page.
    // Consider returning a specific error state to the UI.
    return null;
  }
};

const getOrCreateRoom = async (flightNumber: string): Promise<FlightRoom> => {
    const roomDocRef = firestoreAdmin.collection(roomsCollection).doc(flightNumber);
    const messagesColRef = roomDocRef.collection('messages');

    const messagesSnapshot = await messagesColRef.orderBy('createdAt', 'desc').get();
    let flightMessages: RoomMessage[] = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as RoomMessage));

    if (flightMessages.length === 0) {
        try {
            const starter = await generateHelpfulRoomStarter({ flightNumber });
            const aiMessage: Omit<RoomMessage, 'id'> = {
                flightNumber: flightNumber,
                type: 'info',
                text: starter.message,
                userId: 'msefir AI',
                createdAt: formatISO(new Date()),
                helpfulCount: 0,
            };
            const addedDoc = await messagesColRef.add(aiMessage);
            flightMessages.push({ id: addedDoc.id, ...aiMessage });
        } catch (error) {
            console.error("AI starter message generation failed:", error);
            // Don't block room creation if AI fails
        }
    }

    // In a real app, passenger count would come from a real-time source.
    const activePassengers = Math.floor(Math.random() * (150 - 20 + 1)) + 20;

    return {
        flightNumber: flightNumber,
        status: "OPEN", // Logic for OPEN/CLOSED to be implemented
        activePassengers: activePassengers,
        messages: flightMessages,
    };
}
