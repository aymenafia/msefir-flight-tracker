
'use client';
import { useTranslation } from '@/hooks/use-translation';

const AirAlgerieLogo = () => (
  <div className="flex flex-col items-center gap-2">
    <svg role="img" className="h-10 w-10 text-red-600" viewBox="0 0 200 200" fill="currentColor">
        <title>Air Algérie</title>
        <path d="M102.35 152.424L1.414 51.488.001 50.075l11.313-11.314 1.414 1.413L102.35 129.808l89.621-89.62-1.414-1.414-1.414-1.415 11.314-11.313 1.414 1.414L102.35 152.424z"></path>
        <path d="M102.35 102.351L12.73 12.73l-1.415-1.414L.001 0l11.314 11.314 1.414 1.414L102.35 102.35l88.208-88.208 1.414-1.414 1.414-1.414 11.314 11.314-1.414 1.414L102.35 102.35z"></path>
    </svg>
    <span className="text-sm font-medium text-muted-foreground">Air Algérie</span>
  </div>
);

const TunisairLogo = () => (
  <div className="flex flex-col items-center gap-2">
    <svg role="img" className="h-10 w-10 text-red-600" viewBox="0 0 1024 1024" fill="currentColor">
       <title>Tunisair</title>
       <path d="M410.2 353.4c-11.6 0-21 9.4-21 21s9.4 21 21 21c11.6 0 21-9.4 21-21s-9.4-21-21-21z m436.5 249.2c-15-25.8-36.8-45.2-61.8-59.5-22.6-12.8-46.8-21.8-72.3-26.6-25-4.7-50.8-7.1-77.1-7.1-39.1 0-77.3 6.8-113.8 20.1-30.8 11.2-59.3 28-84.8 49.7-30.5 25.8-55 58-71.8 95.2-12.4 27.6-21.2 57-26.2 87.8-5.1 31.4-7.7 63.5-7.7 96.1 0 11.6 9.4 21 21 21s21-9.4 21-21c0-29.3 2.4-58.1 7-85.7 4.6-28.1 12.5-54.3 23.7-79.1 15.3-34.1 37.5-63.1 65.2-86 23.3-19.3 49.5-33.8 77.9-43.2 33.6-11.2 68.3-16.9 103.8-16.9 23.8 0 47.1 2.2 69.8 6.5 23 4.3 44.9 11.7 65.3 21.8 22.4 11.2 42.1 26.6 58.4 45.9 17.5 20.4 31.2 44.7 39.9 71.8 8.6 26.8 12.9 55.4 12.9 85.1 0 11.6 9.4 21 21 21s21-9.4 21-21c0-33-4.8-64.8-14.2-94.8z m-202.9 230.1c-13.8-13.9-32.9-21-52.5-21-20.1 0-39.5 7.4-54.6 21.8-13.4 12.8-20.7 29.3-21.6 46.5-0.9 16.8 4.2 33.6 14.8 47.9 10.3 13.9 25.5 22.9 42 25.3 16.5 2.4 33.1-1.3 47.3-10.4 14.2-9.1 24.3-22.9 29.2-39.1 4.9-16.2 4.6-33.6-0.6-49.6-5.2-16-15.6-29.6-29.6-41.4z m-52.5-62.9c32.1 0 62.1 12.5 84.4 34.8s34.8 52.3 34.8 84.4-12.5 62.1-34.8 84.4-52.3 34.8-84.4 34.8-62.1-12.5-84.4-34.8-34.8-52.3-34.8-84.4 12.5-62.1 34.8-84.4 52.2-34.8 84.4-34.8z"></path>
    </svg>
    <span className="text-sm font-medium text-muted-foreground">Tunisair</span>
  </div>
);

const RoyalAirMarocLogo = () => (
    <div className="flex flex-col items-center gap-2">
    <svg role="img" className="h-10 w-10 text-green-600" viewBox="0 0 512 512" fill="currentColor">
       <title>Royal Air Maroc</title>
       <path d="M256 372.1l118.6 61.6-31.3-134.8 103.9-89.8-138.1-11.9L256 72.1l-53.1 125.1-138.1 11.9 103.9 89.8-31.3 134.8z" fill="#c1272d"></path>
       <path d="M401.3 444.1l-145.3-75.6-145.3 75.6 42.4-164.7L31.3 194.1l169.5-14.6L256 24.1l65.2 155.4 169.5 14.6-121.8 85.3zM256 372.1l118.6 61.6-31.3-134.8 103.9-89.8-138.1-11.9L256 72.1l-53.1 125.1-138.1 11.9 103.9 89.8-31.3 134.8z" stroke="#000" stroke-width="30" stroke-miterlimit="10"></path>
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
