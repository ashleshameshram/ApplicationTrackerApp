import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';

export default function BoardColumnHeader({onAddcard}) {
    return(
        <Box sx={{
        display:'flex', justifyContent:'space-between', alignItems:'center',mt:2, 
        mx:{
            xs: 1,
            sm:2,
            md:3,
        }, gap:1 }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 0.75, sm: 1 },
            }}>
                <AutoAwesomeOutlinedIcon sx={{
                    fontSize: { xs: 22, sm: 26, md: 33 },
                    color: '#3e005f'
                }}/>
                <Typography variant='h5' sx={{
                    fontWeight: 600, color: '#202238',
                    fontFamily: 'revert',
                    fontSize: { xs: '1rem', sm: '1.2rem', md: '1.6rem' },
                    letterSpacing: '-0.01em',
                    lineHeight: 1,
                }}>
                    ApplyIQ
                </Typography>
            </Box>
    
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
                backgroundColor: '#3e005f',
                boxShadow: 'none',
                '&:hover': {
                    backgroundColor: '#2c0044',
                    boxShadow: 'none',
                },
            }}
            >
            Add Application
            </Button>
        </Box>
    )
}