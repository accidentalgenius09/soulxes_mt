'use client';

import { useMemo } from 'react';
import { AiFillLike, AiFillThunderbolt } from 'react-icons/ai';
import { LiaFunnelDollarSolid } from 'react-icons/lia';
import { sortOptions } from '@/lib/data';
import FlightCard from './FlightCard';
import { useFlightSearch } from '@/lib/FlightSearchContext';

const sortIcons: Record<string, React.ReactNode> = {
  recommended: <AiFillLike />,
  fastest: <AiFillThunderbolt />,
  cheapest: <LiaFunnelDollarSolid />,
};

export default function FlightResults() {
  const { filteredAndSortedFlights, activeSort, setActiveSort } = useFlightSearch();

  const firstResultSummary = useMemo(() => {
    const first = filteredAndSortedFlights[0];
    if (!first) return { price: '—', duration: '—' };
    return {
      price: `$${first.price}`,
      duration: first.duration.replace(/\s*hr\s*/g, 'h ').replace(/\s*min/g, 'm'),
    };
  }, [filteredAndSortedFlights]);

  return (
    <div className="flex-1">
      {/* Sort Tabs */}
      <div className="bg-white border border-gray-200 mb-4 shadow-sm">
        <div className="grid grid-cols-3 gap-6">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setActiveSort(option.id)}
              className={`flex cursor-pointer items-center gap-2 border-b-2 transition-colors ${activeSort === option.id
                ? 'border-primary text-primary'
                : 'border-transparent text-black hover:text-primary'
                }`}
            >
              <div className="flex items-center gap-2 px-4 pt-2">
                <span>{sortIcons[option.iconId] ?? option.iconId}</span>
                <div className="flex flex-col items-center">
                  <span className="font-medium">{option.label}</span>
                  <div className={`text-sm text-gray-500 mb-1 ${activeSort === option.id ? 'text-primary' : 'text-gray-500'}`}>
                    {firstResultSummary.price} - {firstResultSummary.duration}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Flight Listings */}
      <div>
        {filteredAndSortedFlights.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 text-center text-gray-500">
            No flights match your search and filters. Try adjusting your criteria.
          </div>
        ) : (
          filteredAndSortedFlights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))
        )}
      </div>
    </div>
  );
}
