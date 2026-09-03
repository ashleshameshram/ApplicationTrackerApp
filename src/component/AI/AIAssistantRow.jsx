import { Box } from '@mui/material'
import ResumeJDMatch from './ResumeJDMatch'
import InterviewPrep from './InterviewPrep'

export default function AIAssistantRow({ setAnalysisResult }){
    return(
        <Box sx={{display:'flex'}}>
            <ResumeJDMatch setAnalysisResult={setAnalysisResult}/>
            <InterviewPrep />  
        </Box>
    )
}