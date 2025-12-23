
"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { differenceInMinutes, parseISO } from "date-fns";
import { useTranslation } from "@/hooks/use-translation";

type RefreshButtonProps = {
  lastUpdated: string;
};

export function RefreshButton({ lastUpdated }: RefreshButtonProps) {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const canRefresh = useMemo(() => {
    const lastUpdatedDate = parseISO(lastUpdated);
    const minutesSinceUpdate = differenceInMinutes(new Date(), lastUpdatedDate);
    return minutesSinceUpdate >= 10;
  }, [lastUpdated]);

  useEffect(() => {
    if (isRefreshing) {
      setIsRefreshing(false);
    }
  }, [lastUpdated, isRefreshing]);


  const handleRefresh = () => {
    if (isRefreshing) return;

    if (!canRefresh) {
        toast({
            title: t('flight.alreadyUpToDate'),
            description: t('flight.alreadyUpToDateDesc'),
        });
        return;
    }

    setIsRefreshing(true);
    toast({
        title: t('flight.refreshing'),
        description: t('flight.refreshingDesc'),
    });
    router.refresh();
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={isRefreshing || !canRefresh}>
            <RefreshCw className={`w-5 h-5 text-muted-foreground ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{canRefresh ? t('flight.refreshStatus') : t('flight.statusUpToDate')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
