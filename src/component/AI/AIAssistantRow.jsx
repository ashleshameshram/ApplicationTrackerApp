import { Box } from '@mui/material'
import ResumeJDMatch from './ResumeJDMatch.jsx'
import AIMatchResult from './AIMatchResult.jsx'

export default function AIAssistantRow({ setAnalysisResult, analysisResult }){
    return(
        <Box sx={{display:'flex'}}>
            <ResumeJDMatch setAnalysisResult={setAnalysisResult}/>
            <AIMatchResult analysisResult={analysisResult}/> 
        </Box>
    )
}