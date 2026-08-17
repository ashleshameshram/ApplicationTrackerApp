import { useState,useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import BoardColumn from './BoardColumn.jsx'
import Box from '@mui/material/Box';
import AddApplicationForm from './AddApplicationForm.jsx';
import BoardColumnHeader from './BoardColumnHeader.jsx';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NearMeIcon from '@mui/icons-material/NearMe';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CancelIcon from '@mui/icons-material/Cancel';

export default function HomePage() {
    //load saved applications
    const [applications, setApplications] = useState(() => {
        const savedApplications = localStorage.getItem('applications');
        return savedApplications ? JSON.parse(savedApplications) : [];
    });

    const [openAddForm, setOpenAddForm] = useState(false);
    const [editApplication, setEditApplication] = useState(null);
    const [openEditApplication, setOpenEditApplication] = useState(false);

    //add card btn function
    let handleAddCard = () => {
        setOpenAddForm(true);
    }

    let handleAddApplication = (newApplication) => {
        setApplications([
            ...applications,
            {
                id: uuidv4(),
                ...newApplication
            }
        ]);
    };

    //edit application
    let handleEditApplication = (applications) => {
        setEditApplication(applications);
        setOpenEditApplication(true);
    }
    //update form when editing the form
    const handleUpdateApplication = (updateApplication) => {
        setApplications(
            applications.map((application) => 
                application.id === updateApplication.id
                ? updateApplication : application
            )
        );
    };

    //delete application
    let handleDeleteApplication = (id) => {
        setApplications(
            applications.filter((application) => application.id !== id )
        );
    };

    //add localStorage
    useEffect(() => {
        localStorage.setItem('applications', JSON.stringify(applications));
    },[applications]);

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
        <>
        <Box sx={{width:'100%', p:2, boxSizing: 'border-box'}}>
            <BoardColumnHeader onAddcard={handleAddCard}/>

            <Box sx={{display:'flex', gap:1, width: '100%'}}>
                {columns.map((column) => (
                    <BoardColumn 
                        key={column.status}
                        icon={column.icon}
                        color={column.color}
                        bgColor={column.bgColor}
                        title={column.title} 
                        status={column.status} 
                        onEdit={handleEditApplication}
                        onDelete={handleDeleteApplication}
                        applications={applications} 
                    />
                ))}
            </Box>

            <AddApplicationForm 
                open={openAddForm}
                onClose={() => setOpenAddForm(false)}
                onAddApplication={handleAddApplication}
            />

            <AddApplicationForm 
                open={openEditApplication}
                onClose={() => {
                    setOpenEditApplication(false);
                    setEditApplication(null);
                }}
                applications={editApplication}
                onAddApplication={handleUpdateApplication}
            />
        </Box>
        </>
    )
}