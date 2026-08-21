import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import ApplicationCard from './ApplicationCard'
import { useDroppable } from '@dnd-kit/core';

export default function BoardColumn({onDelete,onEdit, color, bgColor, title, icon, status, applications }) {
    const { setNodeRef } = useDroppable({
        id: status
    });
    
    const Icon = icon;
    const Color = color;
    const BgColor = bgColor;

    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));

    const filterApplications = applications.filter((application) => 
        application.status === status    
    );

    return(
        <>
        <Box sx={{
            backgroundColor: BgColor,
            borderRadius: { xs: 2, sm: 3, md: 4 },
            pt: { xs: 1, sm: 1.5, md: 2 },
            pl: { xs: 0.5, sm: 1 },
            pr: { xs: 0.25, sm: 0.5, md: 0 },
            pb: { xs: 1, sm: 1.5, md: 2 },
            width: '100%',
            minWidth: 0,
            height: 'auto',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column'
        }} 
        ref={setNodeRef}>
            <Box sx={{
                display:'flex', justifyContent: isXs ? 'center' : 'space-between',
                alignItems:'center',mb:1.5,flexShrink:0
            }}>
                <Box sx={{
                    display:'flex',gap: { xs: 0.3, sm: 1 },
                    alignItems:'center', color: Color,
                    flexDirection: { xs: 'column', sm: 'row' }
                }}>    
                    <Icon sx={{ fontSize: { xs: 16, sm: 20, md: 23 } }}></Icon>
                    <Typography variant='subtitle1' sx={{
                        fontWeight: 400,
                        display: 'block',
                        fontSize: { xs: '0.6rem', sm: '0.8rem', md: '1rem' },
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: { xs: 70, sm: 'none' }
                    }}>
                        {title}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{display:"flex", flexDirection:"column",gap: { xs: 0.75, md: 1 },
            overflowY:'auto',overflowX:'hidden',
            maxHeight: { xs: 300, sm: 340, md: 400 },
            pr: { xs: 0.5, sm: 1 },minWidth:0,
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
                <Typography variant="body2" sx={{
                    textAlign: 'center', color: '#777',
                    fontSize: { xs: '0.6rem', sm: '0.75rem', md: '0.8rem' },
                    display: 'block',
                    py: { xs: 1.5, sm: 2 }
                }}>
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