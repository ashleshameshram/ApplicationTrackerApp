import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';

export default function AddApplicationRow({ onAddcard }) {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mx: { xs: 1, sm: 2, md: 3 },
            mb: { xs: 1.5, sm: 2 },
            mt: { xs:1, sm:2, md: 4}
        }}>
            <Typography sx={{
                fontWeight: 600,
                color: '#202238',
                fontSize: {
                    xs: '1.1rem',
                    sm: '1.35rem',
                    md: '1.7rem',
                },
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
            }}>
                Application Stats
            </Typography>

            <Button variant="contained" onClick={onAddcard}
            startIcon={ <AddIcon sx={{fontSize: { xs: '1rem',sm: '1.1rem',md: '1.25rem'}}}/> }
                sx={{
                    textTransform: 'none',
                    borderRadius: 2,
                    whiteSpace: 'nowrap',
                    fontSize: {
                        xs: '0.65rem',
                        sm: '0.8rem',
                        md: '0.875rem',
                    },
                    px: {
                        xs: 1,
                        sm: 1.5,
                        md: 2,
                    },
                    backgroundColor: '#3e005f',
                    boxShadow: 'none',
                    '&:hover': {
                        backgroundColor: '#2c0044',
                        boxShadow: 'none',
                    },
                }}>
                Add Application
            </Button>
        </Box>
    );
}