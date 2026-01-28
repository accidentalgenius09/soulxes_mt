'use client';

import { useState, useRef, useEffect } from 'react';
import { RiFlightTakeoffLine, RiFlightLandLine } from "react-icons/ri";
import { PiArrowsLeftRight } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import AirportSearchInput from './AirportSearchInput';
import DepartingReturningDatePicker from './DepartingReturningDatePicker';
import { useFlightSearch } from '@/lib/FlightSearchContext';

function formatDateDisplay(iso: string): string {
    if (!iso) return '';
    const d = new Date(iso + 'T12:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function Header() {
    const { setSearchParams, searchParams } = useFlightSearch();
    const [flightType, setFlightType] = useState('Select flight');
    const [classType, setClassType] = useState(searchParams.classType || 'Select Class');
    const [tripType, setTripType] = useState(searchParams.tripType || 'Select Trip');
    const [from, setFrom] = useState(searchParams.from || '');
    const [to, setTo] = useState(searchParams.to || '');
    const [departing, setDeparting] = useState(searchParams.departing || '');
    const [returning, setReturning] = useState(searchParams.returning || '');
    const [travellers, setTravellers] = useState(searchParams.travellers || '');
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const datePickerRef = useRef<HTMLDivElement>(null);

    const handleSearch = () => {
        setSearchParams({ from, to, departing, returning, travellers, classType, tripType });
    };

    const handleSwap = () => {
        setFrom(to);
        setTo(from);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
                setIsDatePickerOpen(false);
            }
        }
        if (isDatePickerOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isDatePickerOpen]);

    const dateDisplayText =
        departing && returning
            ? `${formatDateDisplay(departing)} – ${formatDateDisplay(returning)}`
            : departing
                ? formatDateDisplay(departing)
                : '';

    const inputBase = 'w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-900';
    const inputWrapper = 'relative w-full md:flex-1 md:min-w-0';

    return (
        <header className="bg-white shadow-sm">
            <div className="text-center mb-4 md:mb-6 shadow-[0px_4px_4px_0px_#8D8D8D40]">
                <h1 className="text-xl py-4 md:py-5 font-bold text-primary">GlobGoer</h1>
            </div>
            <div className="container mx-auto px-3 py-4 sm:px-4 md:py-6">
                {/* Search Bar */}
                <div className="bg-white p-3 md:p-4">
                    {/* Row 1: Dropdowns - stacked on small, row on md+ */}
                    <div className="flex flex-col gap-2 mb-3 md:flex-row md:flex-wrap md:gap-4 md:mb-4">
                        <div className="w-full md:flex-1 md:min-w-[140px] md:max-w-[200px]">
                            <select
                                value={flightType}
                                onChange={(e) => setFlightType(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%239ca3af%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_0.75rem_center] bg-no-repeat pr-9"
                            >
                                <option>Select flight</option>
                                <option>One Way</option>
                                <option>Round Trip</option>
                                <option>Multi City</option>
                            </select>
                        </div>
                        <div className="w-full md:flex-1 md:min-w-[140px] md:max-w-[200px]">
                            <select
                                value={classType}
                                onChange={(e) => setClassType(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%239ca3af%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_0.75rem_center] bg-no-repeat pr-9"
                            >
                                <option>Select Class</option>
                                <option>Economy</option>
                                <option>Business</option>
                                <option>First Class</option>
                            </select>
                        </div>
                        <div className="w-full md:flex-1 md:min-w-[140px] md:max-w-[200px]">
                            <select
                                value={tripType}
                                onChange={(e) => setTripType(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%239ca3af%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_0.75rem_center] bg-no-repeat pr-9"
                            >
                                <option>Select Trip</option>
                                <option>Domestic</option>
                                <option>International</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-stretch md:gap-3">
                        {/* From */}
                        <AirportSearchInput
                            value={from}
                            onChange={setFrom}
                            placeholder="From"
                            icon={<RiFlightTakeoffLine size={18} />}
                            inputClassName={inputBase}
                            wrapperClassName={inputWrapper}
                        />

                        {/* Swap button */}
                        <button
                            type="button"
                            onClick={handleSwap}
                            className="shrink-0 self-center md:self-stretch cursor-pointer w-10 h-[42px] flex items-center justify-center rounded-md bg-purple-100 text-primary hover:bg-purple-200 transition-colors"
                            title="Swap destinations"
                            aria-label="Swap From and To"
                        >
                            <span className="text-lg font-medium"><PiArrowsLeftRight size={18} /></span>
                        </button>

                        {/* To */}
                        <AirportSearchInput
                            value={to}
                            onChange={setTo}
                            placeholder="To"
                            icon={<RiFlightLandLine size={18} />}
                            inputClassName={inputBase}
                            wrapperClassName={inputWrapper}
                        />

                        {/* Departing - Returning */}
                        <div ref={datePickerRef} className={`${inputWrapper} md:min-w-[180px] md:flex-[1.2] relative`}>
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" aria-hidden>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
                            </span>
                            <button
                                type="button"
                                onClick={() => setIsDatePickerOpen((v) => !v)}
                                className={`${inputBase} text-left cursor-pointer caret-transparent select-none flex items-center pr-4`}
                                aria-expanded={isDatePickerOpen}
                                aria-haspopup="dialog"
                                aria-label="Select departing and return dates"
                            >
                                {dateDisplayText || <span className="text-gray-400">Departing - Returning</span>}
                            </button>
                            {isDatePickerOpen && (
                                <DepartingReturningDatePicker
                                    departing={departing}
                                    returning={returning}
                                    onDepartingChange={setDeparting}
                                    onReturningChange={setReturning}
                                    onClose={() => setIsDatePickerOpen(false)}
                                />
                            )}
                        </div>

                        {/* Travellers */}
                        <div className={inputWrapper}>
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden>
                                <FaUser />
                            </span>
                            <input
                                type="number"
                                value={travellers}
                                onChange={(e) => setTravellers(e.target.value)}
                                placeholder="Travellers"
                                min={1}
                                className={inputBase}
                            />
                        </div>

                        {/* Search Button */}
                        <button
                            type="button"
                            onClick={handleSearch}
                            className="w-full md:w-auto shrink-0 cursor-pointer bg-[#5D36AF] hover:bg-primary-hover text-white px-6 py-2.5 rounded-md font-medium flex items-center justify-center gap-1 transition-colors h-[42px]"
                        >
                            <IoMdSearch />Search
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
