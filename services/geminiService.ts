import { GoogleGenAI } from "@google/genai";
import { OrderState, LOCATIONS } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateCakeDescription = async (order: OrderState): Promise<string> => {
  const ai = getClient();
  if (!ai) return "Omlouváme se, AI asistent není momentálně k dispozici.";

  const location = LOCATIONS.find(l => l.id === order.locationId);
  
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
    
    return response.text || "Váš dort bude připraven s láskou.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Nepodařilo se načíst popis od AI, ale váš dort bude určitě skvělý!";
  }
};
