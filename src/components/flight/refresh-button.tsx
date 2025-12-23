"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { differenceInMinutes, parseISO } from "date-fns";

type RefreshButtonProps = {
  lastUpdated: string;
};

export function RefreshButton({ lastUpdated }: RefreshButtonProps) {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const canRefresh = useMemo(() => {
    const lastUpdatedDate = parseISO(lastUpdated);
    const minutesSinceUpdate = differenceInMinutes(new Date(), lastUpdatedDate);
    return minutesSinceUpdate >= 10;
  }, [lastUpdated]);

  // If the page re-renders (e.g. after router.refresh()) and the button
  // was in a refreshing state, this ensures it resets visually.
  useEffect(() => {
    if (isRefreshing) {
      setIsRefreshing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastUpdated]);


  const handleRefresh = () => {
    if (isRefreshing) return;

    if (!canRefresh) {
        toast({
            title: "Already up-to-date",
            description: "Flight data was recently updated. You can refresh again in a few minutes.",
        });
        return;
    }

    setIsRefreshing(true);
    toast({
        title: "Refreshing flight status...",
        description: "Please wait a moment.",
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
          <p>{canRefresh ? "Refresh status" : "Status is up-to-date"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
