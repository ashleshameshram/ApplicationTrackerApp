import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model : "gemini-3.6-flash",
});


export default async function handler(req,res){
    if(!apiKey){
        return res.status(500).json({
            message: "Gemini API Key is missing"
        });
    }
    
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

    const prompt = `You are a career-coaching resume analyzer.

    You will be given a candidate's resume text and a job description.
    Compare them and return ONLY valid JSON — no markdown code fences,
    no explanation text before or after — matching exactly this schema:

    {
    "matchScore": number,
    "matchedSkills": string[],
    "missingSkills": string[],
    "strengths": string,
    "improvementSuggestions": string[]
    }

    Base matchScore on overlap of required skills, experience level, and
    keyword presence between the resume and job description.

    Do not invent skills, companies, or years of experience that aren't
    actually present in the resume text. Only work with what's given.

    RESUME:${resumeText}
    JOB DESCRIPTION:${jobDescription}

    Analyze the match and return the JSON as specified above.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    //text in the json format  (Gets the content)
    const text = response.text();
    //anaysis is here js object (converts that content into something JavaScript can work with.)
    const analysis = JSON.parse(text);  //JSON.parse() -> only works if text contains valid JSON.

    res.status(200).json(analysis);
}