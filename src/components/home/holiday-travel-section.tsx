'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { holidayTraffic, diasporaHeat, holidayCards } from '@/data/msefirHolidayData';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/use-translation';

type Country = 'tunisia' | 'algeria' | 'morocco';

const getProgressColor = (fullness: number) => {
  if (fullness >= 90) return 'bg-destructive';
  if (fullness >= 80) return 'bg-warning';
  return 'bg-secondary';
};

const RouteCard = ({ route }: { route: { from: string; to: string; airline: string; fullness: number; trend: string } }) => (
  <Card className="shadow-md">
    <CardContent className="p-4">
      <div className="flex justify-between items-center mb-2">
        <p className="font-bold text-primary">{route.from} &rarr; {route.to}</p>
        <p className="text-sm font-mono text-muted-foreground">{route.airline}</p>
      </div>
      <div className="flex items-center gap-4">
        <Progress value={route.fullness} className="h-3 w-full" indicatorClassName={getProgressColor(route.fullness)} />
        <span className="font-semibold text-lg text-primary">{route.fullness}%</span>
        <span className="text-xl">{route.trend}</span>
      </div>
    </CardContent>
  </Card>
);

const HighlightCard = ({ card, onCtaClick }: { card: { titleKey: string; summaryKey: string; flightNumber: string }, onCtaClick: (flightNumber: string) => void }) => {
  const { t } = useTranslation();
  return (
    <Card className="bg-primary text-primary-foreground shadow-xl border-2 border-accent">
      <CardHeader>
        <CardTitle>{t(card.titleKey)}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{t(card.summaryKey)}</p>
        <Button variant="secondary" className="w-full" onClick={() => onCtaClick(card.flightNumber)}>
          {t('holiday.cta')}
        </Button>
      </CardContent>
    </Card>
  );
};

const DiasporaHeat = () => {
    const { t } = useTranslation();
    return (
        <Card className="mt-8">
            <CardHeader>
            <CardTitle className="text-center text-xl">{t('holiday.diasporaHeatTitle')}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row justify-around gap-4">
            {diasporaHeat.map(item => (
                <div key={item.country} className="text-center">
                <p className="font-bold text-2xl text-primary">{t(item.countryKey)}</p>
                <div className="flex items-center justify-center gap-2 mt-1">
                    <Progress value={item.heatValue} className="h-2 w-24" indicatorClassName={getProgressColor(item.heatValue)} />
                    <span className="text-muted-foreground font-semibold">{item.heatValue}/100</span>
                </div>
                </div>
            ))}
            </CardContent>
        </Card>
    );
};

export function HolidayTravelSection({ onFlightSelect }: { onFlightSelect: (flightNumber: string) => void }) {
  const [activeTab, setActiveTab] = useState<Country>('tunisia');
  const router = useRouter();
  const { t } = useTranslation();

  const handleCtaClick = (flightNumber: string) => {
    onFlightSelect(flightNumber);
    const searchInput = document.getElementById('flight-search-input');
    if (searchInput) {
      searchInput.focus();
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  
  const highlightCardData = holidayCards.find(c => c.country === activeTab);

  return (
    <section className="my-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-primary">{t('holiday.header')}</h2>
        <p className="mt-2 text-lg text-muted-foreground">{t('holiday.subheader')}</p>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as Country)} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tunisia" className="text-lg">{t('holiday.countryTunisia')}</TabsTrigger>
          <TabsTrigger value="algeria" className="text-lg">{t('holiday.countryAlgeria')}</TabsTrigger>
          <TabsTrigger value="morocco" className="text-lg">{t('holiday.countryMorocco')}</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    {holidayTraffic[activeTab].map((route, index) => (
                        <RouteCard key={index} route={route} />
                    ))}
                </div>
                <div className="space-y-4">
                    {highlightCardData && <HighlightCard card={highlightCardData} onCtaClick={handleCtaClick} />}
                </div>
            </div>
        </div>
      </Tabs>
      
      <DiasporaHeat />

      <p className="text-center text-xs text-muted-foreground mt-8">{t('holiday.disclaimer')}</p>
    </section>
  );
}
