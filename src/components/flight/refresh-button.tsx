"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { differenceInMinutes } from "date-fns";

type RefreshButtonProps = {
  lastUpdated: string;
};

export function RefreshButton({ lastUpdated }: RefreshButtonProps) {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const canRefresh = useMemo(() => {
    const lastUpdatedDate = new Date(lastUpdated);
    const minutesSinceUpdate = differenceInMinutes(new Date(), lastUpdatedDate);
    return minutesSinceUpdate >= 10;
  }, [lastUpdated]);

  const handleRefresh = () => {
    if (isRefreshing || !canRefresh) {
        if (!canRefresh) {
            toast({
                title: "Already up-to-date",
                description: "Flight data was recently updated. Please try again in a few minutes.",
            });
        }
        return;
    }

    setIsRefreshing(true);
    toast({
        title: "Refreshing flight status...",
        description: "Please wait a moment.",
    });
    router.refresh();
    
    // The refresh is handled by Next.js, we just manage the button's state
    // We'll re-enable it after a timeout in case the refresh fails,
    // but the main canRefresh logic will handle the 10-minute rule on next render.
    setTimeout(() => {
        setIsRefreshing(false);
    }, 5000);
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
