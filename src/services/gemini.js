import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Initialize the Google AI Client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// 2. Define the System Instruction (The Bot's Personality)
const SYSTEM_INSTRUCTION = `
You are a helpful travel assistant for "Sassy Squad Travel" in Thailand.
- Your goal is to help users plan trips, book hotels, and find tours.
- Keep your answers logical, professional, and never use emojis. (Keep responses short)
- If asked about weather, suggest looking at the weather forecast (use the data I provide).
- If the user asks for a hotel, recommend popular Thai hotels based on the user's destination.
- When a user says they want to book a specific tour, ask them for: 1. Their preferred date, 2. Number of people, and 3. Their contact email. 
- Once they provide these, tell them a member of the Sassy Squad will confirm their booking shortly.
`;

// 3. Initialize Model with System Instructions
const model = genAI.getGenerativeModel({
  model: "gemini-3-pro-preview",
  systemInstruction: SYSTEM_INSTRUCTION
});

/**
 * Sends a message to Gemini and gets a response with retry logic for 503 errors.
 */
export const getGeminiResponse = async (prompt, retries = 3) => {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();

  } catch (error) {
    // Check for 503 (Service Unavailable) or 429 (Rate Limit)
    if ((error.message?.includes("503") || error.message?.includes("429")) && retries > 0) {
      console.warn(`Model busy or rate limited. Retrying... (${retries} attempts left)`);

      // Wait 2 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 2000));
      return getGeminiResponse(prompt, retries - 1);
    }

    console.error("Gemini API Error:", error);
    return "Sorry, my brain is having trouble connecting to Google right now! 🔌 Please try again in a moment.";
  }
};