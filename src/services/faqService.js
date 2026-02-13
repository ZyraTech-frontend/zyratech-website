/**
 * FAQ Service
 * Handles API calls for Frequently Asked Questions
 */

// Category configuration
export const FAQ_CATEGORIES = {
    'Internship Program': {
        label: 'Internship Program',
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        bgGradient: 'from-blue-500 to-indigo-600',
        iconName: 'Users'
    },
    'Services & Support': {
        label: 'Services & Support',
        color: 'bg-green-100 text-green-700 border-green-200',
        bgGradient: 'from-green-500 to-emerald-600',
        iconName: 'Settings' // Use string names for icons to avoid circular deps or large imports
    },
    'Partnerships': {
        label: 'Partnerships',
        color: 'bg-purple-100 text-purple-700 border-purple-200',
        bgGradient: 'from-purple-500 to-violet-600',
        iconName: 'MessageCircle'
    },
    'Donations & Support': {
        label: 'Donations & Support',
        color: 'bg-amber-100 text-amber-700 border-amber-200',
        bgGradient: 'from-amber-500 to-orange-600',
        iconName: 'Mail'
    },
    'Training': {
        label: 'Training',
        color: 'bg-cyan-100 text-cyan-700 border-cyan-200',
        bgGradient: 'from-cyan-500 to-blue-600',
        iconName: 'Sparkles'
    },
    'General': {
        label: 'General',
        color: 'bg-gray-100 text-gray-700 border-gray-200',
        bgGradient: 'from-gray-500 to-slate-600',
        iconName: 'HelpCircle'
    }
};

// Mock FAQ data
let mockFaqData = [
    {
        id: 1,
        category: 'Internship Program',
        question: 'Who can apply for Zyra Tech Hub\'s internship program?',
        answer: 'University students, graduates, and anyone eager to gain real-world tech experience.',
        status: 'published',
        order: 1,
        views: 245,
        helpful: 89,
        createdAt: '2024-12-01'
    },
    {
        id: 2,
        category: 'Internship Program',
        question: 'How much does the internship cost?',
        answer: 'GHS 350, covering mentorship, training, and certification.',
        status: 'published',
        order: 2,
        views: 312,
        helpful: 156,
        createdAt: '2024-12-01'
    },
    {
        id: 3,
        category: 'Internship Program',
        question: 'Do you partner with schools outside Koforidua?',
        answer: 'Currently we focus on Koforidua but will expand regionally and internationally.',
        status: 'published',
        order: 3,
        views: 178,
        helpful: 67,
        createdAt: '2024-12-02'
    },
    {
        id: 4,
        category: 'Internship Program',
        question: 'Can institutions request IT or web services?',
        answer: 'Yes, we provide professional IT, web, and networking services for schools and organizations.',
        status: 'published',
        order: 4,
        views: 134,
        helpful: 45,
        createdAt: '2024-12-02'
    },
    {
        id: 5,
        category: 'Internship Program',
        question: 'How can individuals or companies support your programs?',
        answer: 'Through sponsorships, partnerships, or donations of funds and equipment.',
        status: 'published',
        order: 5,
        views: 98,
        helpful: 34,
        createdAt: '2024-12-03'
    },
    {
        id: 6,
        category: 'Services & Support',
        question: 'What IT and digital services do you offer?',
        answer: 'We provide Education Technology (EdTech), IT & Networking, Web & Software Development, and Consulting & Support services for schools and businesses.',
        status: 'published',
        order: 1,
        views: 267,
        helpful: 112,
        createdAt: '2024-12-05'
    },
    {
        id: 7,
        category: 'Services & Support',
        question: 'What specific IT services are available?',
        answer: 'LAN/WAN installation, WiFi setup, server deployment, school websites, management systems, and IT consulting.',
        status: 'published',
        order: 2,
        views: 189,
        helpful: 78,
        createdAt: '2024-12-05'
    },
    {
        id: 8,
        category: 'Services & Support',
        question: 'Do you offer long-term support contracts?',
        answer: 'Yes, we provide long-term maintenance contracts and ongoing system support for schools and businesses.',
        status: 'published',
        order: 3,
        views: 145,
        helpful: 56,
        createdAt: '2024-12-06'
    },
    {
        id: 9,
        category: 'Services & Support',
        question: 'How can I request a quote for services?',
        answer: 'Contact us directly through our website or email info@zyratechhub.com with your project details.',
        status: 'published',
        order: 4,
        views: 203,
        helpful: 89,
        createdAt: '2024-12-06'
    },
    {
        id: 10,
        category: 'Partnerships',
        question: 'What types of partnerships do you offer?',
        answer: 'Educational partnerships (introduce digital learning programs), Corporate partnerships (sponsor or host interns), NGO & Government partnerships (support youth capacity-building), and Technology partnerships (co-develop tools and solutions).',
        status: 'published',
        order: 1,
        views: 156,
        helpful: 67,
        createdAt: '2024-12-08'
    },
    {
        id: 11,
        category: 'Partnerships',
        question: 'How can our organization partner with Zyra Tech Hub?',
        answer: 'Contact us through our partnership page or email info@zyratechhub.com to discuss collaboration opportunities.',
        status: 'published',
        order: 2,
        views: 134,
        helpful: 45,
        createdAt: '2024-12-08'
    },
    {
        id: 12,
        category: 'Partnerships',
        question: 'Can my company sponsor a student?',
        answer: 'Yes, we welcome corporate sponsorships to help students access our tech programs and create meaningful impact.',
        status: 'published',
        order: 3,
        views: 112,
        helpful: 38,
        createdAt: '2024-12-09'
    },
    {
        id: 13,
        category: 'Partnerships',
        question: 'What are the benefits of partnership?',
        answer: 'Partners gain access to skilled interns, enhanced CSR impact, technology solutions, and opportunities to shape the next generation of tech talent.',
        status: 'draft',
        order: 4,
        views: 89,
        helpful: 23,
        createdAt: '2024-12-09'
    },
    {
        id: 14,
        category: 'Donations & Support',
        question: 'How can I support Zyra Tech Hub?',
        answer: 'You can fund students to access tech programs, donate equipment (laptops, kits, accessories), or sponsor school-based technology programs.',
        status: 'published',
        order: 1,
        views: 178,
        helpful: 67,
        createdAt: '2024-12-10'
    },
    {
        id: 15,
        category: 'Donations & Support',
        question: 'What equipment donations do you accept?',
        answer: 'We accept laptops, robotics kits, networking equipment, and other technology resources for training programs.',
        status: 'published',
        order: 2,
        views: 145,
        helpful: 56,
        createdAt: '2024-12-10'
    },
    {
        id: 16,
        category: 'Donations & Support',
        question: 'Do you provide donation receipts?',
        answer: 'Yes, we provide official receipts for all donations for tax and record-keeping purposes.',
        status: 'published',
        order: 3,
        views: 98,
        helpful: 34,
        createdAt: '2024-12-11'
    }
];

const faqService = {
    // Get all FAQs
    getAllFaqs: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ data: [...mockFaqData] });
            }, 500);
        });
    },

    // Get published FAQs (for public site)
    getPublishedFaqs: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const published = mockFaqData
                    .filter(faq => faq.status === 'published')
                    .sort((a, b) => a.order - b.order);
                resolve({ data: published });
            }, 500);
        });
    },

    // Get single FAQ
    getFaqById: async (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const faq = mockFaqData.find(f => f.id === parseInt(id));
                if (faq) {
                    resolve({ data: faq });
                } else {
                    reject(new Error('FAQ not found'));
                }
            }, 500);
        });
    },

    // Create FAQ
    createFaq: async (data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newFaq = {
                    id: Date.now(),
                    createdAt: new Date().toISOString().split('T')[0],
                    views: 0,
                    helpful: 0,
                    ...data
                };
                mockFaqData.push(newFaq);
                resolve({ data: newFaq });
            }, 500);
        });
    },

    // Update FAQ
    updateFaq: async (id, data) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = mockFaqData.findIndex(f => f.id === parseInt(id));
                if (index !== -1) {
                    mockFaqData[index] = { ...mockFaqData[index], ...data };
                    resolve({ data: mockFaqData[index] });
                } else {
                    reject(new Error('FAQ not found'));
                }
            }, 500);
        });
    },

    // Delete FAQ
    deleteFaq: async (id) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                mockFaqData = mockFaqData.filter(f => f.id !== parseInt(id));
                resolve({ success: true });
            }, 500);
        });
    },

    // Increment views
    incrementViews: async (id) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const index = mockFaqData.findIndex(f => f.id === parseInt(id));
                if (index !== -1) {
                    mockFaqData[index].views = (mockFaqData[index].views || 0) + 1;
                    resolve({ success: true });
                } else {
                    resolve({ success: false });
                }
            }, 200);
        });
    }
};

export default faqService;
