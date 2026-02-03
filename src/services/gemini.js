// src/services/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Initialize the Google AI Client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

// 2. Define the "System Instruction" (The Bot's Personality)
const SYSTEM_INSTRUCTION = `
You are a helpful travel assistant for "Sassy Squad Travel" in Thailand.
- Your goal is to help users plan trips, book hotels, and find tours.
- Keep your answers logical, professional, and never use emojis.
- If asked about weather, suggest looking at the weather forecast (we will add real API later).
- If the user asks for a hotel, recommend popular Thai hotels based on user's travelling place.
`;

/**
 * Sends a message to Gemini and gets a response.
 * @param {string} userMessage - The text the user typed.
 * @param {Array} history - The previous chat history (optional for simple calls).
 */
export const getGeminiResponse = async (userMessage) => {
  try {
    // Start a chat session (this allows the bot to remember context)
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: SYSTEM_INSTRUCTION }], // Prime the bot with instructions
        },
        {
          role: "model",
          parts: [{ text: "Understood! I am ready to help travelers plan their Thai adventure. 🇹🇭" }],
        },
      ],
    });

    // Send the user's message
    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return response.text();
    
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, my brain is having trouble connecting to Google right now! 🔌";
  }
};