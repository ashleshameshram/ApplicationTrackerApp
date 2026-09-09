import { useState } from 'react'
import JobDescription from './JobDescription';
import ResumeUpload from './ResumeUpload';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import { Box, Stack, Typography, Button } from '@mui/material';

export default function ResumeJDMatch({ setAnalysisResult }) {
    const [jobDescription, setJobDescription] = useState("");
    const [resumeText, setResumeText] = useState('');
    const [isExtracting, setIsExtracting] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [inputMessage, setInputMessage] = useState("");

    const handleAnalyzeButton = async () => {
        if (isAnalyzing) return;
        if (!jobDescription.trim() && !resumeText.trim()) {
            setInputMessage("Add your resume and a job description to analyze your match.");
            return;
        }
        if (!jobDescription.trim()) {
            setInputMessage("Add a job description to analyze your match.");
            return;
        }
        if (!resumeText.trim()) {
            setInputMessage("Upload your resume to analyze your match.");
            return;
        }
        setInputMessage("");
        setIsAnalyzing(true);

        try {
            const response = await fetch('/api/analyze-match', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resumeText, jobDescription })
            });

            const data = await response.json();
            if (!response.ok) {
                setInputMessage(data.message || "Something went wrong while analyzing your match.");
                return;
            }
            setAnalysisResult(data);
        }
        catch (error) {
            console.error("Analysis failed:", error);
            setInputMessage("Unable to analyze your resume right now. Please try again later.");
        }
        finally {
            setIsAnalyzing(false);
        }
    }

    return (
        <Box
            sx={{
                width: '90%',
                minWidth: 0,
                maxWidth: { xs: '100%', md: 480 },
                p: { xs: 1.5, sm: 2.25, md: 3 },
                borderRadius: { xs: 2, sm: 2.5, md: 3 },
                border: '1px solid #E7E3F2',
                background: '#fff',
            }}>
            {/* Header row: number + title + subtitle */}
            <Stack
                direction="row"
                spacing={{ xs: 1, sm: 1.25, md: 1.5 }}
                sx={{ mb: { xs: 1.5, sm: 2, md: 2.5 } }}
            >
                <Box
                    sx={{
                        flexShrink: 0,
                        width: { xs: 20, sm: 23, md: 26 },
                        height: { xs: 20, sm: 23, md: 26 },
                        borderRadius: '7px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: "'Sora', sans-serif",
                        fontWeight: 700,
                        fontSize: { xs: '0.68rem', sm: '0.78rem', md: '0.85rem' },
                        color: '#6D28D9',
                        background: '#EFE9FE',
                    }}
                > 1
                </Box>
                <Box sx={{ minWidth: 0 }}>
                    <Typography
                        sx={{
                            fontFamily: "'Sora', sans-serif",
                            fontWeight: 700,
                            fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1.05rem' },
                            color: '#1F1436',
                            lineHeight: 1.3,
                        }}
                    >
                        Resume & Job Match
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: { xs: '0.68rem', sm: '0.78rem', md: '0.85rem' },
                            color: '#6B6478',
                            mt: 0.3,
                        }}
                    >
                        Compare your resume with a job description and see how well they match.
                    </Typography>
                </Box>
            </Stack>

            <JobDescription setJobDescription={setJobDescription} setInputMessage={setInputMessage} />
            <ResumeUpload
                setResumeText={setResumeText}
                setIsExtracting={setIsExtracting}
                setInputMessage={setInputMessage}
            />

            {inputMessage && (
                <Typography
                    sx={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: { xs: '0.68rem', sm: '0.76rem', md: '0.82rem' },
                        color: '#d93728',
                        fontStyle: 'italic',
                        background: '#F5F1FE',
                        borderRadius: '8px',
                        px: 1.5,
                        py: 1,
                        mb: 1.5,
                    }}
                >
                    {inputMessage}
                </Typography>
            )}

            {/* Analyze button */}
            <Button
                onClick={handleAnalyzeButton}
                fullWidth
                disabled={isExtracting || isAnalyzing}
                startIcon={<AutoAwesomeIcon sx={{ fontSize: { xs: 13, sm: 16, md: 18 } }} />}
                sx={{
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.92rem' },
                    py: { xs: 0.75, sm: 1.1, md: 1.3 },
                    borderRadius: { xs: '8px', sm: '9px', md: '10px' },
                    color: '#fff',
                    background: '#2f224c',
                    '&:hover': { background: '#150D26' },
                    '&.Mui-disabled': { color: '#fff', background: '#2f224cd2' },
                    ...(isExtracting || isAnalyzing) && {
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: '-150%',
                            width: '150%',
                            height: '100%',
                            background: 'linear-gradient(115deg, transparent 20%, rgba(255, 255, 255, 0.62) 50%, transparent 80%)',
                            animation: 'shimmerSweep 2s ease-in-out infinite',
                        },
                        '@keyframes shimmerSweep': {
                            '0%': { left: '-150%' },
                            '100%': { left: '150%' },
                        },
                    },
                }}>
                {isExtracting
                    ? "Extracting your resume..."
                    : isAnalyzing
                        ? "Analyzing your match..."
                        : "Analyze Match"
                }
            </Button>
        </Box>
    );
}