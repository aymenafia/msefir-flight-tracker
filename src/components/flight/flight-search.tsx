
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export function FlightSearch() {
  const [flightNumber, setFlightNumber] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { t } = useTranslation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSearch triggered");
    setError("");

    console.log("Raw flight number input:", flightNumber);
    const trimmedFlightNumber = flightNumber.trim().toUpperCase();
    console.log("Trimmed and uppercased flight number:", trimmedFlightNumber);
    
    const pattern = /^[A-Z]{2}\d{1,4}$/;
    const validationInput = trimmedFlightNumber.replace(/\s+/g, '');
    console.log("String used for validation:", validationInput);

    if (!pattern.test(validationInput)) {
      console.error("Validation failed for:", validationInput);
      setError(t('flight.searchError'));
      return;
    }

    const sanitizedFlightNumber = validationInput;
    console.log("Validation passed. Sanitized flight number:", sanitizedFlightNumber);
    console.log(`Navigating to /flight/${sanitizedFlightNumber}`);
    router.push(`/flight/${sanitizedFlightNumber}`);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>{t('flight.searchTitle')}</CardTitle>
        <CardDescription>{t('flight.searchDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          <Input
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            placeholder={t('flight.searchPlaceholder')}
            className="text-lg h-12"
            aria-label={t('flight.searchTitle')}
          />
          {error && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" size="lg" className="w-full text-lg">
            {t('flight.searchButton')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
