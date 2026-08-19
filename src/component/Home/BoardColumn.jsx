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

    return(
        <>
        <Box sx={{backgroundColor: BgColor ,borderRadius: 4,paddingTop:2,paddingLeft:1,flex:1,minWidth: 0,
        height: 360,overflow:'hidden',boxSizing:'border-box',display:'flex',flexDirection:'column'}} 
        ref={setNodeRef}>
            <Box sx={{display:'flex', justifyContent:'space-between',alignItems:'center',mb:1.5,flexShrink:0}}>
                <Box sx={{display:'flex',gap:1,alignItems:'center',color: Color}}>    
                    <Icon sx={{fontSize:23}}></Icon>
                    <Typography variant='subtitle1' sx={{fontWeight: 400}}>
                        {title}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{display:"flex", flexDirection:"column",gap:1,overflowY:'auto',overflowX:'hidden',
            flex:1,pr:1,minHeight:0,minWidth:0,
            '&::-webkit-scrollbar': {width: '4px'},
            '&::-webkit-scrollbar-track': {
                background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#b8b8b8',
                borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#8f8f8f',
            },
            }}>
            
            {filterApplications.length  === 0 ? (
                <Typography variant="body2" sx={{textAlign: 'center', color: '#777',mt: 4}}>
                    No applications in the status yet.
                </Typography>
            ) : (
                filterApplications.map((application) => (
                    <ApplicationCard  
                        key={application.id}
                        application={application}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))
            )}
            </Box>
        </Box>
        </>
    )
}