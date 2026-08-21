import { useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchFilter({ searchFilter, setSearchFilter}) {

    return(
        <Box sx={{width:'100%', px:2,mb:2,boxSizing:'border-box'}}>
            <TextField  variant="standard" placeholder='Search by role, company, keyword'size='small' fullWidth 
            value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)}
            slotProps={{
                input:{
                    startAdornment: <SearchIcon sx={{mr:1,fontSize: 30,color: '#777b8e',}}/>
                }
            }}>
            </TextField>
        </Box>
    )
}