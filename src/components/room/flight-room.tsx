import type { FlightRoom as FlightRoomType } from "@/lib/types";
import { MessageFeed } from "./message-feed";
import { MessagePostForm } from "./message-post-form";
import { Users } from "lucide-react";

type FlightRoomProps = {
  room: FlightRoomType;
};

export function FlightRoom({ room }: FlightRoomProps) {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold tracking-tight">Flight Room</h2>
        <div className="flex items-center gap-4">
          {room.status === 'OPEN' && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{room.activePassengers} passengers</span>
            </div>
          )}
          <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
              room.status === 'OPEN' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
          }`}>
            {room.status}
          </span>
        </div>
      </div>
      
      {room.status === 'OPEN' ? (
        <div className="space-y-6">
          <MessagePostForm flightNumber={room.flightNumber} />
          <MessageFeed room={room} />
        </div>
      ) : (
        <div className="text-center py-10 border border-dashed rounded-lg">
            <p className="text-muted-foreground">This flight room is closed.</p>
        </div>
      )}
    </section>
  );
}
