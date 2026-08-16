import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';

import ApplicationCard from './ApplicationCard'

export default function BoardColumn({ title, status, applications }) {
    const filterApplications = applications.filter((application) => 
        application.status === status    
    );
    const filterApplicationsLength = filterApplications.length;

    return(
        <Box sx={{ backgroundColor: '#f8f8fb',borderRadius: 2,padding: 2, 
        padding:1.5,flex:1,minWidth: 0}}>
            <Box sx={{display:'flex', justifyContent:'space-between',alignItems:'center',mb:1.5}}>
                <Typography variant='subtitle1' sx={{fontWeight: 600}}>
                    {title}
                </Typography>
                <Box sx={{minWidth: 24,height: 24,borderRadius: '50%',backgroundColor: '#ffffff',
                display: 'flex',alignItems: 'center',justifyContent: 'center',fontSize: 12,color: '#777b8e'}}>
                    {filterApplicationsLength}
                </Box>
            </Box>

            <Box sx={{display:"flex", flexDirection:"column",gap:1.5}}>
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