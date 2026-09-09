import { Box, Typography, Stack } from "@mui/material"
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';

function SkillChip({ label, color, bg }) {
    return (
        <Box sx={{
            px: { xs: 1.1, sm: 1.4 },
            py: { xs: 0.4, sm: 0.5 },
            borderRadius: '999px',
            background: bg,
            fontFamily: "'Inter', sans-serif",
            fontSize: { xs: '0.7rem', sm: '0.78rem' },
            fontWeight: 500,
            color: color,
            whiteSpace: 'nowrap',
        }}>
            {label}
        </Box>
    );
}

function SkillGroup({ icon, title, skills = [], chipColor, chipBg }) {
    return (
        <Box sx={{ minWidth: 0 }}>
            <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mb: 1 }}>
                {icon}
                <Typography sx={{
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 700,
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    color: '#120038',
                }}>
                    {title}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
                {skills.length > 0 ? (
                    skills.map((skill, i) => (
                        <SkillChip key={i} label={skill} color={chipColor} bg={chipBg} />
                    ))
                ) : (
                    <Typography sx={{ fontFamily: "'Inter', sans-serif", fontSize: { xs: '0.72rem', sm: '0.8rem' }, color: '#9B96A8' }}>
                        None found
                    </Typography>
                )}
            </Stack>
        </Box>
    );
}

function InsightPanel({ icon, title, titleColor, items = [], emptyText }) {
    return (
        <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mb: 1 }}>
                {icon}
                <Typography sx={{
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 700,
                    fontSize: { xs: '0.78rem', sm: '0.88rem' },
                    color: titleColor,
                }}>
                    {title}
                </Typography>
            </Stack>
            {items.length > 0 ? (
                <Stack spacing={0.75}>
                    {items.map((item, i) => (
                        <Typography key={i} sx={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: { xs: '0.74rem', sm: '0.83rem' },
                            color: '#3D3652',
                            lineHeight: 1.5,
                        }}>
                            •&nbsp; {item}
                        </Typography>
                    ))}
                </Stack>
            ) : (
                <Typography sx={{ fontFamily: "'Inter', sans-serif", fontSize: { xs: '0.72rem', sm: '0.8rem' }, color: '#9B96A8' }}>
                    {emptyText}
                </Typography>
            )}
        </Box>
    );
}

export default function AIMatchResult({ analysisResult }) {
    const matchedSkills = analysisResult?.matchedSkills || [];
    const missingSkills = analysisResult?.missingSkills || [];
    const strengths = analysisResult?.strengths || [];
    const suggestions = analysisResult?.improvementSuggestions || [];
    const score = analysisResult?.matchScore || 0;

    const verdict = score >= 80 ? "Good Match"
        : score >= 60 ? "Fair Match"
        : "Needs Work";

    return (
        <Box sx={{
            width: '90%',
            minWidth: 0,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            p: { xs: 1.5, sm: 2, md: 2.5 },
            borderRadius: { xs: 2, sm: 2.5, md: 3 },
            border: '1px solid #E7E3F2',
            background: '#fff',
        }}>
            {/* Header */}
            <Typography sx={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700,
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                color: '#120038',
                mb: { xs: 1.75, sm: 2.25, md: 2.5 },
            }}>
                Match Result
            </Typography>

            {/* Left column: score ring | Right column: 2 rows */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2.5, sm: 3, md: 4 }} sx={{ flex: 1, minWidth: 0 }}>

                {/* Left column — score ring, spans full height */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                }}>
                    <Box sx={{
                        position: 'relative',
                        width: { xs: 110, sm: 125, md: 140 },
                        height: { xs: 110, sm: 125, md: 140 },
                        borderRadius: '50%',
                        background: `conic-gradient(from 0deg, #6D28D9 ${score * 3.6}deg, #EFE9FE ${score * 3.6}deg 360deg)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Box sx={{
                            width: { xs: 90, sm: 102, md: 115 },
                            height: { xs: 90, sm: 102, md: 115 },
                            borderRadius: '50%',
                            background: '#fff',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Typography sx={{
                                fontFamily: "'Sora', sans-serif",
                                fontSize: { xs: '1.4rem', sm: '1.65rem', md: '1.9rem' },
                                fontWeight: 700,
                                color: '#120038',
                                lineHeight: 1,
                            }}>
                                {score}%
                            </Typography>
                            <Typography sx={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: { xs: '0.68rem', sm: '0.73rem', md: '0.78rem' },
                                fontWeight: 600,
                                color: '#1D9E75',
                                mt: 0.5,
                            }}>
                                {verdict}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Right column — 2x2 grid */}
                <Stack spacing={{ xs: 2, sm: 2.25, md: 2.5 }} sx={{ flex: 1, minWidth: 0, width: '100%' }}>
                    {/* Row 1: Matched + Missing */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 3, md: 4 }}>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <SkillGroup
                                title="Matched Skills"
                                skills={matchedSkills}
                                chipColor="#1D9E75"
                                chipBg="#E9F7F1"
                                icon={<CheckCircleOutlinedIcon sx={{ fontSize: { xs: 15, sm: 18 }, color: '#1D9E75' }} />}
                            />
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <SkillGroup
                                title="Missing Skills"
                                skills={missingSkills}
                                chipColor="#D9480F"
                                chipBg="#FDEEE9"
                                icon={<ErrorOutlineOutlinedIcon sx={{ fontSize: { xs: 15, sm: 18 }, color: '#D9480F' }} />}
                            />
                        </Box>
                    </Stack>

                    {/* Row 2: Strengths + AI Suggestions */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1.5, sm: 2 }} sx={{ mt: 'auto' }}>
                        <Box sx={{
                            flex: 1,
                            minWidth: 0,
                            p: { xs: 1.25, sm: 1.75, md: 2 },
                            borderRadius: 2,
                            border: '1px solid #E7E3F2',
                            background: '#FBFBFD',
                        }}>
                            <InsightPanel
                                title="Strengths"
                                titleColor="#6D28D9"
                                items={Array.isArray(strengths) ? strengths : (strengths ? [strengths] : [])}
                                emptyText="No strengths identified yet"
                                icon={<StarOutlinedIcon sx={{ fontSize: { xs: 15, sm: 18 }, color: '#6D28D9' }} />}
                            />
                        </Box>
                        <Box sx={{
                            flex: 1,
                            minWidth: 0,
                            p: { xs: 1.25, sm: 1.75, md: 2 },
                            borderRadius: 2,
                            border: '1px solid #E7E3F2',
                            background: '#FBFBFD',
                        }}>
                            <InsightPanel
                                title="AI Suggestions"
                                titleColor="#378ADD"
                                items={suggestions}
                                emptyText="No suggestions available"
                                icon={<TipsAndUpdatesOutlinedIcon sx={{ fontSize: { xs: 15, sm: 18 }, color: '#378ADD' }} />}
                            />
                        </Box>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}