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

    const formatDate = (date) => {
    if (!date) return '';

    return new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    return(
        <Card variant="outlined"    
        sx={{ borderRadius: 2,
            width:'100%',
            boxSizing:'border-box',
            minWidth:0,
            flexShrink: 0,
            borderColor: '#e6e7ee',
            boxShadow: 'none',
            opacity: isDragging ? 0.5 : 1,
            zIndex: isDragging ? 1000 : 'auto',
            transition: isDragging ? 'none' :  'box-shadow 150ms ease, transform 200ms ease',
            transform: transform 
                ? `translate3d(${transform.x}px, ${transform.y}px,0)` 
                : undefined,
            '&:hover': {
                boxShadow: isDragging ? 'none' : '0px 4px 12px rgba(16, 24, 40, 0.08)',
                borderColor: '#e2e4ee',
            },
        }}
        ref={setNodeRef} //this is the element should be draggable 
        >          
            <CardContent sx={{p: 2, '&:last-child': { pb: 2 }}}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                    {/* Dragged card in this area  */}
                    <Box            
                    {...listeners} //Adds the mouse/pointer/touch events needed for dragging
                    {...attributes} //Adds accessibility-related attributes needed by dnd-kit.
                    sx={{cursor: isDragging ? 'grabbing' : 'grab',
                        display:'flex',gap:1.5,
                        alignItems: 'center',
                        flex:1,minWidth:0
                    }}>   

                        <Avatar variant = "rounded" sx={{width: 33,height: 33,fontSize: 18,
                        bgcolor: '#e1e1e2',color:'#1a1a1c',flexShrink:0,borderRadius:'16px'}}>
                            {company?.charAt(0)}
                        </Avatar>

                        <Box sx={{flex: 1,minWidth:0}}>
                            <Typography sx={{fontSize: '13px',fontWeight: 600,color: '#202238',
                            lineHeight:1.3,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                {role}
                            </Typography>
                            <Typography variant="body2" sx={{fontSize:'12px',color: '#777777',mt: 0.2,
                            whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                {company}
                            </Typography>
                        </Box>
                    </Box>

                    <IconButton size="small" sx={{color: '#a7abbd',mt: -0.5}}
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => setAnchorEl(e.currentTarget)}>
                        <MoreVertIcon fontSize="small" />
                    </IconButton>

                    <Menu anchorEl={anchorEl} 
                    open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}
                    onClick={(e) => e.stopPropagation()}
                    onPointerDown={(e) => e.stopPropagation()} >
                        <MenuItem onClick={(e) => {
                            e.stopPropagation();
                            onEdit(application);
                            setAnchorEl(null);
                        }}>
                            Edit
                        </MenuItem>

                        <MenuItem onClick={(e) =>{
                            e.stopPropagation();
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
                            <Button color="error" onClick={() => {
                                onDelete(application.id);
                                setOpenDeleteDialog(false);
                            }}>
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>

                <Box sx={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',mt: 1.5}}>
                    <Box sx={{display: 'flex',alignItems: 'center',gap: 0.4,minWidth:0}}> 
                        <LocationPinIcon sx={{fontSize: 15,color: '#6b6f82',flexShrink:0}}/>
                        <Typography variant="body2" sx={{fontSize: 11,color: '#6b6f82'}}>
                            {location}
                        </Typography>
                    </Box>

                    <Typography variant="caption" sx={{fontSize: 11,color: '#171616',
                    flexShrink: 0, ml: 1,backgroundColor:"#f1d4ff",borderRadius:10,px:1 }}>
                        {formatDate(applicationDate)}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}