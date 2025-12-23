"use client";

import { useState, useTransition } from "react";
import type { RoomMessage } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { incrementHelpfulCount } from "@/lib/firestore-mutations";
import { cn } from "@/lib/utils";
import { useFirestore } from "@/firebase";

type HelpfulButtonProps = {
  message: RoomMessage;
};

export function HelpfulButton({ message }: HelpfulButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [wasClicked, setWasClicked] = useState(false);
  const firestore = useFirestore();

  const handleClick = () => {
    if (wasClicked || isPending || !firestore) return;
    setWasClicked(true);
    startTransition(() => {
      incrementHelpfulCount(firestore, message.flightId, message.id);
    });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      disabled={wasClicked || isPending}
      className={cn("text-muted-foreground", wasClicked && "text-accent-foreground bg-accent/20")}
    >
      <ThumbsUp className="w-4 h-4 mr-2" />
      Helpful
      <span className="ml-2 bg-muted px-2 py-0.5 rounded-full text-xs">
        {message.helpfulCount + (wasClicked ? 1 : 0)}
      </span>
    </Button>
  );
}
