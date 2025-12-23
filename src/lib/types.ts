export type FlightStatus = "On Time" | "Delayed" | "Cancelled" | "Landed" | "Scheduled";

export type Airport = {
  iata: string;
  name: string;
  city: string;
  country: string;
};

export type Flight = {
  flightNumber: string;
  airline: string;
  departure: Airport;
  arrival: Airport;
  scheduledDeparture: string;
  estimatedDeparture: string;
  scheduledArrival: string;
  estimatedArrival: string;
  status: FlightStatus;
  lastUpdated: string;
};

export type MessageType = "boarding" | "gate" | "delay" | "info" | "question";

export type RoomMessage = {
  id: string;
  flightNumber: string;
  type: MessageType;
  text: string;
  userId: string;
  createdAt: string;
  helpfulCount: number;
};

export type FlightRoom = {
  flightNumber: string;
  status: "OPEN" | "CLOSED";
  activePassengers: number;
  messages: RoomMessage[];
};
