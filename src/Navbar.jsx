import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import { Link } from 'react-router-dom';

const navLinks = [
    { label : 'Home', path:'/'},
    { label : 'My Application', path: '/myapplications'},
    { label : 'AI-Assistant', path: '/ai-assistant'}
];

export default function Navbar() {
    return (
        <Box sx={{
            position: 'fixed',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1200,
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 0.5, sm: 1, },
            px: { xs: 0.75, sm: 1, md: 7 },
            py: 0.75,
            borderRadius: 50,
            backgroundColor: 'rgba(241, 234, 243, 0.55)',
            backdropFilter: 'blur(16px) saturate(180%)',
            border: '1px solid rgba(3, 3, 3, 0.1)',
            boxShadow: '0 0 20px rgba(7, 7, 7, 0.35)',
        }}>

            {/* Nav links */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 0.25, sm: 0.5 },
            }}>
                {navLinks.map((link) => (
                    <Typography
                        key={link.label}
                        component={Link}
                        to={link.path}
                        sx={{
                            fontSize: { xs: '0.75rem', sm: '0.9rem', md: '1.1rem' },
                            fontWeight: 500,
                            color: '#30003a',
                            textDecoration: 'none',
                            px: { xs: 1.25, sm: 1.75 },
                            py: 0.75,
                            borderRadius: 50,
                            whiteSpace: 'nowrap',
                            transition: 'background-color 0.2s ease, color 0.2s ease',
                            cursor: 'pointer',
                            '&:hover': {
                                backgroundColor: 'rgba(171, 3, 255, 0.1)',
                                color: '#18002b',
                            },
                        }}
                    >
                        {link.label}
                    </Typography>
                ))}
            </Box>
        </Box>
    );
}