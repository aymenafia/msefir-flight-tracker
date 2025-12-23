
export type FlightStatus = "scheduled" | "active" | "landed" | "cancelled" | "delayed";

export type Flight = {
    airline: {
        name: string;
        iata: string;
        icao: string;
    };
    flight: {
        number: string;
        iata: string;
        icao: string;
    };
    departure: {
        airport: string;
        iata: string;
        scheduled: string;
        estimated: string;
        actual: string | null;
        terminal: string | null;
        gate: string | null;
    };
    arrival: {
        airport: string;
        iata: string;
        scheduled: string;
        estimated: string;
        actual: string | null;
        terminal: string | null;
        gate: string | null;
    };
    flight_status: FlightStatus;
    lastUpdated: string;
};

export type MessageType = "boarding" | "gate" | "delay" | "info" | "question";

export type RoomMessage = {
  id: string;
  flightId: string;
  type: MessageType;
  text: string;
  userId: string;
  userDisplayName: string;
  userPhotoURL: string | null;
  createdAt: string;
  helpfulCount: number;
  unhelpfulCount: number;
};

export type FlightRoom = {
  flightNumber: string;
  status: "OPEN" | "CLOSED";
  activePassengers: number;
  messages: RoomMessage[];
};
