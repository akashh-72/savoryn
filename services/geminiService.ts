import { GoogleGenAI, Type } from "@google/genai";
import { RecipeMetadata } from "../types";

// NOTE: In a real production app, you should not expose the API key in the frontend code
// if possible, or restrict it heavily. Here we assume it is injected via build process.
const API_KEY = process.env.API_KEY || ''; 

// If no API key is present, we will fallback to mock generation to prevent app crash
const hasKey = !!API_KEY;

const ai = hasKey ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const generateRecipeFromIdea = async (idea: string): Promise<RecipeMetadata & { title: string; description: string } | null> => {
  if (!ai) {
    console.warn("Gemini API Key missing. Returning mock data.");
    await new Promise(resolve => setTimeout(resolve, 1500)); // Fake delay
    return {
      title: "Mock AI Recipe: " + idea,
      description: "This is a simulated recipe generated because no API key was found.",
      ingredients: ["Mock Ingredient 1", "Mock Ingredient 2"],
      steps: ["Step 1: Pretend to cook.", "Step 2: Enjoy."],
      cookingTime: "15 mins",
      difficulty: "Easy"
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Create a structured recipe for: ${idea}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            ingredients: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            steps: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            cookingTime: { type: Type.STRING },
            difficulty: { type: Type.STRING, enum: ['Easy', 'Medium', 'Hard', 'Chef'] }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    return null;
  } catch (error) {
    console.error("Gemini generation failed", error);
    return null;
  }
};
