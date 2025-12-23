"use client";

import { useState, useEffect } from "react";

const USER_ID_KEY = "msefir-userId";

function generateUserId() {
    const randomNumber = Math.floor(Math.random() * 1000);
    return `Passenger #${randomNumber.toString().padStart(3, '0')}`;
}

export const useStableUserId = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    try {
      let storedUserId = window.localStorage.getItem(USER_ID_KEY);
      if (!storedUserId) {
        storedUserId = generateUserId();
        window.localStorage.setItem(USER_ID_KEY, storedUserId);
      }
      setUserId(storedUserId);
    } catch (error) {
      console.error("Failed to access localStorage for user ID", error);
      // Fallback for environments where localStorage is not available
      setUserId(generateUserId());
    }
  }, []);

  return userId;
};
