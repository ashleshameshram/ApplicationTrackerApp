import { useState } from 'react'
import Box from '@mui/material/Box'

import NearMeIcon from '@mui/icons-material/NearMe';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CancelIcon from '@mui/icons-material/Cancel';
import Typography from '@mui/material/Typography';

export default function StatsBar({applications}) {
    const totalApplied = applications.filter(
        (application) =>  application.status === 'applied'
    ).length ;

    const interview = applications.filter(
        (application)  => application.status === 'interview'
    ).length ;

    const offer = applications.filter(
        (application) => application.status === 'offer'
    ).length ;

    const rejections = applications.filter(
        (application) => application.status === 'rejected'
    ).length

    const totalProcessed = totalApplied + interview + offer + rejections;
    const interviewRate = totalProcessed > 0 
    ? Math.round((interview / totalProcessed) * 100)
    : 0;
    
    return(
        <Box sx={{width:'100%',display:'flex',mt:2,mb:2,gap:2,pl:3}}>
            {/* TotalApplied */}
            <Box sx={{display:'flex',alignItems:'center',gap:2,p:3,backgroundColor:'#fff',
            border:'1px solid #eeeeee', borderRadius:3,width:200
            }}>
                {/* icon */}
                <Box sx={{display:'flex',justifyContent: 'center',alignItems:'center',width:50,
                height:50,backgroundColor: '#efedff',borderRadius:2}}>
                    <NearMeIcon sx={{fontSize:32,color:'#3856ed'}}/>
                </Box>
                <Box>
                    <Typography variant='body1' sx={{color: '#777b8e'}}>
                        Total Applied
                    </Typography>
                    <Typography variant='h5' sx={{fontWeight:600}}>
                        {totalApplied}
                    </Typography>
                </Box>
            </Box>

            {/* In Interview */}
            <Box sx={{display:'flex',alignItems:'center',gap:2,p:3,backgroundColor:'#fff',
            border:'1px solid #eeeeee', borderRadius:3,width:200
            }}>
                {/* icon */}
                <Box sx={{display:'flex',justifyContent: 'center',alignItems:'center',width:50,
                height:50,backgroundColor: '#e7ffe2',borderRadius:2}}>
                    <PermIdentityIcon sx={{fontSize:32,color:'#7ded38'}}/>
                </Box>
                <Box>
                    <Typography variant='body1' sx={{color: '#777b8e'}}>
                        In Interview
                    </Typography>
                    <Typography variant='h5' sx={{fontWeight:600}}>
                        {interview}
                    </Typography>
                </Box>
            </Box>

            {/* Interview Rate */}
            <Box sx={{display:'flex',alignItems:'center',gap:2,p:3,backgroundColor:'#fff',
            border:'1px solid #eeeeee', borderRadius:3,width:200
            }}>
                {/* icon */}
                <Box sx={{display:'flex',justifyContent: 'center',alignItems:'center',width:50,
                height:50,backgroundColor: '#fdf0d9',borderRadius:2}}>
                    <AutoGraphIcon sx={{fontSize:32,color:'#edab38'}}/>
                </Box>
                <Box>
                    <Typography variant='body1' sx={{color: '#777b8e'}}>
                        Interview Rate
                    </Typography>
                    <Typography variant='h5' sx={{fontWeight:600}}>
                        {interviewRate}%
                    </Typography>
                </Box>
            </Box>

            {/* Offer */}
            <Box sx={{display:'flex',alignItems:'center',gap:2,p:3,backgroundColor:'#fff',
            border:'1px solid #eeeeee', borderRadius:3,width:200
            }}>
                {/* icon */}
                <Box sx={{display:'flex',justifyContent: 'center',alignItems:'center',width:50,
                height:50,backgroundColor: '#f3d2ff',borderRadius:2}}>
                    <CardGiftcardIcon sx={{fontSize:32,color:'#bd38ed'}}/>
                </Box>
                <Box>
                    <Typography variant='body1' sx={{color: '#777b8e'}}>
                        Offer
                    </Typography>
                    <Typography variant='h5' sx={{fontWeight:600}}>
                        {offer}
                    </Typography>
                </Box>
            </Box>

            {/* Rejections */}
            <Box sx={{display:'flex',alignItems:'center',gap:2,p:3,backgroundColor:'#fff',
            border:'1px solid #eeeeee', borderRadius:3,width:200
            }}>
                {/* icon */}
                <Box sx={{display:'flex',justifyContent: 'center',alignItems:'center',width:50,
                height:50,backgroundColor: '#ffdada',borderRadius:2}}>
                    <CancelIcon sx={{fontSize:32,color:'#ed3e38'}}/>
                </Box>
                <Box>
                    <Typography variant='body1' sx={{color: '#777b8e'}}>
                        Rejections
                    </Typography>
                    <Typography variant='h5' sx={{fontWeight:600}}>
                        {rejections}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}