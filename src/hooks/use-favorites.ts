"use client";

import { useState, useEffect, useCallback } from "react";

const FAVORITES_KEY = "msefir-favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedFavorites = window.localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Failed to load favorites from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  const saveFavorites = (items: string[]) => {
    try {
      setFavorites(items);
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save favorites to localStorage", error);
    }
  };

  const addFavorite = useCallback((flightNumber: string) => {
    const upperCaseFlightNumber = flightNumber.toUpperCase();
    if (favorites.includes(upperCaseFlightNumber)) return;
    const newFavorites = [...favorites, upperCaseFlightNumber];
    saveFavorites(newFavorites);
  }, [favorites]);

  const removeFavorite = useCallback((flightNumber: string) => {
    const upperCaseFlightNumber = flightNumber.toUpperCase();
    const newFavorites = favorites.filter((fav) => fav !== upperCaseFlightNumber);
    saveFavorites(newFavorites);
  }, [favorites]);

  const isFavorite = useCallback((flightNumber: string) => {
    const upperCaseFlightNumber = flightNumber.toUpperCase();
    return favorites.includes(upperCaseFlightNumber);
  }, [favorites]);

  return { favorites, addFavorite, removeFavorite, isFavorite, isLoaded };
};
