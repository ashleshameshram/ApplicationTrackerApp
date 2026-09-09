import { Box } from '@mui/material'
import ResumeJDMatch from './ResumeJDMatch.jsx'
import AIMatchResult from './AIMatchResult.jsx'

export default function AIAssistantRow({ setAnalysisResult, analysisResult }) {
    return (
        <Box sx={{
            width: '100%',
            minWidth: 0,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'stretch', md: 'flex-start' },
            gap: { xs: 2, sm: 2, md: 1 },
        }}>
            <Box sx={{ width: { xs: '100%', md: 'auto' }, flexShrink: 0, minWidth: 0 }}>
                <ResumeJDMatch setAnalysisResult={setAnalysisResult} />
            </Box>
            <Box sx={{ width: { xs: '100%', md: 'auto' }, flex: { md: 1 }, minWidth: 0 }}>
                <AIMatchResult analysisResult={analysisResult} />
            </Box>
        </Box>
    )
}