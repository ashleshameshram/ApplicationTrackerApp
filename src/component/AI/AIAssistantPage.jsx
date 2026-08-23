import { useState } from 'react';
import { Box } from '@mui/material';
import ResumeJDMatch from './ResumeJDMatch'
import InterviewPrep from './InterviewPrep'
import AIAssistantHeader from './AIAssistantHeader';

export default function AIAssistantPage() {
    return(
        <Box sx={{overflowX:'hidden'}}>  
            <AIAssistantHeader />
            <ResumeJDMatch />
            <InterviewPrep />  
        </Box>
    )
}