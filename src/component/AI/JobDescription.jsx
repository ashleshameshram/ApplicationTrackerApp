import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import {Box,Typography,TextField,Stack,} from '@mui/material';

export default function JobDescription({ setJobDescription, setInputMessage }) {
    return(
        <Box
            sx={{
            border: '1px solid #E7E3F2',
            borderRadius: { xs: 1.75, sm: 2.5 },
            p: { xs: 1.25, sm: 2 },
            mb: { xs: 1.25, sm: 2 },
        }}>
            <Stack direction="row" alignItems="center" spacing={0.8} sx={{ mb: 1 }}>
            <DescriptionOutlinedIcon sx={{ fontSize: { xs: 15, sm: 18 }, color: '#6D28D9' }} />
            <Typography
                sx={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 600,
                fontSize: { xs: '0.75rem', sm: '0.88rem' },
                color: '#1F1436',
            }}>
                Job Description
            </Typography>
            </Stack>

            <TextField
                multiline
                minRows={{ xs: 3, sm: 4 }}
                maxRows={8}
                fullWidth
                onChange={(e) => {
                    setJobDescription(e.target.value);
                    setInputMessage("");
                }}

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
                    }
                }}/>
        </Box>
    )
}