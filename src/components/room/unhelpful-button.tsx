
"use client";

import { useState, useTransition } from "react";
import type { RoomMessage } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ThumbsDown } from "lucide-react";
import { incrementUnhelpfulCount } from "@/lib/firestore-mutations";
import { cn } from "@/lib/utils";
import { useFirestore } from "@/firebase";

type UnhelpfulButtonProps = {
  message: RoomMessage;
};

export function UnhelpfulButton({ message }: UnhelpfulButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [wasClicked, setWasClicked] = useState(false);
  const firestore = useFirestore();

  const handleClick = () => {
    if (wasClicked || isPending || !firestore) return;
    setWasClicked(true);
    startTransition(() => {
      incrementUnhelpfulCount(firestore, message.flightId, message.id);
    });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      disabled={wasClicked || isPending}
      className={cn("text-muted-foreground", wasClicked && "text-destructive-foreground bg-destructive/20")}
    >
      <ThumbsDown className="w-4 h-4 mr-2" />
      <span className="ml-2 bg-muted px-2 py-0.5 rounded-full text-xs">
        {message.unhelpfulCount + (wasClicked ? 1 : 0)}
      </span>
    </Button>
  );
}
