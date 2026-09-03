import { Box, Typography, Stack } from "@mui/material"
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

export default function AIMatchResult({ analysisResult }) {
    return (
        <Box sx={{
            width: '100%',
            mt: { xs: 2, sm: 3, md: 4 },
            ml: {  xs: 2, sm: 3, md: 3},
            px: { xs: 2, sm: 3, md: 3 },
            p: { xs: 1.5, sm: 2, md: 2.5 },
            borderRadius: { xs: 2, sm: 3 },
            border: '1px solid #E7E3F2',
            background: '#fff',
        }}>
            {/* Title + subtitle — full width, on top */}
            <Box sx={{ mb: { xs: 2, sm: 2.5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AutoGraphOutlinedIcon sx={{
                        fontSize: { xs: 18, sm: 22, md: 24 },
                        color: '#30003a'
                    }} />
                    <Typography sx={{
                        fontSize: { xs: 16, sm: 18, md: 20 },
                        fontFamily: "'Sora', sans-serif",
                        fontWeight: 700,
                        color: '#120038',
                    }}>
                        Match Result
                    </Typography>
                </Box>
                <Typography
                    sx={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: { xs: '0.8rem', sm: '0.88rem' },
                        color: '#6B6478',
                        mt: 0.5,
                    }}
                >
                    AI analysis of your resume against the job description
                </Typography>
            </Box>

            {/* Row: Score + Matching skills + (Missing skills, Suggestions later) */}
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                sx={{ width: '100%', gap: { xs: 2, md: 2 } }}
            >
                {/* Match Score */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    width: { xs: '100%', md: 170 },
                    minHeight: 150,
                    border: '1px solid #E7E3F2',
                    p: { xs: 1, sm: 2, md: 2 },
                    borderRadius: 3,
                }}>
                    <Box sx={{
                        position: 'relative',
                        width: 140,
                        height: 140,
                        borderRadius: '50%',
                        background: `conic-gradient(from 0deg, #3AA76D 0deg, #6D28D9 ${(analysisResult?.matchScore || 0) * 3.6}deg, #EFE9FE ${(analysisResult?.matchScore || 0) * 3.6}deg 360deg)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Box sx={{
                            width: 120,
                            height: 120,
                            borderRadius: '50%',
                            background: '#fff',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Typography
                                sx={{
                                    fontFamily: "'Sora', sans-serif",
                                    fontSize: '2rem',
                                    fontWeight: 700,
                                    color: '#2D1B69',
                                }}>
                                {analysisResult?.matchScore}%
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    color: '#3AA76D',
                                    mt: 0.5,
                                }}>
                                Good Match
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Matching Skills */}
                <Box sx={{
                    minWidth: 0,
                    p: { xs: 1.5, sm: 2 },
                    borderRadius: 2,
                    border: '1px solid #E7E3F2',
                    background: '#fff',
                }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                        <CheckCircleOutlineOutlinedIcon sx={{ fontSize: { xs: 16, sm: 18 , md:20}, color: '#1D9E75' }} />
                        <Typography
                            sx={{
                                fontFamily: "'Sora', sans-serif",
                                fontWeight: 700,
                                fontSize: { xs: '0.85rem', sm: '0.95rem' },
                                color: '#120038',
                            }}>
                            Matching skills
                        </Typography>
                    </Stack>

                    <Stack spacing={1}>
                        {(analysisResult?.matchedSkills || []).map((skill, i) => (
                            <Stack key={i} direction="row" spacing={1} alignItems="flex-start">
                                <CheckOutlinedIcon sx={{ fontSize: 16, color: '#1D9E75', mt: '2px' }} />
                                <Typography
                                    sx={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: { xs: '0.78rem', sm: '0.85rem' ,md: 17},
                                        color: '#3D3652',
                                        lineHeight: 1
                                    }}>
                                    {skill}
                                </Typography>
                            </Stack>
                        ))}
                    </Stack> 
                </Box>
            </Stack>
        </Box>
    )
}