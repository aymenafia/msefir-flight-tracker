"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

export function RefreshButton() {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const handleRefresh = () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    toast({
        title: "Refreshing flight status...",
        description: "Please wait a moment.",
    });
    router.refresh();
    
    // The refresh is handled by Next.js, we just manage the button's state
    setTimeout(() => {
        setIsRefreshing(false);
    }, 5000); // Disable button for 5 seconds to prevent spam
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`w-5 h-5 text-muted-foreground ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Refresh status</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
