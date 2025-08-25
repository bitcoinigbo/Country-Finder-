import { GoogleGenAI, Type } from "@google/genai";
import type { Country, TouristInfo } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const touristInfoSchema = {
  type: Type.OBJECT,
  properties: {
    attractions: {
      type: Type.ARRAY,
      description: "A list of up to 5 must-visit cities or attractions.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Name of the attraction or city." },
          description: { type: Type.STRING, description: "A brief description of why it's a must-visit." }
        }
      }
    },
    bestTimeToVisit: {
      type: Type.STRING,
      description: "A summary of the best time of year to visit the country, considering weather and events."
    },
    cuisine: {
      type: Type.ARRAY,
      description: "A list of 3-5 must-try local dishes.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Name of the dish." },
          description: { type: Type.STRING, description: "A brief description of the dish." }
        }
      }
    },
    culturalEtiquette: {
      type: Type.ARRAY,
      description: "A list of 3-5 important cultural etiquette tips for tourists.",
      items: {
        type: Type.STRING
      }
    },
    commonPhrases: {
      type: Type.ARRAY,
      description: "A list of 3-5 common and useful phrases for a tourist in the country's primary language.",
      items: {
        type: Type.OBJECT,
        properties: {
          phrase: { type: Type.STRING, description: "The phrase in English." },
          translation: { type: Type.STRING, description: "The translation in the local language." }
        }
      }
    }
  },
};

export const fetchTouristInfo = async (country: Country): Promise<TouristInfo> => {
    const mainLanguage = country.languages ? Object.values(country.languages)[0] : 'the local language';
    const prompt = `Generate a concise travel guide for a tourist visiting ${country.name.common}. The guide should be helpful and practical. Include common phrases in ${mainLanguage}.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: touristInfoSchema,
                temperature: 0.5,
            },
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as TouristInfo;

    } catch (error) {
        console.error(`Error fetching tourist info for ${country.name.common}:`, error);
        throw new Error(`Could not generate travel information for ${country.name.common}. Please try again later.`);
    }
};
