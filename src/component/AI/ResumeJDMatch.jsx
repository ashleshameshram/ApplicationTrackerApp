import React, { useState } from 'react';
import {Box,Typography,TextField,Chip,Button,Stack,} from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function ResumeJDMatch() {
    const [jobDescription, setJobDescription] = useState('');
    

    const MAX_CHARS = 6000;
    return(
        <Box
      sx={{
        width: '100%',
        maxWidth: { xs: 340, sm: 480 },
        mx: { xs: 1, sm:2, md: 3},
        p: { xs: 1.75, sm: 3 },
        borderRadius: { xs: 2, sm: 3 },
        border: '1px solid #E7E3F2',
        background: '#fff',
      }}
    >
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
          }}
        >
          1
        </Box>
        <Box>
          <Typography
            sx={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              fontSize: { xs: '0.82rem', sm: '1.05rem' },
              color: '#1F1436',
              lineHeight: 1.3,
            }}
          >
            Resume ↔ Job Match Score
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Inter', sans-serif",
              fontSize: { xs: '0.7rem', sm: '0.85rem' },
              color: '#6B6478',
              mt: 0.3,
            }}
          >
            Paste the job description to see how well your resume matches.
          </Typography>
        </Box>
      </Stack>

      {/* Job description box */}
      <Box
        sx={{
          border: '1px solid #E7E3F2',
          borderRadius: { xs: 1.75, sm: 2.5 },
          p: { xs: 1.25, sm: 2 },
          mb: { xs: 1.25, sm: 2 },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={0.8} sx={{ mb: 1 }}>
          <DescriptionOutlinedIcon sx={{ fontSize: { xs: 15, sm: 18 }, color: '#6D28D9' }} />
          <Typography
            sx={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 600,
              fontSize: { xs: '0.75rem', sm: '0.88rem' },
              color: '#1F1436',
            }}
          >
            Job Description
          </Typography>
        </Stack>

        <TextField
          multiline
          minRows={{ xs: 3, sm: 4 }}
          maxRows={8}
          fullWidth
          placeholder="Paste job description here..."
          sx={{
            '& .MuiOutlinedInput-root': {
              fontFamily: "'Inter', sans-serif",
              fontSize: { xs: '0.78rem', sm: '0.88rem' },
              borderRadius: '10px',
              background: '#FAFAFC',
              '& fieldset': { borderColor: '#E7E3F2' },
              '&:hover fieldset': { borderColor: '#C9BEEB' },
              '&.Mui-focused fieldset': { borderColor: '#6D28D9' },
            },
          }}
        />

        <Typography
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontSize: { xs: '0.68rem', sm: '0.75rem' },
            color: '#9A93AE',
            mt: 0.75,
          }}
        >
          0 / 6000 characters
        </Typography>
      </Box>

      {/* Resume row */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={{ xs: 0.8, sm: 1.2 }}
        sx={{
          border: '1px solid #E7E3F2',
          borderRadius: { xs: 1.75, sm: 2.5 },
          p: { xs: 1, sm: 1.5 },
          mb: { xs: 1.75, sm: 2.5 },
          flexWrap: 'wrap',
        }}
      >
        <DescriptionOutlinedIcon sx={{ fontSize: { xs: 15, sm: 18 }, color: '#6D28D9', flexShrink: 0 }} />
        <Typography
          sx={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: { xs: '0.72rem', sm: '0.85rem' },
            color: '#1F1436',
          }}
        >
          Resume
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontSize: { xs: '0.72rem', sm: '0.85rem' },
            color: '#4A4458',
            flex: 1,
            minWidth: 60,
          }}
        >
          My_Resume.pdf
        </Typography>
        <Chip
          label="Saved"
          size="small"
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: { xs: '0.62rem', sm: '0.72rem' },
            height: { xs: 20, sm: 24 },
            color: '#1E8E5A',
            background: '#E4F6EC',
          }}
        />
        <Typography
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: { xs: '0.68rem', sm: '0.82rem' },
            color: '#6D28D9',
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Change Resume
        </Typography>
      </Stack>

      {/* Analyze button */}
      <Button
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
        }}
      >
        Analyze Match
      </Button>
    </Box>
    );
}