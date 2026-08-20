import StatCard from './StatsCard';
import Box from '@mui/material/Box';

import NearMeIcon from '@mui/icons-material/NearMe';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CancelIcon from '@mui/icons-material/Cancel';

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
    
    const stats = [
        { icon: NearMeIcon, iconColor: '#3856ed', iconBg: '#efedff', label: 'Total Applied', value: totalApplied },
        { icon: PermIdentityIcon, iconColor: '#7ded38', iconBg: '#e7ffe2', label: 'In Interview', value: interview },
        { icon: AutoGraphIcon, iconColor: '#edab38', iconBg: '#fdf0d9', label: 'Interview Rate', value: `${interviewRate}%` },
        { icon: CardGiftcardIcon, iconColor: '#bd38ed', iconBg: '#f3d2ff', label: 'Offer', value: offer },
        { icon: CancelIcon, iconColor: '#ed3e38', iconBg: '#ffdada', label: 'Rejections', value: rejections },
    ];
    return(
        <Box sx={{
            width:'100%',
            display:'flex',
            flexWrap:'wrap',
            mt:2, mb:2,
            gap:{xs:1, sm:1.5, md:2}
        }}>
            {stats.map((stat) => (
                <StatCard key={stat.label} {...stat}/>
            ))}
        </Box>
    )
}