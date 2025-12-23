
'use client';
import type { RoomMessage } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  PlaneTakeoff,
  Milestone,
  Clock,
  Info,
  HelpCircle,
  Icon,
  Sparkles,
  User,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { HelpfulButton } from "./helpful-button";
import { UnhelpfulButton } from "./unhelpful-button";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";

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
  const { t } = useTranslation();
  const isAIMessage = message.userId === "msefir AI";
  const IconComponent = isAIMessage ? Sparkles : messageTypeIcons[message.type];

  const renderTimestamp = () => {
    if (!message.createdAt) {
      return t('room.pending');
    }
    try {
      const date = new Date(message.createdAt);
      if (isNaN(date.getTime())) {
        return t('room.justNow');
      }
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return t('room.justNow');
    }
  };

  const displayName = isAIMessage ? "msefir AI" : message.userDisplayName;

  return (
    <Card className={cn(
      "shadow-sm",
      isAIMessage && "bg-primary/5 border-primary/20"
    )}>
      <CardHeader className="flex flex-row items-start justify-between p-4 gap-4">
        <div className="flex items-start gap-3">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src={message.userPhotoURL || undefined} />
            <AvatarFallback>
              {isAIMessage ? <Sparkles className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className={cn("font-semibold text-primary", isAIMessage && "text-accent-foreground")}>{displayName}</span>
            </div>
            <p className={cn("text-foreground pt-2", isAIMessage && "italic")}>{message.text}</p>
          </div>
        </div>
        <time className="text-xs text-muted-foreground flex-shrink-0">
          {renderTimestamp()}
        </time>
      </CardHeader>
      
      {!isAIMessage && (
        <CardFooter className="p-4 pt-0 flex justify-end gap-2">
            <HelpfulButton message={message} />
            <UnhelpfulButton message={message} />
        </CardFooter>
      )}
    </Card>
  );
}
