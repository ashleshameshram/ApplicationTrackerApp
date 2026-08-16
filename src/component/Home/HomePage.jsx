import { useState } from 'react'
import BoardColumn from './BoardColumn.jsx'
import Box from '@mui/material/Box';
import { dummyApplication } from '../../data/dummyApplication.js'

export default function HomePage() {
    const columns = [
        {
            title: 'Wishlist',
            status: 'wishlist'
        },
        {
            title: 'Applied',
            status: 'applied'
        },
        {
            title: 'Interview',
            status: 'interview'
        },
        {
            title: 'Offer',
            status: 'offer'
        },
        {
            title: 'Rejected',
            status: 'rejected'
        },
    ];

    return(
        <Box sx={{display:'flex', gap:1, width: '100%', p:2,boxSizing: 'border-box'}}>
            {columns.map((column) => (
                <BoardColumn 
                    key={column.status}
                    title={column.title} 
                    status={column.status} 
                    applications={dummyApplication} 
                />
            ))}
        </Box>
    )
}