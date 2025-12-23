import { generateHelpfulRoomStarter } from "@/ai/flows/helpful-room-starter";
import type { Flight, FlightRoom, RoomMessage } from "./types";
import { add, sub, formatISO } from "date-fns";

let mockMessages: RoomMessage[] = [
  {
    id: "msg1",
    flightNumber: "TU723",
    type: "gate",
    text: "Gate changed to B25. They just announced it.",
    userId: "Passenger #102",
    createdAt: sub(new Date(), { minutes: 45 }).toISOString(),
    helpfulCount: 5,
  },
  {
    id: "msg2",
    flightNumber: "TU723",
    type: "boarding",
    text: "Boarding has started for groups 1-3.",
    userId: "Passenger #23",
    createdAt: sub(new Date(), { minutes: 20 }).toISOString(),
    helpfulCount: 12,
  },
  {
    id: "msg3",
    flightNumber: "TU723",
    type: "question",
    text: "Is the flight full? Wondering about upgrade chances.",
    userId: "Passenger #88",
    createdAt: sub(new Date(), { minutes: 10 }).toISOString(),
    helpfulCount: 2,
  },
];

const mockFlights: Flight[] = [
  {
    flightNumber: "TU723",
    airline: "Tunisair",
    departure: {
      iata: "TUN",
      name: "Tunis-Carthage Airport",
      city: "Tunis",
      country: "Tunisia",
    },
    arrival: {
      iata: "ORY",
      name: "Paris-Orly Airport",
      city: "Paris",
      country: "France",
    },
    scheduledDeparture: add(new Date(), { hours: 2 }).toISOString(),
    estimatedDeparture: add(new Date(), { hours: 2, minutes: 15 }).toISOString(),
    scheduledArrival: add(new Date(), { hours: 4, minutes: 30 }).toISOString(),
    estimatedArrival: add(new Date(), { hours: 4, minutes: 45 }).toISOString(),
    status: "Delayed",
    lastUpdated: new Date().toISOString(),
  },
  {
    flightNumber: "AH1002",
    airline: "Air Algérie",
    departure: {
      iata: "ALG",
      name: "Houari Boumediene Airport",
      city: "Algiers",
      country: "Algeria",
    },
    arrival: {
      iata: "CDG",
      name: "Charles de Gaulle Airport",
      city: "Paris",
      country: "France",
    },
    scheduledDeparture: add(new Date(), { hours: 1 }).toISOString(),
    estimatedDeparture: add(new Date(), { hours: 1 }).toISOString(),
    scheduledArrival: add(new Date(), { hours: 3, minutes: 15 }).toISOString(),
    estimatedArrival: add(new Date(), { hours: 3, minutes: 15 }).toISOString(),
    status: "On Time",
    lastUpdated: new Date().toISOString(),
  },
  {
    flightNumber: "AT550",
    airline: "Royal Air Maroc",
    departure: {
      iata: "CMN",
      name: "Mohammed V International Airport",
      city: "Casablanca",
      country: "Morocco",
    },
    arrival: {
      iata: "JFK",
      name: "John F. Kennedy International Airport",
      city: "New York",
      country: "USA",
    },
    scheduledDeparture: sub(new Date(), { hours: 1 }).toISOString(),
    estimatedDeparture: sub(new Date(), { hours: 1 }).toISOString(),
    scheduledArrival: add(new Date(), { hours: 7 }).toISOString(),
    estimatedArrival: add(new Date(), { hours: 7 }).toISOString(),
    status: "Cancelled",
    lastUpdated: new Date().toISOString(),
  },
];

// Simulate a database/cache for flight data
const flightCache = new Map<string, { flight: Flight; room: FlightRoom; timestamp: number }>();

export const getFlightByNumber = async (
  flightNumber: string
): Promise<{ flight: Flight; room: FlightRoom } | null> => {
  const upperCaseFlightNumber = flightNumber.toUpperCase();
  const now = Date.now();

  // 1. Check cache
  if (flightCache.has(upperCaseFlightNumber)) {
    const cached = flightCache.get(upperCaseFlightNumber)!;
    // Cache is valid for 1 minute for demonstration purposes
    if (now - cached.timestamp < 60 * 1000) {
      console.log(`Returning cached data for ${upperCaseFlightNumber}`);
      return { flight: cached.flight, room: cached.room };
    }
  }
  
  console.log(`Fetching fresh data for ${upperCaseFlightNumber}`);
  // 2. Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const flight = mockFlights.find(
    (f) => f.flightNumber === upperCaseFlightNumber
  );

  if (!flight) {
    return null;
  }
  
  flight.lastUpdated = new Date().toISOString();

  let flightMessages = mockMessages.filter(
    (m) => m.flightNumber === upperCaseFlightNumber
  );

  // If no messages, use AI to generate a starter message
  if (flightMessages.length === 0) {
    try {
      const starter = await generateHelpfulRoomStarter({ flightNumber: upperCaseFlightNumber });
      const aiMessage: RoomMessage = {
        id: 'ai-starter',
        flightNumber: upperCaseFlightNumber,
        type: 'info',
        text: starter.message,
        userId: 'msefir AI',
        createdAt: new Date().toISOString(),
        helpfulCount: 0,
      };
      flightMessages.push(aiMessage);
      // Add to main mock messages so it persists for the session
      mockMessages.push(aiMessage);
    } catch (error) {
      console.error("AI starter message generation failed:", error);
    }
  }


  const room: FlightRoom = {
    flightNumber: upperCaseFlightNumber,
    status: flight.status === "Cancelled" ? "CLOSED" : "OPEN",
    activePassengers: Math.floor(Math.random() * (150 - 20 + 1)) + 20,
    messages: flightMessages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
  };

  // 3. Update cache
  flightCache.set(upperCaseFlightNumber, { flight, room, timestamp: now });

  return { flight, room };
};


export const addMessageToFlight = (flightNumber: string, message: Omit<RoomMessage, 'id' | 'flightNumber' | 'helpfulCount' | 'createdAt'>): RoomMessage => {
  const newMessage: RoomMessage = {
    ...message,
    id: `msg${Date.now()}`,
    flightNumber,
    createdAt: formatISO(new Date()),
    helpfulCount: 0,
  };
  mockMessages.unshift(newMessage);
  
  // Invalidate cache for this flight
  flightCache.delete(flightNumber);

  return newMessage;
};

export const incrementHelpfulCount = (messageId: string): RoomMessage | undefined => {
  const message = mockMessages.find(m => m.id === messageId);
  if (message) {
    message.helpfulCount++;
    // Invalidate cache for this flight
    flightCache.delete(message.flightNumber);
  }
  return message;
}
