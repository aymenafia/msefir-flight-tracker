import type { RoomMessage } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  PlaneTakeoff,
  Milestone,
  Clock,
  Info,
  HelpCircle,
  Icon,
  Sparkles,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { HelpfulButton } from "./helpful-button";
import { cn } from "@/lib/utils";

type MessageCardProps = {
  message: RoomMessage;
};

const messageTypeIcons: { [key in RoomMessage["type"]]: Icon } = {
  boarding: PlaneTakeoff,
  gate: Milestone,
  delay: Clock,
  info: Info,
  question: HelpCircle,
};

export function MessageCard({ message }: MessageCardProps) {
  const isAIMessage = message.userId === "msefir AI";
  const IconComponent = isAIMessage ? Sparkles : messageTypeIcons[message.type];

  return (
    <Card className={cn(
      "shadow-sm",
      isAIMessage && "bg-primary/5 border-primary/20"
    )}>
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <IconComponent className={cn("w-5 h-5 text-primary", isAIMessage && "text-accent")} />
          <span className={cn("font-semibold text-primary", isAIMessage && "text-accent-foreground")}>{message.userId}</span>
        </div>
        <time className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
        </time>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <p className={cn("text-foreground", isAIMessage && "italic")}>{message.text}</p>
      </CardContent>
      {!isAIMessage && (
        <CardFooter className="p-4 pt-0 flex justify-end">
            <HelpfulButton message={message} />
        </CardFooter>
      )}
    </Card>
  );
}
