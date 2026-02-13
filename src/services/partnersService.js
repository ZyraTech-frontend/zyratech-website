
import api from './api';

// Initial data combining Admin Mock Data and Public Component Data
let mockPartnerships = [
    // Data from PartnershipsManagementPage.jsx
    {
        id: 'PART-2024-001',
        organization: {
            name: 'TechVision Ltd',
            logo: null,
            website: 'https://techvision.com.gh',
            industry: 'Software Development'
        },
        contact: {
            name: 'Kwame Asante',
            email: 'kwame@techvision.com.gh',
            phone: '+233 24 123 4567',
            role: 'CEO'
        },
        type: 'corporate',
        status: 'active',
        featured: true,
        startDate: '2024-01-15',
        endDate: '2025-01-15',
        value: 'GHS 150,000',
        description: 'Corporate training partnership for DevOps and Cloud Computing programs.',
        benefits: ['Employee Training', 'Internship Pipeline', 'Technology Collaboration'],
        studentsPlaced: 12,
        projectsCompleted: 3
    },
    {
        id: 'PART-2024-002',
        organization: {
            name: 'University of Ghana',
            logo: null,
            website: 'https://ug.edu.gh',
            industry: 'Higher Education'
        },
        contact: {
            name: 'Dr. Sarah Johnson',
            email: 'sarah.johnson@ug.edu.gh',
            phone: '+233 27 888 9999',
            role: 'Head of Computer Science'
        },
        type: 'academic',
        status: 'active',
        featured: true,
        startDate: '2023-09-01',
        endDate: '2026-08-31',
        value: 'In-Kind',
        description: 'Academic collaboration for student internships, guest lectures, and research.',
        benefits: ['Student Internships', 'Guest Lectures', 'Curriculum Input', 'Research Collaboration'],
        studentsPlaced: 28,
        projectsCompleted: 5
    },
    {
        id: 'PART-2024-003',
        organization: {
            name: 'Ghana Digital Innovation Hub',
            logo: null,
            website: 'https://gdiHub.gov.gh',
            industry: 'Government Agency'
        },
        contact: {
            name: 'Michael Owusu',
            email: 'michael.owusu@gdiHub.gov.gh',
            phone: '+233 50 666 7777',
            role: 'Director'
        },
        type: 'government',
        status: 'negotiating',
        featured: false,
        startDate: null,
        endDate: null,
        value: 'TBD',
        description: 'Proposed partnership for national digital skills development initiative.',
        benefits: ['Funding Support', 'National Programs', 'Policy Advocacy'],
        studentsPlaced: 0,
        projectsCompleted: 0
    },
    {
        id: 'PART-2024-004',
        organization: {
            name: 'AWS Academy',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
            website: 'https://aws.amazon.com/academy',
            industry: 'Cloud Computing'
        },
        contact: {
            name: 'Regional Team',
            email: 'academy-africa@amazon.com',
            phone: null,
            role: 'Partner Relations'
        },
        type: 'technology',
        status: 'active',
        featured: true,
        startDate: '2024-03-01',
        endDate: '2025-02-28',
        value: 'Certification Partnership',
        description: 'Official AWS Academy member institution for cloud certification training.',
        benefits: ['AWS Curriculum', 'Certification Vouchers', 'Lab Credits', 'Instructor Training'],
        studentsPlaced: 0,
        projectsCompleted: 0
    },
    // Data from Partners.jsx (Public Component)
    {
        id: 'PART-EXT-001',
        organization: {
            name: 'UNICEF Startup Labs',
            logo: 'https://www.unicefstartuplabs.org/content/dam/unicefstartuplabs/logo.png',
            website: 'https://www.unicefstartuplabs.org',
            industry: 'NGO'
        },
        contact: { name: 'Contact Person', email: 'contact@unicef.org', role: 'Program Manager' },
        type: 'ngo',
        status: 'active',
        featured: true,
        startDate: '2023-01-01',
        endDate: null,
        value: 'Partnership',
        description: 'Strategic partnership with UNICEF Startup Labs.',
        benefits: ['Innovation Support', 'Mentorship'],
        studentsPlaced: 0,
        projectsCompleted: 0
    },
    {
        id: 'PART-EXT-002',
        organization: {
            name: 'MEST Africa',
            logo: 'https://mest.org.gh/wp-content/uploads/2021/08/MEST-Africa-Logo.png',
            website: 'https://mest.org.gh',
            industry: 'Education'
        },
        contact: { name: 'Admissions', email: 'admissions@mest.org', role: 'Coordinator' },
        type: 'academic',
        status: 'active',
        featured: true,
        startDate: '2023-01-01',
        endDate: null,
        value: 'Partnership',
        description: 'Collaboration with MEST Africa.',
        benefits: ['Training', 'Networking'],
        studentsPlaced: 0,
        projectsCompleted: 0
    },
    {
        id: 'PART-EXT-003',
        organization: {
            name: 'Bloomberg Philanthropies',
            logo: 'https://www.bloombergphilanthropies.org/content/dam/bloombergphilanthropies/Logo.png',
            website: 'https://www.bloombergphilanthropies.org',
            industry: 'Philanthropy'
        },
        contact: { name: 'Grants Team', email: 'info@bloomberg.org', role: 'Manager' },
        type: 'ngo',
        status: 'active',
        featured: true,
        startDate: '2023-01-01',
        endDate: null,
        value: 'Grant Support',
        description: 'Support from Bloomberg Philanthropies.',
        benefits: ['Funding', 'Global Network'],
        studentsPlaced: 0,
        projectsCompleted: 0
    },
    {
        id: 'PART-EXT-004',
        organization: {
            name: 'Kosmos Innovation Center',
            logo: 'https://kosmos.org.gh/wp-content/uploads/2021/06/Kosmos-Logo-Final.png',
            website: 'https://kosmos.org.gh',
            industry: 'Innovation'
        },
        contact: { name: 'Program Lead', email: 'info@kosmos.org', role: 'Lead' },
        type: 'corporate',
        status: 'active',
        featured: true,
        startDate: '2023-01-01',
        endDate: null,
        value: 'Partnership',
        description: 'Innovation and agritech partnership.',
        benefits: ['Innovation Challenges', 'Funding'],
        studentsPlaced: 0,
        projectsCompleted: 0
    }
];

const partnersService = {
    // Get all partnerships
    getAllPartnerships: async () => {
        // return api.get('/partnerships');
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ data: [...mockPartnerships] });
            }, 500);
        });
    },

    // Get single partnership
    getPartnershipById: async (id) => {
        // return api.get(`/partnerships/${id}`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const partnership = mockPartnerships.find(p => p.id === id);
                if (partnership) resolve({ data: partnership });
                else reject(new Error('Partnership not found'));
            }, 300);
        });
    },

    // Create new partnership
    createPartnership: async (data) => {
        // return api.post('/partnerships', data);
        return new Promise((resolve) => {
            setTimeout(() => {
                const newPartnership = {
                    id: `PART-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
                    ...data,
                    studentsPlaced: 0,
                    projectsCompleted: 0
                };
                mockPartnerships.unshift(newPartnership);
                resolve({ data: newPartnership });
            }, 600);
        });
    },

    // Update existing partnership
    updatePartnership: async (id, data) => {
        // return api.put(`/partnerships/${id}`, data);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = mockPartnerships.findIndex(p => p.id === id);
                if (index !== -1) {
                    mockPartnerships[index] = { ...mockPartnerships[index], ...data };
                    resolve({ data: mockPartnerships[index] });
                } else {
                    reject(new Error('Partnership not found'));
                }
            }, 600);
        });
    },

    // Delete partnership
    deletePartnership: async (id) => {
        // return api.delete(`/partnerships/${id}`);
        return new Promise((resolve) => {
            setTimeout(() => {
                mockPartnerships = mockPartnerships.filter(p => p.id !== id);
                resolve({ success: true });
            }, 500);
        });
    },

    // Toggle Featured Status
    toggleFeatured: async (id) => {
        // return api.patch(`/partnerships/${id}/toggle-featured`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = mockPartnerships.findIndex(p => p.id === id);
                if (index !== -1) {
                    mockPartnerships[index].featured = !mockPartnerships[index].featured;
                    resolve({ data: mockPartnerships[index] });
                } else {
                    reject(new Error('Partnership not found'));
                }
            }, 300);
        });
    }
};

export default partnersService;
