// Dummy data for the GlobGoer flight booking app
export interface Flight {
  id: string;
  airline: string;
  airlineLogo: string;
  travelClass: string;
  departure: {
    time: string;
    date: string;
    airport: string;
    city: string;
    country: string;
  };
  departure2?: {
    time: string;
    date: string;
    airport: string;
    city: string;
    country: string;
  };
  arrival: {
    time: string;
    date: string;
    airport: string;
    city: string;
    country: string;
  };
  arrival2?: {
    time: string;
    date: string;
    airport: string;
    city: string;
    country: string;
  };
  additionalInfo?: {
    transfer: string;
    baggage: string;
    terminal: string;
    ticket: string;
  };
  duration: string;
  price: number;
  seatsRemaining: number;
  refundable: 'Fully refundable' | 'Partially Refundable' | 'Non-refundable';
  stops?: {
    airport: string;
    layoverDuration: string;
    changeOfTerminal?: boolean;
    changeOfPlanes?: boolean;
  };
  hasWifi?: boolean;
  hasEntertainment?: boolean;
  /** For filter: 'Carry-on bag' | 'Checked bag' */
  baggageOption?: 'Carry-on bag' | 'Checked bag';
}

export interface Airline {
  name: string;
  price: number;
}

export interface FilterOption {
  label: string;
  count?: number;
  price?: number;
}

export const airlines: Airline[] = [
  { name: 'ABC Air Technologies', price: 203 },
  { name: 'ABC Airlines', price: 160 },
  { name: 'XYZ Airways', price: 212 },
  { name: 'BOP Links', price: 129 },
  { name: 'EDF Express', price: 190 },
];

export const stopOptions: FilterOption[] = [
  { label: 'Nonstop', count: 12, price: 110 },
  { label: '1 Stop', count: 8, price: 324 },
  { label: '2+ Stops', count: 2, price: 349 },
];

export const baggageOptions: FilterOption[] = [
  { label: 'Carry-on bag', price: 129 },
  { label: 'Checked bag', price: 99 },
];

/** Parse duration string "9hr 50min" to total minutes */
export function durationToMinutes(duration: string): number {
  const hrMatch = duration.match(/(\d+)\s*hr/);
  const minMatch = duration.match(/(\d+)\s*min/);
  const hours = hrMatch ? parseInt(hrMatch[1], 10) : 0;
  const mins = minMatch ? parseInt(minMatch[1], 10) : 0;
  return hours * 60 + mins;
}

/** Get stop filter label for a flight */
export function getStopLabel(flight: Flight): 'Nonstop' | '1 Stop' | '2+ Stops' {
  if (!flight.departure2) return 'Nonstop';
  // If we had a third leg we'd return '2+ Stops'
  return '1 Stop';
}

/** Parse time string "14:50" to hour (0-24) */
export function timeToHour(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h + (m >= 30 ? 0.5 : 0);
}

export const flights: Flight[] = [
  {
    id: '1',
    airline: 'ABC Air Technologies',
    airlineLogo: '/airlinelogo.png',
    travelClass: 'Economy',
    departure: { time: '06:00', date: 'Sun, 29 Jan 2023', airport: 'Moi Intl', city: 'Mombasa', country: 'Kenya' },
    arrival: { time: '08:50', date: 'Sun, 29 Jan 2023', airport: 'Jomo Kenyatta', city: 'Nairobi', country: 'Kenya' },
    duration: '1hr 50min',
    price: 203,
    seatsRemaining: 9,
    refundable: 'Partially Refundable',
    baggageOption: 'Carry-on bag',
  },
  {
    id: '2',
    airline: 'ABC Airlines',
    airlineLogo: '/airlinelogo.png',
    travelClass: 'Economy',
    departure: { time: '08:30', date: 'Sun, 29 Jan 2023', airport: 'Moi Intl', city: 'Mombasa', country: 'Kenya' },
    arrival: { time: '10:20', date: 'Sun, 29 Jan 2023', airport: 'Jomo Kenyatta', city: 'Nairobi', country: 'Kenya' },
    duration: '1hr 50min',
    price: 160,
    seatsRemaining: 15,
    refundable: 'Fully refundable',
    baggageOption: 'Checked bag',
  },
  {
    id: '3',
    airline: 'XYZ Airways',
    airlineLogo: '/airlinelogo.png',
    travelClass: 'Economy',
    departure: { time: '14:50', date: 'Sun, 29 Jan 2023', airport: 'Moi Intl', city: 'Mombasa', country: 'Kenya' },
    arrival: { time: '16:40', date: 'Sun, 29 Jan 2023', airport: 'Jomo Kenyatta', city: 'Nairobi', country: 'Kenya' },
    duration: '1hr 50min',
    price: 212,
    seatsRemaining: 100,
    refundable: 'Partially Refundable',
    baggageOption: 'Carry-on bag',
  },
  {
    id: '4',
    airline: 'BOP Links',
    airlineLogo: '/airlinelogo.png',
    travelClass: 'Economy',
    departure: { time: '22:00', date: 'Sun, 29 Jan 2023', airport: 'Moi Intl', city: 'Mombasa', country: 'Kenya' },
    arrival: { time: '23:50', date: 'Sun, 29 Jan 2023', airport: 'Jomo Kenyatta', city: 'Nairobi', country: 'Kenya' },
    duration: '1hr 50min',
    price: 129,
    seatsRemaining: 3,
    refundable: 'Non-refundable',
    baggageOption: 'Carry-on bag',
  },
  {
    id: '5',
    airline: 'EDF Express',
    airlineLogo: '/airlinelogo.png',
    travelClass: 'Economy',
    departure: { time: '07:15', date: 'Sun, 29 Jan 2023', airport: 'Moi Intl', city: 'Mombasa', country: 'Kenya' },
    additionalInfo: { transfer: 'Self Transfer', baggage: '7kg', terminal: 'Change of Terminal', ticket: 'Separate tickets' },
    departure2: { time: '09:00', date: 'Sun, 29 Jan 2023', airport: 'Jomo Kenyatta', city: 'Nairobi', country: 'Kenya' },
    arrival: { time: '18:30', date: 'Sun, 29 Jan 2023', airport: 'JFK', city: 'New York', country: 'United States' },
    arrival2: { time: '18:30', date: 'Sun, 29 Jan 2023', airport: 'JFK', city: 'New York', country: 'United States' },
    duration: '9hr 50min',
    price: 324,
    seatsRemaining: 5,
    refundable: 'Non-refundable',
    baggageOption: 'Carry-on bag',
    stops: { airport: 'NBO', layoverDuration: '2h 15m', changeOfTerminal: true, changeOfPlanes: true },
  },
  {
    id: '6',
    airline: 'ABC Air Technologies',
    airlineLogo: '/airlinelogo.png',
    travelClass: 'Economy',
    departure: { time: '10:00', date: 'Sun, 29 Jan 2023', airport: 'JFK', city: 'New York', country: 'United States' },
    arrival: { time: '22:00', date: 'Sun, 29 Jan 2023', airport: 'Heathrow', city: 'London', country: 'United Kingdom' },
    duration: '7hr 0min',
    price: 349,
    seatsRemaining: 12,
    refundable: 'Fully refundable',
    baggageOption: 'Checked bag',
    hasWifi: true,
  },
  {
    id: '7',
    airline: 'ABC Airlines',
    airlineLogo: '/airlinelogo.png',
    travelClass: 'Economy',
    departure: { time: '18:30', date: 'Sun, 29 Jan 2023', airport: 'JFK', city: 'New York', country: 'United States' },
    arrival: { time: '06:30', date: 'Mon, 30 Jan 2023', airport: 'Heathrow', city: 'London', country: 'United Kingdom' },
    duration: '7hr 0min',
    price: 290,
    seatsRemaining: 20,
    refundable: 'Partially Refundable',
    baggageOption: 'Carry-on bag',
  },
  {
    id: '8',
    airline: 'XYZ Airways',
    airlineLogo: '/airlinelogo.png',
    travelClass: 'Business',
    departure: { time: '12:00', date: 'Sun, 29 Jan 2023', airport: 'JFK', city: 'New York', country: 'United States' },
    arrival: { time: '23:30', date: 'Sun, 29 Jan 2023', airport: 'Charles de Gaulle', city: 'Paris', country: 'France' },
    duration: '7hr 30min',
    price: 520,
    seatsRemaining: 8,
    refundable: 'Fully refundable',
    baggageOption: 'Checked bag',
    hasWifi: true,
  },
  {
    id: '9',
    airline: 'BOP Links',
    airlineLogo: '/airlinelogo.png',
    travelClass: 'Economy',
    departure: { time: '05:45', date: 'Sun, 29 Jan 2023', airport: 'Heathrow', city: 'London', country: 'United Kingdom' },
    arrival: { time: '09:15', date: 'Sun, 29 Jan 2023', airport: 'Charles de Gaulle', city: 'Paris', country: 'France' },
    duration: '1hr 30min',
    price: 110,
    seatsRemaining: 25,
    refundable: 'Fully refundable',
    baggageOption: 'Carry-on bag',
  },
  {
    id: '10',
    airline: 'EDF Express',
    airlineLogo: '/airlinelogo.png',
    travelClass: 'Economy',
    departure: { time: '14:00', date: 'Sun, 29 Jan 2023', airport: 'Heathrow', city: 'London', country: 'United Kingdom' },
    arrival: { time: '17:30', date: 'Sun, 29 Jan 2023', airport: 'Charles de Gaulle', city: 'Paris', country: 'France' },
    duration: '1hr 30min',
    price: 130,
    seatsRemaining: 4,
    refundable: 'Non-refundable',
    baggageOption: 'Checked bag',
  },
  {
    id: '11',
    airline: 'ABC Airlines',
    airlineLogo: '/airlinelogo.png',
    travelClass: 'Economy',
    departure: { time: '11:20', date: 'Sun, 29 Jan 2023', airport: 'Jomo Kenyatta', city: 'Nairobi', country: 'Kenya' },
    additionalInfo: { transfer: 'Self Transfer', baggage: '7kg', terminal: 'Change of Terminal', ticket: 'Separate tickets' },
    departure2: { time: '13:00', date: 'Sun, 29 Jan 2023', airport: 'Dubai International', city: 'Dubai', country: 'UAE' },
    arrival: { time: '22:40', date: 'Sun, 29 Jan 2023', airport: 'JFK', city: 'New York', country: 'United States' },
    arrival2: { time: '22:40', date: 'Sun, 29 Jan 2023', airport: 'JFK', city: 'New York', country: 'United States' },
    duration: '18hr 20min',
    price: 449,
    seatsRemaining: 2,
    refundable: 'Non-refundable',
    baggageOption: 'Checked bag',
    stops: { airport: 'DXB', layoverDuration: '4h 30m', changeOfPlanes: true },
  },
  {
    id: '12',
    airline: 'BOP Links',
    airlineLogo: '/airlinelogo.png',
    travelClass: 'Economy',
    departure: { time: '03:00', date: 'Sun, 29 Jan 2023', airport: 'JFK', city: 'New York', country: 'United States' },
    arrival: { time: '15:00', date: 'Sun, 29 Jan 2023', airport: 'JFK', city: 'New York', country: 'United States' },
    duration: '12hr 0min',
    price: 199,
    seatsRemaining: 30,
    refundable: 'Partially Refundable',
    baggageOption: 'Carry-on bag',
  },
  {
    id: '13',
    airline: 'ABC Air Technologies',
    airlineLogo: '/airlinelogo.png',
    travelClass: 'First Class',
    departure: { time: '09:00', date: 'Sun, 29 Jan 2023', airport: 'Moi Intl', city: 'Mombasa', country: 'Kenya' },
    arrival: { time: '11:30', date: 'Sun, 29 Jan 2023', airport: 'O. R. Tambo', city: 'Johannesburg', country: 'South Africa' },
    duration: '3hr 30min',
    price: 410,
    seatsRemaining: 6,
    refundable: 'Fully refundable',
    baggageOption: 'Checked bag',
    hasWifi: true,
  },
  {
    id: '14',
    airline: 'XYZ Airways',
    airlineLogo: '/airlinelogo.png',
    travelClass: 'Economy',
    departure: { time: '16:00', date: 'Sun, 29 Jan 2023', airport: 'Moi Intl', city: 'Mombasa', country: 'Kenya' },
    arrival: { time: '18:30', date: 'Sun, 29 Jan 2023', airport: 'O. R. Tambo', city: 'Johannesburg', country: 'South Africa' },
    duration: '3hr 30min',
    price: 280,
    seatsRemaining: 14,
    refundable: 'Partially Refundable',
    baggageOption: 'Carry-on bag',
  },
  {
    id: '15',
    airline: 'EDF Express',
    airlineLogo: '/airlinelogo.png',
    travelClass: 'Economy',
    departure: { time: '20:00', date: 'Sun, 29 Jan 2023', airport: 'Los Angeles International', city: 'Los Angeles', country: 'United States' },
    arrival: { time: '05:00', date: 'Mon, 30 Jan 2023', airport: 'JFK', city: 'New York', country: 'United States' },
    duration: '5hr 0min',
    price: 190,
    seatsRemaining: 7,
    refundable: 'Fully refundable',
    baggageOption: 'Checked bag',
  },
  {
    id: '16',
    airline: 'ABC Airlines',
    airlineLogo: '/airlinelogo.png',
    travelClass: 'Economy',
    departure: { time: '06:30', date: 'Sun, 29 Jan 2023', airport: 'Singapore Changi', city: 'Singapore', country: 'Singapore' },
    arrival: { time: '12:45', date: 'Sun, 29 Jan 2023', airport: 'Heathrow', city: 'London', country: 'United Kingdom' },
    duration: '13hr 15min',
    price: 499,
    seatsRemaining: 11,
    refundable: 'Partially Refundable',
    baggageOption: 'Checked bag',
    hasWifi: true,
  },
  {
    id: '17',
    airline: 'BOP Links',
    airlineLogo: '/airlinelogo.png',
    travelClass: 'Economy',
    departure: { time: '13:00', date: 'Sun, 29 Jan 2023', airport: 'Moi Intl', city: 'Mombasa', country: 'Kenya' },
    additionalInfo: { transfer: 'Self Transfer', baggage: '7kg', terminal: 'Change of Terminal', ticket: 'Separate tickets' },
    departure2: { time: '15:30', date: 'Sun, 29 Jan 2023', airport: 'Jomo Kenyatta', city: 'Nairobi', country: 'Kenya' },
    arrival: { time: '23:00', date: 'Sun, 29 Jan 2023', airport: 'Heathrow', city: 'London', country: 'United Kingdom' },
    arrival2: { time: '23:00', date: 'Sun, 29 Jan 2023', airport: 'Heathrow', city: 'London', country: 'United Kingdom' },
    duration: '15hr 30min',
    price: 380,
    seatsRemaining: 3,
    refundable: 'Non-refundable',
    baggageOption: 'Carry-on bag',
    stops: { airport: 'NBO', layoverDuration: '1h 45m', changeOfPlanes: true },
  },
  {
    id: '18',
    airline: 'XYZ Airways',
    airlineLogo: '/airlinelogo.png',
    travelClass: 'Economy',
    departure: { time: '04:00', date: 'Sun, 29 Jan 2023', airport: 'Dubai International', city: 'Dubai', country: 'UAE' },
    arrival: { time: '09:30', date: 'Sun, 29 Jan 2023', airport: 'Heathrow', city: 'London', country: 'United Kingdom' },
    duration: '7hr 30min',
    price: 269,
    seatsRemaining: 18,
    refundable: 'Fully refundable',
    baggageOption: 'Checked bag',
  },
  {
    id: '19',
    airline: 'ABC Air Technologies',
    airlineLogo: '/airlinelogo.png',
    travelClass: 'Economy',
    departure: { time: '17:45', date: 'Sun, 29 Jan 2023', airport: 'Moi Intl', city: 'Mombasa', country: 'Kenya' },
    arrival: { time: '19:35', date: 'Sun, 29 Jan 2023', airport: 'Jomo Kenyatta', city: 'Nairobi', country: 'Kenya' },
    duration: '1hr 50min',
    price: 215,
    seatsRemaining: 22,
    refundable: 'Partially Refundable',
    baggageOption: 'Checked bag',
  },
  {
    id: '20',
    airline: 'EDF Express',
    airlineLogo: '/airlinelogo.png',
    travelClass: 'Economy',
    departure: { time: '21:30', date: 'Sun, 29 Jan 2023', airport: 'Jomo Kenyatta', city: 'Nairobi', country: 'Kenya' },
    arrival: { time: '06:15', date: 'Mon, 30 Jan 2023', airport: 'JFK', city: 'New York', country: 'United States' },
    duration: '14hr 45min',
    price: 420,
    seatsRemaining: 5,
    refundable: 'Fully refundable',
    baggageOption: 'Checked bag',
    hasWifi: true,
  },
  {
    id: '21',
    airline: 'BOP Links',
    airlineLogo: '/airlinelogo.png',
    travelClass: 'Economy',
    departure: { time: '02:00', date: 'Sun, 29 Jan 2023', airport: 'JFK', city: 'New York', country: 'United States' },
    additionalInfo: { transfer: 'Self Transfer', baggage: '7kg', terminal: 'Change of Terminal', ticket: 'Separate tickets' },
    departure2: { time: '14:00', date: 'Sun, 29 Jan 2023', airport: 'Heathrow', city: 'London', country: 'United Kingdom' },
    arrival: { time: '22:30', date: 'Sun, 29 Jan 2023', airport: 'Charles de Gaulle', city: 'Paris', country: 'France' },
    arrival2: { time: '22:30', date: 'Sun, 29 Jan 2023', airport: 'Charles de Gaulle', city: 'Paris', country: 'France' },
    duration: '18hr 30min',
    price: 349,
    seatsRemaining: 1,
    refundable: 'Non-refundable',
    baggageOption: 'Carry-on bag',
    stops: { airport: 'LHR', layoverDuration: '3h 0m', changeOfTerminal: true, changeOfPlanes: true },
  },
  {
    id: '22',
    airline: 'ABC Airlines',
    airlineLogo: '/airlinelogo.png',
    travelClass: 'Economy',
    departure: { time: '10:30', date: 'Sun, 29 Jan 2023', airport: 'Moi Intl', city: 'Mombasa', country: 'Kenya' },
    arrival: { time: '12:20', date: 'Sun, 29 Jan 2023', airport: 'Jomo Kenyatta', city: 'Nairobi', country: 'Kenya' },
    duration: '1hr 50min',
    price: 165,
    seatsRemaining: 40,
    refundable: 'Fully refundable',
    baggageOption: 'Carry-on bag',
  },
];

export const sortOptions = [
  { id: 'recommended', label: 'Recommended', iconId: 'recommended' },
  { id: 'fastest', label: 'Fastest', iconId: 'fastest' },
  { id: 'cheapest', label: 'Cheapest', iconId: 'cheapest' },
];
