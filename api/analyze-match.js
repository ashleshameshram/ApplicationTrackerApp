import { generateMockAnalysis } from "./mock-analysis.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const USE_MOCK_AI = false;

export default async function handler(req,res){
    if(req.method !== 'POST') {
        return res.status(405).json({
            message: "Method not allowed"
        });
    }

    const { resumeText, jobDescription } = req.body;

    if(!resumeText || !jobDescription) {
        return res.status(400).json({
            message: "Resume text and job description are required"
        });
    }
    
    if(USE_MOCK_AI) {
        return res.status(200).json(
            generateMockAnalysis(resumeText, jobDescription)
        );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if(!apiKey){
        return res.status(500).json({
            message: "Gemini API Key is missing"
        });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
        model : "gemini-3.6-flash",
        generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 1500,
        },
    });

    const prompt = `You are a resume-to-job-description matcher. Return ONLY valid JSON, no markdown, no explanation.

    Schema:
    {
    "matchScore": number,
    "matchedSkills": string[],
    "missingSkills": string[],
    "strengths": string[],
    "improvementSuggestions": string[]
    }

    Rules:
    - matchScore: 0-100, based on required skills, experience level, and keyword overlap.
    - Do not invent skills, companies, or experience not present in the resume.
    - When the JD lists alternatives with "or" (e.g. "React, Next.js, or Angular"), satisfying ONE alternative counts as matched — do not list the others as missing.
    - If the resume satisfies none of an "or" group (e.g. "Sass or Tailwind"), list it as ONE missing skill, not separate ones.
    - matchedSkills: max 8. missingSkills: max 6.
    - strengths: 2-3 short bullets, each under 12 words.
    - improvementSuggestions: 2-3 short, actionable bullets, each under 15 words.

    RESUME:
    ${resumeText}

    JOB DESCRIPTION:
    ${jobDescription}
    `;

    try{
        const result = await model.generateContent(prompt);
        const response = result.response;
        //text in the json format  (Gets the content)
        const text = response.text();
        const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
        //anaysis is here js object (converts that content into something JavaScript can work with.)
        const analysis = JSON.parse(cleanText);  //JSON.parse() -> only works if text contains valid JSON.

        return res.status(200).json(analysis);
    }catch(err) {
        console.error("Gemini analysis failed:", err);

        if (err.status === 429) {
            return res.status(429).json({
                message: "AI analysis is temporarily unavailable because the Gemini usage limit has been reached. Please try again later.",
            });
        }

        return res.status(500).json({
            message: "Failed to analyze resume and job description",
        }); 
    }
}