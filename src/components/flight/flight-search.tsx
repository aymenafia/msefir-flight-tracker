"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function FlightSearch() {
  const [flightNumber, setFlightNumber] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedFlightNumber = flightNumber.trim().toUpperCase();
    
    // Basic validation: 2 letters for airline, 1-4 digits for number
    const pattern = /^[A-Z]{2}\d{1,4}$/;
    if (!pattern.test(trimmedFlightNumber.replace(/\s+/g, ''))) {
      setError("Invalid flight number. Use format like TU723 or AT 550.");
      return;
    }

    const sanitizedFlightNumber = trimmedFlightNumber.replace(/\s+/g, '');
    router.push(`/flight/${sanitizedFlightNumber}`);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Flight Number</CardTitle>
        <CardDescription>e.g., TU723, AH1002, AT550</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          <Input
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            placeholder="Enter flight number"
            className="text-lg h-12"
            aria-label="Flight Number"
          />
          {error && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" size="lg" className="w-full text-lg">
            Search Flight
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
