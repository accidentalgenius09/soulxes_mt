'use client';

import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import type { Flight } from '@/lib/data';
import {
  flights,
  durationToMinutes,
  getStopLabel,
  timeToHour,
} from '@/lib/data';

export interface SearchParams {
  from: string;
  to: string;
  departing: string;
  returning: string;
  travellers: string;
  classType: string;
  tripType: string;
}

export interface FilterState {
  selectedStops: string[];
  selectedAirlines: string[];
  selectedBaggage: string[];
  departureTime: [number, number];
  arrivalTime: [number, number];
}

const defaultSearch: SearchParams = {
  from: '',
  to: '',
  departing: '',
  returning: '',
  travellers: '',
  classType: 'Select Class',
  tripType: 'Select Trip',
};

export const defaultFilters: FilterState = {
  selectedStops: [],
  selectedAirlines: [],
  selectedBaggage: [],
  departureTime: [0, 24],
  arrivalTime: [0, 24],
};

function matchesSearch(flight: Flight, params: SearchParams): boolean {
  const from = params.from.trim().toLowerCase();
  const to = params.to.trim().toLowerCase();
  if (from) {
    const depCity = flight.departure.city.toLowerCase();
    const depAirport = flight.departure.airport.toLowerCase();
    if (!depCity.includes(from) && !depAirport.includes(from) && !from.includes(depCity) && !from.includes(depAirport)) return false;
  }
  if (to) {
    const arrCity = flight.arrival.city.toLowerCase();
    const arrAirport = flight.arrival.airport.toLowerCase();
    if (!arrCity.includes(to) && !arrAirport.includes(to) && !to.includes(arrCity) && !to.includes(arrAirport)) return false;
  }
  if (params.departing) {
    const iso = params.departing;
    const d = new Date(iso + 'T12:00:00');
    const day = d.getDate();
    const mon = d.toLocaleDateString('en-US', { month: 'short' });
    const year = d.getFullYear();
    const flightDate = flight.departure.date;
    if (!flightDate.includes(String(day)) || !flightDate.includes(mon) || !flightDate.includes(String(year))) return false;
  }
  if (params.classType && params.classType !== 'Select Class') {
    if (flight.travelClass !== params.classType) return false;
  }
  const travellersNum = parseInt(params.travellers, 10);
  if (!isNaN(travellersNum) && travellersNum > 0 && flight.seatsRemaining < travellersNum) return false;
  return true;
}

function matchesFilters(flight: Flight, filters: FilterState): boolean {
  if (filters.selectedStops.length > 0) {
    const stopLabel = getStopLabel(flight);
    if (!filters.selectedStops.includes(stopLabel)) return false;
  }
  if (filters.selectedAirlines.length > 0) {
    if (!filters.selectedAirlines.includes(flight.airline)) return false;
  }
  if (filters.selectedBaggage.length > 0) {
    if (!flight.baggageOption || !filters.selectedBaggage.includes(flight.baggageOption)) return false;
  }
  const depHour = timeToHour(flight.departure.time);
  if (depHour < filters.departureTime[0] || depHour > filters.departureTime[1]) return false;
  const arrHour = timeToHour(flight.arrival.time);
  if (arrHour < filters.arrivalTime[0] || arrHour > filters.arrivalTime[1]) return false;
  return true;
}

function sortFlights(list: Flight[], sortId: string): Flight[] {
  const copy = [...list];
  if (sortId === 'cheapest') {
    copy.sort((a, b) => a.price - b.price);
  } else if (sortId === 'fastest') {
    copy.sort((a, b) => durationToMinutes(a.duration) - durationToMinutes(b.duration));
  } else {
    copy.sort((a, b) => {
      const priceDiff = a.price - b.price;
      if (priceDiff !== 0) return priceDiff;
      return durationToMinutes(a.duration) - durationToMinutes(b.duration);
    });
  }
  return copy;
}

export interface FlightSearchContextValue {
  searchParams: SearchParams;
  setSearchParams: (params: Partial<SearchParams>) => void;
  filterState: FilterState;
  setFilterState: (state: Partial<FilterState> | ((prev: FilterState) => FilterState)) => void;
  activeSort: string;
  setActiveSort: (id: string) => void;
  filteredAndSortedFlights: Flight[];
}

const FlightSearchContext = createContext<FlightSearchContextValue | null>(null);

export function FlightSearchProvider({ children }: { children: React.ReactNode }) {
  const [searchParams, setSearchParamsState] = useState<SearchParams>(defaultSearch);
  const [filterState, setFilterStateState] = useState<FilterState>(defaultFilters);
  const [activeSort, setActiveSort] = useState('recommended');

  const setSearchParams = useCallback((params: Partial<SearchParams>) => {
    setSearchParamsState((prev) => ({ ...prev, ...params }));
  }, []);

  const setFilterState = useCallback((state: Partial<FilterState> | ((prev: FilterState) => FilterState)) => {
    setFilterStateState((prev) => (typeof state === 'function' ? state(prev) : { ...prev, ...state }));
  }, []);

  const filteredAndSortedFlights = useMemo(() => {
    let list = flights.filter((f) => matchesSearch(f, searchParams));
    list = list.filter((f) => matchesFilters(f, filterState));
    return sortFlights(list, activeSort);
  }, [searchParams, filterState, activeSort]);

  const value: FlightSearchContextValue = useMemo(
    () => ({
      searchParams,
      setSearchParams,
      filterState,
      setFilterState,
      activeSort,
      setActiveSort,
      filteredAndSortedFlights,
    }),
    [searchParams, setSearchParams, filterState, activeSort, filteredAndSortedFlights]
  );

  return (
    <FlightSearchContext.Provider value={value}>
      {children}
    </FlightSearchContext.Provider>
  );
}

export function useFlightSearch() {
  const ctx = useContext(FlightSearchContext);
  if (!ctx) throw new Error('useFlightSearch must be used within FlightSearchProvider');
  return ctx;
}
