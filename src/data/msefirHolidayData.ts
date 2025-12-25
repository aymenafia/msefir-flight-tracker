
export const diasporaHeat = [
  { country: "tunisia", countryKey: "holiday.countryTunisia", heatValue: 98 },
  { country: "algeria", countryKey: "holiday.countryAlgeria", heatValue: 92 },
  { country: "morocco", countryKey: "holiday.countryMorocco", heatValue: 88 }
];

export const holidayTraffic = {
  tunisia: [
    { from: "Paris", to: "Tunis", airline: "TU/BJ", fullness: 99, trend: "🔥" },
    { from: "Marseille", to: "Tunis", airline: "TU/UG", fullness: 96, trend: "📈" },
    { from: "Lyon", to: "Djerba", airline: "BJ/TU", fullness: 94, trend: "📈" },
    { from: "Nice", to: "Monastir", airline: "UG", fullness: 91, trend: "📈" },
    { from: "Germany", to: "Tunis", airline: "TU/EW", fullness: 89, trend: "➡️" },
    { from: "Italy", to: "Tunis", airline: "TU/AZ", fullness: 88, trend: "➡️" },
  ],
  algeria: [
    { from: "Paris", to: "Algiers", airline: "AH", fullness: 95, trend: "📈" },
    { from: "Marseille", to: "Algiers", airline: "AH", fullness: 91, trend: "📈" },
    { from: "Lyon", to: "Oran", airline: "AH", fullness: 86, trend: "➡️" },
    { from: "Lille", to: "Algiers", airline: "AH", fullness: 82, trend: "➡️" },
    { from: "Montreal", to: "Algiers", airline: "AH", fullness: 88, trend: "📈" },
    { from: "Barcelona", to: "Oran", airline: "AH/VY", fullness: 81, trend: "➡️" },
  ],
  morocco: [
    { from: "Paris", to: "Casablanca", airline: "AT", fullness: 89, trend: "📈" },
    { from: "Brussels", to: "Marrakech", airline: "AT/3O", fullness: 84, trend: "➡️" },
    { from: "Amsterdam", to: "Nador", airline: "AT", fullness: 79, trend: "➡️" },
    { from: "Bordeaux", to: "Agadir", airline: "AT", fullness: 75, trend: "➡️" },
    { from: "New York", to: "Casablanca", airline: "AT", fullness: 85, trend: "📈" },
    { from: "Montreal", to: "Casablanca", airline: "AT/AC", fullness: 82, trend: "➡️" },
  ]
};

export const holidayCards = [
  { 
    country: "tunisia",
    titleKey: "holiday.tunisiaTitle",
    summaryKey: "holiday.tunisiaSummary",
    flightNumber: "TU721"
  },
  { 
    country: "algeria",
    titleKey: "holiday.algeriaTitle",
    summaryKey: "holiday.algeriaSummary",
    flightNumber: "AH1021"
  },
  { 
    country: "morocco",
    titleKey: "holiday.moroccoTitle",
    summaryKey: "holiday.moroccoSummary",
    flightNumber: "AT761"
  }
];
