import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

export default function BoardColumnHeader() {
    return(
        <>
        <Box sx={{mt:4, mx: { xs: 1, sm: 2, md: 3 }, mb: { xs: 1.5, sm: 2 } }}>
            <Typography sx={{
                fontWeight: 600,
                color: '#202238',
                fontSize: { xs: '1.1rem', sm: '1.35rem', md: '1.6rem' },
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
            }}>
                Your Applications
            </Typography>
            <Typography sx={{
                fontWeight: 400,
                color: '#777777',
                fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.9rem' },
                mt: 0.3,
            }}>
                Track and manage your job applications
            </Typography>
        </Box>        
        </>
    )
}