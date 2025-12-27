import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Safely initialize the client only if key is present
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getHydrationTip = async (currentIntake: number): Promise<string> => {
  if (!ai) {
    return "Please configure your API Key to receive personalized AI hydration tips!";
  }

  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      I have drunk ${currentIntake} Liters of water today.
      Give me a very short, cheerful, and witty one-sentence motivation to keep drinking water.
      Do not use markdown. Just plain text.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text?.trim() || "Stay hydrated!";
  } catch (error) {
    console.error("Error fetching tip:", error);
    return "Remember to drink water regularly!";
  }
};
