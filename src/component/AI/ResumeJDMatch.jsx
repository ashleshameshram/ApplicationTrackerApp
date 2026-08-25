import { useState } from 'react'
import JobDescription from './JobDescription';
import ResumeUpload from './ResumeUpload';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import { Box, Stack,Typography, Button } from '@mui/material';

export default function ResumeJDMatch() {
    const [jobDescription, setJobDescription] = useState("");
    const [resumeText,setResumeText] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);
    

    let handleAnalyzeButton = () => {
        if (!jobDescription.trim()){
            console.log("Please enter a job application");
        }
        if(!resumeText.trim()){
            console.log("Please upload a resume");
            return;
        }
    }
    
    return(
        <>
        <Box
        sx={{
            width: '100%',
            maxWidth: { xs: 340, sm: 480 },
            mx: { xs: 1, sm:2, md: 3},
            p: { xs: 1.75, sm: 3 },
            borderRadius: { xs: 2, sm: 3 },
            border: '1px solid #E7E3F2',
            background: '#fff',
        }}>
        {/* Header row: number + title + subtitle */}
        <Stack direction="row" spacing={{ xs: 1, sm: 1.5 }} sx={{ mb: { xs: 1.75, sm: 2.5 } }}>
            <Box
            sx={{
                flexShrink: 0,
                width: { xs: 20, sm: 26 },
                height: { xs: 20, sm: 26 },
                borderRadius: '7px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700,
                fontSize: { xs: '0.7rem', sm: '0.85rem' },
                color: '#6D28D9',
                background: '#EFE9FE',
            }}> 1
            </Box>
            <Box>
            <Typography
                sx={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700,
                fontSize: { xs: '0.82rem', sm: '1.05rem' },
                color: '#1F1436',
                lineHeight: 1.3,
            }}>
                Resume & Job Match
            </Typography>
            <Typography
                sx={{
                fontFamily: "'Inter', sans-serif",
                fontSize: { xs: '0.7rem', sm: '0.85rem' },
                color: '#6B6478',
                mt: 0.3,
            }}>
                Compare your resume with a job description and discover how well they  match.
            </Typography>
            </Box>
        </Stack>

    
        <JobDescription setJobDescription={setJobDescription} />
        <ResumeUpload setResumeText={setResumeText} />

        {/* Analyze button */}
        <Button
            onClick={handleAnalyzeButton}
            fullWidth
            startIcon={<AutoAwesomeIcon sx={{ fontSize: { xs: 15, sm: 18 } }} />}
            sx={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 600,
                textTransform: 'none',
                fontSize: { xs: '0.8rem', sm: '0.92rem' },
                py: { xs: 0.9, sm: 1.3 },
                borderRadius: { xs: '8px', sm: '10px' },
                color: '#fff',
                background: '#1F1436',
                '&:hover': { background: '#150D26' },
            }}>  Analyze Match
        </Button>
        </Box>
        </>
    );
}