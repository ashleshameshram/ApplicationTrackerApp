import { generateMockInterviewQuestions } from "./mock-interview-prep.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const USE_MOCK_AI = true;
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
    model : "gemini-3.6-flash",
});

export default async function handler(req,res) {
    if(req.method !== 'POST'){
        return res.status(405).json({
            message: "Method not allowed"
        });
    }

    const { role, difficulty, focusAreas } = req.body;

    if(!role || !difficulty || !focusAreas) {
        return res.status(400).json({
            message: "Interview preparation details are required",
        });
    }

    if(USE_MOCK_AI){
        return res.status(200).json(
            generateMockInterviewQuestions({
                role,
                difficulty,
                focusAreas
            })
        );
    }
    const prompt = `You are an expert technical interviewer and career coach.

    Generate interview preparation questions for the following candidate:

    Role: ${role}
    Difficulty: ${difficulty}

    Selected focus areas:
    ${JSON.stringify(focusAreas)}

    Rules:
    - Generate exactly 10 questions for EVERY selected focus area.
    - If Technical is selected, generate 10 Technical questions.
    - If Behavioral is selected, generate 10 Behavioral questions.
    - If HR is selected, generate 10 HR / General questions.
    - Do not generate questions for unselected focus areas.
    - Questions must be specific to the selected role.
    - Questions must match the selected difficulty level.
    - Avoid duplicate or nearly identical questions.
    - Return ONLY valid JSON.
    - Do not use markdown code fences.
    - Do not include any explanation outside the JSON.

    Return exactly this structure:

    {
        "role": "${role}",
        "difficulty": "${difficulty}",
        "questions": [
            {
                "category": "Technical",
                "question": "..."
            },
            {
                "category": "Behavioral",
                "question": "..."
            },
            {
                "category": "HR / General",
                "question": "..."
            }
        ]
    }

    The questions array should contain only the selected categories.
    `;
    try{
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
        const interviewPrep = JSON.parse(cleanText);
        return res.status(200).json(interviewPrep);
    }catch(e){
        console.error("Gemini Interview Preparation failed:", e);
        return res.status(500).json({
            message: "Failed to generate interview questions",
            error: e.message
        });
    }
}