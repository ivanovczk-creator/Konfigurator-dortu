import React, { useState } from 'react';
import { OrderState, CakeSize, CakeShape } from './types';
import { StepCorpus } from './components/StepCorpus';
import { StepFilling } from './components/StepFilling';
import { StepStructure } from './components/StepStructure';
import { StepLogistics } from './components/StepLogistics';
import { StepContact } from './components/StepContact';
import { ChevronRight, ChevronLeft, CheckCircle, PartyPopper } from 'lucide-react';

const INITIAL_STATE: OrderState = {
  step: 1,
  corpus: null,
  filling: null,
  shape: null,
  tiers: 1,
  size: null,
  customPortions: '',
  locationId: null,
  pickupDate: '',
  contactName: '',
  contactPhone: '',
  contactEmail: '',
  note: '',
  image: null,
};

const STEPS = [
  { id: 1, title: 'Korpus' },
  { id: 2, title: 'Náplň' },
  { id: 3, title: 'Tvar a Velikost' },
  { id: 4, title: 'Vyzvednutí' },
  { id: 5, title: 'Detaily' },
];

function App() {
  const [order, setOrder] = useState<OrderState>(INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);

  const updateOrder = (key: keyof OrderState, value: any) => {
    setOrder(prev => {
      const newState = { ...prev, [key]: value };
      
      // Special logic: If shape is Heart, force tiers to 1
      if (key === 'shape' && value === CakeShape.SRDCE) {
        newState.tiers = 1;
      }
      
      return newState;
    });
  };

  const nextStep = () => {
    // Basic validation
    if (order.step === 1 && !order.corpus) return alert("Prosím vyberte korpus.");
    if (order.step === 2 && !order.filling) return alert("Prosím vyberte náplň.");
    if (order.step === 3) {
      if (!order.shape) return alert("Prosím vyberte tvar.");
      if (order.shape === CakeShape.KULATY || order.shape === CakeShape.SRDCE) {
        if (!order.size) return alert("Prosím vyberte velikost.");
        if (order.size === CakeSize.CUSTOM && !order.customPortions) return alert("Prosím zadejte počet porcí.");
      }
    }
    if (order.step === 4) {
      if (!order.locationId) return alert("Prosím vyberte místo vyzvednutí.");
      if (!order.pickupDate) return alert("Prosím vyberte datum vyzvednutí.");
    }
    
    setOrder(prev => ({ ...prev, step: prev.step + 1 }));
  };

  const prevStep = () => {
    setOrder(prev => ({ ...prev, step: prev.step - 1 }));
  };

  const handleSubmit = () => {
    if (!order.contactName || !order.contactPhone || !order.contactEmail) {
      return alert("Prosím vyplňte všechny kontaktní údaje.");
    }

    // Construct Email Body
    const subject = encodeURIComponent("Objednávka dortu - Sladké Sny");
    
    const imageNote = order.image 
      ? `\nPOZOR: K objednávce byl nahrán obrázek (${order.image.name}). Prosím, přiložte tento obrázek k emailu ručně.` 
      : "";

    const bodyText = `
Nová objednávka dortu ze systému Sladké Sny
-------------------------------------------
SPECIFIKACE DORTU:
Korpus: ${order.corpus}
Náplň: ${order.filling}
Tvar: ${order.shape}
Patra: ${order.tiers}
Velikost: ${order.size === CakeSize.CUSTOM ? order.customPortions : order.size}

VYZVEDNUTÍ:
Místo: ${order.locationId === 'petrvald' ? 'Petřvald' : order.locationId === 'karvina' ? 'Karviná' : order.locationId === 'ostrava' ? 'Ostrava' : 'Píšť'}
Datum: ${order.pickupDate}

KONTAKTNÍ ÚDAJE:
Jméno: ${order.contactName}
Telefon: ${order.contactPhone}
Email: ${order.contactEmail}

POZNÁMKA:
${order.note || "Bez poznámky"}

AI POPIS (pokud byl vygenerován):
${order.aiDescription || "-"}
${imageNote}
    `;

    const body = encodeURIComponent(bodyText);
    
    // Open Mail Client
    window.location.href = `mailto:objednavky@cukrarstviblahutovi.cz?subject=${subject}&body=${body}`;

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full text-center space-y-6 animate-fadeIn">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
            <PartyPopper size={40} />
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-800">Děkujeme za poptávku!</h1>
          <p className="text-gray-600 text-lg">
            Otevřeli jsme vašeho emailového klienta s předvyplněnou objednávkou. Prosím <strong>odešlete email</strong> pro dokončení procesu.
          </p>
          {order.image && (
             <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-left text-sm text-yellow-800">
               <strong>Důležité:</strong> Vybrali jste vlastní fotografii dortu. Nezapomeňte ji prosím přiložit k emailu jako přílohu před odesláním.
             </div>
          )}
          <div className="bg-gray-50 p-4 rounded-lg text-left text-sm text-gray-600 space-y-2">
             <p><strong>Jméno:</strong> {order.contactName}</p>
             <p><strong>Místo:</strong> {order.locationId === 'petrvald' ? 'Petřvald' : order.locationId === 'karvina' ? 'Karviná' : order.locationId === 'ostrava' ? 'Ostrava' : 'Píšť'}</p>
             <p><strong>Datum:</strong> {order.pickupDate}</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 transition-colors"
          >
            Vytvořit další objednávku
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center text-white font-serif font-bold">S</div>
            <span className="font-serif text-xl font-bold text-gray-800 tracking-wide">Sladké Sny</span>
          </div>
          <div className="text-sm text-gray-500 hidden sm:block">
            Konfigurátor dortu
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-1.5">
          <div 
            className="bg-brand-500 h-1.5 transition-all duration-500 ease-out" 
            style={{ width: `${(order.step / STEPS.length) * 100}%` }}
          ></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-10 overflow-x-auto pb-2">
           {STEPS.map((s, idx) => {
             const isActive = order.step === s.id;
             const isCompleted = order.step > s.id;
             return (
               <div key={s.id} className="flex items-center gap-2 min-w-fit px-2">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors
                    ${isActive ? 'bg-brand-600 text-white' : isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}
                  `}>
                    {isCompleted ? <CheckCircle size={16} /> : s.id}
                  </div>
                  <span className={`text-sm font-medium hidden sm:block ${isActive ? 'text-brand-900' : 'text-gray-400'}`}>
                    {s.title}
                  </span>
               </div>
             );
           })}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 min-h-[400px]">
          {order.step === 1 && (
            <StepCorpus 
              selected={order.corpus} 
              onSelect={(v) => updateOrder('corpus', v)} 
            />
          )}
          {order.step === 2 && (
            <StepFilling 
              selected={order.filling} 
              onSelect={(v) => updateOrder('filling', v)} 
            />
          )}
          {order.step === 3 && (
            <StepStructure
              shape={order.shape}
              tiers={order.tiers}
              size={order.size}
              customPortions={order.customPortions}
              onShapeChange={(v) => updateOrder('shape', v)}
              onTiersChange={(v) => updateOrder('tiers', v)}
              onSizeChange={(v) => updateOrder('size', v)}
              onCustomPortionsChange={(v) => updateOrder('customPortions', v)}
            />
          )}
          {order.step === 4 && (
            <StepLogistics
              locationId={order.locationId}
              date={order.pickupDate}
              onLocationChange={(v) => updateOrder('locationId', v)}
              onDateChange={(v) => updateOrder('pickupDate', v)}
            />
          )}
          {order.step === 5 && (
            <StepContact
              order={order}
              onChange={updateOrder}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={order.step === 1}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all
              ${order.step === 1 ? 'opacity-0 pointer-events-none' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}
            `}
          >
            <ChevronLeft size={20} />
            Zpět
          </button>

          {order.step === STEPS.length ? (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              Dokončit objednávku
              <CheckCircle size={20} />
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-8 py-3 bg-brand-600 text-white rounded-full font-bold hover:bg-brand-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              Další krok
              <ChevronRight size={20} />
            </button>
          )}
        </div>

      </main>
    </div>
  );
}

export default App;