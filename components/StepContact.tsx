import React, { useState } from 'react';
import { OrderState } from '../types';
import { Upload, User, Mail, Phone, MessageSquare, Sparkles } from 'lucide-react';
import { generateCakeDescription } from '../services/geminiService';

interface Props {
  order: OrderState;
  onChange: (field: keyof OrderState, value: any) => void;
}

export const StepContact: React.FC<Props> = ({ order, onChange }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAiGenerate = async () => {
    setIsGenerating(true);
    const description = await generateCakeDescription(order);
    onChange('aiDescription', description);
    setIsGenerating(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onChange('image', e.target.files[0]);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-2xl font-serif font-bold text-brand-900 text-center">
        Detaily a kontaktní údaje
      </h2>

      {/* AI Teaser */}
      <div className="bg-gradient-to-r from-brand-50 to-pink-100 p-6 rounded-xl shadow-sm border border-brand-100">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-full text-brand-500 shadow-sm">
            <Sparkles size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-brand-900 text-lg">Jak bude váš dort vypadat?</h3>
            {order.aiDescription ? (
               <p className="mt-2 text-brand-800 italic font-serif text-lg leading-relaxed">
                 "{order.aiDescription}"
               </p>
            ) : (
              <p className="text-gray-600 mt-1">
                Nechte naši AI vykouzlit popis vašeho vysněného dortu ještě předtím, než ho upečeme.
              </p>
            )}
            
            {!order.aiDescription && (
              <button 
                onClick={handleAiGenerate}
                disabled={isGenerating}
                className="mt-4 px-4 py-2 bg-white text-brand-600 font-semibold rounded-lg shadow-sm border border-brand-200 hover:bg-brand-50 transition-colors flex items-center gap-2"
              >
                {isGenerating ? 'Přemýšlím...' : 'Popsat můj dort'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* File & Notes */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fotografie pro inspiraci (nepovinné)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:bg-gray-50 transition-colors bg-white">
              <div className="space-y-1 text-center">
                {order.image ? (
                   <div className="text-brand-600 font-medium break-all">
                     {order.image.name}
                     <button onClick={() => onChange('image', null)} className="text-red-500 text-xs block mt-2 hover:underline">Odstranit</button>
                   </div>
                ) : (
                  <>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-600 hover:text-brand-500 focus-within:outline-none">
                        <span>Nahrát soubor</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                      </label>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <MessageSquare size={16} /> Poznámka k objednávce
            </label>
            <textarea
              rows={4}
              value={order.note}
              onChange={(e) => onChange('note', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
              placeholder="Alergie, text na dort, speciální zdobení..."
            ></textarea>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-fit">
          <h3 className="font-semibold text-gray-800 border-b pb-2 mb-4">Kontaktní údaje</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jméno a Příjmení</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                required
                value={order.contactName}
                onChange={(e) => onChange('contactName', e.target.value)}
                className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="tel"
                required
                value={order.contactPhone}
                onChange={(e) => onChange('contactPhone', e.target.value)}
                className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                required
                value={order.contactEmail}
                onChange={(e) => onChange('contactEmail', e.target.value)}
                className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};