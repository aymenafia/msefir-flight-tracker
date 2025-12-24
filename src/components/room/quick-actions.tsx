
'use client';

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { PlaneTakeoff, Milestone, Clock, MessageSquareQuestion, MapPin } from "lucide-react";

type QuickAction = {
  label: string;
  text: string;
  icon: React.ElementType;
};

type QuickActionsProps = {
  onSelect: (text: string) => void;
};

export function QuickActions({ onSelect }: QuickActionsProps) {
  const { t } = useTranslation();

  const actions: QuickAction[] = [
    { label: t('quickActions.boarding'), text: t('quickActions.boardingText'), icon: PlaneTakeoff },
    { label: t('quickActions.gateChange'), text: t('quickActions.gateChangeText'), icon: Milestone },
    { label: t('quickActions.delay'), text: t('quickActions.delayText'), icon: Clock },
    { label: t('quickActions.checkIn'), text: t('quickActions.checkInText'), icon: MessageSquareQuestion },
    { label: t('quickActions.atAirport'), text: t('quickActions.atAirportText'), icon: MapPin },
  ];

  return (
    <div className="mt-6">
       <p className="text-sm text-center text-muted-foreground mb-3">{t('quickActions.title')}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant="outline"
            className="flex-col h-auto py-3 px-2 text-center"
            onClick={() => onSelect(action.text)}
          >
            <action.icon className="w-5 h-5 mb-1.5 text-primary" />
            <span className="text-xs font-normal leading-tight">{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
