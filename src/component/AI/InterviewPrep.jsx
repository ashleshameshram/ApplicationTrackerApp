import { useState } from 'react';
import { Box, Typography, Stack, Autocomplete, TextField, Checkbox, FormControlLabel, Button } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { generateMockInterviewQuestions } from '../../../api/mock-interview-prep.js'

const PURPLE = '#1F1436';
const ROLE_OPTIONS = ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Data Analyst'];

function Pill({ label, selected, onClick }) {
    return (
        <Box
            onClick={onClick}
            sx={{
                cursor: 'pointer',
                px: 2,
                py: 0.9,
                borderRadius: '8px',
                border: '1px solid',
                borderColor: selected ? PURPLE : '#E7E3F2',
                background: selected ? '#F1EBFC' : '#fff',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.82rem',
                fontWeight: selected ? 600 : 400,
                color: selected ? PURPLE : '#3D3652',
                textAlign: 'center',
                userSelect: 'none',
                transition: 'all 0.15s ease',
                '&:hover': {
                    borderColor: selected ? PURPLE : '#C7BFE0',
                },
            }}
        >
            {label}
        </Box>
    );
}

export default function InterviewPrep({ setInterviewResult }) {
    const [role, setRole] = useState('Frontend Developer');
    const [difficulty, setDifficulty] = useState('intermediate');
    const [focusAreas, setFocusAreas] = useState({
        technical: true,
        behavioral: false,
        hr: true,
    });
    const [numQuestions, setNumQuestions] = useState(5);

    const toggleFocusArea = (key) => {
        setFocusAreas((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleGenerate = () => {
        const result = generateMockInterviewQuestions({
            role,
            difficulty,
            focusAreas,
            numQuestions,
        });
        setInterviewResult(result);
    };

    const difficultyOptions = ['Beginner', 'Intermediate', 'Advanced'];
    const questionCounts = [5, 10, 15, 20];

    return (
        <Box sx={{
            width: '95%',
            m: { xs: 2, sm: 3, md: 3},
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
                            color: '#6D28D9',
                            background: '#EFE9FE',
                        }}> 2
                        </Box>
                    <Box>
                        <Typography sx={{
                            fontFamily: "'Sora', sans-serif",
                            fontWeight: 700,
                            fontSize: { xs: '1rem', sm: '1.1rem' },
                            color: '#1F1436',
                        }}>
                            Interview Prep
                        </Typography>
                        <Typography sx={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.8rem',
                            color: '#6B6478',
                            mt: 0.25,
                        }}>
                            Generate domain-wise interview questions and practice for your next interview.
                        </Typography>
                    </Box>
                </Stack>
            </Box>

            {/* Form body */}
            <Box sx={{ p: { xs: 2, sm: 3 } }}>
                <Stack spacing={{ xs: 2.5, sm: 3 }}>

                    {/* Row 1: Domain/Role + Difficulty — 2 up */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5}>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography sx={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.8rem', color: '#3D3652', mb: 0.75 }}>
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
                                                fontSize: '0.85rem',
                                                '& fieldset': { borderColor: '#E7E3F2' },
                                                '&:hover fieldset': { borderColor: '#C7BFE0' },
                                                '&.Mui-focused fieldset': { borderColor: PURPLE, borderWidth: '1px' },
                                            },
                                        }}
                                    />
                                )}
                            />
                        </Box>

                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography sx={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.8rem', color: '#3D3652', mb: 0.75 }}>
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
                    </Stack>

                    {/* Row 2: Focus Areas + Number of Questions */}
                    <Stack direction="row" spacing={2.5} sx={{ width: '100%' }}>
                        {/* Focus Areas */}
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                                sx={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 600,
                                    fontSize: '0.8rem',
                                    color: '#3D3652',
                                    mb: 0.75,
                                }}>
                                Focus Areas{' '}
                                <Box component="span"
                                    sx={{
                                        fontWeight: 400,
                                        color: '#9B96A8',
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
                                                    color: '#C7BFE0',
                                                    '&.Mui-checked': {
                                                        color: PURPLE,
                                                    },
                                                }}
                                            />
                                        }
                                        label={label}
                                        sx={{
                                            m: 0,
                                            px: 1,
                                            py: 0.4,
                                            borderRadius: '8px',
                                            border: '1px solid',
                                            borderColor: focusAreas[key]
                                                ? PURPLE
                                                : '#E7E3F2',
                                            background: focusAreas[key]
                                                ? '#F1EBFC'
                                                : '#fff',
                                            '& .MuiFormControlLabel-label': {
                                                fontFamily: "'Inter', sans-serif",
                                                fontSize: '0.8rem',
                                                fontWeight: focusAreas[key] ? 600 : 400,
                                                color: focusAreas[key]
                                                    ? PURPLE
                                                    : '#3D3652',
                                            },
                                        }}
                                    />
                                ))}
                            </Stack>
                        </Box>

                        {/* Number of Questions */}
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                                sx={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 600,
                                    fontSize: '0.8rem',
                                    color: '#3D3652',
                                    mb: 0.75,
                                }}
                            >
                                Number of Questions
                            </Typography>

                            <Stack
                                direction="row"
                                spacing={1}
                                flexWrap="wrap"
                                useFlexGap
                            >
                                {questionCounts.map((count) => (
                                    <Pill
                                        key={count}
                                        label={count}
                                        selected={numQuestions === count}
                                        onClick={() => setNumQuestions(count)}
                                    />
                                ))}
                            </Stack>
                        </Box>
                    </Stack>

                        {/* Row 3: Only Generate Button */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                width: '100%',
                            }}
                        >
                            <Button
                                onClick={handleGenerate}
                                startIcon={
                                    <AutoAwesomeIcon sx={{ fontSize: 16 }} />
                                }
                                sx={{
                                    textTransform: 'none',
                                    fontFamily: "'Sora', sans-serif",
                                    fontWeight: 600,
                                    fontSize: '0.85rem',
                                    color: '#fff',
                                    background: PURPLE,
                                    borderRadius: '8px',
                                    px: 3,
                                    py: 1.1,
                                    width: 'auto',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Generate Questions
                            </Button>
                        </Box>
                </Stack>
            </Box>
        </Box>
    );
}