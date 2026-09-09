import { Box, Typography, Stack, Button } from "@mui/material"
import { useState } from "react";

const ORANGE = '#F97316';
const MAX_VISIBLE = 3;

function QuestionColumn({ title, questions = [] }) {
    const [showAll, setShowAll] = useState(false);
    const visible = showAll ? questions : questions.slice(0,MAX_VISIBLE);
    const remaining = questions.length - visible.length;

    return (
        <Box sx={{ width: { xs: '100%',sm:'48%', md:'auto'},flex: { md: 1}, minWidth: 0 }}>
            <Typography sx={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700,
                fontSize: {xs: '0.72rem', sm: '0.78rem', md: '0.85rem'},
                color: ORANGE,
                mb: 1.25,
            }}>
                {title}
            </Typography>

            {visible.length > 0 ? (
                <Stack spacing={1}>
                    {visible.map((q, i) => (
                        <Stack key={i} direction="row" spacing={0.75} alignItems="flex-start">
                            <Typography sx={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: { xs: '0.68rem', sm: '0.74rem', md: '0.8rem' },
                                color: '#3D3652',
                                fontWeight: 600,
                                flexShrink: 0,
                            }}>
                                {i + 1}.
                            </Typography>
                            <Typography sx={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: { xs: '0.68rem', sm: '0.74rem', md: '0.8rem' },
                                color: '#3D3652',
                                lineHeight: 1.5,
                            }}>
                                {q}
                            </Typography>
                        </Stack>
                    ))}
                </Stack>
            ) : (
                <Typography sx={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#9B96A8' }}>
                    No questions generated
                </Typography>
            )}

            {questions.length > MAX_VISIBLE && (
            <Button onClick={() => setShowAll((prev) => !prev)}
                sx={{
                    mt: 1.25,
                    px: 1.2,
                    py: 0.4,
                    minWidth: 0,
                    borderRadius: '999px',
                    background: '#FFF1E7',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    color: ORANGE,
                    textTransform: 'none',
                    '&:hover': {
                        background: '#FFE5D1',
                    }
                }}>
                    {showAll
                        ? 'See less'
                        : `...and ${questions.length - MAX_VISIBLE} more`
                    }
                </Button>
            )}
        </Box>
    );
}

export default function InterviewPrepResult({ result }) {
    const questions = result?.questions || [];

    const technical = questions
        .filter((q) => q.category === "Technical")
        .map((q) => q.question);
    const behavioral = questions
        .filter((q) => q.category === "Behavioral")
        .map((q) => q.question);
    const hr = questions
        .filter((q) => q.category === "HR / General")
        .map((q) => q.question);

    const total = technical.length + behavioral.length + hr.length;

    if (!result || total === 0) {
        return (
            <Box sx={{
                width: '90%',
                p: { xs: 1, sm: 2 },
                borderRadius: { xs: 2, sm: 3 },
                border: '1px solid #E7E3F2',
                background: '#fff',
                textAlign: 'center',
            }}>
                <Typography sx={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: { xs: '0.60rem', sm: '0.70rem', md: '0.9rem' },
                    color: '#8b8a90',
                }}>
                    Ready to prepare? Fill in the details above and generate your personalized interview questions.
                </Typography>
            </Box>
        );
    }
    
    const roleLabel = result.role?.trim() ? result.role : "Your Selected";
    return (
         <Box sx={{
            width: '95%',
            p: { xs: 1.75, sm: 2.5 },
            borderRadius: { xs: 2, sm: 3 },
            border: '1px solid #E7E3F2',
            background: '#fff',
        }}>
            <Typography sx={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 600,
                fontSize: { xs: '0.95rem', sm: '1.05rem' },
                color: ORANGE,
                mb: 2,
            }}>
                Generated Questions for the {roleLabel} Role ({total})
            </Typography>

            <Stack sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: '1fr 1fr',
                    md: 'repeat(3, 1fr)',
                },
                gap: { xs: 2, sm: 2, md: 3 },
            }}>
                <QuestionColumn title="Technical Questions" questions={technical} />
                <QuestionColumn title="Behavioral Questions" questions={behavioral} />
                <QuestionColumn title="HR / General Questions" questions={hr} />
            </Stack>
        </Box>
    );
}