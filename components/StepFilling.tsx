import React from 'react';
import { FillingType } from '../types';
import { FILLING_IMAGES } from '../constants';

interface Props {
  selected: FillingType | null;
  onSelect: (value: FillingType) => void;
}

export const StepFilling: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-serif font-bold text-brand-900 text-center mb-8">
        Zvolte lahodnou náplň
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {Object.values(FillingType).map((filling) => (
          <button
            key={filling}
            onClick={() => onSelect(filling)}
            className={`
              group relative p-2 rounded-xl border-2 transition-all duration-300 shadow-sm hover:shadow-md
              flex items-center gap-3 text-left overflow-hidden
              ${selected === filling 
                ? 'border-brand-500 bg-brand-50' 
                : 'border-gray-100 bg-white hover:border-brand-200'
              }
            `}
          >
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 shadow-inner">
              <img 
                src={FILLING_IMAGES[filling]} 
                alt={filling}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            
            <div className="flex flex-col">
              <span className={`font-bold ${selected === filling ? 'text-brand-900' : 'text-gray-800'}`}>
                {filling}
              </span>
              <span className="text-xs text-gray-500">Krém & ovoce</span>
            </div>

            {selected === filling && (
               <div className="absolute top-2 right-2 w-3 h-3 bg-brand-500 rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};