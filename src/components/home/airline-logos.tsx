
import { useTranslation } from '@/hooks/use-translation';

const AirAlgerieLogo = () => (
  <div className="flex flex-col items-center gap-2">
    <svg role="img" viewBox="0 0 24 24" className="h-10 w-10 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <title>Air Algérie</title>
      <path d="M12 1.5c-2.4 2.4-2.4 6.3 0 8.7s6.3 2.4 8.7 0" />
      <path d="M3.3 12.7c2.4-2.4 6.3-2.4 8.7 0s2.4 6.3 0 8.7" />
    </svg>
    <span className="text-sm font-medium text-muted-foreground">Air Algérie</span>
  </div>
);

const TunisairLogo = () => (
  <div className="flex flex-col items-center gap-2">
    <svg role="img" viewBox="0 0 24 24" className="h-10 w-10 text-red-600" fill="currentColor">
      <title>Tunisair</title>
      <path d="M16.273 4.28a1 1 0 0 0-1.291.31L7.5 14.52V7.75a1 1 0 0 0-2 0v8.5a1 1 0 0 0 1 1h8.5a1 1 0 0 0 0-2H7.93l7.07-9.92a1 1 0 0 0-.727-1.55z" />
    </svg>
    <span className="text-sm font-medium text-muted-foreground">Tunisair</span>
  </div>
);

const RoyalAirMarocLogo = () => (
  <div className="flex flex-col items-center gap-2">
    <svg role="img" viewBox="0 0 24 24" className="h-10 w-10 text-green-600 fill-red-600" stroke="currentColor" strokeWidth="1.5">
      <title>Royal Air Maroc</title>
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
    <span className="text-sm font-medium text-muted-foreground">Royal Air Maroc</span>
  </div>
);


export function AirlineLogos() {
  const { t } = useTranslation();
  return (
    <section className="mt-16 text-center">
      <h2 className="text-2xl font-semibold tracking-tight mb-6">
        {t('home.supportedAirlines')}
      </h2>
      <div className="flex justify-center items-center gap-12 md:gap-16">
        <RoyalAirMarocLogo />
        <TunisairLogo />
        <AirAlgerieLogo />
      </div>
    </section>
  );
}
