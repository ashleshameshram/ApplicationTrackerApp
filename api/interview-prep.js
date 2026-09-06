import { generateMockInterviewQuestions } from "./mock-interview-prep";

const USE_MOCK_AI = true;

export default function handler(req,res) {
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
}