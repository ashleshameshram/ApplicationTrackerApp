import { Box, Typography, Button, Stack } from '@mui/material';
import { keyframes } from '@emotion/react';

export default function LandingPage() {
    const drift = keyframes`
        0%   { background-position: 0% 50%; }
        50%  { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    `;
    return(
        <Box
      sx={{
        height: '100vh',
        overflowY: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 3,
        backgroundImage:
          'linear-gradient(120deg, #0B1F2A 0%, #1B1035 35%, #2A1B45 55%, #0B1F2A 100%)',
        backgroundSize: '300% 300%',
        animation: `${drift} 16s ease-in-out infinite`,
        '@media (prefers-reduced-motion: reduce)': {
          animation: 'none',
        },
      }}
    >
      {/* Eyebrow */}
      <Typography
        sx={{
          fontFamily: "'Sora', sans-serif",
          fontSize: '0.78rem',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: '#E8985E',
          fontWeight: 600,
          mb: 2,
        }}
      >
        ApplyIQ · AI Job Tracker
      </Typography>

      {/* Main title — what the project does */}
      <Typography
        sx={{
          fontFamily: "'Sora', sans-serif",
          fontWeight: 700,
          fontSize: { xs: '1.9rem', sm: '2.4rem', md: '2.9rem' },
          lineHeight: 1.15,
          color: '#F4EFE6',
          maxWidth: 760,
          mb: 2,
        }}
      >
        Track every job application.{' '}
        <Box component="span" sx={{ color: '#E8985E' }}>
          Let AI handle the busywork.
        </Box>
      </Typography>

      {/* Subtext */}
      <Typography
        sx={{
          fontFamily: "'Inter', sans-serif",
          fontSize: { xs: '0.95rem', md: '1.05rem' },
          color: '#A9B8BC',
          maxWidth: 540,
          lineHeight: 1.6,
          mb: 4,
        }}
      >
        ApplyIQ keeps every application, its stage, and what to do next in one
        place — with AI that scores your resume against the job description
        and preps you for the interview.
      </Typography>

      {/* CTAs */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button
          sx={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            textTransform: 'none',
            fontSize: '0.95rem',
            px: 3.5,
            py: 1.3,
            borderRadius: '100px',
            color: '#0B1F2A',
            background: '#E8985E',
            boxShadow: '0 10px 24px -8px rgba(232,152,94,0.45)',
            '&:hover': { background: '#F0AB78', boxShadow: '0 12px 28px -8px rgba(232,152,94,0.55)' },
          }}
        >
          Add your first application
        </Button>
        <Button
          sx={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            textTransform: 'none',
            fontSize: '0.95rem',
            px: 3.5,
            py: 1.3,
            borderRadius: '100px',
            color: '#F4EFE6',
            border: '1px solid rgba(244,239,230,0.25)',
            '&:hover': { borderColor: '#E8985E', background: 'rgba(232,152,94,0.08)' },
          }}
        >
          Ask the AI Assistant
        </Button>
      </Stack>
        </Box>
    )
}