'use client';

import { useState, useRef, useEffect } from 'react';

interface DualRangeSliderProps {
  min: number;
  max: number;
  values: [number, number];
  onChange: (values: [number, number]) => void;
  formatValue: (value: number) => string;
}

export default function DualRangeSlider({ min, max, values, onChange, formatValue }: DualRangeSliderProps) {
  const [minVal, setMinVal] = useState(values[0]);
  const [maxVal, setMaxVal] = useState(values[1]);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  const getPercent = (value: number) => Math.round(((value - min) / (max - min)) * 100);

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  // Generate intermediate markers (dots) along the track
  const markers = [];
  const markerCount = 12; // Number of markers to show
  for (let i = 0; i <= markerCount; i++) {
    const position = (i / markerCount) * 100;
    markers.push(position);
  }

  return (
    <div className="relative px-2">
      {/* Time range text above slider */}
      <div className="mb-3 text-xs text-gray-600">
        {formatValue(minVal)} - {formatValue(maxVal)}
      </div>

      {/* Slider container - tall enough for 20px thumbs, track centered */}
      <div className="relative w-full h-8">
        {/* Background track - vertically centered */}
        <div className="absolute left-0 right-0 w-full h-2 top-1/2 -translate-y-1/2 bg-gray-200 rounded-full"></div>

        <div
          ref={range}
          className="absolute h-2 top-1/2 -translate-y-1/2 bg-primary rounded-full"
        ></div>

        {/* Min range input - full area, thumb aligns via CSS */}
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          onChange={(event) => {
            const value = Math.min(+event.target.value, maxVal - 1);
            setMinVal(value);
            onChange([value, maxVal]);
            event.target.value = value.toString();
          }}
          className="absolute left-0 right-0 w-full h-4 bg-transparent appearance-none pointer-events-auto z-10 slider-input"
          style={{ zIndex: minVal > max - 100 ? 5 : 3 }}
        />

        {/* Max range input */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          onChange={(event) => {
            const value = Math.max(+event.target.value, minVal + 1);
            setMaxVal(value);
            onChange([minVal, value]);
            event.target.value = value.toString();
          }}
          className="absolute left-0 right-0 w-full h-4 bg-transparent appearance-none pointer-events-auto z-10 slider-input"
          style={{ zIndex: maxVal < min + 100 ? 5 : 3 }}
        />
      </div>
    </div>
  );
}
