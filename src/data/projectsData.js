// Projects data - single source of truth
export const projectsData = [
    {
        id: 1,
        title: 'SafeDrive',
        category: 'Transportation',
        description: 'An intelligent road safety innovation that detects driver fatigue, alcohol influence, and risky driving behaviors. It provides real-time alerts to prevent accidents, protect lives, and promote safer transportation systems across Africa.',
        status: 'Active',
        image: '/images/safedrive/safedrive.jpg',
        link: '/projects/safedrive',
        featured: true,
        technologies: ['IoT', 'Machine Learning', 'Raspberry Pi', 'Python'],
        team: 5,
        startDate: '2024-01-15',
        progress: 85
    },
    {
        id: 2,
        title: 'IoT & Data Platforms',
        category: 'Software',
        description: 'Connecting devices and powering decisions with scalable IoT dashboards.',
        status: 'Active',
        image: '/images/Homepage/PXL_20240913_102510357.MP.jpg',
        link: '/services/software/iot',
        featured: false,
        technologies: ['React', 'Node.js', 'MQTT', 'MongoDB'],
        team: 3,
        startDate: '2024-03-01',
        progress: 70
    },
    {
        id: 3,
        title: 'Household Solutions',
        category: 'Software',
        description: 'Smart software for every home - budgeting, management, and family coordination.',
        status: 'Active',
        image: '/images/Homepage/WhatsApp Image 2025-07-10 at 5.30.30 PM.jpeg',
        link: '/services/software/household',
        featured: false,
        technologies: ['React Native', 'Firebase', 'TypeScript'],
        team: 4,
        startDate: '2024-02-20',
        progress: 60
    },
    {
        id: 4,
        title: 'EcoWatch',
        category: 'Environment',
        description: 'A real-time air quality monitoring system that tracks pollution levels across multiple locations and provides actionable insights for communities.',
        status: 'Active',
        image: '/images/Homepage/ECOWatch1.png',
        link: '/projects/ecowatch',
        featured: true,
        technologies: ['IoT Sensors', 'AWS', 'React', 'Python'],
        team: 4,
        startDate: '2024-04-10',
        progress: 90
    },
    {
        id: 5,
        title: 'AgrizPlanter',
        category: 'Agriculture',
        description: 'An automated rice planting device designed to eliminate the stress of manual transplanting, increase planting speed and accuracy, and improve farmers\' efficiency and productivity.',
        status: 'In Progress',
        image: '/images/agrizplanter/agrizplanter.jpg',
        link: '/projects/agrizplanter',
        featured: true,
        technologies: ['Arduino', 'Mechanical Design', 'Solar Power'],
        team: 6,
        startDate: '2024-05-01',
        progress: 45
    },
    {
        id: 6,
        title: 'ERA Technologies',
        category: 'Business Solutions',
        description: 'Digital tools for African businesses and startups. Streamline operations with ERA KPI, ERA Attendance, and ERA Bulk Email & SMS.',
        status: 'Active',
        image: '/images/era-technologies/era-kpi2.jpg',
        link: '/projects/era-technologies',
        featured: false,
        technologies: ['Vue.js', 'Laravel', 'MySQL', 'REST API'],
        team: 5,
        startDate: '2023-11-15',
        progress: 95
    },
    {
        id: 7,
        title: 'EduConnect Platform',
        category: 'Education',
        description: 'Digital learning platform connecting students with mentors and resources.',
        status: 'Completed',
        image: '/images/Homepage/PXL_20250612_144423482.MP.jpg',
        link: '#',
        featured: false,
        technologies: ['Next.js', 'PostgreSQL', 'WebRTC', 'Stripe'],
        team: 4,
        startDate: '2023-08-01',
        progress: 100
    }
];

// Helper functions
export const getProjectsByStatus = (status) => {
    if (status === 'all') return projectsData;
    return projectsData.filter(p => p.status === status);
};

export const getProjectById = (id) => projectsData.find(p => p.id === id);

export const getCategories = () => [...new Set(projectsData.map(p => p.category))];

export const getStatuses = () => [...new Set(projectsData.map(p => p.status))];

export const getFeaturedProjects = () => projectsData.filter(p => p.featured);
