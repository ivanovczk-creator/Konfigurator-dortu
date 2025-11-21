import React from 'react';
import { LOCATIONS, PickupLocation } from '../types';
import { MapPin, Phone, Calendar } from 'lucide-react';

interface Props {
  locationId: string | null;
  date: string;
  onLocationChange: (id: string) => void;
  onDateChange: (date: string) => void;
}

export const StepLogistics: React.FC<Props> = ({ locationId, date, onLocationChange, onDateChange }) => {
  
  // Calculate min date (e.g., 3 days from now)
  const today = new Date();
  today.setDate(today.getDate() + 3);
  const minDate = today.toISOString().split('T')[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-2xl font-serif font-bold text-brand-900 text-center">
        Kdy a kde si dort vyzvednete?
      </h2>

      <section>
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <MapPin size={20} className="text-brand-500"/>
          Místo vyzvednutí
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LOCATIONS.map((loc) => (
            <button
              key={loc.id}
              onClick={() => onLocationChange(loc.id)}
              className={`
                p-4 rounded-xl border-2 text-left transition-all hover:shadow-md flex flex-col gap-1
                ${locationId === loc.id 
                  ? 'border-brand-500 bg-white ring-1 ring-brand-200 shadow-md' 
                  : 'border-gray-200 bg-white text-gray-600 hover:border-brand-300'
                }
              `}
            >
              <div className="flex justify-between items-start w-full">
                <span className="font-bold text-lg text-gray-800">{loc.name}</span>
                <span className="text-xs font-semibold px-2 py-1 bg-gray-100 rounded-full text-gray-500">{loc.type}</span>
              </div>
              <p className="text-gray-600">{loc.address}</p>
              <div className="flex items-center gap-2 text-sm text-brand-600 mt-2">
                <Phone size={14} />
                {loc.phone}
              </div>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
           <Calendar size={20} className="text-brand-500"/>
           Datum vyzvednutí
        </h3>
        <div className="max-w-xs">
          <input
            type="date"
            min={minDate}
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-gray-700"
          />
          <p className="text-xs text-gray-500 mt-2 ml-1">
            * Objednávky přijímáme minimálně 3 dny předem.
          </p>
        </div>
      </section>
    </div>
  );
};