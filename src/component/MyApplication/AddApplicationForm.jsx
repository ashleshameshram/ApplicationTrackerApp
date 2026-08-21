import { useState,useEffect } from 'react'

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export default function AddApplicationForm({ open, onClose, onAddApplication, applications }) {
    const initialFormData = {
        role:'',
        company:'',
        location:'',
        applicationDate: '',
        status:'wishlist',
        notes: ''
    }
    const [formData, setFormData] = useState(initialFormData);
    const [errors,setErrors] = useState({});

    const validationForm = () => {
        const newErrors = {};
        if(!formData.role.trim()){
            newErrors.role = 'Job role is required';
        }
        if(!formData.company.trim()){
            newErrors.company = "Company name is required";
        }
        if(!formData.location.trim()){
            newErrors.location = 'Location is required';
        }
        if(!formData.applicationDate) {
            newErrors.applicationDate = "Application date is required";
        }
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    //on edit form should open
    useEffect(() => {
        if(applications) {
            setFormData(applications)
        }
    },[applications]);

    let handleSubmit = () => {
        if(!validationForm()) return;

        onAddApplication(formData);
        setFormData(initialFormData);
        setErrors({});
        onClose();
    }

    return(
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                {applications ? "Edit Job Application" : "Add Job Application" }
            </DialogTitle >

            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3,pt:2 }}>
                <TextField label="Job Role" fullWidth size='small' sx={{ mt: 1}}
                value={formData.role} error={!!errors.role} helperText={errors.role}
                onChange={(e) => {
                    setFormData({
                        ...formData,   //to not lose the other fields data as well
                        role: e.target.value
                    });
                    if(errors.role){
                        setErrors({
                            ...errors,
                            role:''
                        });
                    }
                }}
                    
                />

                <TextField label="Company" fullWidth size='small' value={formData.company}
                error={!!errors.company} helperText={errors.company}
                onChange={(e) => {
                    setFormData({
                        ...formData,
                        company: e.target.value
                    });
                    if(errors.company){
                        setErrors({
                            ...errors,
                            company:''
                        });
                    }
                }}
                />

                <TextField label="Location" fullWidth size='small' value={formData.location}
                error={!!errors.location} helperText={errors.location}
                onChange={(e) => {
                    setFormData({
                        ...formData,
                        location: e.target.value
                    });
                    if(errors.location){
                        setErrors({
                            ...errors,
                            location:''
                        });
                    }
                }}
                />
                <TextField select label="Status" fullWidth size='small'
                value={formData.status} onChange={(e) => setFormData({
                    ...formData,
                    status: e.target.value
                })}>
                    <MenuItem value="wishlist">
                        Wishlist
                    </MenuItem>

                    <MenuItem value="applied">
                        Applied
                    </MenuItem>

                    <MenuItem value="interview">
                        Interview
                    </MenuItem>

                    <MenuItem value="offer">
                        Offer
                    </MenuItem>

                    <MenuItem value="rejected">
                        Rejected
                    </MenuItem>
                </TextField>  

                <TextField label='Application Date' type='date' fullWidth
                size='small'slotProps={{inputLabel: {shrink: true}}} value={formData.applicationDate}
                error={!!errors.applicationDate}  helperText={errors.applicationDate}
                onChange={(e) => {
                    setFormData({
                        ...formData,
                        applicationDate: e.target.value
                    });
                    if(errors.applicationDate){
                        setErrors({
                            ...errors,
                            applicationDate:''
                        });
                    }
                }}
                />

                <TextField label="Notes(optional)" multiline rows={3} fullWidth 
                placeholder='Add any notes about this application...'
                value={formData.notes} onChange={(e) => setFormData({
                        ...formData,
                        notes:e.target.value 
                    })}
                />  
            </DialogContent>

            <DialogActions sx={{p:2}}>
                <Button sx={{textTransform: 'none'}}
                onClick={() => {
                    setErrors({});
                    onClose();
                }}>
                    Cancel
                </Button>

                <Button variant="contained" sx={{textTransform: 'none'}}
                onClick={handleSubmit}>
                    {applications ? "Edit Application" : "Add Application" }
                </Button>

            </DialogActions>
        </Dialog>
    )
}