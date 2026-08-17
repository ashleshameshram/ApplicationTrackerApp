import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';

import ApplicationCard from './ApplicationCard'

export default function BoardColumn({ color,bgColor, title, icon,status, applications }) {
    const Icon = icon;
    const Color = color;
    const BgColor = bgColor;

    const filterApplications = applications.filter((application) => 
        application.status === status    
    );
    const filterApplicationsLength = filterApplications.length;

    return(
        <Box sx={{ backgroundColor: BgColor ,borderRadius: 4,padding: 2, 
        padding:1.5,flex:1,minWidth: 0}}>
            <Box sx={{display:'flex', justifyContent:'space-between',alignItems:'center',mb:1.5}}>

                <Box sx={{display:'flex',gap:1,alignItems:'center',color: Color}}>    
                    <Icon sx={{fontSize:23}}></Icon>
                    <Typography variant='subtitle1' sx={{fontWeight: 400}}>
                        {title}
                    </Typography>
                </Box>
                
                <Box sx={{minWidth: 24,height: 24,borderRadius: '50%',backgroundColor: '#ffffff',
                display: 'flex',alignItems: 'center',justifyContent: 'center',fontSize: 12,color: '#777b8e'}}>
                    {filterApplicationsLength}
                </Box>
            </Box>

            <Box sx={{display:"flex", flexDirection:"column",gap:1}}>
                {filterApplications.map((application) => (
                    <ApplicationCard  
                        key={application.id}
                        applications={application}
                    />
                ))}
            </Box>
            
            <Stack spacing={2}>
                <Button href="#text-buttons">
                   <AddIcon/> Add Card
                </Button>
            </Stack>
        </Box>
    )
}