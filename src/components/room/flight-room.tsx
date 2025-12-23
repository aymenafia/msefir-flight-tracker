'use client';
import { useMemo } from 'react';
import { useCollection } from '@/firebase/firestore/use-collection';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import type { FlightRoom as FlightRoomType } from "@/lib/types";
import { MessageFeed } from "./message-feed";
import { MessagePostForm } from "./message-post-form";
import { Users } from "lucide-react";
import { Skeleton } from '@/components/ui/skeleton';

type FlightRoomProps = {
  room: FlightRoomType;
  flightId: string;
};

export function FlightRoom({ room, flightId }: FlightRoomProps) {
  const firestore = useFirestore();

  const messagesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'rooms', flightId, 'messages'),
      orderBy('createdAt', 'desc')
    );
  }, [firestore, flightId]);

  const { data: messages, isLoading } = useCollection(messagesQuery);

  const roomStatus = room.status;

  if (isLoading) {
    return <Skeleton className="h-64 w-full" />
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold tracking-tight">Flight Room</h2>
        <div className="flex items-center gap-4">
          {roomStatus === 'OPEN' && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                {/* Active passenger count could be a future feature */}
            </div>
          )}
          <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
              roomStatus === 'OPEN' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
          }`}>
            {roomStatus}
          </span>
        </div>
      </div>
      
      {roomStatus === 'OPEN' ? (
        <div className="space-y-6">
          <MessagePostForm flightId={flightId} />
          <MessageFeed messages={messages || []} />
        </div>
      ) : (
        <div className="text-center py-10 border border-dashed rounded-lg">
            <p className="text-muted-foreground">This flight room is closed.</p>
        </div>
      )}
    </section>
  );
}
