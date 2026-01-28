'use client';

import { useState, useRef, useEffect, useId } from 'react';
import type { Airport } from '@/lib/airports';
import { searchAirports, formatAirport } from '@/lib/airports';

interface AirportSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: React.ReactNode;
  inputClassName: string;
  wrapperClassName: string;
}

export default function AirportSearchInput({
  value,
  onChange,
  placeholder,
  icon,
  inputClassName,
  wrapperClassName,
}: AirportSearchInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Airport[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    const query = value.trim();
    if (query.length > 0) {
      setSuggestions(searchAirports(query));
    } else {
      setSuggestions([]);
    }
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFocus = () => {
    if (suggestions.length > 0) setIsOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    onChange(v);
    setIsOpen(v.trim().length > 0);
  };

  const handleSelect = (airport: Airport) => {
    onChange(formatAirport(airport));
    setIsOpen(false);
    setSuggestions([]);
  };

  const showDropdown = isOpen && suggestions.length > 0;

  return (
    <div ref={wrapperRef} className={wrapperClassName}>
      <span
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10"
        aria-hidden
      >
        {icon}
      </span>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        placeholder={placeholder}
        className={inputClassName}
        autoComplete="off"
        role="combobox"
        aria-expanded={showDropdown}
        aria-autocomplete="list"
        aria-controls={listId}
      />
      {showDropdown && (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-full mt-1 z-20 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {suggestions.map((airport) => (
            <li
              key={airport.iata}
              role="option"
              tabIndex={-1}
              className="px-4 py-2.5 text-sm cursor-pointer hover:bg-purple-50 focus:bg-purple-50 focus:outline-none border-b border-gray-100 last:border-b-0 first:rounded-t-md last:rounded-b-md"
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(airport);
              }}
            >
              <span className="font-medium text-gray-900">{airport.iata}</span>
              <span className="text-gray-600"> — {airport.name}, {airport.city}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
