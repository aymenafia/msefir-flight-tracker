import { generateHelpfulRoomStarter } from "@/ai/flows/helpful-room-starter";
import type { Flight, FlightRoom, RoomMessage } from "./types";
import { add, sub, formatISO, isBefore } from "date-fns";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { initializeFirebase } from "@/firebase";

// Initialize Firebase
const { firestore } = initializeFirebase();
const flightsCollection = "flights";

let mockMessages: RoomMessage[] = []; // We will fetch messages from Firestore

async function fetchFlightFromAPI(flightIata: string) {
  const airlineIata = flightIata.slice(0, 2);
  const flightNumber = flightIata.slice(2);

  const url = `http://api.aviationstack.com/v1/flights?access_key=${process.env.AVIATIONSTACK_API_KEY}&airline_iata=${airlineIata}&flight_number=${flightNumber}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`AviationStack API error: ${response.statusText}`);
    }
    const data = await response.json();
    if (!data.data || data.data.length === 0) {
      return null;
    }
    const flightData = data.data[0];

    // Normalize the response
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

  const flightDocRef = doc(firestore, flightsCollection, upperCaseFlightNumber);

  try {
    const flightDoc = await getDoc(flightDocRef);

    if (flightDoc.exists()) {
      const cachedFlight = flightDoc.data() as Flight;
      const cacheTime = parseISO(cachedFlight.lastUpdated);
      const cacheExpiry = add(cacheTime, { minutes: 15 });

      if (isBefore(now, cacheExpiry)) {
        console.log(`Returning cached data for ${upperCaseFlightNumber}`);
        // For now, we will continue with mock messages
        const room = await getOrCreateRoom(upperCaseFlightNumber);
        return { flight: cachedFlight, room };
      }
    }

    console.log(`Fetching fresh data for ${upperCaseFlightNumber}`);
    const flight = await fetchFlightFromAPI(upperCaseFlightNumber);

    if (!flight) {
      return null;
    }

    await setDoc(flightDocRef, flight);

    const room = await getOrCreateRoom(upperCaseFlightNumber);

    return { flight, room };

  } catch (error) {
    console.error(`Error fetching flight ${upperCaseFlightNumber}:`, error);
    return null;
  }
};

const getOrCreateRoom = async (flightNumber: string): Promise<FlightRoom> => {
    // In a real app, this would check firestore for a room and its messages
    let flightMessages = mockMessages.filter(
        (m) => m.flightNumber === flightNumber
    );

    if (flightMessages.length === 0) {
        try {
            const starter = await generateHelpfulRoomStarter({ flightNumber });
            const aiMessage: RoomMessage = {
                id: 'ai-starter',
                flightNumber: flightNumber,
                type: 'info',
                text: starter.message,
                userId: 'msefir AI',
                createdAt: new Date().toISOString(),
                helpfulCount: 0,
            };
            flightMessages.push(aiMessage);
            mockMessages.push(aiMessage);
        } catch (error) {
            console.error("AI starter message generation failed:", error);
        }
    }

    return {
        flightNumber: flightNumber,
        status: "OPEN",
        activePassengers: Math.floor(Math.random() * (150 - 20 + 1)) + 20,
        messages: flightMessages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    };
}


export const addMessageToFlight = (flightNumber: string, message: Omit<RoomMessage, 'id' | 'flightNumber' | 'helpfulCount' | 'createdAt'>): RoomMessage => {
  const newMessage: RoomMessage = {
    ...message,
    id: `msg${Date.now()}`,
    flightNumber,
    createdAt: formatISO(new Date()),
    helpfulCount: 0,
  };
  mockMessages.unshift(newMessage);
  
  // In a real app, this would invalidate a cache, here we just add to the mock array
  
  return newMessage;
};

export const incrementHelpfulCount = (messageId: string): RoomMessage | undefined => {
  const message = mockMessages.find(m => m.id === messageId);
  if (message) {
    message.helpfulCount++;
  }
  return message;
}
