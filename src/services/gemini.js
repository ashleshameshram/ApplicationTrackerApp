import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model : "gemini-3.6-flash",
});

export async function generateAIResponse(prompt) {
    try{
        const result = await model.generateContent(prompt);
        const response = result.response;
        return response.text();
    }catch(e){
        console.error("Gemini API Error:", e);
        throw new Error("Failed to generate AI response");
    }
}