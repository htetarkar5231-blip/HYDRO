import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Safely initialize the client only if key is present
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export interface TipResponse {
  text: string;
  sources?: { title: string; uri: string }[];
}

export const getHydrationTip = async (
  currentIntake: number,
  timeOfDay: string,
  location?: { lat: number; lng: number }
): Promise<TipResponse> => {
  if (!ai) {
    return { text: "Please configure your API Key to receive personalized AI hydration tips!" };
  }

  try {
    const model = 'gemini-3-flash-preview';
    let prompt = `
      I have drunk ${currentIntake} Liters of water today.
      The local time is ${timeOfDay}.
    `;

    const tools: any[] = [];

    if (location) {
      prompt += `
      My location is Latitude: ${location.lat}, Longitude: ${location.lng}.
      Use Google Search to find the current weather conditions at this location.
      Based on the specific weather (temperature, humidity, condition) and the time of day, 
      give me a very short, cheerful, and witty one-sentence motivation to keep drinking water.
      `;
      tools.push({ googleSearch: {} });
    } else {
      prompt += `
      Give me a very short, cheerful, and witty one-sentence motivation to keep drinking water.
      Tailor it to the time of day (${timeOfDay}).
      `;
    }

    prompt += ` Do not use markdown for the main text. Just plain text.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        tools: tools.length > 0 ? tools : undefined,
      }
    });

    const text = response.text?.trim() || "Stay hydrated!";

    // Extract grounding sources if available
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => chunk.web)
      .filter((web: any) => web)
      .map((web: any) => ({ title: web.title, uri: web.uri }));

    return { text, sources };
  } catch (error) {
    console.error("Error fetching tip:", error);
    return { text: "Remember to drink water regularly!" };
  }
};