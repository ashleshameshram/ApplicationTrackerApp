import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function BoardColumnHeader({onAddcard}) {
    return(
        <Box sx={{
        display:'flex', justifyContent:'space-between', alignItems:'center',mt:2, 
        mx:{
            xs: 1,
            sm:2,
            md:3,
        }, gap:1 }}>
            <Typography variant='h5' sx={{
            fontWeight: 500, color: '#202238',
            fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
            }}>
                ApplyIQ 
            </Typography>
    
            <Button 
            variant='contained' 
            onClick={onAddcard}
            startIcon={<AddIcon sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }} />}
            sx={{
                textTransform: 'none', 
                borderRadius: 2,
                whiteSpace: 'nowrap',
                fontSize: { xs: '0.65rem', sm: '0.8rem', md: '0.875rem' },
                px: { xs: 1, sm: 1.5, md: 2 },
            }}
            >
            Add Application
            </Button>
        </Box>
    )
}