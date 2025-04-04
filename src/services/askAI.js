import { testInput } from "../Gemini/AI-Chatbot.js";

export const getAiresponse = async (req) => {
  try {
    const rawtext = req?.body?.text;
    const userId = req?.body?.userId;
    if (!userId) {
      throw new Error("User ID is required");
    }
    const response = await testInput(rawtext, userId);
    return response;
  } catch (error) {
    throw new Error("Data not found");
  }
};
