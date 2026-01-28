'use client';

import { useState } from 'react';
import { Flight } from '@/lib/data';
import { IoIosAirplane } from "react-icons/io";
import { MdConfirmationNumber, MdSwapHoriz, MdDirectionsWalk, MdLuggage } from "react-icons/md";
import { FaPlay, FaWifi, FaTrash, FaInfoCircle } from "react-icons/fa";

interface FlightCardProps {
  flight: Flight;
}

export default function FlightCard({ flight }: FlightCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('flight-info');
  const getRefundableColor = (refundable: string) => {
    if (refundable === 'Fully refundable') return 'text-green-600';
    if (refundable === 'Partially Refundable') return 'text-orange-500';
    return 'text-red-600';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-4 w-full">
      {/* Airline Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img src={flight.airlineLogo} alt={flight.airline} className="h-8 w-8 object-contain" />
          <h3 className="font-semibold text-gray-800">{flight.airline}</h3>
        </div>
        <p className="text-sm text-gray-600">Travel Class: <span className="font-semibold text-black">{flight.travelClass}</span></p>
      </div>

      {/* Flight Details */}
      <div className="flex flex-col md:flex-row gap-4 mb-4 items-stretch">
        {/* Flight segment(s): one or two stacked orange boxes */}
        <div className="flex flex-1 flex-col gap-3">
          {/* Segment 1: Departure, Duration, Arrival */}
          <div className="bg-orange-50 rounded-lg py-4 px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 items-center">
              <div>
                {!flight.departure2 && !flight.arrival2 &&
                  <p className="text-sm text-gray-600">{flight.departure.date}</p>
                }
                <p className="text-xl font-semibold text-gray-800">{flight.departure.time}</p>
                {flight.departure2 && flight.arrival2 &&
                  <p className="text-sm text-gray-600">{flight.departure.date}</p>
                }
                <p className="text-sm text-gray-800">{flight.departure.airport}, {flight.departure.city}</p>
                <p className="text-sm text-gray-600">{flight.departure.country}</p>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">{flight.duration}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className='text-gray-500'><IoIosAirplane /></span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                  </div>
                </div>
              </div>
              <div className='text-end'>
                <p className="text-xl font-semibold text-gray-800">{flight.arrival.time}</p>
                <p className="text-sm text-gray-800">{flight.arrival.airport}, {flight.arrival.city},</p>
                <p className="text-sm text-gray-600">{flight.arrival.country}</p>
              </div>
            </div>
          </div>

          {/* Segment 2: when departure2 & arrival2 exist */}
          {flight.departure2 && flight.arrival2 && (
            <div className="bg-orange-50 rounded-lg py-4 px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 items-center">
                <div>
                  <p className="text-xl font-semibold text-gray-800">{flight.departure2.time}</p>
                  <p className="text-sm text-gray-600">{flight.departure2.date}</p>
                  <p className="text-sm text-gray-800">{flight.departure2.airport}, {flight.departure2.city}</p>
                  <p className="text-sm text-gray-600">{flight.departure2.country}</p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">{flight.duration}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-px bg-gray-300"></div>
                      <span className='text-gray-500'><IoIosAirplane /></span>
                      <div className="flex-1 h-px bg-gray-300"></div>
                    </div>
                  </div>
                </div>
                <div className='text-end'>
                  <p className="text-xl font-semibold text-gray-800">{flight.arrival2.time}</p>
                  <p className="text-sm text-gray-800">{flight.arrival2.airport}, {flight.arrival2.city},</p>
                  <p className="text-sm text-gray-600">{flight.arrival2.country}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Price and Book Now */}
        <div className="flex flex-col items-end justify-center">
          <p className="text-2xl font-bold text-gray-800 mb-2">${flight.price.toLocaleString()}</p>
          <button className="bg-primary hover:bg-primary-hover text-white py-2 px-3 font-medium rounded-md transition-colors">
            Book Now
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">{flight.seatsRemaining} seats remaining</p>
        <p className={`text-sm ${getRefundableColor(flight.refundable)}`}>
          {flight.refundable}
        </p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-md cursor-pointer font-medium text-primary hover:text-primary-hover"
        >
          View flight details
        </button>
      </div>

      {/* Additional Info Section */}
      {flight.additionalInfo && (
        <>
          <div className="border-t border-gray-300 mt-4 pt-2"></div>
          <div className="flex flex-wrap items-center gap-2">
            {flight.additionalInfo.ticket && (
              <div className="flex items-center gap-1">
                <span className="text-gray-700"><MdConfirmationNumber /></span>
                <span className="text-xs text-gray-800">{flight.additionalInfo.ticket}</span>
              </div>
            )}
            {flight.additionalInfo.terminal && (
              <div className="flex items-center gap-1">
                <span className="text-gray-700"><MdSwapHoriz /></span>
                <span className="text-xs text-gray-800">{flight.additionalInfo.terminal}</span>
              </div>
            )}
            {flight.additionalInfo.transfer && (
              <div className="flex items-center gap-1">
                <span className="text-gray-700"><MdDirectionsWalk /></span>
                <span className="text-xs text-gray-800">{flight.additionalInfo.transfer}</span>
              </div>
            )}
            {flight.additionalInfo.baggage && (
              <div className="flex items-center gap-1">
                <span className="text-gray-700"><MdLuggage /></span>
                <span className="text-xs text-gray-800">{flight.additionalInfo.baggage}</span>
              </div>
            )}
          </div>
        </>
      )}

      {/* Expanded Flight Details Section */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-300">
          {/* Tabs */}
          <div className="flex gap-6 mb-4 border-gray-200">
            <button
              onClick={() => setActiveTab('flight-info')}
              className={`pb-2 text-sm font-medium transition-colors ${activeTab === 'flight-info'
                  ? 'text-black border-b-2 border-primary'
                  : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              Flight Information
            </button>
            <button
              onClick={() => setActiveTab('fare-detail')}
              className={`pb-2 text-sm font-medium transition-colors ${activeTab === 'fare-detail'
                  ? 'text-black border-b-2 border-primary'
                  : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              Fare Detail
            </button>
            <button
              onClick={() => setActiveTab('baggage-rules')}
              className={`pb-2 text-sm font-medium transition-colors ${activeTab === 'baggage-rules'
                  ? 'text-black border-b-2 border-primary'
                  : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              Baggage Rules
            </button>
            <button
              onClick={() => setActiveTab('cancellation-rules')}
              className={`pb-2 text-sm font-medium transition-colors ${activeTab === 'cancellation-rules'
                  ? 'text-black border-b-2 border-primary'
                  : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              Cancellation Rules
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'flight-info' && (
            <div>
              {/* Airline and Route */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <img src={flight.airlineLogo} alt={flight.airline} className="h-6 w-6 object-contain" />
                  <span className="font-medium text-gray-800">{flight.airline}</span>
                </div>
                <span className="text-sm text-  ">
                  {flight.departure.city} → {flight.arrival.city}
                </span>
              </div>

              {/* Flight Segments */}
              <div className="space-y-4">
                {/* Segment 1 */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-stretch overflow-hidden rounded-lg gap-0">
                  <div className="bg-orange-50 py-4 px-4 rounded-l-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                      <div>
                        <p className="text-sm text-gray-600">{flight.departure.date}</p>
                        <p className="text-xl font-semibold text-gray-800">{flight.departure.time}</p>
                        <p className="text-sm text-gray-800">{flight.departure.airport}, {flight.departure.city}</p>
                        <p className="text-sm text-gray-600">{flight.departure.country}</p>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-1">{flight.duration}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <span className='text-gray-500'><IoIosAirplane /></span>
                            <div className="flex-1 h-px bg-gray-300"></div>
                          </div>
                        </div>
                      </div>
                      <div className='text-end'>
                        <p className="text-xl font-semibold text-gray-800">{flight.arrival.time}</p>
                        <p className="text-sm text-gray-800">{flight.arrival.airport}, {flight.arrival.city},</p>
                        <p className="text-sm text-gray-600">{flight.arrival.country}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 text-black items-center justify-end py-4 pl-2 rounded-r-lg">
                    <span className="text-sm"><FaPlay /></span>
                    {flight.hasWifi && <span className="text-sm"><FaWifi /></span>}
                    <span className="text-sm"><FaTrash /></span>
                    <span className="text-sm"><FaInfoCircle /></span>
                  </div>
                </div>

                {/* Layover Information */}
                {flight.stops && (
                  <div className="text-center text-sm text-gray-600 py-2">
                    {flight.stops.changeOfTerminal && 'Change of Terminal'}
                    {flight.stops.changeOfTerminal && flight.stops.changeOfPlanes && ' • '}
                    {flight.stops.changeOfPlanes && 'Change of planes'}
                    {(flight.stops.changeOfTerminal || flight.stops.changeOfPlanes) && ' • '}
                    {flight.stops.layoverDuration} Layover in {flight.stops.airport}
                  </div>
                )}

                {/* Segment 2 */}
                {flight.departure2 && flight.arrival2 && (
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-stretch overflow-hidden rounded-lg gap-0">
                    <div className="bg-orange-50 py-4 px-4 rounded-l-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                        <div>
                          <p className="text-sm text-gray-600">{flight.departure2.date}</p>
                          <p className="text-xl font-semibold text-gray-800">{flight.departure2.time}</p>
                          <p className="text-sm text-gray-800">{flight.departure2.airport}, {flight.departure2.city}</p>
                          <p className="text-sm text-gray-600">{flight.departure2.country}</p>
                        </div>
                        <div className="flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-sm text-gray-600 mb-1">{flight.duration}</p>
                            <div className="flex items-center gap-2">
                              <div className="flex-[2] h-px bg-gray-300"></div>
                              <span className='text-gray-500'><IoIosAirplane /></span>
                              <div className="flex-[2] h-px bg-gray-300"></div>
                            </div>
                          </div>
                        </div>
                        <div className='text-end'>
                          <p className="text-xl font-semibold text-gray-800">{flight.arrival2.time}</p>
                          <p className="text-sm text-gray-800">{flight.arrival2.airport}, {flight.arrival2.city},</p>
                          <p className="text-sm text-gray-600">{flight.arrival2.country}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 text-black items-center justify-end py-4 pl-2 rounded-r-lg">
                      <span className="text-sm"><FaPlay /></span>
                      {flight.hasWifi && <span className="text-sm"><FaWifi /></span>}
                      <span className="text-sm"><FaTrash /></span>
                      <span className="text-sm"><FaInfoCircle /></span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'fare-detail' && (
            <div className="py-4">
              <p className="text-gray-600">Fare details will be displayed here.</p>
            </div>
          )}

          {activeTab === 'baggage-rules' && (
            <div className="py-4">
              <p className="text-gray-600">Baggage rules will be displayed here.</p>
            </div>
          )}

          {activeTab === 'cancellation-rules' && (
            <div className="py-4">
              <p className="text-gray-600">Cancellation rules will be displayed here.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
