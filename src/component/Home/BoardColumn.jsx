import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import ApplicationCard from './ApplicationCard'
import { useDroppable } from '@dnd-kit/core';

export default function BoardColumn({onDelete,onEdit, color, bgColor, title, icon, status, applications }) {
    const { setNodeRef } = useDroppable({
        id: status
    });
    
    const Icon = icon;
    const Color = color;
    const BgColor = bgColor;

    const filterApplications = applications.filter((application) => 
        application.status === status    
    );
    const filterApplicationsLength = filterApplications.length;

    return(
        <Box sx={{backgroundColor: BgColor ,borderRadius: 4,padding: 2,flex:1,minWidth: 0,minHeight: 100}} 
        ref={setNodeRef}>
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
                        application={application}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </Box>
        </Box>
    )
}