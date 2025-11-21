import React from 'react';
import { CakeShape, CakeSize } from '../types';
import { SHAPE_IMAGES } from '../constants';
import { Layers, AlertCircle } from 'lucide-react';

interface Props {
  shape: CakeShape | null;
  tiers: number;
  size: CakeSize | null;
  customPortions: string;
  onShapeChange: (s: CakeShape) => void;
  onTiersChange: (t: number) => void;
  onSizeChange: (s: CakeSize) => void;
  onCustomPortionsChange: (v: string) => void;
}

export const StepStructure: React.FC<Props> = ({
  shape,
  tiers,
  size,
  customPortions,
  onShapeChange,
  onTiersChange,
  onSizeChange,
  onCustomPortionsChange,
}) => {
  
  const isRect = shape === CakeShape.OBDELNIK_A4 || shape === CakeShape.OBDELNIK_A5;
  const isHeart = shape === CakeShape.SRDCE;

  return (
    <div className="space-y-10 animate-fadeIn">
      <h2 className="text-2xl font-serif font-bold text-brand-900 text-center">
        Tvar a velikost dortu
      </h2>

      {/* Shapes */}
      <section>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">1. Tvar dortu</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.values(CakeShape).map((s) => (
            <button
              key={s}
              onClick={() => onShapeChange(s)}
              className={`
                group relative flex flex-col items-center overflow-hidden rounded-xl border-2 transition-all duration-300 h-48
                ${shape === s 
                  ? 'border-brand-500 bg-white shadow-md transform scale-105 z-10' 
                  : 'border-gray-200 bg-white hover:border-brand-300'
                }
              `}
            >
              <div className="w-full h-32 overflow-hidden">
                <img 
                  src={SHAPE_IMAGES[s]} 
                  alt={s}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex items-center justify-center flex-1 w-full bg-white p-2">
                <span className={`text-sm font-bold text-center ${shape === s ? 'text-brand-700' : 'text-gray-600'}`}>
                  {s}
                </span>
              </div>
              
              {shape === s && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-brand-500 rounded-full text-white flex items-center justify-center shadow-md text-xs">
                  ✓
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Tiers */}
      <section className="relative">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">2. Počet pater</h3>
        
        <div className={`flex gap-4 justify-center transition-opacity duration-300 ${isHeart ? 'opacity-40 pointer-events-none grayscale' : ''}`}>
          {[1, 2, 3].map((t) => (
            <button
              key={t}
              onClick={() => onTiersChange(t)}
              className={`
                flex flex-col items-center justify-center w-24 h-28 rounded-xl border-2 transition-all
                ${tiers === t 
                  ? 'border-brand-500 bg-brand-500 text-white shadow-lg scale-105' 
                  : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                }
              `}
            >
              <Layers className="mb-2" size={28} />
              <span className="font-bold text-xl">{t}</span>
            </button>
          ))}
        </div>

        {isHeart && (
          <div className="mt-4 p-3 bg-pink-50 border border-pink-100 rounded-lg flex items-center justify-center gap-2 text-brand-700 animate-fadeIn">
            <AlertCircle size={20} />
            <span className="font-medium">Dort ve tvaru srdce lze připravit pouze jednopatrový.</span>
          </div>
        )}
      </section>

      {/* Size */}
      <section>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">3. Velikost / Průměr</h3>
        
        {isRect ? (
          <div className="p-4 bg-blue-50 text-blue-800 rounded-lg text-center border border-blue-100">
            Pro obdélníkové dorty je velikost dána formátem (A4/A5). 
            <br/>
            <span className="text-sm mt-1 block text-blue-600">Pokud potřebujete jinou velikost, zadejte vlastní počet porcí níže.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {Object.values(CakeSize).filter(s => s !== CakeSize.CUSTOM).map((s) => (
              <button
                key={s}
                onClick={() => onSizeChange(s)}
                className={`
                  p-3 rounded-lg border-2 text-left transition-colors
                  ${size === s 
                    ? 'border-brand-500 bg-brand-50 text-brand-900 font-semibold' 
                    : 'border-gray-100 bg-white text-gray-700 hover:border-brand-200'
                  }
                `}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Custom Portions */}
        <div className={`mt-4 p-4 rounded-lg border-2 transition-colors ${size === CakeSize.CUSTOM ? 'border-brand-400 bg-white' : 'border-transparent bg-gray-50'}`}>
           <label className="flex items-center gap-3 cursor-pointer mb-2">
             <input 
                type="radio" 
                name="sizeSelect" 
                checked={size === CakeSize.CUSTOM} 
                onChange={() => onSizeChange(CakeSize.CUSTOM)}
                className="w-5 h-5 text-brand-600 focus:ring-brand-500"
             />
             <span className="font-medium text-gray-700">Vlastní požadavek na porce</span>
           </label>
           
           {size === CakeSize.CUSTOM && (
             <input
               type="text"
               placeholder="Např. 35 porcí"
               value={customPortions}
               onChange={(e) => onCustomPortionsChange(e.target.value)}
               className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
             />
           )}
        </div>
      </section>
    </div>
  );
};