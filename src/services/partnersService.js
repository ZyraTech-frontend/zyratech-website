
import api from './api';

// Initial data - Only Royal Klast Group as per requirements
let mockPartnerships = [
    {
        id: 'PART-2024-001',
        organization: {
            name: 'Royal Klast Group',
            logo: '/images/partnershiplogo.jpeg',
            website: 'https://royalklast.com',
            industry: 'Media & Communications'
        },
        contact: {
            name: 'Royal Klast Team',
            email: 'info@royalklast.com',
            phone: null,
            role: 'Partner Relations'
        },
        type: 'corporate',
        status: 'active',
        featured: true,
        startDate: '2024-01-01',
        endDate: null,
        value: 'Strategic Partnership',
        description: 'Strategic media and communications partnership integrating ZyraTech\'s technical expertise with Royal Klast Group\'s industry reach to maximize brand impact and drive innovation across Africa.',
        benefits: ['Media Production', 'Brand Strategy', 'Technology Collaboration', 'Community Impact'],
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
