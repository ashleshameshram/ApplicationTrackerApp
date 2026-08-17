import { useState } from 'react'
import BoardColumn from './BoardColumn.jsx'
import Box from '@mui/material/Box';
import { dummyApplication } from '../../data/dummyApplication.js'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NearMeIcon from '@mui/icons-material/NearMe';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CancelIcon from '@mui/icons-material/Cancel';

export default function HomePage() {
    const [applications, setApplications] = useState(dummyApplication);

    //add card btn function
    let handleAddCard = () => {
        console.log("Hello from Homepage!");
    }

    const columns = [
        {
            title: 'Wishlist',
            status: 'wishlist',
            icon : FavoriteBorderIcon,
            color: '#ed3886',
            bgColor: '#ffe3ef'
        },
        {
            title: 'Applied',
            status: 'applied',
            icon: NearMeIcon,
            color: '#3856ed',
            bgColor: '#e6e3ff'
        },
        {
            title: 'Interview',
            status: 'interview',
            icon: PeopleAltIcon,
            color: '#c038ed',
            bgColor: '#f9e3ff'
        },
        {
            title: 'Offer',
            status: 'offer',
            icon: CardGiftcardIcon,
            color: '#7ded38',
            bgColor: '#e2fdde'
        },
        {
            title: 'Rejected',
            status: 'rejected',
            icon: CancelIcon,
            color: '#ed3e38',
            bgColor: '#ffdada'
        },
    ];

    return(
        <Box sx={{display:'flex', gap:1, width: '100%', p:2,boxSizing: 'border-box'}}>
            {columns.map((column) => (
                <BoardColumn 
                    key={column.status}
                    icon={column.icon}
                    color={column.color}
                    bgColor={column.bgColor}
                    title={column.title} 
                    status={column.status} 
                    applications={applications} 
                    onAddCard={handleAddCard}
                />
            ))}
        </Box>
    )
}