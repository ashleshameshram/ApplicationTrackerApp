import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function BoardColumnHeader({onAddcard}) {
    return(
        <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',mb:2}}>
            <Typography variant='h5' sx={{fontWeight:500,color:'#202238'}} >
                    Job Application
            </Typography>
    
            <Button variant='contained' onClick={onAddcard} sx={{textTransform:'none',
            borderRadius:2 }}>
                <AddIcon/> Add Application
            </Button>
        </Box>
    )
}