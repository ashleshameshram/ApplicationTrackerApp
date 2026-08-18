import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useDraggable } from '@dnd-kit/core';

import LocationPinIcon from '@mui/icons-material/LocationPin';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function ApplicationCard({ application, onEdit, onDelete }) {
    const { role, company, location, applicationDate, status } = application;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

    const {attributes, listeners, setNodeRef, transform, isDragging} = useDraggable({
        id: application.id
    });

    return(
        <Card variant="outlined" 
        sx={{ borderRadius: 2,
            borderColor: '#e6e7ee',
            boxShadow: 'none',
            opacity: isDragging ? 0.5 : 1,
            zIndex: isDragging ? 1000 : 'auto',
            cursor: isDragging ? 'grabbing' : 'grab',
            transition: isDragging ? 'none' :  'transform 200ms ease',
            transform: transform 
                ? `translate3d(${transform.x}px, ${transform.y}px,0)` 
                : undefined
        }}
        ref={setNodeRef}       //this is the element should be draggable
            {...listeners}     //Adds the mouse/pointer/touch events needed for dragging
            {...attributes}    //Adds accessibility-related attributes needed by dnd-kit.
        >
            <CardContent sx={{p: 2}}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                    <Avatar variant = "rounded" sx={{width: 30,height: 30,fontSize: 20,bgcolor: '#f0f1f6',color: '#4b4e63'}}>
                        {company.charAt(0)}
                    </Avatar>

                    <Box sx={{flex: 1}}>
                        <Typography sx={{fontSize: '14px',fontWeight: 600,color: '#202238'}}>
                            {role}
                        </Typography>

                        <Typography variant="body2" sx={{color: '#7b7f91',mt: 0.2}}>
                            {company}
                        </Typography>
                    </Box>

                    <IconButton size="small" sx={{color: '#85899a'}}
                    onClick={(e) => setAnchorEl(e.currentTarget)}>
                        <MoreVertIcon fontSize="small" />
                    </IconButton>

                    <Menu anchorEl={anchorEl} 
                    open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                        <MenuItem onClick={() => {
                            onEdit(application);
                            setAnchorEl(null);
                        }}>
                            Edit
                        </MenuItem>

                        <MenuItem onClick={() =>{
                            setOpenDeleteDialog(true);
                            setAnchorEl(null);
                        }}>
                            Delete
                        </MenuItem>
                    </Menu>

                    <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                        <DialogTitle>Delete Application?</DialogTitle>

                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to delete this application?
                            </DialogContentText>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={() => setOpenDeleteDialog(false)}>
                                Cancel
                            </Button>
                            <Button color="error" onClick={() => onDelete(application.id)}>
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>

                <Box sx={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',mt: 2}}>
                    <Box sx={{display: 'flex',alignItems: 'center',gap: 0.5}}> 
                        <LocationPinIcon sx={{fontSize: 15,color: '#2b2b2b'}}/>
                        <Typography variant="body2" sx={{fontSize: 11,color: '#2b2b2b'}}>
                            {location}
                        </Typography>
                    </Box>

                    <Typography variant="caption" sx={{color: '#85899a'}}>
                        {applicationDate}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}