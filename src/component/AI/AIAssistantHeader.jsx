import { Box, Typography, Stack } from '@mui/material';

export default function AIAssistantHeader() {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        width: '100%',
        px: { xs: 2, sm: 3 },
        py: { xs: 1.5, sm: 2 },
        my : { xs: 1,sm:2, md:8},
        borderRadius: 2,
      }}
    >
      
      {/* Title + subtitle */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            color: '#120038',
            lineHeight: 1.4,
            fontSize: { xs: '1.1rem', sm: '1.35rem', md: '1.8rem' },
          }}
        >
          AI Assistant
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontSize: { xs: '0.8rem', sm: '0.88rem' },
            color: '#6B6478',
            whiteSpace: { xs: 'normal', sm: 'nowrap' },
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          Get AI-powered insights to improve your application success.
        </Typography>
      </Box>
    </Stack>
  );
}