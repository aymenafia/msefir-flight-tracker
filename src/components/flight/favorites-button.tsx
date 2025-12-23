
"use client";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslation } from "@/hooks/use-translation";

type FavoritesButtonProps = {
  flightNumber: string;
};

export function FavoritesButton({ flightNumber }: FavoritesButtonProps) {
  const { isFavorite, addFavorite, removeFavorite, isLoaded } = useFavorites();
  const isFav = isFavorite(flightNumber);
  const { t } = useTranslation();

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFav) {
      removeFavorite(flightNumber);
    } else {
      addFavorite(flightNumber);
    }
  };

  if (!isLoaded) {
    return <Button variant="ghost" size="icon" className="text-muted-foreground" disabled><Star className="w-5 h-5" /></Button>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={toggleFavorite} aria-pressed={isFav}>
            <Star
              className={cn("w-5 h-5 text-muted-foreground transition-colors", isFav && "fill-yellow-400 text-yellow-500")}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isFav ? t('favorites.remove') : t('favorites.add')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
