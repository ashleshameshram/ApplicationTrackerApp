import { generateMockInterviewQuestions } from "./mock-interview-prep.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const USE_MOCK_AI = false;
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
    model : "gemini-3.6-flash",
    generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 1500,
    },
});
const QUESTIONS_PER_CATEGORY = 7;

function buildPrompt(role, specificArea, difficulty, category) {
    return (
    `You are an expert technical interviewer and career coach.
    Generate exactly ${QUESTIONS_PER_CATEGORY} ${category} interview questions for this candidate:

    Role: ${role}
    Specific Skills / Technology: ${specificArea || "General role-based questions"}
    Difficulty: ${difficulty}

    Rules:
    - Questions must be specific to the role and match the difficulty level.
    - For Technical questions, if a Specific Skill / Technology is provided, focus ALL questions specifically on that skill.
    - For Behavioral and HR / General questions, focus on the candidate's role and interview readiness rather than the specific technology.
    - Avoid duplicate or nearly identical questions.
    - Return ONLY valid JSON, no markdown fences, no explanation text.

    Return exactly this structure:
    {
        "questions": [
            { "category": "${category}", "question": "..." }
        ]
    }`);
}
async function generateCategoryQuestions(role, specificArea, difficulty, category){
    const prompt = buildPrompt(role, specificArea, difficulty, category);
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleanText);

    if(!Array.isArray(parsed.questions)) {
        throw new Error(`Invalid response for category: ${category} `);
    }
    for(const item of parsed.questions) {
        if(!item.category || !item.question){
            throw new Error(`Invalid question format in category: ${category}`);
        }
    }
    return parsed.questions;
}

export default async function handler(req,res) {
    if(req.method !== 'POST'){
        return res.status(405).json({
            message: "Method not allowed"
        });
    }

    const { role, specificArea, difficulty, focusAreas } = req.body;

    if(!role || !difficulty || !focusAreas) {
        return res.status(400).json({
            message: "Interview preparation details are required",
        });
    }

    if(USE_MOCK_AI){
        return res.status(200).json(
            generateMockInterviewQuestions({
                role,
                specificArea,
                difficulty,
                focusAreas
            })
        );
    }

    const categoryMap = {
        technical: "Technical",
        behavioral: "Behavioral",
        hr: "HR / General",
    };

    const selectedCategories = Object.entries(focusAreas)
        .filter(([, isSelected]) => isSelected)
        .map(([key]) => categoryMap[key])
        .filter(Boolean);
    
    if(selectedCategories.length === 0) {
        return res.status(400).json({
            message: "At least one focus area must be selected"
        });
    }

    try {
        const results = await Promise.all(
            selectedCategories.map((category) => 
                generateCategoryQuestions(role, specificArea, difficulty, category)
        ));
        const questions = results.flat();

        return res.status(200).json({ role,specificArea,difficulty, questions });
    } catch (e) {
        console.error("Gemini Interview Preparation failed:", e);

        if (e.status === 429) {
            return res.status(429).json({
                message: "AI generation is temporarily unavailable because the Gemini usage limit has been reached. Please try again later.",
            });
        }

        return res.status(500).json({
            message: "Failed to generate interview questions",
        });
    }
}