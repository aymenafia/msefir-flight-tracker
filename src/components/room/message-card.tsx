import type { RoomMessage } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  PlaneTakeoff,
  Milestone,
  Clock,
  Info,
  HelpCircle,
  ThumbsUp,
  Icon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { HelpfulButton } from "./helpful-button";

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
  const IconComponent = messageTypeIcons[message.type];
  const isAIMessage = message.userId === "msefir AI";

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <IconComponent className="w-5 h-5 text-primary" />
          <span className="font-semibold text-primary">{message.userId}</span>
        </div>
        <time className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
        </time>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <p className="text-foreground">{message.text}</p>
      </CardContent>
      {!isAIMessage && (
        <CardFooter className="p-4 pt-0 flex justify-end">
            <HelpfulButton message={message} />
        </CardFooter>
      )}
    </Card>
  );
}
