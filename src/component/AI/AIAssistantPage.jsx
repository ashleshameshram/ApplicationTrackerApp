import { useState } from 'react'
import { Box } from '@mui/material';
import AIAssistantHeader from './AIAssistantHeader';
import AIAssistantRow from './AIAssistantRow';
import InterviewPrep from './InterviewPrep.jsx'

export default function AIAssistantPage() {
    const [analysisResult, setAnalysisResult] = useState(null);

    return(
        <Box sx={{overflowX:'hidden'}}>  
            <AIAssistantHeader />
            <AIAssistantRow 
                setAnalysisResult={setAnalysisResult} 
                analysisResult={analysisResult}
            />
            <InterviewPrep />
        </Box>
    )
}