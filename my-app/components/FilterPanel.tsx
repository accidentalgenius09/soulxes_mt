'use client';

import { useState } from 'react';
import { stopOptions, airlines, baggageOptions } from '@/lib/data';
import DualRangeSlider from './DualRangeSlider';
import { useFlightSearch, defaultFilters } from '@/lib/FlightSearchContext';
import type { FilterState } from '@/lib/FlightSearchContext';

export default function FilterPanel() {
  const { filterState, setFilterState } = useFlightSearch();
  const [sliderKey, setSliderKey] = useState(0);
  // Draft state: only applied to results when "Apply Filters" is clicked
  const [draft, setDraft] = useState<FilterState>(filterState);

  const { selectedStops, selectedAirlines, selectedBaggage, departureTime, arrivalTime } = draft;

  const handleStopChange = (label: string) => {
    setDraft((prev) => ({
      ...prev,
      selectedStops: prev.selectedStops.includes(label)
        ? prev.selectedStops.filter((s) => s !== label)
        : [...prev.selectedStops, label],
    }));
  };

  const handleAirlineChange = (name: string) => {
    setDraft((prev) => ({
      ...prev,
      selectedAirlines: prev.selectedAirlines.includes(name)
        ? prev.selectedAirlines.filter((a) => a !== name)
        : [...prev.selectedAirlines, name],
    }));
  };

  const handleBaggageChange = (label: string) => {
    setDraft((prev) => ({
      ...prev,
      selectedBaggage: prev.selectedBaggage.includes(label)
        ? prev.selectedBaggage.filter((b) => b !== label)
        : [...prev.selectedBaggage, label],
    }));
  };

  const handleApplyFilters = () => {
    setFilterState(draft);
  };

  const handleReset = () => {
    setDraft(defaultFilters);
    setFilterState(defaultFilters);
    setSliderKey((k) => k + 1);
  };

  const formatTime = (hour: number) => {
    if (hour === 0) return 'Mon 12:00 AM';
    if (hour === 24) return 'Tue 12:00 AM';
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    const day = hour < 12 ? 'Mon' : 'Tue';
    return `${day} ${displayHour}:00 ${period}`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm h-fit">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 p-2">Filter By</h2>

      {/* Stop */}
      <div className='mb-6 pb-6 border-b-2 border-gray-200'>
        <div className='p-2'>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Stop</h3>
            <span className="text-sm font-semibold text-gray-700">From</span>
          </div>
          <div className="space-y-3">
            {stopOptions.map((option) => (
              <label key={option.label} className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedStops.includes(option.label)}
                    onChange={() => handleStopChange(option.label)}
                    className="w-4 h-4 cursor-pointer text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {option.label}({option.count})
                  </span>
                </div>
                <span className="text-sm text-gray-600">${option.price}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Airlines */}
      <div className="mb-6 pb-6 border-b-2 border-gray-200">
        <div className='p-2'>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Airlines</h3>
            <span className="text-sm font-semibold text-gray-700">From</span>
          </div>
          <div className="space-y-3">
            {airlines.map((airline) => (
              <label key={airline.name} className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedAirlines.includes(airline.name)}
                    onChange={() => handleAirlineChange(airline.name)}
                    className="w-4 h-4 text-primary cursor-pointer border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700">{airline.name}</span>
                </div>
                <span className="text-sm text-gray-600">${airline.price}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Travel and Baggage */}
      <div className="mb-6 pb-6 border-b-2 border-gray-200">
        <div className='p-2'>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Travel and Baggage</h3>
            <span className="text-sm font-semibold text-gray-700">From</span>
          </div>
          <div className="space-y-3">
            {baggageOptions.map((option) => (
              <label key={option.label} className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedBaggage.includes(option.label)}
                    onChange={() => handleBaggageChange(option.label)}
                    className="w-4 h-4 cursor-pointer text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                </div>
                <span className="text-sm text-gray-600">${option.price}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Departure Time */}
      <div className="mb-5 pb-5 border-b-2 border-gray-200">
        <div className='p-2'>
          <div className='mb-2 pb-5'>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Departure Time</h3>
            <DualRangeSlider
              key={`departure-${sliderKey}`}
              min={0}
              max={24}
              values={departureTime}
              onChange={(v) => setDraft((prev) => ({ ...prev, departureTime: v }))}
              formatValue={formatTime}
            />
          </div>
        </div>
      </div>

      {/* Arrival Time */}
      <div className="mb-5 pb-5 border-b-2 border-gray-200">
        <div className='p-2'>
          <div className='pb-5 mb-2'>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Arrival Time</h3>
            <DualRangeSlider
              key={`arrival-${sliderKey}`}
              min={0}
              max={24}
              values={arrivalTime}
              onChange={(v) => setDraft((prev) => ({ ...prev, arrivalTime: v }))}
              formatValue={formatTime}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 px-2 pb-2">
        <button
          onClick={handleReset}
          className="flex-1 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Reset
        </button>
        <button
          onClick={handleApplyFilters}
          className="flex-1 px-4 py-2 cursor-pointer bg-primary1 text-white rounded-md hover:bg-primary-hover transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
