import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function ApplicationCard({ application }) {
    const { role, company,location,daysAgo, status } = application;

    const card = (
    <React.Fragment>
        <CardContent>
        <Typography variant="h5" component="div">
            {role}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
            Google
        </Typography>
        <Typography variant="body2">
            Remote
        </Typography>
        </CardContent>
    </React.Fragment>
    );

    return(
        <>
            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">{card}</Card>
            </Box>
        </>
    )
}