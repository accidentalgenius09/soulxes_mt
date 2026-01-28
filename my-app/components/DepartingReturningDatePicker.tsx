'use client';

interface DepartingReturningDatePickerProps {
  departing: string;
  returning: string;
  onDepartingChange: (value: string) => void;
  onReturningChange: (value: string) => void;
  onClose: () => void;
}

export default function DepartingReturningDatePicker({
  departing,
  returning,
  onDepartingChange,
  onReturningChange,
  onClose,
}: DepartingReturningDatePickerProps) {
  const today = new Date().toISOString().slice(0, 10);
  const returnMin = departing || today;

  return (
    <div
      role="dialog"
      aria-label="Departing and return date picker"
      className="absolute left-0 right-0 top-full mt-1 z-20 bg-white border border-gray-300 rounded-md shadow-lg p-4"
    >
      <div className="space-y-3">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Departing</span>
          <input
            type="date"
            value={departing}
            onChange={(e) => onDepartingChange(e.target.value)}
            min={today}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Returning</span>
          <input
            type="date"
            value={returning}
            onChange={(e) => onReturningChange(e.target.value)}
            min={returnMin}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
          />
        </label>
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
}
