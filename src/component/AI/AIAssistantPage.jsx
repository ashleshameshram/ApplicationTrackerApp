import { useState } from 'react'
import { Box } from '@mui/material';
import AIAssistantHeader from './AIAssistantHeader';
import AIAssistantRow from './AIAssistantRow';
import AIMatchResult from './AIMatchResult';

export default function AIAssistantPage() {
    const [analysisResult, setAnalysisResult] = useState(null);

    return(
        <Box sx={{overflowX:'hidden'}}>  
            <AIAssistantHeader />
            <AIAssistantRow setAnalysisResult={setAnalysisResult}/>
            <AIMatchResult analysisResult={analysisResult}/>
        </Box>
    )
}