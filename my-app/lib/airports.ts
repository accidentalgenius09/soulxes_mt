// Searchable airport data (major airports worldwide).
// Format suitable for autocomplete; add more entries as needed.

export interface Airport {
  iata: string;
  name: string;
  city: string;
  country: string;
}

/** Display string for an airport, e.g. "JFK - New York" */
export function formatAirport(airport: Airport): string {
  return `${airport.iata} - ${airport.name}, ${airport.city}`;
}

const airports: Airport[] = [
  { iata: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'United States' },
  { iata: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'United States' },
  { iata: 'ORD', name: "O'Hare International", city: 'Chicago', country: 'United States' },
  { iata: 'DFW', name: 'Dallas Fort Worth International', city: 'Dallas', country: 'United States' },
  { iata: 'SFO', name: 'San Francisco International', city: 'San Francisco', country: 'United States' },
  { iata: 'MIA', name: 'Miami International', city: 'Miami', country: 'United States' },
  { iata: 'ATL', name: 'Hartsfield-Jackson Atlanta International', city: 'Atlanta', country: 'United States' },
  { iata: 'LHR', name: 'London Heathrow', city: 'London', country: 'United Kingdom' },
  { iata: 'CDG', name: 'Charles de Gaulle', city: 'Paris', country: 'France' },
  { iata: 'AMS', name: 'Amsterdam Schiphol', city: 'Amsterdam', country: 'Netherlands' },
  { iata: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany' },
  { iata: 'MAD', name: 'Adolfo Suárez Madrid–Barajas', city: 'Madrid', country: 'Spain' },
  { iata: 'BCN', name: 'Barcelona–El Prat', city: 'Barcelona', country: 'Spain' },
  { iata: 'FCO', name: 'Rome Fiumicino', city: 'Rome', country: 'Italy' },
  { iata: 'MXP', name: 'Milan Malpensa', city: 'Milan', country: 'Italy' },
  { iata: 'ZRH', name: 'Zurich Airport', city: 'Zurich', country: 'Switzerland' },
  { iata: 'DUB', name: 'Dublin Airport', city: 'Dublin', country: 'Ireland' },
  { iata: 'LIS', name: 'Lisbon Portela', city: 'Lisbon', country: 'Portugal' },
  { iata: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'United Arab Emirates' },
  { iata: 'AUH', name: 'Abu Dhabi International', city: 'Abu Dhabi', country: 'United Arab Emirates' },
  { iata: 'DOH', name: 'Hamad International', city: 'Doha', country: 'Qatar' },
  { iata: 'SIN', name: 'Singapore Changi', city: 'Singapore', country: 'Singapore' },
  { iata: 'HKG', name: 'Hong Kong International', city: 'Hong Kong', country: 'Hong Kong' },
  { iata: 'ICN', name: 'Incheon International', city: 'Seoul', country: 'South Korea' },
  { iata: 'NRT', name: 'Narita International', city: 'Tokyo', country: 'Japan' },
  { iata: 'HND', name: 'Tokyo Haneda', city: 'Tokyo', country: 'Japan' },
  { iata: 'PEK', name: 'Beijing Capital', city: 'Beijing', country: 'China' },
  { iata: 'PVG', name: 'Shanghai Pudong', city: 'Shanghai', country: 'China' },
  { iata: 'DEL', name: 'Indira Gandhi International', city: 'New Delhi', country: 'India' },
  { iata: 'BKK', name: 'Suvarnabhumi', city: 'Bangkok', country: 'Thailand' },
  { iata: 'KUL', name: 'Kuala Lumpur International', city: 'Kuala Lumpur', country: 'Malaysia' },
  { iata: 'SYD', name: 'Sydney Kingsford Smith', city: 'Sydney', country: 'Australia' },
  { iata: 'MEL', name: 'Melbourne Airport', city: 'Melbourne', country: 'Australia' },
  { iata: 'AKL', name: 'Auckland Airport', city: 'Auckland', country: 'New Zealand' },
  { iata: 'NBO', name: 'Jomo Kenyatta International', city: 'Nairobi', country: 'Kenya' },
  { iata: 'MBA', name: 'Moi International', city: 'Mombasa', country: 'Kenya' },
  { iata: 'JNB', name: 'O. R. Tambo International', city: 'Johannesburg', country: 'South Africa' },
  { iata: 'CPT', name: 'Cape Town International', city: 'Cape Town', country: 'South Africa' },
  { iata: 'CAI', name: 'Cairo International', city: 'Cairo', country: 'Egypt' },
  { iata: 'ADD', name: 'Addis Ababa Bole', city: 'Addis Ababa', country: 'Ethiopia' },
  { iata: 'YYZ', name: 'Toronto Pearson', city: 'Toronto', country: 'Canada' },
  { iata: 'YVR', name: 'Vancouver International', city: 'Vancouver', country: 'Canada' },
  { iata: 'GRU', name: 'São Paulo–Guarulhos', city: 'São Paulo', country: 'Brazil' },
  { iata: 'GIG', name: 'Rio de Janeiro–Galeão', city: 'Rio de Janeiro', country: 'Brazil' },
  { iata: 'EZE', name: 'Ministro Pistarini', city: 'Buenos Aires', country: 'Argentina' },
  { iata: 'MEX', name: 'Mexico City International', city: 'Mexico City', country: 'Mexico' },
  { iata: 'IST', name: 'Istanbul Airport', city: 'Istanbul', country: 'Turkey' },
  { iata: 'TLV', name: 'Ben Gurion', city: 'Tel Aviv', country: 'Israel' },
  { iata: 'SAW', name: 'Istanbul Sabiha Gökçen', city: 'Istanbul', country: 'Turkey' },
  { iata: 'MUC', name: 'Munich Airport', city: 'Munich', country: 'Germany' },
  { iata: 'LGW', name: 'London Gatwick', city: 'London', country: 'United Kingdom' },
  { iata: 'MAN', name: 'Manchester Airport', city: 'Manchester', country: 'United Kingdom' },
  { iata: 'OSL', name: 'Oslo Airport', city: 'Oslo', country: 'Norway' },
  { iata: 'CPH', name: 'Copenhagen Airport', city: 'Copenhagen', country: 'Denmark' },
  { iata: 'ARN', name: 'Stockholm Arlanda', city: 'Stockholm', country: 'Sweden' },
  { iata: 'HEL', name: 'Helsinki-Vantaa', city: 'Helsinki', country: 'Finland' },
  { iata: 'VIE', name: 'Vienna International', city: 'Vienna', country: 'Austria' },
  { iata: 'BRU', name: 'Brussels Airport', city: 'Brussels', country: 'Belgium' },
  { iata: 'MOW', name: 'Moscow (multi-airport city)', city: 'Moscow', country: 'Russia' },
  { iata: 'SVO', name: 'Sheremetyevo', city: 'Moscow', country: 'Russia' },
  { iata: 'CAN', name: 'Guangzhou Baiyun', city: 'Guangzhou', country: 'China' },
  { iata: 'TPE', name: 'Taiwan Taoyuan', city: 'Taipei', country: 'Taiwan' },
  { iata: 'MNL', name: 'Ninoy Aquino International', city: 'Manila', country: 'Philippines' },
  { iata: 'CGK', name: 'Soekarno–Hatta International', city: 'Jakarta', country: 'Indonesia' },
  { iata: 'SGN', name: 'Tan Son Nhat International', city: 'Ho Chi Minh City', country: 'Vietnam' },
  { iata: 'COK', name: 'Kochi International', city: 'Kochi', country: 'India' },
  { iata: 'TRV', name: 'Trivandrum International', city: 'Trivandrum', country: 'India' },
  { iata: 'BLR', name: 'Bangalore International', city: 'Bangalore', country: 'India' },
  { iata: 'HYD', name: 'Hyderabad International', city: 'Hyderabad', country: 'India' },
  { iata: 'MAA', name: 'Chennai International', city: 'Chennai', country: 'India' },
  { iata: 'BOM', name: 'Chhatrapati Shivaji Maharaj International', city: 'Mumbai', country: 'India' },
  { iata: 'DEL', name: 'Indira Gandhi International', city: 'New Delhi', country: 'India' },
  ];

const searchFields = (a: Airport) => [a.iata, a.name, a.city, a.country].join(' ').toLowerCase();

export function searchAirports(query: string, limit = 8): Airport[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return airports
    .filter((a) => searchFields(a).includes(q))
    .slice(0, limit);
}
