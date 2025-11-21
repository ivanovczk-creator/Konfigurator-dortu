import React from 'react';
import { CorpusType } from '../types';
import { CORPUS_IMAGES } from '../constants';

interface Props {
  selected: CorpusType | null;
  onSelect: (value: CorpusType) => void;
}

export const StepCorpus: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-serif font-bold text-brand-900 text-center mb-8">
        Vyberte korpus dortu
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Object.values(CorpusType).map((corpus) => (
          <button
            key={corpus}
            onClick={() => onSelect(corpus)}
            className={`
              group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 shadow-sm hover:shadow-xl
              flex flex-col items-center h-64
              ${selected === corpus 
                ? 'border-brand-500 ring-2 ring-brand-200 transform scale-105 z-10' 
                : 'border-transparent bg-white hover:border-brand-200'
              }
            `}
          >
            {/* Image Container */}
            <div className="w-full h-40 overflow-hidden">
              <img 
                src={CORPUS_IMAGES[corpus]} 
                alt={corpus}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            
            {/* Content */}
            <div className="flex flex-col items-center justify-center flex-1 w-full bg-white p-4">
               <span className="font-serif font-bold text-xl text-gray-800 group-hover:text-brand-700 transition-colors">
                 {corpus}
               </span>
               <span className="text-sm text-gray-500 mt-1">
                 {getCorpusDescription(corpus)}
               </span>
            </div>

            {selected === corpus && (
              <div className="absolute top-3 right-3 w-8 h-8 bg-brand-500 rounded-full text-white flex items-center justify-center shadow-lg animate-bounce">
                ✓
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// Helper to add a bit more context to the visual cards
const getCorpusDescription = (type: CorpusType): string => {
  switch (type) {
    case CorpusType.TMAVY: return 'Kvalitní kakao a čokoláda';
    case CorpusType.SVETLY: return 'Nadýchaný vanilkový piškot';
    case CorpusType.MECHOVY: return 'Se špenátem a pistáciemi';
    case CorpusType.RED_VELVET: return 'Sametově jemný a rudý';
    case CorpusType.ORECHOVY: return 'Plný vlašských ořechů';
    case CorpusType.KOKOSOVY: return 'Exotická chuť kokosu';
    default: return '';
  }
};