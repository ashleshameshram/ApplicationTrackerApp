import { Box, Typography, Stack } from '@mui/material';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';

export default function AIAssistantHeader() {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        width: '100%',
        px: { xs: 2, sm: 3 },
        py: { xs: 1.5, sm: 2 },
        mt: { xs: 2, sm: 2, md: 8 },
        my: { xs: 1, sm: 2 },
        borderRadius: 2,
      }}
    >

      {/* Title + subtitle */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TipsAndUpdatesOutlinedIcon sx={{
            fontSize: { xs: 18, sm: 22, md: 30 },
            color: '#30003a'
          }} />
          <Typography
            sx={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              color: '#120038',
              lineHeight: 1.4,
              display: { xs: 'none', sm: 'block', md: 'flex' },
              fontSize: { xs: 18, sm: 22, md: 25 },
            }}>
            AI Assistant
          </Typography>
        </Box>
        <Typography
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontSize: { xs: '0.8rem', sm: '0.88rem' },
            color: '#6B6478',
            whiteSpace: { xs: 'normal', sm: 'nowrap' },
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
          Get AI-powered insights to improve your application success.
        </Typography>
      </Box>
    </Stack>
  );
}