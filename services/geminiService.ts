import { GoogleGenAI } from "@google/genai";
import { OrderState, LOCATIONS } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  // Silently fail if no key is present, returning null to trigger fallback
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateCakeDescription = async (order: OrderState): Promise<string> => {
  const ai = getClient();
  
  // Fallback message logic (Smart Template)
  const smartFallback = () => {
    const sizeText = order.size === 'Vlastní počet porcí' ? order.customPortions : order.size;
    return `Výborná volba! Váš dort ve tvaru ${order.shape} (${sizeText}) s korpusem ${order.corpus} a lahodnou náplní ${order.filling} připravíme s maximální péčí z těch nejkvalitnějších surovin, aby byl ozdobou vaší oslavy.`;
  };

  // If no AI client (no API key), use smart fallback immediately
  if (!ai) {
    return smartFallback();
  }

  const prompt = `
    Jsi zkušený cukrář. Vytvoř lákavý, krátký (max 2 věty) popis dortu pro zákazníka na základě této objednávky, aby se na něj těšil.
    Buď kreativní a poetický.
    
    Data objednávky:
    - Korpus: ${order.corpus}
    - Náplň: ${order.filling}
    - Tvar: ${order.shape}
    - Patra: ${order.tiers}
    - Velikost/Porce: ${order.size === 'Vlastní počet porcí' ? order.customPortions : order.size}
    - Poznámka zákazníka: ${order.note || 'Bez poznámky'}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || smartFallback();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return smartFallback();
  }
};