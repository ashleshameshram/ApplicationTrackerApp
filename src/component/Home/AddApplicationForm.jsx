import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export default function AddApplicationForm({ open, onClose }) {
    return(
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                Add Job Application
            </DialogTitle >

            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3,pt:2 }}>
                <TextField label="Job Role" fullWidth size='small'/>
                <TextField label="Company" fullWidth size='small' />
                <TextField label="Location" fullWidth size='small' />
                <TextField select label="Status" defaultValue="wishlist" fullWidth size='small'>
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
                size='small'slotProps={{inputLabel: {shrink: true}}}
                />

                <TextField label="Notes" multiline rows={3} fullWidth 
                placeholder='Add any notes about this application...'/>     
            </DialogContent>

            <DialogActions sx={{p:2}}>
                <Button sx={{textTransform: 'none'}}>
                    Cancel
                </Button>
                <Button variant="contained" sx={{textTransform: 'none'}}>
                    Add Card
                </Button>
            </DialogActions>
        </Dialog>
    )
}