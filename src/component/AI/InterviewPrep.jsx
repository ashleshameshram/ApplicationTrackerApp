import { useState } from 'react';
import { Box, Typography, Stack, Autocomplete, TextField, Checkbox, FormControlLabel, Button } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const ORANGE = '#F97316';
const ROLE_OPTIONS = ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Data Analyst'];

function Pill({ label, selected, onClick }) {
    return (
        <Box
            onClick={onClick}
            sx={{
                cursor: 'pointer',
                px: { xs: 0.8, sm: 1 },
                minHeight: { xs: 30, sm: 35 },
                display: 'inline-flex',
                alignItems: 'center',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: selected ? ORANGE : '#E7E3F2',
                background: selected ? '#F1EBFC' : '#fff',
                fontFamily: "'Inter', sans-serif",
                fontSize: { xs: '0.7rem', sm: '0.80rem' },
                fontWeight: selected ? 600 : 400,
                color: selected ? ORANGE : '#3D3652',
                textAlign: 'center',
                userSelect: 'none',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
                '&:hover': {
                    borderColor: selected ? ORANGE : '#C7BFE0',
                },
            }}
        >
            {label}
        </Box>
    );
}

export default function InterviewPrep({ setInterviewResult }) {
    const [errorMessage, setErrorMessage] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [role, setRole] = useState('Frontend Developer');
    const [specificArea, setSpecificArea] = useState('');
    const [difficulty, setDifficulty] = useState('beginner');
    const [focusAreas, setFocusAreas] = useState({
        technical: false,
        behavioral: false,
        hr: false,
    });

    const toggleFocusArea = (key) => {
        setFocusAreas((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleGenerate = async () => {
        const hasFocusArea = Object.values(focusAreas).some(Boolean);

        if (!hasFocusArea) {
            setErrorMessage('Please select at least one focus area.');
            return;
        }
        setIsGenerating(true);
        setErrorMessage('');
        
        try{
            const response = await fetch('/api/interview-prep',{
                method: 'POST',
                headers : {
                    "Content-Type" : "application/json",   //json data sending
                },
                body: JSON.stringify({
                    role,
                    specificArea,
                    difficulty,
                    focusAreas
                }),
            });
            if(!response.ok){
                let errorMessage = "Unable to generate interview questions. Please try again.";
                
                try{
                    const errorData = await response.json();
                    if (errorData.message) {
                        errorMessage = errorData.message;
                    }
                } catch {
                    //Server returned a non-JSON response
                }
                throw new Error(errorMessage);
            }
            const data = await response.json();
            setInterviewResult(data);
        }
        catch(error){
            console.error("Interview prep failed:", error);
            setErrorMessage(error.message);
        }
        finally{
            setIsGenerating(false);
        }
    };

    const difficultyOptions = ['Beginner', 'Intermediate', 'Advanced'];

    return (
        <Box sx={{
            width: '98%',
            borderRadius: { xs: 2, sm: 3 },
            border: '1px solid #E7E3F2',
            background: '#fff',
            overflow: 'hidden',
        }}>
            {/* Header */}
            <Box sx={{
                px: { xs: 2, sm: 3 },
                py: { xs: 2, sm: 2.5 },
                background: '#FAF9FD',
                borderBottom: '1px solid #E7E3F2',
            }}>
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
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
                            color: ORANGE,
                            background: '#EFE9FE',
                        }}> 2
                    </Box>
                    <Box>
                        <Typography sx={{
                            fontFamily: "'Sora', sans-serif",
                            fontWeight: 700,
                            fontSize: { xs: '0.9rem', sm: '1.1rem' },
                            color: ORANGE,
                        }}>
                            Interview Preparation
                        </Typography>
                        <Typography sx={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: { xs: '0.7rem', sm: '0.8rem' },
                            color: '#6B6478',
                            mt: 0.25,
                        }}>
                            Generate domain-wise interview questions and practice for your next interview.
                        </Typography>
                    </Box>
                </Stack>
            </Box>

            {/* Form body */}
            <Box sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                <Stack spacing={{ xs: 2.5, sm: 3 }}>

                    {/* Row 1: Domain/Role + Difficulty + Focus Areas — 3 up */}
                    <Stack direction={{ xs: 'column', md: 'row' }}
                        spacing={{ xs: 2.5, sm: 2.5, md: 3 }}
                        alignItems={{ xs: 'stretch', md: 'flex-start' }}
                    >
                        {/* Domain / Role */}
                        <Box sx={{ flex: { md: 0.7 }, minWidth: 0, width: { xs: '100%', md: 'auto' } }}>
                            <Typography sx={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: { xs: '0.72rem', sm: '0.8rem' }, color: '#3D3652', mb: 0.75 }}>
                                Domain / Role
                            </Typography>
                            <Autocomplete
                                freeSolo
                                options={ROLE_OPTIONS}
                                value={role}
                                onInputChange={(e, val) => setRole(val)}
                                size="small"
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="e.g. Frontend Developer"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                fontFamily: "'Inter', sans-serif",
                                                fontSize: { xs: '0.76rem', sm: '0.85rem' },
                                                '& fieldset': { borderColor: '#E7E3F2' },
                                                '&:hover fieldset': { borderColor: '#C7BFE0' },
                                                '&.Mui-focused fieldset': { borderColor: ORANGE, borderWidth: '1px' },
                                            },
                                        }}
                                    />
                                )}
                            />
                        </Box>

                        {/* Specific Skill / Technology */}
                        <Box sx={{ flex: { md: 0.7 }, minWidth: 0, width: { xs: '100%', md: 'auto' } }}>
                            <Typography
                                sx={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 600,
                                    fontSize: { xs: '0.72rem', sm: '0.8rem' },
                                    color: '#3D3652',
                                    mb: 0.75,
                                }}
                            >
                                Specific Skill / Technology
                            </Typography>

                            <TextField
                                fullWidth
                                size="small"
                                value={specificArea}
                                onChange={(e) => setSpecificArea(e.target.value)}
                                placeholder="e.g. React, JavaScript"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: { xs: '0.76rem', sm: '0.85rem' },
                                        '& fieldset': {
                                            borderColor: '#E7E3F2',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#C7BFE0',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: ORANGE,
                                            borderWidth: '1px',
                                        },
                                    },
                                }}
                            />
                        </Box>

                        {/* Difficulty */}
                        <Box sx={{ flex: { md: 0.8 }, minWidth: 0, width: { xs: '100%', md: 'auto' } }}>
                            <Typography sx={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: { xs: '0.72rem', sm: '0.8rem' }, color: '#3D3652', mb: 0.75 }}>
                                Difficulty Level
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                {difficultyOptions.map((opt) => {
                                    const val = opt.toLowerCase();
                                    return (
                                        <Pill
                                            key={val}
                                            label={opt}
                                            selected={difficulty === val}
                                            onClick={() => setDifficulty(val)}
                                        />
                                    );
                                })}
                            </Stack>
                        </Box>

                        {/* Focus Areas */}
                        <Box sx={{ flex: { md: 0.9 }, minWidth: 0, width: { xs: '100%', md: 'auto' } }}>
                            <Typography
                                sx={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 600,
                                    fontSize: { xs: '0.72rem', sm: '0.8rem' },
                                    color: '#3D3652',
                                    mb: 0.75,
                                }}>
                                Focus Areas{' '}
                                <Box component="span"
                                    sx={{
                                        fontWeight: 400,
                                        color: '#9B96A8',
                                        display: { xs: 'none', sm: 'inline' },
                                    }}>
                                    (Select one or more)
                                </Box>
                            </Typography>

                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                {[
                                    { key: 'technical', label: 'Technical' },
                                    { key: 'behavioral', label: 'Behavioral' },
                                    { key: 'hr', label: 'HR / General' },
                                ].map(({ key, label }) => (
                                    <FormControlLabel
                                        key={key}
                                        control={
                                            <Checkbox
                                                checked={focusAreas[key]}
                                                onChange={() => toggleFocusArea(key)}
                                                size="small"
                                                sx={{
                                                    p: 0,
                                                    mr: { xs: 0.35, sm: 0.60 },
                                                    color: '#C7BFE0',
                                                    '&.Mui-checked': {
                                                        color: ORANGE,
                                                    },
                                                }}
                                            />
                                        }
                                        label={label}
                                        sx={{
                                            m: 0,
                                            px: { xs: 0.55, sm: 1 },
                                            minHeight: { xs: 26, sm: 35 },
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            borderRadius: { xs: '6px', sm: '8px' },
                                            border: '1px solid',
                                            borderColor: focusAreas[key] ? ORANGE : '#E7E3F2',
                                            background: focusAreas[key] ? '#F1EBFC' : '#fff',

                                            '& .MuiFormControlLabel-label': {
                                                fontFamily: "'Inter', sans-serif",
                                                fontSize: { xs: '0.62rem', sm: '0.80rem' },
                                                fontWeight: focusAreas[key] ? 600 : 400,
                                                color: focusAreas[key] ? ORANGE : '#3D3652',
                                                whiteSpace: 'nowrap',
                                            },
                                        }}
                                    />
                                ))}
                            </Stack>
                        </Box>
                    </Stack>

                    

                    {/* Row 2: Generate button — own row, content-sized, centered */}
                    <Box sx={{ display: 'flex', justifyContent: { xs: 'stretch', sm: 'center' } }}>
                        <Button
                            disabled={isGenerating}
                            onClick={handleGenerate}
                            startIcon={<AutoAwesomeIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
                            sx={{
                                textTransform: 'none',
                                fontFamily: "'Sora', sans-serif",
                                fontWeight: 600,
                                fontSize: { xs: '0.76rem', sm: '0.85rem' },
                                color: '#fff',
                                background: ORANGE,
                                borderRadius: '8px',
                                px: 3,
                                py: { xs: 0.85, sm: 1.1 },
                                width: { xs: '100%', sm: 'auto' },
                                whiteSpace: 'nowrap',
                                '&:hover': { background: '#E0670F' },
                                '&.Mui-disabled': {
                                    color: '#fff',
                                    background: '#e0660fe1',
                                },
                                ...(isGenerating) && {
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: '-150%',
                                        width: '150%',
                                        height: '100%',
                                        background: 'linear-gradient(115deg, transparent 20%, rgba(255, 250, 250, 0.74) 50%, transparent 80%)',
                                        animation: 'shimmerSweep 2s ease-in-out infinite',
                                    },
                                    '@keyframes shimmerSweep': {
                                        '0%': { left: '-150%' },
                                        '100%': { left: '150%' },
                                    },
                                },
                            }}
                        >
                            {isGenerating 
                            ? 'Generating your Questions...' 
                            : 'Generate Questions'}
                        </Button>
                    </Box>
                </Stack>
                {errorMessage && (
                    <Typography
                    sx={{
                        mt: 2,
                        color: '#D32F2F',
                        fontSize: { xs: '0.76rem', sm: '0.85rem' },
                    }}>
                        {errorMessage}
                    </Typography>
                )}
            </Box>
        </Box>
    );
}