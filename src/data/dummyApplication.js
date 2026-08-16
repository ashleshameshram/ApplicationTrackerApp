import { v4 as uuidv4 } from 'uuid';

export const dummyApplication = [
    // Wishlist
    {
        id: uuidv4(),
        role: "Frontend Developer",
        company: "Amazon",
        location: "Remote",
        daysAgo: 2,
        status: "wishlist"
    },
    {
        id: uuidv4(),
        role: "UI Developer",
        company: "Microsoft",
        location: "Bangalore, IN",
        daysAgo: 4,
        status: "wishlist"
    },
     // Applied
    {
        id: uuidv4(),
        role: "Frontend Developer",
        company: "Google",
        location: "Bangalore, IN",
        daysAgo: 5,
        status: "applied"
    },
    {
        id: uuidv4(),
        role: "Web Developer",
        company: "TCS",
        location: "Remote",
        daysAgo: 4,
        status: "applied"
    },
     // Interview
    {
        id: uuidv4(),
        role: "Frontend Engineer",
        company: "Zomato",
        location: "Gurgaon, IN",
        daysAgo: 8,
        status: "interview"
    },
    {
        id: uuidv4(),
        role: "React Developer",
        company: "Wipro",
        location: "Bangalore, IN",
        daysAgo: 10,
        status: "interview"
    },
     // Offer
    {
        id: uuidv4(),
        role: "Frontend Developer",
        company: "Adobe",
        location: "Noida, IN",
        daysAgo: 12,
        status: "offer"
    },
    // Rejected
    {
        id: uuidv4(),
        role: "Web Developer",
        company: "Accenture",
        location: "Pune, IN",
        daysAgo: 14,
        status: "rejected"
    },
    {
        id: uuidv4(),
        role: "UI Developer",
        company: "Deloitte",
        location: "Mumbai, IN",
        daysAgo: 16,
        status: "rejected"
    }
];
