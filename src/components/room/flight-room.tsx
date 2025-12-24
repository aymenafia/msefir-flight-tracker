
'use client';
import { useMemo, useState } from 'react';
import { useCollection } from '@/firebase/firestore/use-collection';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import type { FlightRoom as FlightRoomType } from "@/lib/types";
import { MessageFeed } from "./message-feed";
import { MessagePostForm } from "./message-post-form";
import { Users, Eye } from "lucide-react";
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from '@/hooks/use-translation';
import { QuickActions } from './quick-actions';

type FlightRoomProps = {
  room: FlightRoomType;
  flightId: string;
  searchCount: number;
};

export function FlightRoom({ room, flightId, searchCount }: FlightRoomProps) {
  const firestore = useFirestore();
  const { t } = useTranslation();
  const [messageText, setMessageText] = useState('');

  const messagesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'rooms', flightId, 'messages'),
      orderBy('createdAt', 'desc')
    );
  }, [firestore, flightId]);

  const { data: messages, isLoading } = useCollection(messagesQuery);

  const allMessages = useMemo(() => {
    const combined = [...(room.messages || []), ...(messages || [])];
    // Sort by createdAt, handling both string and Firestore Timestamp
    combined.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
    });
    // Deduplicate based on a unique property, like a combination of text and timestamp
    const uniqueMessages = Array.from(new Map(combined.map(m => [`${m.text}-${m.createdAt}`, m])).values());
    return uniqueMessages;
  }, [room.messages, messages]);


  const roomStatus = room.status;

  if (isLoading) {
    return <Skeleton className="h-64 w-full" />
  }

  return (
    <section>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-3">
        <h2 className="text-2xl font-semibold tracking-tight">{t('room.title')}</h2>
        <div className="flex items-center gap-4">
           {searchCount > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Eye className="w-4 h-4" />
              <span>{t('room.searchCount', { count: searchCount })}</span>
            </div>
          )}
          <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
              roomStatus === 'OPEN' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
          }`}>
            {roomStatus === 'OPEN' ? t('room.statusOpen') : t('room.statusClosed')}
          </span>
        </div>
      </div>
      
      {roomStatus === 'OPEN' ? (
        <div className="space-y-6">
          <MessagePostForm flightId={flightId} messageText={messageText} setMessageText={setMessageText} />
          <MessageFeed messages={allMessages} />
          <QuickActions onSelect={setMessageText} />
        </div>
      ) : (
        <div className="text-center py-10 border border-dashed rounded-lg">
            <p className="text-muted-foreground">{t('room.roomClosed')}</p>
        </div>
      )}
    </section>
  );
}
