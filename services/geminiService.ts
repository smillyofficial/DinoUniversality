
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDailyProphecy = async (team: string = 'Neutral'): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an ancient mystical oracle in a Minecraft SMP called "Dino Universe". 
      Generate a cryptic, atmospheric daily prophecy for the ${team} team. 
      Mention themes of survival, betrayal, or natural chaos. Keep it under 60 words.`,
      config: {
        temperature: 1.0,
      }
    });
    return response.text || "The ground trembles as the ancients awaken. Watch your step, Guardian.";
  } catch (error) {
    return "The stars are silent today. Keep your sword sharp.";
  }
};

/**
 * Chatty and smart streaming version of server tips search.
 * Now dynamically matches the user's prompt length and handles easter eggs.
 */
export async function* searchServerTipsStream(query: string) {
  const isEasterEgg = query.toLowerCase().includes('/op') || query.toLowerCase().includes('admin');
  
  try {
    const result = await ai.models.generateContentStream({
      model: 'gemini-3-pro-preview',
      contents: `You are the Dino Universe Guide AI. 
      
      User Input: "${query}"
      
      CRITICAL INSTRUCTIONS:
      1. MATCH LENGTH: If the user writes a short message (e.g., "Hi", "Hello"), keep your response extremely short (1-2 sentences). If they write a long paragraph, match that detail and verbosity.
      2. TONE: Smart, helpful, chatty server veteran.
      3. EASTER EGG: If they type "/op" or ask for admin, play along jokingly like you're denying them access to the "core".
      4. DO NOT use markdown code blocks. Just write naturally.
      5. Reference the factions (Nether, Overworld, End Guardians) only when relevant.`,
      config: {
        temperature: 0.9,
        thinkingConfig: { thinkingBudget: 4000 }
      },
    });

    for await (const chunk of result) {
      if (chunk.text) {
        const cleanChunk = chunk.text.replace(/```[a-z]*\n?/gi, '').replace(/```/g, '');
        yield cleanChunk;
      }
    }
  } catch (error) {
    yield "The signal is flickering... Try sending your packet again.";
  }
}

export const getResourcesWithSearch = async (query: string): Promise<{ text: string, links: any[] }> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Find useful Minecraft info about: ${query}.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    return {
      text: response.text || "I couldn't find any specific data.",
      links: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    return {
      text: "The search pulse failed.",
      links: []
    };
  }
};

export const getDailyAffirmation = async (mood: string = 'uplifting'): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a brief affirmation. Tone: ${mood}.`,
      config: {
        temperature: 0.9,
      }
    });
    return response.text || "Your spirit is unbreakable.";
  } catch (error) {
    return "Stand tall, Guardian.";
  }
};
