"use client"
import type { FlightRoom } from "@/lib/types";
import { MessageCard } from "./message-card";
import { Info } from "lucide-react";
import { Button } from "../ui/button";
import { summarizeFlightUpdates } from "@/lib/actions";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Loader2 } from "lucide-react";

type MessageFeedProps = {
  room: FlightRoom;
};

export function MessageFeed({ room }: MessageFeedProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);

  const handleSummarize = async () => {
    setIsLoadingSummary(true);
    setSummary(null);
    setSummaryError(null);
    const result = await summarizeFlightUpdates(room.flightNumber, room.messages);
    if(result.summary) {
      setSummary(result.summary);
    } else {
      setSummaryError(result.error);
    }
    setIsLoadingSummary(false);
  }

  return (
    <div>
        <div className="flex justify-end mb-4">
          <Button variant="outline" size="sm" onClick={handleSummarize} disabled={isLoadingSummary || room.messages.length < 2}>
            {isLoadingSummary ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Summarize Updates
          </Button>
        </div>

        {summary && (
          <Alert className="mb-4 bg-primary/5">
            <Info className="h-4 w-4" />
            <AlertTitle>Updates Summary</AlertTitle>
            <AlertDescription>
              {summary}
            </AlertDescription>
          </Alert>
        )}
        {summaryError && (
          <Alert variant="destructive" className="mb-4">
            <Info className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {summaryError}
            </AlertDescription>
          </Alert>
        )}

      {room.messages.length === 0 ? (
        <div className="text-center py-10 border border-dashed rounded-lg">
          <Info className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-muted-foreground">No updates yet. Be the first to post!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {room.messages.map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
        </div>
      )}
    </div>
  );
}
