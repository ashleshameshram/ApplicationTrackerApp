import { v4 as uuidv4 } from 'uuid';

const dummyApplication = [
    {
        id : uuidv4(),
        role : "Frontend Developer",
        company : "Amazon",
        location :  "Remote",
        daysAgo : 2,
        status : "wishlist"
    },
    {
        id : uuidv4(),
        role : "Frontend Developer",
        company : "Google",
        location :  "Bangalore,IN",
        daysAgo : 5,
        status : "applied"
    },
    {
        id : uuidv4(),
        role : "Web Developer",
        company : "TCS",
        location :  "Remote",
        daysAgo : 4,
        status : "applied"
    }
];