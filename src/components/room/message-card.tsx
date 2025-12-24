
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
  MessageSquareQuote,
  Megaphone,
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
  system: Sparkles, // Fallback for system
};

export function MessageCard({ message }: MessageCardProps) {
  const { t } = useTranslation();
  const isSystemMessage = message.userId === "system";

  let IconComponent: Icon;
  let displayName = message.userDisplayName;

  if (isSystemMessage) {
    switch (message.type) {
      case 'system':
        IconComponent = Megaphone;
        break;
      default:
        IconComponent = Sparkles;
    }
    displayName = "msefir assistant";
  } else {
    IconComponent = messageTypeIcons[message.type] || Info;
  }

  const renderTimestamp = () => {
    if (!message.createdAt) {
      return t('room.pending');
    }
    try {
      // Handle both Firestore Timestamps and ISO strings
      const date = typeof message.createdAt === 'string' 
        ? new Date(message.createdAt)
        // @ts-ignore
        : message.createdAt.toDate();

      if (isNaN(date.getTime())) {
        return t('room.justNow');
      }
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return t('room.justNow');
    }
  };

  if (isSystemMessage) {
    return (
      <div className="flex items-start gap-3 text-sm text-muted-foreground my-4">
        <IconComponent className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary/70" />
        <p className="whitespace-pre-line">{message.text}</p>
      </div>
    );
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between p-4 gap-4">
        <div className="flex items-start gap-3">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src={message.userPhotoURL || undefined} />
            <AvatarFallback>
              <User className="w-5 h-5" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-primary">{displayName}</span>
            <p className="text-foreground pt-2">{message.text}</p>
          </div>
        </div>
        <time className="text-xs text-muted-foreground flex-shrink-0">
          {renderTimestamp()}
        </time>
      </CardHeader>
      
      <CardFooter className="p-4 pt-0 flex justify-end gap-2">
          <HelpfulButton message={message} />
          <UnhelpfulButton message={message} />
      </CardFooter>
    </Card>
  );
}
