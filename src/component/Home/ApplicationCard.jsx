import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import LocationPinIcon from '@mui/icons-material/LocationPin';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function ApplicationCard({ application }) {
    const { role, company,location,daysAgo, status } = application;

    return(
        <Card variant="outlined" sx={{borderRadius: 2,borderColor: '#e6e7ee',boxShadow: 'none'}}>
            <CardContent sx={{p: 2}}>

                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                    <Avatar variant = "rounded" sx={{width: 40,height: 40,fontSize: 20,bgcolor: '#f0f1f6',color: '#4b4e63'}}>
                        {company.charAt(0)}
                    </Avatar>

                    <Box sx={{flex: 1}}>
                        <Typography variant="subtitle1" sx={{fontWeight: 600,color: '#202238'}}>
                            {role}
                        </Typography>

                        <Typography variant="body2" sx={{color: '#7b7f91',mt: 0.2}}>
                            {company}
                        </Typography>
                    </Box>

                    <IconButton size="small" sx={{color: '#85899a'}}>
                        <MoreVertIcon fontSize="small" />
                    </IconButton>
                </Box>

                <Box sx={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',mt: 2}}>
                    <Box sx={{display: 'flex',alignItems: 'center',gap: 0.5}}> 
                        <LocationPinIcon sx={{fontSize: 15,color: '#2b2b2b'}}/>
                        <Typography variant="body2" sx={{fontSize: 11,color: '#2b2b2b'}}>
                            {location}
                        </Typography>
                    </Box>

                    <Typography variant="caption" sx={{color: '#85899a'}}>
                        {daysAgo} days ago
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}