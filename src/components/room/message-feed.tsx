
'use client';
import type { RoomMessage } from '@/lib/types';
import { MessageCard } from './message-card';
import { Info, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

type MessageFeedProps = {
  messages: RoomMessage[];
};

export function MessageFeed({ messages }: MessageFeedProps) {

  return (
    <div>
      {messages.length === 0 ? (
        <div className="text-center py-10 border border-dashed rounded-lg">
          <Info className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-muted-foreground">
            No updates yet. Be the first to post!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map(message => (
            <MessageCard key={message.id} message={message} />
          ))}
        </div>
      )}
    </div>
  );
}
