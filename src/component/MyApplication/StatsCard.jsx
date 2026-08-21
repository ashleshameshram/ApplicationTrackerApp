import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function StatCard({ icon: Icon, iconColor, iconBg, label, value }) {
    return (
        <Box sx={{
            display:'flex',alignItems:'center',
            gap:{xs:1, sm:1.5, md:2},
            p:{xs:1.5, sm:2, md:2},
            backgroundColor:'#fff',
            border:'1px solid #eeeeee', borderRadius:3,
            flex:{xs:'1 1 calc(50% - 8px)', sm:'1 1 calc(33.33% - 12px)', md:'1 1 0'},
            minWidth:{xs:140, sm:160, md:180},
            boxSizing:'border-box'
        }}>
            <Box sx={{
                display:'flex',justifyContent: 'center',alignItems:'center',
                width:{xs:38, sm:44, md:50},
                height:{xs:38, sm:44, md:50},
                backgroundColor: iconBg, borderRadius:2,
                flexShrink:0
            }}>
                <Icon sx={{fontSize:{xs:20, sm:26, md:32}, color: iconColor}}/>
            </Box>
            <Box sx={{minWidth:0}}>
                <Typography variant='body2' sx={{color: '#777b8e',fontSize:{xs:'0.7rem', sm:'0.8rem', md:'0.875rem'},whiteSpace:'nowrap'}}>
                    {label}
                </Typography>
                <Typography variant='h5' sx={{fontWeight:600,fontSize:{xs:'1.1rem', sm:'1.3rem', md:'1.5rem'}}}>
                    {value}
                </Typography>
            </Box>
        </Box>
    );
}